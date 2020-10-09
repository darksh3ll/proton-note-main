/* immutably removes value at key off of object */

export default function objectDelete (object, key) {
  const { [ key ]: deleted, ...remaining } = object

  return remaining
}
