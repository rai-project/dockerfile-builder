//go:generate go get github.com/mjibson/esc
//go:generate esc -o cmd/static_content.go -pkg cmd -private ./.dockerfile_builder_config.yml

//DISABLED go:generate esc -o server/static_content.go -pkg server -private ./server/rai_build.template

package main
