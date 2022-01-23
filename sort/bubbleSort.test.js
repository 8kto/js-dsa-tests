const bubbleSort = (arr) => {
  let isSorted = false

  while (!isSorted) {
    isSorted = true

    for (let i = 0; i < arr.length - 1; i++) {
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
    expect(
      bubbleSort([2, -1, 1000, 0, 14004, 0, -25, 2]),
    ).
      toEqual([-25, -1, 0, 0, 2, 2, 1000, 14004])
  })

  it('handles sorted arrays', () => {
    expect(bubbleSort([-10, -1, 0, 0.5, 1, 10])).
      toEqual([-10, -1, 0, 0.5, 1, 10])
  })
})