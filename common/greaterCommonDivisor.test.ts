/**
 * @link https://www.geeksforgeeks.org/euclidean-algorithms-basic-and-extended/
 *
 * Time Complexity: O(Log max(a, b))
 *
 * GCD of two numbers is the largest number that divides both of them.
 * A simple way to find GCD is to factorize both numbers and multiply common prime factors.
 *
 * Basic Euclidean Algorithm for GCD
 * The algorithm is based on the below facts.
 *
 * If we subtract a smaller number from a larger (we reduce a larger number), GCD doesn’t change.
 * So if we keep subtracting repeatedly the larger of two, we end up with GCD.
 * Now instead of subtraction, if we divide the smaller number, the algorithm stops when we find remainder 0.
 */
export const gcd = (a: number, b: number): number => {
  if (!a) return b

  return gcd(b % a, a)
}

// todo: mutliple args
describe('Greater Common Divisor: Basic Euclidean Algorithm', () => {
  it('test', () => {
    expect(gcd(30, 12)).toEqual(6)
    expect(gcd(60, 72)).toEqual(12)
    expect(gcd(8, 9)).toEqual(1)
    expect(gcd(1, 1)).toEqual(1)
    expect(gcd(23756612, 13873420)).toEqual(836)
    expect(gcd(2672, 5678)).toEqual(334)
  })
})
