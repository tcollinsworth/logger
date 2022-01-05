import { LogManager } from '../index'

export function start() {
  const lm = new LogManager()
  const log = lm.getLogger('foo')
  log.info('info green')
  log.warn('warn yellow')
  log.error('error red')
}
