class Stack {
  count = 0
  storage = {}

  push (value) {
    this.storage[this.count] = value
    this.count++

    return this
  }

  pop () {
    if (this.count === 0) {
      return null
    }

    this.count--
    const result = this.storage[this.count]
    delete this.storage[this.count]

    return result
  }

  top () {
    if (this.count === 0) {
      return null
    }

    return this.storage[this.count - 1]
  }

  size () {
    return this.count
  }

  empty () {
    this.storage = {}
    this.count = 0

    return this
  }
}

module.exports = { Stack }