package server

import (
	"net/http"

	"github.com/k0kubun/pp"
	"github.com/labstack/echo"
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
	apiGroup.POST("/build_docker", dockerButtonClicked)
}
