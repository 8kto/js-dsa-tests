const factorialNaive = (n) => {
    return n <= 1 ? 1 : factorial(n - 1) * n
}

const factorialMemo = (n, cache = []) => {
    if (n <= 1) {
      return 1
    }

    if (!cache[n]) {
      cache[n] = n * factorial(n - 1, cache)
    }

    return cache[n]
}

module.exports = { factorial, factorialMemo }
