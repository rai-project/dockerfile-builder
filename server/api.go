package server

import (
	"net/http"

	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	echo "github.com/labstack/echo"
	"github.com/rai-project/config"
	pb "github.com/rai-project/dockerfile-builder/proto/build/go/_proto/raiprojectcom/docker"
)

type dockerBuildRequest struct {
	Content string `json:"content" from:"content" query:"content"`
}

func apiRoutes(e *echo.Echo) {

	api := e.Group("/api")

	grpcServer := grpc.NewServer()
	pb.RegisterDockerServiceServer(grpcServer, &dockerbuildService{})
	grpclog.SetLogger(log.WithField("subpkg", "grpclog"))

	wrappedGrpc := grpcweb.WrapServer(grpcServer)

	api.GET("/version", func(c echo.Context) error {
		return c.JSON(http.StatusOK, config.App.Version)
	})
	api.Any("/*", echo.WrapHandler(http.StripPrefix("/api", wrappedGrpc)))
}
