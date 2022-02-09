export type LinkedListItem = {
  data: unknown
  next: LinkedListItem | null
}

const reverseLinkedList = (list: LinkedListItem | null) => {
  let prev = null,
    cur = list,
    next = list

  while (cur) {
    next = next && next.next
    cur.next = prev
    prev = cur
    cur = next
  }

  return prev
}

describe('Linked lists', () => {
  let list: LinkedListItem

  beforeEach(() => {
    list = {
      data: 1,
      next: { data: 2, next: { data: 3, next: null } },
    }
  })

  it('reverseLinkedList', () => {
    expect(reverseLinkedList(list)).toEqual({
      'data': 3,
      'next': {
        'data': 2,
        'next': {
          'data': 1,
          'next': null,
        },
      },
    })
  })
})
