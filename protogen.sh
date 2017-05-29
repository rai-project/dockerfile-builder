#!/bin/bash

mkdir -p ./proto/build/ts/_proto
mkdir -p ./proto/build/go/_proto

protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --plugin=protoc-gen-go=${GOPATH}/bin/protoc-gen-go \
  -I ./proto \
  --js_out=import_style=commonjs,binary:./proto/build/ts/_proto \
  --js_service_out=./proto/build/ts/_proto \
  --go_out=plugins=grpc:./proto/build/go/_proto \
  --ts_out=service=true:./proto/build/ts/_proto \
  ./proto/raiprojectcom/docker/build_service.proto
