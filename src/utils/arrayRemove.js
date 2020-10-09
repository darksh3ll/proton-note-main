import arrayRemoveIndex from './arrayRemoveIndex'

/*
 * immutably removes a value from an array
 */

export default function arrayRemove (array, value) {
  const index = array.indexOf(value)

  return arrayRemoveIndex(array, index)
}
