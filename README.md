# Colour Code Challenge

The aim of the colour challenge is to create a script to randomly generate an RGB colour every hour and programmatically name it with an adjective + noun.

The challenge was created as a way to compare the syntax between languages with a commonly themed application.

## Node.js Colour Code Challenge

This version is written in [Node.js](http://nodejs.org/) and available as a package to download from [NPM](https://www.npmjs.com/).

### Methodology

The application follows MVC principles:

- All data is read and written through functions within the util module `./lib/util.js`. The data is stored within a JSON file.
- The view is located at `./views/log.mst` written in HTML5 using mustache templating
- Three controllers provide the operations, these are `./lib/add.js`, `./lib/server.js` and `./lib/clear.js`

Each operation is accessed through `./colour-challenge.js` which acts as the command line interface.

To log the data hourly `node colour-challenge add` should be defined as a cron job and the server can either be spun up when required or could be kept running constantly using a package such as [forever](https://github.com/foreverjs/forever).

### Installation

The application requires Node.js and npm to be installed, instructions can be found at [nodejs.org](http://nodejs.org/). Then follow one of the three methods below to download the application.

##### Git Clone
```
git clone https://github.com/StudioLE/node-colour-challenge.git colour-challenge
cd colour-challenge
npm update
```

##### NPM (CURRENTLY UNSUPPORTED)
```
npm install -g node-colour-challenge
```

##### Manual

- Download the [latest zip from GitHub](https://github.com/StudioLE/node-colour-challenge/archive/master.zip) and extract to a clean directory
- Then run `npm update` within the directory

### Usage

Add a single colour to the log
```
node colour-challenge add
```

Add multiple colours to the log
```
node colour-challenge add 10
```

Spin up a server to view the logs
```
node colour-challenge server
```

Clear all previous logs
```
node colour-challenge clear
```

### Cron Setup

To run the script on the hour every hour you will want to configure a cron job similar to the following:

```
0 * * * * node /path/to/colour-challenge.js add
```

## Participate

Now you've seen how it's done why don't you take a shot in the language of your own choice? Or perhaps there's a framework you've been dying to try out? Give it a go and send us a link to your repository. The challenge is great for participants of all levels of experience.
