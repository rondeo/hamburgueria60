FROM node:10-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Create and define the node_modules's cache directory.
RUN mkdir /usr/cache
WORKDIR /usr/cache

# Install the application's dependencies into the node_modules's cache directory.
COPY package*.json ./
RUN npm install --quiet

# Create and define the application's working directory.
RUN mkdir /usr/app
WORKDIR /usr/app
