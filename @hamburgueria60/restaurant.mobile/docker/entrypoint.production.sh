#!/bin/bash

NPM_CONFIG_PREFIX=/home/node/.npm-global
PATH=$PATH:/home/node/.npm-global/bin

cp -r /usr/cache/node_modules/. /usr/app/node_modules/

echo "Installing and running"
npm run build
serve -s /usr/app/build
