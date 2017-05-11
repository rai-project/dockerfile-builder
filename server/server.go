package server

import (
	"github.com/labstack/echo"
)

func Start(address string) {
	e := echo.New()

	assetsRoutes(e)
	apiRoutes(e)

	println("Starting server at ", address)

	e.Logger.Fatal(e.Start(address))
}
