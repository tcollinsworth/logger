import test from 'ava'
import delay from 'delay'

import { LogManager } from '../app/log-manager'

const runTime = 1000

test('perf', async (t) => {
  const lm = new LogManager()
  const log = lm.getLogger('foo')
  // console.log(lm.getLoggerLevel('foo'))
  // console.log(lm.getLoggerNamesAndLevels())
  // process.exit(-1)
  const stopTs = new Date().getTime() + runTime
  let i = 0
  while (new Date().getTime() < stopTs) {
    log.error('foo', { hello: 'world' }, 'bar')
    ++i
  }
  t.truthy(runTime / i < 0.2)
  await delay(5000)
  console.log(i, 60000 / i)
  await delay(100)
})
