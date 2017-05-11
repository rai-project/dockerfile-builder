package server

import (
	"net/http"

	"github.com/labstack/echo"
)

func dockerButtonClicked(c echo.Context) error {
	// Get team and member from the query string
	content := c.FormValue("content")
	println(content)
	return c.String(http.StatusOK, "got conent")
}

func apiRoutes(e *echo.Echo) {
	apiGroup := e.Group("/api")
	apiGroup.POST("/build_docker", dockerButtonClicked)
}
