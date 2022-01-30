/**
 The time complexity of the Binary Search is O(log2n), where n is the number of elements in the array.
 This is far better compared to the Linear Search, which is of time complexity O(n).
 Like many other search algorithms, Binary Search is an in-place algorithm.
 That means that it works directly on the original array without making any copies.

 We have to keep in mind however, that Binary Search only works on sorted arrays.
 The sorting step itself, if using an efficient sorting algorithm, has a complexity of O(nlogn).
 This means that in most cases, if the array is small, or if we need to search it only once,
 a brute-force (e.g. Linear Search) algorithm might be better.

 Given this, Binary Search really shines when we need to make repeated searches on large arrays.

 @url https://stackabuse.com/binary-search-in-javascript/
 */
export function binarySearch<T = unknown>(sortedArray: T[], key: T): number {
  let start = 0
  let end = sortedArray.length - 1

  while (start <= end) {
    const middle = Math.floor((start + end) / 2)

    if (sortedArray[middle] === key) {
      // found the key
      return middle
    } else if (sortedArray[middle] < key) {
      // continue searching to the right
      start = middle + 1
    } else {
      // search searching to the left
      end = middle - 1
    }
  }

  // key wasn't found
  return -1
}
