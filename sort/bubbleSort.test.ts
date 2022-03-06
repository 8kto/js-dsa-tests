/**
 * Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list,
 * compares adjacent elements and swaps them if they are in the wrong order.
 * The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort,
 * is named for the way smaller or larger elements "bubble" to the top of the list.
 * This simple algorithm performs poorly in real world use and is used primarily as an educational tool.
 * More efficient algorithms such as quicksort, timsort, or merge sort are used by the sorting libraries
 * built into popular programming languages such as Python and Java.
 *
 * Bubble sort has a worst-case and average complexity of O(n^2), where n is the number of items being sorted.
 * Most practical sorting algorithms have substantially better worst-case or average complexity,
 * often O(n log n). Even other O(n^2) sorting algorithms, such as insertion sort,
 * generally run faster than bubble sort, and are no more complex.
 * Therefore, bubble sort is not a practical sorting algorithm.
 */

const bubbleSort = (arr: number[]): number[] => {
  let isSorted

  while (!isSorted) {
    isSorted = true

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i + 1]) {
        isSorted = false
        ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
  }

  return arr
}

describe('bubble sort', () => {
  it('sorts simple stuff', () => {
    expect(bubbleSort([2, 1])).toEqual([1, 2])
  })

  it('sorts valid input', () => {
    expect(bubbleSort([2, -1, 1000, 0, 14004, 0, -25, 2])).toEqual([
      -25, -1, 0, 0, 2, 2, 1000, 14004,
    ])
  })

  it('handles sorted arrays', () => {
    expect(bubbleSort([-10, -1, 0, 0.5, 1, 10])).toEqual([
      -10, -1, 0, 0.5, 1, 10,
    ])
  })
})

export {}
