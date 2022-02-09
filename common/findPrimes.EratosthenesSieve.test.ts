export const findPrimes = (n: number) => {
  let p = 2
  const primes = Array(n).fill(true)
  primes[0] = primes[1] = false

  while (p ** 2 < n) {
    for (let i = 2 * p; i < n; i += p) {
      primes[i] = false
    }

    p = primes.findIndex((v, i) => v && i > p)
  }

  return primes.map((v, i) => v && i).filter(Boolean)
}

describe('Using Sieve of Eratosthenes to find primes JavaScript', () => {
  it('reverseLinkedList', () => {
    expect(findPrimes(100)).toEqual([
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
      71, 73, 79, 83, 89, 97,
    ])
  })
})
