// const { breadthFirstSearch } = require('./breadthFirstSearch')

const breadthFirstSearch = (tree, root, value) => {
  const q = [root]
  const path = []

  while (q.length) {
    const node = q.shift()
    path.push(node.value)

    if (node.value === value) return path
    if (node.left !== null) q.push(tree[node.left])
    if (node.right !== null) q.push(tree[node.right])
  }

  return null
}

/**
 10
 /  \
 4    17
 / \   / \
 1   9 12  18
 */
const getTree = () => ({
  '10': {
    value: '10',
    left: '4',
    right: '17',
  },
  '4': {
    value: '4',
    left: '1',
    right: '9',
  },
  '17': {
    value: '17',
    left: '12',
    right: '18',
  },
  '1': {
    value: '1',
    left: null,
    right: null,
  },
  '9': {
    value: '9',
    left: null,
    right: null,
  },
  '12': {
    value: '12',
    left: null,
    right: null,
  },
  '18': {
    value: '18',
    left: null,
    right: null,
  },
})

describe('BinarySearchTree', () => {
  let tree

  beforeEach(() => {
    tree = getTree()
  })

  it('searches nodes', () => {
    expect(breadthFirstSearch(tree, tree[10], '12')).toEqual(
      ['10', '4', '17', '1', '9', '12'],
    )
  })

  it('does not find nodes', () => {
    expect(breadthFirstSearch(tree, tree[10], '42')).toEqual(
      null,
    )
  })

  it('searches nodes from subtree', () => {
    expect(breadthFirstSearch(tree, tree[17], '18')).toEqual(
      ['17', '12', '18'],
    )
  })
})