import { factorialMemo as factorial } from './factorial'

describe('factorials', () => {
  it('does simple job', () => {
    expect(factorial(0)).toEqual(1)
  })

  it('does simple job', () => {
    expect(factorial(1)).toEqual(1)
  })

  it('does simple job', () => {
    expect(factorial(4)).toEqual(24)
  })

  it('does simple job', () => {
    expect(factorial(7)).toEqual(5040)
  })

  it('does simple job', () => {
    expect(factorial(17)).toEqual(355687428096000)
  })

  // TODO implement advanced algo: https://www.geeksforgeeks.org/factorial-large-number/
  xit('does hard job', () => {
    expect(factorial(200)).toEqual()
  })
})
