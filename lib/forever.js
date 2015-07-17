sh = require('shelljs')

// Begin module
module.exports = function() {

	sh.echo('Launching server forever')
	sh.exec('forever start -al colour-challenge/forever.log colour-challenge.js server')

}
