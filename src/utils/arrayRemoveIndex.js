/* immutably removes value from array at index */

export default function arrayRemoveIndex (array, index) {
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ]
}
