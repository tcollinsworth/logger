import { LEVEL_NAMES, DEFAULT_LEVEL_NAME } from './levels'
import { LoggerImpl } from './logger-impl'

const state = {
  logManagers: {
    default: undefined,
  },
}

// json & prettyPrint flags
// color flags
export class LogManager {
  constructor(name, levelName = DEFAULT_LEVEL_NAME) {
    this.name = name
    this.loggers = {}
    this.formatJson = true
    this.colorize = false
    this.timeFormatIso = false // true ISO8601 Z, false epocMs
    this.defaulLevelNumber = LEVEL_NAMES[levelName]
  }

  isFormatJson() { return this.formatJson }

  isColorize() { return this.colorize }

  isTimeFormatIso() { return this.timeFormatIso }

  getLogger(name, levelName = DEFAULT_LEVEL_NAME) {
    let logger = this.loggers[name]
    if (logger == null) {
      logger = new LoggerImpl(name, levelName, this)
      this.loggers[name] = logger
    }
    return logger
  }

  getLoggerNames() { return Object.keys(this.loggers) }

  getLoggerLevel(name) { return this.loggers[name]?.getLevel() }

  getLoggerNamesAndLevels() {
    const loggerNamesAndLevels = {}
    return Object.entries(this.loggers).reduce((prevValue, curValue) => { prevValue[curValue[0]] = curValue[1].getLevel(); return prevValue }, loggerNamesAndLevels)
  }

  setLoggerLevel(loggerName, levelName) {
    const logger = this.loggers[loggerName]
    if (logger == null) return
    logger.setLevel(levelName)
  }
}

export function getLogManager(name = 'default') {
  let lm = state.logManagers[name]
  if (lm == null) {
    lm = new LogManager(name)
    state.logManagers[name] = lm
  }
  return lm
}
