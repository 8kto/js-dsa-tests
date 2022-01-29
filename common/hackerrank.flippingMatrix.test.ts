/**
 * https://www.hackerrank.com/challenges/flipping-the-matrix/problem
 */

export function flippingMatrixSrc(matrix: number[][]) {
  const max = matrix.length - 1
  const n: number = max / 2

  let s = 0
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      console.log({
        a: [row, col],
        b: [row, max - col],
        c: [max - row, col],
        d: [max - row, max - col],
      })
      s += Math.max(
        matrix[row][col],
        matrix[row][max - col],
        matrix[max - row][col],
        matrix[max - row][max - col]
      )
    }
  }

  return s
}

export function flippingMatrix(matrix: number[][]) {
  const max = matrix.length - 1
  const n = max / 2

  let res = 0
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      res += Math.max(
        matrix[r][c],
        matrix[r][max - c],
        matrix[max - r][c],
        matrix[max - r][max - c]
      )
    }
  }

  return res
}

describe('flippingMatrix', () => {
  it('does the thing 1', () => {
    expect(
      flippingMatrix([
        [112, 42, 83, 119],
        [56, 125, 56, 49],
        [15, 78, 101, 43],
        [62, 98, 114, 108],
      ])
    ).toEqual(414)
  })

  it('does the thing 1', () => {
    expect(
      flippingMatrix([
        [107, 54, 128, 15],
        [12, 75, 110, 138],
        [100, 96, 34, 85],
        [75, 15, 28, 112],
      ])
    ).toEqual(488)
  })
})
