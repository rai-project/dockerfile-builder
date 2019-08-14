package server

import (
	"fmt"
	"io"
	"strings"

	"github.com/davecgh/go-spew/spew"
	"github.com/k0kubun/pp"
	echo "github.com/labstack/echo"
	middleware "github.com/labstack/echo/middleware"
	glog "github.com/labstack/gommon/log"
	"github.com/sirupsen/logrus"
)

func Start(addr string) {
	e := echo.New()

	e.HideBanner = true

	e.Logger = &echoLogger{
		Entry: log,
	}

	e.Use(middleware.Recover())
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Skipper: middleware.DefaultSkipper,
		Format:  middleware.DefaultLoggerConfig.Format,
		Output:  log.Writer(),
	}))
	e.Pre(middleware.RemoveTrailingSlash())

	assetsRoutes(e)
	apiRoutes(e)

	fmt.Println("🌎  Webserver started at address", pprintAddr(addr))
	defer func() {
		fmt.Println("🌀  Webserver stopped.")
	}()
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered in webserver runner", pp.Sprint(r))
		}
	}()

	// Setting up the termination timeout to 30 seconds.
	err := e.Start(addr)
	if err != nil {
		log.WithError(err).Errorln("✗ Failed to start web server")
		return
	}
}

// Used for pretty printing addresses.
func pprintAddr(addr string) string {
	parts := strings.Split(addr, ":")
	if len(parts) == 2 && parts[0] == "" {
		parts = append([]string{"localhost"}, parts[1])
	}
	return strings.Join(parts, ":")
}

type echoLogger struct {
	*logrus.Entry
}

func (l *echoLogger) SetHeader(string) {
}
func (l *echoLogger) SetPrefix(string) {
}
func (l *echoLogger) Prefix() string {
	return ""
}
func (l *echoLogger) SetLevel(level glog.Lvl) {
	l.Entry.Level = logrus.Level(level)
}
func (l *echoLogger) Level() glog.Lvl {
	return glog.Lvl(l.Entry.Level)
}
func (l *echoLogger) Output() io.Writer {
	return l.Entry.Writer()
}
func (l *echoLogger) SetOutput(w io.Writer) {
	l.Entry.Logger.Out = w
}
func (l *echoLogger) Printj(msg glog.JSON) {
	l.Entry.Print(spew.Sprint(msg))
}
func (l *echoLogger) Debugj(msg glog.JSON) {
	l.Entry.Debug(spew.Sprint(msg))
}
func (l *echoLogger) Infoj(msg glog.JSON) {
	l.Entry.Info(spew.Sprint(msg))
}
func (l *echoLogger) Errorj(msg glog.JSON) {
	l.Entry.Error(spew.Sprint(msg))
}
func (l *echoLogger) Warnj(msg glog.JSON) {
	l.Entry.Warn(spew.Sprint(msg))
}
func (l *echoLogger) Fatalj(msg glog.JSON) {
	l.Entry.Fatal(spew.Sprint(msg))
}
func (l *echoLogger) Panicj(msg glog.JSON) {
	l.Entry.Panic(spew.Sprint(msg))
}
