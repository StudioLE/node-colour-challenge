// Core modules
fs = require('fs')
os = require('os')

// Begin module
module.exports = {
	
	/**
	 * Is this a number
	 * 
	 * @method isNum
	 * @param data
	 * @return {bool}
	 */
	isNum: function (data) {
		return ( ! isNaN(data) && (data % 1) === 0)
	},

	/**
	 * Pick a random integer from a range
	 * 
	 * @method getRandomInt
	 * @param min {int}
	 * @param max {int}
	 * @return random number {int}
	 */
	getRandomInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	/**
	 * Return a random line from a file
	 *
	 * @todo Move this to a model
	 * 
	 * @method randomFromFile
	 * @param file_name
	 * @return {string}
	 */
	randomFromFile: function(file_name) {
		list = fs.readFileSync(file_name)
		list = list.toString().split(os.EOL)
		return list[this.getRandomInt(0, list.length)]
	},

	/**
	 * Return array of JSON file
	 *
	 * @todo Move this to a model
	 * 
	 * @method readLog
	 * @param file_name {string}
	 * @return {array}
	 */
	readLog: function (file_name) {
		log_json = fs.readFileSync(file_name)
		return JSON.parse(log_json)
	},

	/**
	 * Write an array to a JSON file
	 *
	 * @todo Move this to a model
	 * 
	 * @method writeLog
	 * @param file_name {string}
	 * @param log {array}
	 * @return 
	 */
	writeLog: function (file_name, log) {
		log_json = JSON.stringify(log)
		return fs.writeFileSync(file_name, log_json)
	}
}