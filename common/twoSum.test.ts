/**
 * @url https://www.youtube.com/watch?v=JtMuXmmDl9s
 */

/**
 * Binary search method: complexity O(n log(n)), memory O(1)
 */
const twoSumBinarySearch = (sorted: number[], k: number): number[] => {
  for (let i = 0; i < sorted.length; i++) {
    const remainder = k - sorted[i]

    let left = i + 1,
      right = sorted.length - 1

    while (left <= right) {
      const middle = Math.floor((left + right) / 2)
      if (sorted[middle] === remainder) return [sorted[i], sorted[middle]]
      if (sorted[middle] < remainder) left = middle + 1
      else right = middle - 1
    }
  }

  return []
}

/**
 * Two pointers method: complexity O(n), memory O(1)
 */
const twoSumPointers = (sorted: number[], k: number): number[] => {
  let left = 0,
    right = sorted.length - 1

  while (left <= right) {
    const sum = sorted[left] + sorted[right]
    if (sum === k) return [sorted[left], sorted[right]]
    if (sum > k) right--
    else left++
  }

  return []
}

describe('twoSum', () => {
  it('V1: finds the numbers pair', () => {
    expect(twoSumPointers([-9, -5, -2, -1, 1, 4, 9, 11], 3)).toEqual([-1, 4])
    expect(twoSumPointers([-7, 0, 2, 3, 6, 8, 10, 15, 18, 20], 10)).toEqual([
      0, 10,
    ])
  })

  it('V2: finds the numbers pair', () => {
    expect(twoSumBinarySearch([-9, -5, -2, -1, 1, 4, 9, 11], 3)).toEqual([
      -1, 4,
    ])
    expect(twoSumBinarySearch([-7, 0, 2, 3, 6, 8, 10, 15, 18, 20], 10)).toEqual(
      [0, 10]
    )
  })
})

export {}
