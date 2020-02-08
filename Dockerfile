FROM node:12-alpine

# Copy app directory
COPY . /srv/app

# Install app dependencies
WORKDIR /srv/app
RUN npm install

# Ports
EXPOSE 80

# Launch
CMD [ "node", "lib/cli.js", "server" ]