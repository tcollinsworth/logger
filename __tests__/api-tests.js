import test from 'ava'
import { LogManager } from '../app/log-manager'

const lm = new LogManager('foo')
const getLog = lm.getLogFn()

test('foo', () => {
  getLog('a').info('test', 'x', 1, new Error('test'))
})
