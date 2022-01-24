// const { Stack } = require('./stack')
class Stack {
  counter = 0
  storage = {}

  push (value) {
    this.storage[this.counter] = value
    this.counter++

    return this
  }

  pop () {
    if (!this.counter) return null

    const res = this.storage[this.counter - 1]
    delete this.storage[this.counter]
    this.counter--

    return res
  }

  size () {
    return this.counter
  }

  top () {
    if (!this.counter) return null

    return this.storage[this.counter - 1]
  }

  empty () {
    this.counter = 0
    this.storage = {}
  }
}

describe('stack', () => {
  it('pushes and pops stuff', () => {
    const stack = new Stack()
    stack.push(3).push(1).push(2)

    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(null)
    stack.push(31)
    expect(stack.pop()).toBe(31)
    expect(stack.pop()).toBe(null)
  })

  it('has correct size', () => {
    const stack = new Stack()
    stack.push(3).push(1)

    expect(stack.size()).toEqual(2)
    stack.push(1)
    expect(stack.size()).toEqual(3)
  })

  it('returns correct top', () => {
    const stack = new Stack()
    stack.push(3).push(15)

    expect(stack.top()).toEqual(15)
    stack.push(1)
    expect(stack.top()).toEqual(1)
  })

  it('empties stack', () => {
    const stack = new Stack()
    stack.push(3).push(15)

    expect(stack.top()).toEqual(15)
    expect(stack.size()).toEqual(2)
    stack.empty()
    expect(stack.top()).toEqual(null)
    expect(stack.pop()).toEqual(null)
    expect(stack.size()).toEqual(0)
  })
})