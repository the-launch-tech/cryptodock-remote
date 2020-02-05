export default function(arr, key, val) {
  return arr.map(el => el[key]).indexOf(val)
}
