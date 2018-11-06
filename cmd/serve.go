package cmd

import (
	"fmt"
	"os"

	"github.com/rai-project/dockerfile-builder/server"
	"github.com/spf13/cobra"
)

const (
	DEFAULTPORT = "8088"
)

var (
	serverArch string
)

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start the webserver",
	Run: func(cmd *cobra.Command, args []string) {
		port, found := os.LookupEnv("PORT")
		if !found {
			port = DEFAULTPORT
		}
		server.SetServerArch(serverArch)
		server.Start(fmt.Sprintf(":%s", port))
	},
}

func init() {
	serveCmd.PersistentFlags().StringVarP(&serverArch, "arch", "", "ppc64le", "Architecture to create Docker image on.")
	RootCmd.AddCommand(serveCmd)
}
