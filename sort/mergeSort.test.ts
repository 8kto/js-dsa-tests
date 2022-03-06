/**
 * In computer science, merge sort (also commonly spelled as mergesort) is an efficient,
 * general-purpose, and comparison-based sorting algorithm.
 * Most implementations produce a stable sort, which means that the order of equal elements
 * is the same in the input and output.
 * Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945
 *
 * Conceptually, a merge sort works as follows:
 * Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).
 * Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.
 *
 * O(n log(n))
 */
const merge = (left: number[], right: number[]): number[] => {
  const res = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      res.push(left.shift())
    } else {
      res.push(right.shift())
    }
  }

  //@ts-ignore
  return res.concat(left).concat(right)
}

const mergeSort = (arr: number[]): number[] => {
  if (arr.length < 2) return arr

  const middle = Math.floor(arr.length / 2)
  const left = arr.splice(0, middle)

  return merge(mergeSort(left), mergeSort(arr))
}

describe('merge sort', () => {
  it('sorts simple stuff', () => {
    expect(mergeSort([2, 1])).toEqual([1, 2])
  })

  it('sorts valid input', () => {
    expect(mergeSort([2, -1, 1000, 0, 14004, 0, -25, 2])).toEqual([
      -25, -1, 0, 0, 2, 2, 1000, 14004,
    ])
  })

  it('handles sorted arrays', () => {
    expect(mergeSort([-10, -1, 0, 0.5, 1, 10])).toEqual([
      -10, -1, 0, 0.5, 1, 10,
    ])
  })

  it('sorts floats', () => {
    expect(mergeSort([0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434])).toEqual([
      0.1234, 0.3434, 0.565, 0.656, 0.665, 0.897,
    ])
  })
})

export {}
