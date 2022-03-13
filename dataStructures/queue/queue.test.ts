import { Queue } from './queue'

describe('queue', () => {
  it('adds and returns stuff', () => {
    const queue = new Queue()
    queue.enqueue(3).enqueue(1).enqueue(2)

    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(null)
    queue.enqueue(31)
    expect(queue.dequeue()).toBe(31)
    expect(queue.dequeue()).toBe(null)
  })

  it('has correct size', () => {
    const stack = new Queue()
    stack.enqueue(3).enqueue(1)

    expect(stack.size()).toEqual(2)
    stack.enqueue(1)
    expect(stack.size()).toEqual(3)
  })

  it('returns correct front', () => {
    const stack = new Queue()
    stack.enqueue(3).enqueue(15)

    expect(stack.front()).toEqual(3)
    stack.enqueue(1)
    expect(stack.front()).toEqual(3)
  })

  it('empties stack', () => {
    const stack = new Queue()
    stack.enqueue(3).enqueue(15)

    expect(stack.front()).toEqual(3)
    expect(stack.size()).toEqual(2)
    stack.empty()
    expect(stack.front()).toEqual(null)
    expect(stack.dequeue()).toEqual(null)
    expect(stack.size()).toEqual(0)
  })

  it('checks for emptiness', () => {
    const stack = new Queue()
    stack.enqueue(3).enqueue(15)

    expect(stack.isEmpty()).toEqual(false)
    expect(stack.front()).toEqual(3)
    expect(stack.size()).toEqual(2)
    stack.empty()
    expect(stack.isEmpty()).toEqual(true)
  })
})
