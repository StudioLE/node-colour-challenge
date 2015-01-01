// App modules
config = require('./config')
util = require('./lib/util')

// Read the 3rd command line argument
var num = process.argv[2]

// If it's nota number assume 1
if( ! util.isNum(num)) {
	num = 1	
}

console.log('Adding %s entries to log', num)

// Read the current JSON log file
var log = util.readLog(config.log_json_file)

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
		adj: util.randomFromFile(config.adjectives_file),
		noun: util.randomFromFile(config.nouns_file),
		// JSON timestamp
		created_at: date.toJSON()
	}

	// Output the entry to the console
	console.log(color)

	// Add color to the log array
	log.unshift(color)

}

// Write the log array to the JSON file
util.writeLog(config.log_json_file, log)