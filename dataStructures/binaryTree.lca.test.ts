/**
 * Lowest Common Ancestor (LCA)
 * Space: O(1)
 * Time: O(n)
 *
 * @link https://www.youtube.com/watch?v=k7NF6rNOs4Y
 */

import { BinarySearchTree, Node } from './binaryTree'

//          15
//         /  \
//        10   25
//       / \   / \
//      7  13 22  27
//     / \    /
//    5   9  17
const lca = (
  root: Node<number> | null,
  left: Node<number> | null,
  right: Node<number> | null
): Node<number> | null => {
  if (!root) return null

  if (root.data === left?.data || root.data === right?.data) {
    return root
  }

  const lnode = lca(root.left, left, right)
  const rnode = lca(root.right, left, right)

  if (lnode && rnode) return root

  return lnode ?? rnode
}

describe('BinarySearchTree', () => {
  let tree: BinarySearchTree<number>

  beforeEach(() => {
    tree = new BinarySearchTree<number>()
    tree.insert(15)
    tree.insert(25)
    tree.insert(10)
    tree.insert(7)
    tree.insert(22)
    tree.insert(17)
    tree.insert(13)
    tree.insert(5)
    tree.insert(9)
    tree.insert(27)

    //          15
    //         /  \
    //        10   25
    //       / \   / \
    //      7  13 22  27
    //     / \    /
    //    5   9  17
  })

  it('finds LCA (1)', () => {
    expect(lca(tree.getRootNode(), new Node(7), new Node(13))?.data).toEqual(10)
  })

  it('finds LCA (2)', () => {
    expect(lca(tree.getRootNode(), new Node(5), new Node(13))?.data).toEqual(10)
  })

  it('finds LCA (3)', () => {
    expect(lca(tree.getRootNode(), new Node(9), new Node(27))?.data).toEqual(15)
  })

  it('finds LCA (3)', () => {
    expect(lca(tree.getRootNode(), new Node(25), new Node(27))?.data).toEqual(
      25
    )
  })

  it('finds LC4 (3)', () => {
    expect(lca(tree.getRootNode(), new Node(25), new Node(25))?.data).toEqual(
      25
    )
  })
})
