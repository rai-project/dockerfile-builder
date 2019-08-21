# D4P [![Build Status](https://travis-ci.org/rai-project/dockerfile-builder.svg?branch=master)](https://travis-ci.org/rai-project/dockerfile-builder)

## Purpose

Docker for POWER (D4P) is a service for anyone to develop and deploy PowerPC Docker
images without access to a local PowerPC system.

The service was developed by the [IBM-ILLINOIS Center for Cognitive Computing Systems Research (C3SR)](https://angry-blackwell-19bd43.netlify.com/), and is continuously used by the C3SR center to publish various
[PowerPC Docker images](https://dockerfile-builder.mybluemix.net) for the community. To see a list of docker images built by C3SR using the D4P service, please click the "Images" link on the top left of the [D4P webpage](https://dockerfile-builder.mybluemix.net).

Users are encouraged to use this D4P service to build and contribute their own 
docker images.

## Usage Directions

D4P offers two interfaces (webpage and commandline) with the same functionality. 
In both cases, the interface accepts one file as input, either a Dockerfile or a zipped 
file. In the zipped file, there must be a Dockerfile at its top level with optional files
or directories as referenced by the Dockerfile. This is useful for Dockerfile that require multiple source files.

#### _Webpage_

The webpage interface is available at
[https://dockerfile-builder.mybluemix.net](https://dockerfile-builder.mybluemix.net).
Start by uploading a Dockerfile or zip file from users local computing devices. After the page refreshes, the webpage will display the Dockerfile that  users just uploaded. Users can then freely
edit/modify through the web interface any of the uploaded files as needed (select different files with the 
_files dropdown_ menu on the top left of the editing window). 

When ready, users can build the image by clicking the "gear" icon on the top right of the editing window to 
build the docker images. The output from the building process will be displayed to the web interface as it builts. When it's finished, users can close the output window by click the "cross" icon on the top right of the display window.

Users are now ready to push the aforementioned built image to docker hub by clicking the "cloud" icon on the top right of the editing window. After choosing the "cloud" icon, users are required to enter the image name
(repository/image name:tag) as well as users' dockerhub credentials. After that, users can Select _Push_
button to push the built image to the docker hub.

** Need to add icons images along side to text **

#### _Commandline_

The commandline version for linux, mac, and windows is available at ???. To
execute, use the following commandline syntax:

`dockerfile-builder --queue <<queue name>> upload <<path to docker or zip file>>
-n <<repository/image name:tag>> -u <<docker hub user name>>
-p <<dockerhub password>> -d -v`

** Please add the description of each option above **

Use the rai_ppc64le_d4p queue to build Power 8 images and rai_ppc64le_d4pp9 to
build Power 9 images. 

** I will need to build the commandline version automatically, and publish for different architectures.**


