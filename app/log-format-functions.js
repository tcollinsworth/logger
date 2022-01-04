import os from 'os'
import { LEVELS } from './levels'

export function levelNumberFn(...args) {
  return { level: args[0] }
}

export function levelNameFn(...args) {
  return { level: LEVELS[args[0]] }
}

export function timeIsoZFn() {
  return { timeIso: new Date().toISOString() }
}

export function timeEpocFn() {
  return { time: new Date().getTime() }
}

export function pidFn() {
  return { pid: process.pid }
}

export function hostFn() {
  return { host: os.hostname }
}

export function msgFn() {

}

export function contextFn() {

}
