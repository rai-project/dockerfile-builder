package server

import (
	"net/http"

	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"

	"github.com/k0kubun/pp"
	"github.com/labstack/echo"
	pb "github.com/rai-project/dockerfile-builder/proto/build/go/_proto/raiprojectcom/docker"
)

type dockerBuildRequest struct {
	Content string `json:"content" from:"content" query:"content"`
}

func dockerButtonClicked(c echo.Context) error {
	req := new(dockerBuildRequest)
	if err := c.Bind(req); err != nil {
		pp.Println("error ", err)
		return err
	}
	pp.Println("got ", req)
	return c.String(http.StatusOK, "got content")
}

func apiRoutes(e *echo.Echo) {
	apiGroup := e.Group("/api")
	dockerbuildService := NewDockerbuildService()

	grpcServer := grpc.NewServer()
	pb.RegisterDockerServiceServer(grpcServer, dockerbuildService)
	grpclog.SetLogger(log)

	// wrappedGrpc := grpcweb.WrapServer(grpcServer)

	apiGroup.POST("/build_docker", dockerButtonClicked)
}
