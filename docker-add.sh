#!/bin/bash

container=colourchallenge

# Docker exec
docker exec $container sh -c "node /srv/app/lib/cli add"
