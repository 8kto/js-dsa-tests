export const factorial = (n: number): number => {
  return n <= 1 ? 1 : factorial(n - 1) * n
}

/**
 * Check the awesome video with debugger and detailed explanation
 * @link https://www.youtube.com/watch?v=js9160AAKTk
 */
export const factorialMemo = (() => {
  const memo: Record<string, number> = {}

  return (n: number): number => {
    if (n <= 1) {
      return 1
    }

    if (typeof memo[n] === 'undefined') {
      memo[n] = n * factorialMemo(n - 1)
    } else {
      // console.log('Memo has', n)
    }

    return memo[n]
  }
})()
