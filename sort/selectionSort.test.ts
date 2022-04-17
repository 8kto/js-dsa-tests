/**
 * In computer science, selection sort is an in-place comparison sorting algorithm.
 * It has an O(n^2) time complexity, which makes it inefficient on large lists,
 * and generally performs worse than the similar insertion sort.
 *
 * Selection sort is noted for its simplicity and has performance advantages over more complicated algorithms
 * in certain situations, particularly where auxiliary memory is limited.
 *
 * The algorithm divides the input list into two parts: a sorted sublist of items
 * which is built up from left to right at the front (left) of the list and a sublist
 * of the remaining unsorted items that occupy the rest of the list.
 * Initially, the sorted sublist is empty and the unsorted sublist is the entire input list.
 * The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist,
 * exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order),
 * and moving the sublist boundaries one element to the right.
 *
 * One thing which distinguishes selection sort from other sorting algorithms is
 * that it makes the minimum possible number of swaps, n − 1 in the worst case.
 *
 * O(n^2)
 */
export const selectionSort = (arr: number[]): number[] => {
  const sorted = []

  const findMinIndex = (array: number[]) => {
    let minIndex = 0
    let min = array[minIndex]

    for (let i = 1; i < array.length; i++) {
      if (array[i] < min) {
        min = array[i]
        minIndex = i
      }
    }

    return minIndex
  }

  while (arr.length) {
    const minIndex = findMinIndex(arr)
    sorted.push(arr[minIndex])
    arr.splice(minIndex, 1)
  }

  return sorted
}

describe('selection sort', () => {
  it('sorts simple stuff', () => {
    expect(selectionSort([2, 1])).toEqual([1, 2])
  })

  it('sorts valid input', () => {
    expect(selectionSort([2, -1, 1000, 0, 14004, 0, -25, 2])).toEqual([
      -25, -1, 0, 0, 2, 2, 1000, 14004,
    ])
  })

  it('handles sorted arrays', () => {
    expect(selectionSort([-10, -1, 0, 0.5, 1, 10])).toEqual([
      -10, -1, 0, 0.5, 1, 10,
    ])
  })

  it('sorts floats', () => {
    expect(selectionSort([0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434])).toEqual(
      [0.1234, 0.3434, 0.565, 0.656, 0.665, 0.897]
    )
  })
})
