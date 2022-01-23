function quickSort (arr) {
  if (arr.length <= 1) return arr

  const left = [], right = [], pivot = arr[0]

  for (let i = 1; i < arr.length; i++) {
    arr[i] < pivot
      ? left.push(arr[i])
      : right.push(arr[i])
  }

  return quickSort(left).concat(pivot).concat(quickSort(right))
}

describe('quick sort', () => {
  it('sorts simple stuff', () => {
    expect(quickSort([2, 1])).toEqual([1, 2])
  })

  it('sorts valid input', () => {
    expect(
      quickSort([2, -1, 1000, 0, 14004, 0, -25, 2]),
    ).
      toEqual([-25, -1, 0, 0, 2, 2, 1000, 14004])
  })

  it('handles sorted arrays', () => {
    expect(quickSort([-10, -1, 0, 0.5, 1, 10])).
      toEqual([-10, -1, 0, 0.5, 1, 10])
  })
})