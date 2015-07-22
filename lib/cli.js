// App modules
add = require('./add')
clear = require('./clear')
server = require('./server')
forever = require('./forever')
commit = require('./commit')

// Read the 3rd command line argument
var operation = process.argv[2]

// Read the 4th command line argument
var num = process.argv[3]

if(operation == 'add') {
	add(num)
}
else if(operation == 'clear') {
	clear()
}
else if(operation == 'server') {
	server()
}
else if(operation == 'forever') {
	forever()
}
else if(operation == 'commit') {
	commit()
}
else {
	console.log('invalid operation %s', operation)
}
