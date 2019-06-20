FROM node:10

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm install -g pm2

# Create and define the node_modules's cache directory.
RUN mkdir /usr/cache
WORKDIR /usr/cache

# Install the application's dependencies into the node_modules's cache directory.
COPY package*.json ./
RUN npm ci --quiet

# Create and define the application's working directory.
RUN mkdir /usr/app
WORKDIR /usr/app
