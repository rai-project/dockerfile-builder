package cmd

import (
	"fmt"
	"io/ioutil"

	"github.com/Unknwon/com"
	"github.com/pkg/errors"
	"github.com/rai-project/dockerfile-builder/server"
	"github.com/spf13/cobra"
)

var (
	dockerFilePath string
	imageName      string
)

// serveCmd represents the serve command
var buildCmd = &cobra.Command{
	Use:   "build",
	Short: "Builds the docker image",
	RunE: func(cmd *cobra.Command, args []string) error {
		if !com.IsFile(dockerFilePath) {
			fmt.Println("ERROR:: cannot find the dockerfile in %v ", dockerFilePath)
			return errors.Errorf("cannot find the dockerfile in %v", dockerFilePath)
		}
		dockerFileBts, err := ioutil.ReadFile(dockerFilePath)
		if err != nil {
			fmt.Println("ERROR: unable to read %v", dockerFilePath)
			return errors.Wrapf(err, "unable to read %v", dockerFilePath)
		}
		dockerFile := string(dockerFileBts)

		return server.BuildCmd(imageName, dockerFile)
	},
}

func init() {

	RootCmd.PersistentFlags().StringVarP(&dockerFilePath, "dockerfile", "f", "Dockerfile", "Path to the dockerfile to build.")
	RootCmd.PersistentFlags().StringVarP(&imageName, "name", "n", getRandomName(10), "Toggle debug mode.")
	RootCmd.PersistentFlags().StringVarP(&appSecret, "secret", "s", "", "The application secret.")

	RootCmd.AddCommand(buildCmd)
}
