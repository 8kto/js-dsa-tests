/**
 * O(n^2)
 */
export const selectionSort = (arr: number[]): number[] => {
  const sorted = []

  const findIndexOfMinimal = (array: number[]) => {
    let smallestIndex = 0
    let smallest = array[smallestIndex]

    for (let i = 1; i < array.length; i++) {
      if (array[i] < smallest) {
        smallest = array[i]
        smallestIndex = i
      }
    }

    return smallestIndex
  }

  for (let i = 0, max = arr.length; i < max; i++) {
    const indexOfMinimal = findIndexOfMinimal(arr)
    sorted.push(arr[indexOfMinimal])
    arr.splice(indexOfMinimal, 1)
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
})
