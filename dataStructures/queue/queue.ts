/**
 Queue has following methods:
 enqueue: enter queue, add an element at the end
 dequeue: leave queue, remove the front element and return it
 front: get the first element
 isEmpty: determine whether the queue is empty
 size: get the number of element(s) in queue
 */
export class Queue<T = unknown> {
  storage: T[] = []

  enqueue(element: T) {
    this.storage.push(element)

    return this
  }

  dequeue() {
    return this.storage.shift() || null
  }

  front() {
    return this.storage[0] || null
  }

  isEmpty() {
    return this.storage.length === 0
  }

  size() {
    return this.storage.length
  }

  empty() {
    this.storage = []
  }
}
