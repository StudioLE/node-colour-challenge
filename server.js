// Core modules
fs = require('fs')
http = require('http');

// Node modules
mst = require('mustache')

// App modules
config = require('./config')
util = require('./lib/util')

// Read the current JSON log file
var log = util.readLog(config.log_json_file)

// Read the template
var template = fs.readFileSync(config.view_file)

// Render the template with colours from log
var output = mst.render(template.toString(), { colours: log });

// Create a server
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(output);
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
console.log('Close with CTRL + C')