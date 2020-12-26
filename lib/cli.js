const add = require('./add')
const clear = require('./clear')
const server = require('./server')

// Read the 3rd command line argument
let operation = process.argv[2]

// Read the 4th command line argument
let num = process.argv[3]

if(operation == 'add') {
  add(num)
}
else if(operation == 'clear') {
  clear()
}
else if(operation == 'server') {
  server()
}
else {
  console.log('invalid operation %s', operation)
}
