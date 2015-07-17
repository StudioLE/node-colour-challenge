sh = require('shelljs')
util = require('./util')

// Begin module
module.exports = function() {

	sh.echo('cd ' + util.rootDir() + ' && git add data/log.json && git commit -m "Latest log" && git push')

}

