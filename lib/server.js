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
	http.createServer(function(req, res) {

		function response(res, output, content_type, status) {
			// Write the headers
			res.writeHead(status =  status || 200, {
				'Content-Type': content_type || 'text/html',
				'Access-Control-Allow-Origin': '*'
			})

			// Send the result with output
			res.end(output)
			console.log(status + ' ' + req.method + ' ' + req.url)
		}

		if(req.url == '/') {

			// Read the JSON log file
			var log = util.readLog(config.log_json_file)

			// Read the template
			var template = fs.readFileSync(util.rootDir('views/log.mst'))

			// Render the template with colours from log
			var output = mst.render(template.toString(), {
				colours: log,
				google_analytics: config.google_analytics,
				formatDate: function() {
					return function(date, render) {
						return util.formatDate(render(date))
					}
				}
			})

			return response(res, output)
		}
		else if(req.url ==  '/style.css') {
			// Read the css file
			var output = fs.readFileSync(util.rootDir('views/style.css'))
			return response(res, output, 'text/css')
		}
		else if(req.url ==  '/json') {
			// Read the JSON log file
			var output = fs.readFileSync(util.rootDir(config.log_json_file))
			return response(res, output, 'text/json')
		}
		else {
			return response(res, '404 Page Not Found', 'text/html', 404)
		}
		
	}).listen(config.server_port, config.server_address);

	console.log('Server running at http://%s:%s/', config.server_address, config.server_port);
	console.log('Close with CTRL + C')
}
