// App modules
config = require('./config')
util = require('./lib/util')

// Write an empty array to the JSON log
util.writeLog(config.log_json_file, [])