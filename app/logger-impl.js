import chalk from 'chalk'
import { LEVEL_NAMES, LEVELS } from './levels'

export class LoggerImpl {
  constructor(name, levelName, logManager) {
    this.name = name
    this.levelNumber = LEVEL_NAMES[levelName]
    this.logManager = logManager
  }

  getName() { return this.name }

  getLevel() { return LEVELS[this.levelNumber] }

  setLevel(levelName) { this.levelNumber = LEVEL_NAMES[levelName] }

  isLevelEnabled(levelName) { return this.levelNumber <= LEVEL_NAMES[levelName] }

  silent(...args) {
    if (this.levelNumber > 70) return
    this._log(70, args)
  }

  fatal(...args) {
    if (this.levelNumber > 60) return
    this._log(60, args)
  }

  error(...args) {
    if (this.levelNumber > 50) return
    this._log(50, args)
  }

  warn(...args) {
    if (this.levelNumber > 40) return
    this._log(40, args)
  }

  info(...args) {
    if (this.levelNumber > 30) return
    this._log(30, args)
  }

  debug(...args) {
    if (this.levelNumber > 20) return
    this._log(20, args)
  }

  trace(...args) {
    if (this.levelNumber > 10) return
    this._log(10, args)
  }

  // log all args
  // log top level errors anywhere
  // log error nested top level errors recursively, stopping on loops
  _log(...args) {
    // console.log(LEVELS[arguments[0]], new Date().toISOString() , ...arguments[1])

    const logProps = {}
    this.logManager.getLogFormatFunctions().reduce((prevVal, curVal) => {
      const entry = Object.entries(curVal)[0]
      const result = entry[1](entry[0], args)
      const [name, value] = result
      prevVal[name] = value
      return prevVal
    }, logProps)

    // console.log(logProps)

    let outputStr
    if (this.logManager.isFormatJson()) {
      outputStr = JSON.stringify(logProps)
    } else {
      // TODO need format options to optionally include name and comma
      // outputStr = `${LEVELS[levelNumber]}, ${time}, ${JSON.stringify(args[1])}`
      outputStr = `${logProps.level} ${logProps.time} ${JSON.stringify(logProps.msg)}`
    }

    if (this.logManager.isColorize()) {
      const levelNumber = args[0]
      if (levelNumber >= 50) {
        outputStr = chalk.red(outputStr)
      } else if (levelNumber === 40) {
        outputStr = chalk.yellow(outputStr)
      } else if (levelNumber === 30) {
        outputStr = chalk.green(outputStr)
      }
    }

    this._writeLine(outputStr)
  }

  _writeLine(output) {
    if (output != null) this.logManager.getStream().write(output)
    this.logManager.getStream().write('\n')
  }
}

// process.pid
// os.hostname() // import os from 'os'

// const logJson = {
//     level: 'info',
//     time: 1641238457960, // optional format to ISO8601 with zone
//     // pid: 27831, // optional
//     // hostname: 'troy-x360', // optional
//     metadata: {}, // optional includes logger name, context, i.e., x-request-id, orgId, userId, etc.
//     message: []
// }
