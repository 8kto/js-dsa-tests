/**
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
})

export {}
