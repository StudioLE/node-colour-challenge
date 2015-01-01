// App modules
config = require('../config')
util = require('./util')

// Begin module
module.exports = function(callback) {
	
	// Write an empty array to the JSON log
	util.writeLog(config.log_json_file, [])
}