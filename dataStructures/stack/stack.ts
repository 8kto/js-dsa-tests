/**
 * @link https://betterprogramming.pub/8-common-data-structures-in-javascript-3d3537e69a27
 The functions associated with stack are:

 empty() – Returns whether the stack is empty – Time Complexity: O(1)
 size() – Returns the size of the stack – Time Complexity: O(1)
 top() – Returns a reference to the topmost element of the stack – Time Complexity: O(1)
 push(a) – Inserts the element ‘a’ at the top of the stack – Time Complexity: O(1)
 pop() – Deletes the topmost element of the stack – Time Complexity: O(1)
 */
export class Stack<T = unknown> {
  count = 0
  storage: Record<string, T> = {}

  push(value: T) {
    this.storage[this.count] = value
    this.count++

    return this
  }

  pop() {
    if (this.count === 0) {
      return null
    }

    this.count--
    const result = this.storage[this.count]
    delete this.storage[this.count]

    return result
  }

  top() {
    if (this.count === 0) {
      return null
    }

    return this.storage[this.count - 1]
  }

  size() {
    return this.count
  }

  empty() {
    this.storage = {}
    this.count = 0

    return this
  }
}
