export function quickSortLists(array) {
  if (array.length <= 1) {
    return array
  }

  const pivot = array[0]
  const left = []
  const right = []

  for (let i = 1; i < array.length; i++) {
    array[i] < pivot ? left.push(array[i]) : right.push(array[i])
  }

  return quickSortLists(left).concat(pivot).concat(quickSortLists(right))
}

export function quickSortF(arr) {
  // Base case
  if (!arr.length) return []

  // This is a ES6 addition, it uses destructuring to pull out the
  // first value and the rest, similar to how other functional languages
  // such as Haskell, Scala do it. You can then use the variables as
  // normal below
  const [head, ...tail] = arr,
    // here we are using the arrow functions, and taking full
    // advantage of the concise syntax, the verbose version of
    // function(e) => { return e < head } is the same thing
    // so we end up with the partition part, two arrays,
    // one smaller than the pivot and one bigger than the
    // pivot, in this case is the head variable
    left = tail.filter(e => e < head),
    right = tail.filter(e => e >= head)

  // this is the conquer bit of divide-and-conquer
  // recursively run through each left and right array
  // until we hit the if condition which returns an empty
  // array. These results are all connected using concat,
  // and we get our sorted array.
  return quickSortF(left).concat(head, quickSortF(right))
}
