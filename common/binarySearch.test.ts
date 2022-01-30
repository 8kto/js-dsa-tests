// import { binarySearch } from './binarySearch'

export const binarySearch = <T = unknown>(sorted: T[], val: T): number => {
  let start = 0,
    end = sorted.length - 1

  while (start <= end) {
    const middle = Math.floor((start + end) / 2)

    if (sorted[middle] === val) return middle
    if (sorted[middle] < val) start = middle + 1
    else end = middle - 1
  }

  return -1
}

describe('binarySearch', () => {
  it('finds the index', () => {
    expect(binarySearch([1, 2, 3, 4, 5], 4)).toEqual(3)
    expect(binarySearch([1, 2, 3, 4, 5], 5)).toEqual(4)
    expect(binarySearch([1, 2, 3, 4, 5], 1)).toEqual(0)
  })

  it('does not find index', () => {
    expect(binarySearch([1, 2, 3, 4, 5], 40)).toEqual(-1)
    expect(binarySearch([1, 2, 3, 4, 5], 0)).toEqual(-1)
  })
})
