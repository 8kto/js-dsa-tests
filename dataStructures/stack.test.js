/**
 The functions associated with stack are:

 empty() – Returns whether the stack is empty – Time Complexity: O(1)
 size() – Returns the size of the stack – Time Complexity: O(1)
 top() – Returns a reference to the topmost element of the stack – Time Complexity: O(1)
 push(a) – Inserts the element ‘a’ at the top of the stack – Time Complexity: O(1)
 pop() – Deletes the topmost element of the stack – Time Complexity: O(1)
 */

const { Stack } = require('./stack')

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