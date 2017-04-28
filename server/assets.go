package server

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/k0kubun/pp"
	"github.com/labstack/echo"
)

type assetsManifestTy struct {
	MainCSS               string `json:"main.css"`
	MainCSSMap            string `json:"main.css.map"`
	MainJs                string `json:"main.js"`
	MainJsMap             string `json:"main.js.map"`
	StaticMediaFlagsPng   string `json:"static/media/flags.png"`
	StaticMediaIconsEot   string `json:"static/media/icons.eot"`
	StaticMediaIconsSvg   string `json:"static/media/icons.svg"`
	StaticMediaIconsTtf   string `json:"static/media/icons.ttf"`
	StaticMediaIconsWoff  string `json:"static/media/icons.woff"`
	StaticMediaIconsWoff2 string `json:"static/media/icons.woff2"`
	StaticMediaLogoSvg    string `json:"static/media/logo.svg"`
}

var assetsManifest assetsManifestTy

func assetsRoutes(e *echo.Echo) {
	index := func(c echo.Context) error {
		html, err := buildIndexHtmlBytes()
		if err != nil {
			return err
		}
		return c.HTML(http.StatusOK, string(html))
	}
	favicon := func(c echo.Context) error {
		ico, err := buildFaviconIcoBytes()
		if err != nil {
			return err
		}
		return c.Blob(http.StatusOK, "image/x-icon", ico)
	}

	e.GET("/", index)
	e.GET("/index.html", index)
	e.GET("/favicon.ico", favicon)
	e.GET("/vendor/*", echo.WrapHandler(http.FileServer(assetFS())))
	e.GET("/static/*", echo.WrapHandler(http.FileServer(assetFS())))

}

func init() {
	data, err := buildAssetManifestJsonBytes()
	if err != nil {
		panic(fmt.Sprintf("failed to get assetsManifest %v", err))
	}
	if err := json.Unmarshal(data, &assetsManifest); err != nil {
		pp.Println(err)
		panic(fmt.Sprintf("failed to unmarshal assetsManifest %v", err))
	}
}
