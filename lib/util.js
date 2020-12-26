const fs = require('fs')
const os = require('os')
const p = require('path')
const config = require('config')

module.exports = {

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],

  /**
   * Format a JSON date
   *
   * @method formatDate
   * @param datetime {string}
   * @return {string}
   */
  formatDate: function(datetime) {
    const d = new Date(datetime)
    let hour

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
   * Return application path
   *
   * @method appPath
   * @param request {string}
   * @return {String}
   */
  appPath: function(req) {
    const vars = {
      // Path to JSON log file
      log: 'data/log.json',

      // Path to log file SHA
      sha: 'data/log.sha1',

      // Path to adjectves txt file
      adjectives: 'data/adjectives.txt',

      // Path to nouns txt file
      nouns: 'data/nouns.txt',

      // Mustache template
      template: 'views/log.mst',

      // CSS file
      style: 'views/style.css'
    }
    if(vars[req]) {
      return this.rootDir(vars[req])
    }
    else {
      throw Error('util.appPath (\'' + req + '\') does not exist')
    }
  },

  /**
   * Is this a number
   *
   * @method isNum
   * @param data
   * @return {bool}
   */
  isNum: function(data) {
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
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  /**
   * Return a random line from a file
   *
   * @todo Move this to a model
   *
   * @method randomFromFile
   * @param type
   * @return {string}
   */
  randomFromFile: function(type) {
    let list = fs.readFileSync(this.appPath(type))
    list = list.toString().split(os.EOL)
    return list[this.getRandomInt(0, list.length - 1)]
  },

  /**
   * Return array of JSON file
   *
   * @todo Move this to a model
   *
   * @method readLog
   * @return {array}
   */
  readLog: function() {
    let log_json = fs.readFileSync(this.appPath('log'))
    return JSON.parse(log_json)
  },

  /**
   * Write an array to a JSON file
   *
   * @todo Move this to a model
   *
   * @method writeLog
   * @param log {array}
   * @return
   */
  writeLog: function(log) {
    let log_json = JSON.stringify(log, null, config.json_spacer)
    return fs.writeFileSync(this.appPath('log'), log_json)
  }

}
