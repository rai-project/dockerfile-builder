package cmd

import (
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	"github.com/Unknwon/com"
	"github.com/fatih/color"
	homedir "github.com/mitchellh/go-homedir"
	"github.com/rai-project/config"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	isDebug      bool
	isVerbose    bool
	appSecret    string
	jobQueueName string
)

// RootCmd represents the base command when called without any subcommands
var RootCmd = &cobra.Command{
	Use:   "dockerfile-builder",
	Short: "A brief description of your application",
	Long: `A longer description that spans multiple lines and likely contains
examples and usage of using your application. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	//	Run: func(cmd *cobra.Command, args []string) { },
}

// Execute adds all child commands to the root command sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := RootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(-1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	RootCmd.PersistentFlags().BoolVarP(&isVerbose, "verbose", "v", false, "Toggle verbose mode.")
	RootCmd.PersistentFlags().BoolVarP(&isDebug, "debug", "d", false, "Toggle debug mode.")
	RootCmd.PersistentFlags().StringVarP(&appSecret, "secret", "s", "", "The application secret.")
	RootCmd.PersistentFlags().StringVarP(&jobQueueName, "queue", "q", "", "Name of the job queue. Infers queue from build file by default.")

	// mark secret flag hidden
	RootCmd.PersistentFlags().MarkHidden("secret")

	// Cobra also supports local flags, which will only run
	// when this action is called directly.
	RootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")

	viper.BindPFlag("app.secret", RootCmd.PersistentFlags().Lookup("secret"))
	viper.BindPFlag("app.debug", RootCmd.PersistentFlags().Lookup("debug"))
	viper.BindPFlag("app.verbose", RootCmd.PersistentFlags().Lookup("verbose"))
	viper.BindPFlag("dockerbuilder.broker_queue_name", RootCmd.PersistentFlags().Lookup("queue"))
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	color.NoColor = false
	opts := []config.Option{
		config.AppName("dockerfile-builder"),
		config.ColorMode(true),
		config.ConfigString(_escFSMustString(false, "/.dockerfile_builder_config.yml")),
	}
	if appSecret == "" {
		if secretFile, err := homedir.Expand("~/.rai_secret"); err == nil && com.IsFile(secretFile) {
			if bts, err := ioutil.ReadFile(secretFile); err == nil {
				appSecret = strings.TrimSpace(string(bts))
			}
		}
	}
	if appSecret != "" {
		opts = append(opts, config.AppSecret(appSecret))
	}
	config.Init(opts...)
}
