export const factorialNaive = n => {
  return n <= 1 ? 1 : factorialNaive(n - 1) * n
}

export const factorialMemo = (n, cache = []) => {
  if (n <= 1) {
    return 1
  }

  if (!cache[n]) {
    cache[n] = n * factorialMemo(n - 1, cache)
  }

  return cache[n]
}
