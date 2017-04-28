package server

import (
	"github.com/labstack/echo"
)

func Start(address string) {
	e := echo.New()

	assetsRoutes(e)
	e.Logger.Fatal(e.Start(address))
}
