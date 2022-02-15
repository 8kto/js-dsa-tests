/**
 * In arithmetic and number theory, the least common multiple, lowest common multiple,
 * or smallest common multiple of two integers a and b, usually denoted by lcm(a, b),
 * is the smallest positive integer that is divisible by both a and b
 */
export const lcm = (...args: number[]): number => {
  const gcd = (a: number, b: number): number => {
    while (a) {
      ;[a, b] = [b % a, a]
    }

    return b
  }

  return args.reduce((acc, cur) => Math.abs(acc * cur) / gcd(acc, cur))
}

describe('Tests', () => {
  it('test', () => {
    expect(lcm(2, 5)).toEqual(10)
    expect(lcm(2, 3, 4)).toEqual(12)
    expect(lcm(9)).toEqual(9)
  })
})
