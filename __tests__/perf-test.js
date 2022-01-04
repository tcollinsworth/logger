import test from 'ava'
import delay from 'delay'

import { LogManager } from '../app/log-manager'

test('perf', async (t) => {
  const lm = new LogManager('test')
  const log = lm.getLogger('foo')
  // console.log(lm.getLoggerLevel('foo'))
  // console.log(lm.getLoggerNamesAndLevels())
  // process.exit(-1)
  const stopTs = new Date().getTime() + 1000
  let i = 0
  while (new Date().getTime() < stopTs) {
    log.info('foo', { hello: 'world' }, 'bar')
    ++i
  }
  t.truthy(60000 / i < 0.2)
  await delay(5000)
  log.info(i, 60000 / i)
  await delay(100)
})
