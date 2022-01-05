import { DEFAULT_LEVEL_NAME, LEVEL_NAMES } from './levels'
import { LoggerImpl } from './logger-impl'
import {
  levelNameFn, timeIsoZFn, pidFn, hostFn, msgFn, levelNumberFn, timeEpocFn, contextFn,
} from './log-format-functions'

const state = {
  logManagers: {
    default: undefined,
  },
}

const optionsDefault = {
  name: 'default',
  defaultLevelName: DEFAULT_LEVEL_NAME,
  formatJson: true,
  colorize: false,
  logFormatFunctions: [ // or rearrange them and add custom function(s)
    { level: levelNameFn }, // levelNumberFn
    // { levelNo: levelNumberFn }, // levelNumberFn
    { time: timeEpocFn }, // timeEpocFn, timeIsoZFn
    // { timeIso: timeIsoZFn }, // timeEpocFn, timeIsoZFn
    // { pid: pidFn },
    // { host: hostFn },
    { msg: msgFn },
    // { context: contextFn },
  ],
  // recommend targeted JSON property redaction prior to serialization
  preSerializationFunctions: [],
  // if post serialization manipulation is desired, add functions here
  postSerializationFunctions: [],
  stream: process.stdout,
}

function getOptions(optionsProvided) {
  const options = JSON.parse(JSON.stringify(optionsDefault))

  // TODO merge optionsProvided into options
  options.logFormatFunctions = []
  optionsDefault.logFormatFunctions.forEach((f) => options.logFormatFunctions.push(f))
  options.preSerializationFunctions = []
  optionsDefault.preSerializationFunctions.forEach((f) => options.preSerializationFunctions.push(f))
  options.postSerializationFunctions = []
  optionsDefault.postSerializationFunctions.forEach((f) => options.postSerializationFunctions.push(f))
  options.stream = optionsDefault.stream
  return options
}

// TODO add default options and merge overrides
// TODO add ability to change stream
export class LogManager {
  constructor(options) {
    this.options = getOptions(options)
    this.loggers = {}
    this.options.defaulLevelNumber = LEVEL_NAMES[this.options.defaultLevelName]
  }

  getLogFormatFunctions() {
    return this.options.logFormatFunctions
  }

  isFormatJson() {
    return this.options.formatJson
  }

  isColorize() {
    return this.options.colorize
  }

  getLogger(name, levelName = DEFAULT_LEVEL_NAME) {
    let logger = this.loggers[name]
    if (logger == null) {
      logger = new LoggerImpl(name, levelName, this)
      this.loggers[name] = logger
    }
    return logger
  }

  getStream() { return this.options.stream }

  getLoggerNames() {
    return Object.keys(this.loggers)
  }

  getLoggerLevel(name) {
    return this.loggers[name]?.getLevel()
  }

  getLoggerNamesAndLevels() {
    const loggerNamesAndLevels = {}
    return Object.entries(this.loggers).reduce((prevValue, curValue) => {
      prevValue[curValue[0]] = curValue[1].getLevel()
      return prevValue
    }, loggerNamesAndLevels)
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
