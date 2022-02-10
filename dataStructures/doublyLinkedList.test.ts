class DoublyLinkedListNode {
  public data: unknown
  public next: DoublyLinkedListNode | null
  public prev: DoublyLinkedListNode | null

  constructor(nodeData: unknown) {
    this.data = nodeData
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  public head: DoublyLinkedListNode | null
  public tail: DoublyLinkedListNode | null

  constructor() {
    this.head = null
    this.tail = null
  }

  insertNode(nodeData: unknown) {
    let node = new DoublyLinkedListNode(nodeData)

    if (this.head == null) {
      this.head = node
    } else {
      this.tail && (this.tail.next = node)
      node.prev = this.tail
    }

    this.tail = node
  }
}

function printDoublyLinkedList(node: DoublyLinkedListNode | null) {
  const buf = []

  while (node !== null) {
    buf.push(node.data)
    node = node.next
  }

  return buf
}

export const reverseDoublyLinkedList = (
  list: DoublyLinkedListNode | null
): DoublyLinkedListNode | null => {
  let tmp,
    cur = list

  while (cur) {
    tmp = cur.prev
    cur.prev = cur.next
    cur.next = tmp
    cur = cur.prev
  }

  return tmp ? tmp.prev : list
}

describe('Doubly Linked lists', () => {
  it.each([
    { input: [1, 2, 3, 4], expected: [4, 3, 2, 1] },
    { input: [2, 3, 4], expected: [4, 3, 2] },
    { input: [17, 20, 23, 35, 47], expected: [47, 35, 23, 20, 17] },
  ])('reverseDoublyLinkedList', ({ input, expected }) => {
    let list = new DoublyLinkedList()
    for (let j = 0; j < input.length; j++) {
      list.insertNode(input[j])
    }

    expect(printDoublyLinkedList(reverseDoublyLinkedList(list.head))).toEqual(
      expected
    )
  })
})
