// App modules
add = require('./lib/add')
server = require('./lib/server')
clear = require('./lib/clear')

// Read the 3rd command line argument
var operation = process.argv[2]

// Read the 4th command line argument
var num = process.argv[3]

if(operation == 'add') {
	add(num, function() {
	})
}
else if(operation == 'server') {
	server(function() {
	})

}
else if(operation == 'clear') {
	clear(function() {
	})
}
else {
	console.log('invalid operation %s', operation)
}