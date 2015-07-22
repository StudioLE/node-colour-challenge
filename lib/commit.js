//Core modules
fs = require('fs')

// Node modules
config = require('config')
GitHubApi = require('github')
_ = require('lodash')

// App modules
util = require('./util')

github = new GitHubApi({
	version: '3.0.0'
})

github.authenticate({
	type: 'basic',
	username: config.github.username,
	password: config.github.password
})

// Begin module
module.exports = function() {

	// Get the latest log
	var log = fs.readFileSync(util.appPath('log'))
	var sha = fs.readFileSync(util.appPath('sha'), 'utf-8')

	// Convert log to base64
	log = new Buffer(log).toString('base64')

	// PUT data/log.json to GitHub
	github.repos.updateFile(_.defaults({
		path: 'data/log.json',
		sha: sha,
		content: log,
	}, config.github.repo), function(err, res) {

		if(err && err.message.substr(0, 40) == '{"message":"data/log.json does not match') {
			console.log('Autocommit failed - SHA does not match')
			console.log('Repository has likely been updated by another source and we don\'t want to overwrite it.')
		}
		else if(err) {
			throw err
		}
		else {
			// Update log.sha1
			fs.writeFileSync(util.appPath('sha'), res.content.sha)
			console.log('Pushed data/log.json to repository')
		}
	})

}
