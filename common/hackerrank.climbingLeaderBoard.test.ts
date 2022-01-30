/**
 * The problem should be solved with Binary Search using for the huge input arrays
 *
 * @link https://www.youtube.com/watch?v=CAyXHTqBIBU&list=PLSIpQf0NbcCltzNFrOJkQ4J4AAjW3TSmA
 */

const binarySearch = (sorted: number[], value: number) => {
  let start = 0,
    end = sorted.length - 1
  while (start <= end) {
    const middle = start + Math.floor((end - start) / 2)
    if (sorted[middle] === value) return middle
    if (sorted[middle] < value && value < sorted[middle - 1]) return middle
    if (sorted[middle] > value && value >= sorted[middle + 1]) return middle + 1

    if (value > sorted[middle]) end = middle - 1
    else start = middle + 1
  }

  return -1
}

export const climbingLeaderboard = (ranked: number[], player: number[]) => {
  const buf = Array.from(new Set(ranked))

  return player.map(nth => {
    if (nth >= buf[0]) return 1
    if (nth < buf[buf.length - 1]) return buf.length + 1

    return binarySearch(buf, nth) + 1
  })
}

describe('climbingLeaderboard', () => {
  it('returns the ranked list 1', () => {
    expect(
      climbingLeaderboard([100, 100, 50, 40, 40, 20, 10], [5, 25, 50, 120])
    ).toEqual([6, 4, 2, 1])
  })

  it('returns the ranked list 2', () => {
    expect(
      climbingLeaderboard([100, 90, 90, 80, 75, 60], [50, 65, 77, 90, 102])
    ).toEqual([6, 5, 4, 2, 1])
  })
})
