// Core modules
fs = require('fs')
http = require('http')

// Node modules
mst = require('mustache')

// App modules
config = require('../config')
util = require('./util')

// Begin module
module.exports = function(callback) {

	// Create a server
	http.createServer(function (req, res) {

		// Status unless stated otherwise
		var status = 200

		// Content type unless otherwise stated
		var content_type = 'text/html'

		if(req.url == '/') {
			// Read the current JSON log file
			var log = util.readLog(config.log_json_file)

			// Read the template
			var template = fs.readFileSync(util.rootDir(config.view_file))

			// Render the template with colours from log
			var output = mst.render(template.toString(), { colours: log })
		}
		else if(req.url ==  '/style.css') {
			// Read the css file
			var output = fs.readFileSync(util.rootDir(config.style_file))

			// Set content_type
			var content_type = 'text/css'
		}
		else {
			// Read the css file
			var output = '404 Page Not Found'

			// Change status
			var status = 404
		}

		// Write the headers
		res.writeHead(status, {'Content-Type': content_type})

		// Send the result with output
		res.end(output)
		
	}).listen(config.server_port, config.server_address);

	console.log('Server running at http://%s:%s/', config.server_address, config.server_port);
	console.log('Close with CTRL + C')
}