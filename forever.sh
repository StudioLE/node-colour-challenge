#!/bin/bash

echo "Launching server forever"
forever start -al colour-challenge/forever.log colour-challenge.js server
