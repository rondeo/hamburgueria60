#!/bin/bash

NPM_CONFIG_PREFIX=/home/node/.npm-global
PATH=$PATH:/home/node/.npm-global/bin

cp -r /usr/cache/node_modules/. /usr/app/node_modules/

echo "Installing and running"

pm2-runtime /usr/app/server/server.js