const bubbleSort = (arr) => {
  let isSorted = false

  while (!isSorted) {
    isSorted = true

    arr.forEach((val, index) => {
      if (index === arr.length - 1) return
      if (val > arr[index + 1]) {
        isSorted = false

        ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
      }
    })
  }

  return arr
}

describe('bubble sort', () => {
  it('sorts stuff', () => {
    expect(bubbleSort([2, 1])).toEqual([1, 2])
    expect(
      bubbleSort([2, -1, 1000, 0, 14004, 0, -25, 2]),
    ).
      toEqual([-25, -1, 0, 0, 2, 2, 1000, 14004])

    expect(bubbleSort([-10, -1, 0, 0.5, 1, 10])).
      toEqual([-10, -1, 0, 0.5, 1, 10])
  })
})