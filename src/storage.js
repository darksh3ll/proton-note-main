/*
 * a small localStorage proxy for to persist localStorage
 * contents in runtime memory after first access in order
 * to save performance on JSON-parsing and instead remember
 * how any localStorage item was modified after first access
 *
 * a memoized virtual localStorage if you will
 */
const currentLocalStorage = {}

export function setItem (key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}

export function getItem (key) {
  if (currentLocalStorage[key]) { return currentLocalStorage[key] }

  return JSON.parse(localStorage.getItem(key))
}
