import os from 'os'
import { LEVELS } from './levels'

export function levelNumberFn(name, args) {
  return [name, args[0]]
}

export function levelNameFn(name, args) {
  return [name, LEVELS[args[0]]]
}

export function timeIsoZFn(name) {
  return [name, new Date().toISOString()]
}

export function timeEpocFn(name) {
  return [name, new Date().getTime()]
}

export function pidFn(name) {
  return [name, process.pid]
}

export function hostFn(name) {
  return [name, os.hostname()]
}

export function msgFn(name, args) {
  return [name, args[1]]
}

export function contextFn(name) {
  return [name, 'TODO']
}
