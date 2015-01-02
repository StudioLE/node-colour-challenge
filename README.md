# Colour Code Challenge

The aim of the colour challenge is to create a script to randomly generate an RGB colour every hour and programmatically name it with an adjective + noun.

The challenge was created as a way to compare the syntax between languages with a commonly themed application.

## Node.js Colour Challenge

A Node.js response to the colour code challenge.

This version is written in [Node.js](http://nodejs.org/) and available as a package to download from [NPM](https://www.npmjs.com/)

### Installation

Using NPM (CURRENTLY UNSUPPORTED)

- `npm install -g node-colour-challenge`

Manual

- Download the [latest zip from GitHub](https://github.com/StudioLE/node-colour-challenge/archive/master.zip) and extract to a clean directory

### Usage

Add a single colour to the log

- `node colour-challenge add`

Add multiple colours to the log

- `node colour-challenge add 10`

Spin up a server to view the logs

- `node colour-challenge server`

Clear all previous logs

- `node colour-challenge clear`

### Methodology

The application follows MVC principles:

- All data is read and written through functions within the util module `./lib/util.js`. The data is stored within a JSON file.
- The view is located at `./views/log.mst` written in HTML5 using mustache templating
- Three controllers provide the operations, these are `./lib/add.js`, `./lib/server.js` and `./lib/clear.js`

Each operation is accessed through `./colour-challenge.js` which acts as the command line interface.

To log the data hourly `node colour-challenge add` should be defined as a cron job and the server can either be spun up when required or could be kept running constantly using a package such as [forever](https://github.com/foreverjs/forever).
