// App modules
config = require('config')
util = require('./util')

// Begin module
module.exports = function(num) {

	// If it's nota number assume 1
	if( ! util.isNum(num)) {
		num = 1	
	}

	console.log('Adding %s entries to log', num)

	// Read the current JSON log file
	var log = util.readLog()

	// Create as many entries as num
	for(var i = 1; i <= num; i ++) {

		// Get the current datetime
		var date = new Date()

		// Create a log entry
		var color = {
			// Random int between 0 & 255
			r: util.getRandomInt(0, 255),
			g: util.getRandomInt(0, 255),
			b: util.getRandomInt(0, 255),
			// Random line from file
			adj: util.randomFromFile('adjectives'),
			noun: util.randomFromFile('nouns'),
			// JSON timestamp
			created_at: date.toJSON()
		}

		// Output the entry to the console
		console.log(color)

		// Add color to the log array
		log.unshift(color)

	}

	// Write the log array to the JSON file
	util.writeLog(log)
}
