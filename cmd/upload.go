package cmd

import (
       "encoding/base64"
       "fmt"
       "io/ioutil"

       "github.com/Unknwon/com"
       "github.com/pkg/errors"
       "github.com/rai-project/dockerfile-builder/server"
       "github.com/spf13/cobra"
)

var (
       dockerImageName string
       userName string
       password string
       arch string
)

// UploadCmd represents the upload command
var UploadCmd = &cobra.Command{
       Use:   "upload <path to Dockerfile> -n <Docker image name> -u <Docker Hub user ID> -p <Docker Hub password>",
       Short: "Build the docker image and upload to Docker Hub",
       Args:  cobra.MinimumNArgs(1),
       RunE: func(cmd *cobra.Command, args []string) error {
               dockerFilePath := args[0]
               if !com.IsFile(dockerFilePath) {
                       fmt.Println("ERROR:: cannot find the dockerfile in %v ", dockerFilePath)
                       return errors.Errorf("cannot find the dockerfile in %v", dockerFilePath)
               }

               dockerFileBts, err := ioutil.ReadFile(dockerFilePath)
               if err != nil {
                       fmt.Println("ERROR: unable to read %v", dockerFilePath)
                       return errors.Wrapf(err, "unable to read %v", dockerFilePath)
               }
               zippedDockerFileBts, err := toZip(dockerFileBts)
               if err != nil {
                       fmt.Println("ERROR: unable to zip %v", dockerFilePath)
                       return errors.Wrapf(err, "unable to zip %v", dockerFilePath)
               }
               dockerFile := base64.StdEncoding.EncodeToString(zippedDockerFileBts)
               server.SetServerArch(arch)
               return server.UploadCmd(dockerImageName, dockerFile, userName, password)
       },
}

func init() {

       UploadCmd.PersistentFlags().StringVarP(&dockerImageName, "name", "n", "", "Docker image name.")
       UploadCmd.PersistentFlags().StringVarP(&userName, "user", "u", "", "Docker Hub user ID.")
       UploadCmd.PersistentFlags().StringVarP(&password, "password", "p", "", "Docker Hub password.")
       UploadCmd.PersistentFlags().StringVarP(&arch, "arch", "", "ppc64le", "Architecture to create Docker image on.")
       UploadCmd.MarkPersistentFlagRequired("name")
       UploadCmd.MarkPersistentFlagRequired("user")
       UploadCmd.MarkPersistentFlagRequired("password")
       RootCmd.AddCommand(UploadCmd)
}
