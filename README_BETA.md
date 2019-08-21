# D4P [![Build Status](https://travis-ci.org/rai-project/dockerfile-builder.svg?branch=master)](https://travis-ci.org/rai-project/dockerfile-builder)

## Purpose

Docker for POWER (D4P) is a service to develop and deploy PowerPC Docker
containers without requiring access to a local PowerPC system.
[C3SR](https://angry-blackwell-19bd43.netlify.com/) (the Center for Cognitive
Computing Systems Research) continues to publish
[PowerPC Docker images](https://dockerfile-builder.mybluemix.net).

** Need link to jump directly to images list ** 

Users are encouraged to use this D4P service to build and contribute their own 
docker containers.

## Usage Directions

D4P offers two interfaces (webpage and commandline) with the same functionality. 
In both cases, the interface accepts one file as input, either a Docker file or zip 
file (used when multiple source files are required).

#### _Webpage_

The webpage interface is available at
[https://dockerfile-builder.mybluemix.net](https://dockerfile-builder.mybluemix.net).
Start by selecting a Docker file or zip file. After the page refreshes, you can
modify any of the uploaded files as needed (select different files with the 
_files dropdown_). When ready build the image by clicking the gear icon or 
build and push an image to docker hub by clicking the cloud icon.

If you chose the cloud icon, you will need to enter the image name
(repository/image name:tag) as well as your dockerhub credentials. Select _Push_
when ready to build and push.

** Need path to icons to display icons as opposed to text **

#### _Commandline_

The commandline version for linux, mac, and windows is available at ???. To
execute, use the following commandline syntax:

`dockerfile-builder --queue <<queue name>> upload <<path to docker or zip file>>
-n <<repository/image name:tag>> -u <<docker hub user name>>
-p <<dockerhub password>> -d -v`

Use the rai_ppc64le_d4p queue to build Power 8 images and rai_ppc64le_d4pp9 to
build Power 9 images. 

** I will need to build the commandline version automatically, embed the app
secret, and publish for different architectures.**

## References

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
