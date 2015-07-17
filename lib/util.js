// Core modules
fs = require('fs')
os = require('os')
p = require('path')

// App modules
config = require('config')

// Begin module
module.exports = {

	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

	months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

	/**
	 * Format a JSON date
	 * 
	 * @method formatDate
	 * @param datetime {string}
	 * @return {string}
	 */
	 formatDate: function(datetime) {
		d = new Date(datetime)

		if(d.getHours() == 0) {
			hour = '12 am'
		}
		else if(d.getHours() == 12) {
			hour = ' 12 pm'
		}
		else if(d.getHours() < 12) {
			hour = d.getHours() + ' am'
		}
		else {
			hour = d.getHours() - 12 + ' pm'
		}

		return [
			hour + config.date_separator,
			this.days[d.getDay()],
			this.months[d.getMonth()],
			d.getDate() + config.date_separator,
			d.getFullYear()
		].join(' ')
	},
	
	/**
	 * Prepend the root directory to a path
	 * 
	 * @method rootDir
	 * @param path {string}
	 * @return {string}
	 */
	rootDir: function(path) {
		if(path == undefined) {
			path = ''
		}
		return p.resolve(__dirname, '../', path)
	},
	
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
		list = fs.readFileSync(this.rootDir(file_name))
		list = list.toString().split(os.EOL)
		return list[this.getRandomInt(0, list.length - 1)]
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
		log_json = fs.readFileSync(this.rootDir(file_name))
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
		log_json = JSON.stringify(log, null, config.json_spacer)
		return fs.writeFileSync(this.rootDir(file_name), log_json)
	}
}
