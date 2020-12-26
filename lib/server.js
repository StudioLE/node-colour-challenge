const fs = require('fs')
const http = require('http')
const mst = require('mustache')
const config = require('config')
const util = require('./util')

// Begin module
module.exports = function() {

  // Create a server
  http.createServer(function(req, res) {

    const response = (res, output, content_type, status) => {
      // Write the headers
      res.writeHead(status = status || 200, {
        'Content-Type': content_type || 'text/html',
        'Access-Control-Allow-Origin': '*'
      })

      // Send the result with output
      res.end(output)
      console.log(status + ' ' + req.method + ' ' + req.url)
    }

    let output

    if(req.url == '/') {
      // Read the JSON log file
      let log = util.readLog()

      // Read the template
      let template = fs.readFileSync(util.appPath('template'))

      // Render the template with colours from log
      output = mst.render(template.toString(), {
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
    else if(req.url == '/style.css') {
      // Read the css file
      output = fs.readFileSync(util.appPath('style'))
      return response(res, output, 'text/css')
    }
    else if(req.url == '/json') {
      // Read the JSON log file
      output = fs.readFileSync(util.appPath('log'))
      return response(res, output, 'text/json')
    }
    else {
      return response(res, '404 Page Not Found', 'text/html', 404)
    }

  }).listen(config.server_port, config.server_address)

  console.log('Server running at http://%s:%s/', config.server_address, config.server_port)
  console.log('Close with CTRL + C')
}
