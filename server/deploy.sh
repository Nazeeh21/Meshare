#!/bin/bash

echo What should be the version?
read VERSION

docker build -t nazeeh2000/meshare:$VERSION .
docker push nazeeh2000/meshare:$VERSION

ssh root@139.59.74.235 "docker pull nazeeh2000/meshare:$VERSION && docker tag nazeeh2000/meshare:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"