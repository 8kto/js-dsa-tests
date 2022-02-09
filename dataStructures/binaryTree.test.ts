// import { BinarySearchTree } from './binaryTree'

import { Logger, Node } from './binaryTree'

export class BinarySearchTree<T> {
  private root: Node<T> | null
  public logger: Logger

  constructor() {
    this.root = null
    this.logger = new Logger()
  }

  insert(val: T) {
    const node = new Node(val)
    if (!this.root) this.root = node
    else this.insertNode(this.root, node)
  }

  insertNode(root: Node<T>, node: Node<T>) {
    if (node.data < root.data) {
      if (root.left === null) root.left = node
      else this.insertNode(root.left, node)
    } else {
      if (root.right === null) root.right = node
      else this.insertNode(root.right, node)
    }
  }

  remove(data: T) {
    if (this.root) this.removeNode(this.root, data)
  }

  /**
   * Deleting the leaf node –
   *    As leaf node does not have any children, hence they can be easily removed
   *    and null is returned to the parent node
   * Deleting a node with one child –
   *    If a node has a left child, then we update the pointer of the parent node
   *    to the left child of the node to be deleted and similarly, if a node have
   *    a right child then we update the pointer of the parent node to the right child of the node to be deleted
   * Deleting a node with two children –
   *    In order to delete a node with two children we find the node with
   *    minimum value in its right subtree and replace this node with the minimum valued node
   *    and remove the minimum valued node from the tree
   */
  removeNode(root: Node<T> | null, data: T): Node<T> | null {
    if (root === null) return null

    if (root.data > data) {
      // remove left
      root.left = this.removeNode(root.left, data)

      return root
    } else if (root.data < data) {
      // remove right
      root.right = this.removeNode(root.right, data)

      return root
    } else {
      // delete node itself
      // no children
      if (root.left === null && root.right === null) {
        return null
      }

      // right child
      if (root.left === null) {
        root = root.right

        return root
      }

      // left child
      if (root.right === null) {
        root = root.left

        return root
      }

      // two children
      const aux = this.findMinNode(root.right)
      root.data = aux.data
      root.right = this.removeNode(root.right, aux.data)

      return root
    }
  }

  getRootNode() {
    return this.root
  }

  findMinNode(node = this.root): Node<T> | null {
    if (node?.left === null) return node

    return this.findMinNode(node?.left)
  }

  preorder(node: Node<T> | null) {
    if (node) {
      this.logger.log(node.data)
      this.preorder(node.left)
      this.preorder(node.right)
    }
  }

  inorder(node: Node<T> | null) {
    if (node) {
      this.inorder(node.left)
      this.logger.log(node.data)
      this.inorder(node.right)
    }
  }

  postorder(node: Node<T> | null) {
    if (node) {
      this.postorder(node.left)
      this.postorder(node.right)
      this.logger.log(node.data)
    }
  }
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

  it('adds nodes', () => {
    expect(tree.logger.toString()).toEqual('')
    tree.inorder(tree.getRootNode())
    expect(tree.logger.toString()).toEqual('5 7 9 10 13 15 17 22 25 27')
  })

  it('removes nodes', () => {
    expect(tree.logger.toString()).toEqual('')

    // Removing node with no children
    tree.remove(5)

    //          15
    //         /  \
    //        10   25
    //       / \   / \
    //      7  13 22  27
    //       \    /
    //        9  17
    let root = tree.getRootNode()

    tree.logger.clear()
    tree.inorder(root)
    expect(tree.logger.toString()).toEqual('7 9 10 13 15 17 22 25 27')

    // Removing node with one child
    tree.remove(7)

    //          15
    //         /  \
    //        10   25
    //       / \   / \
    //      9  13 22  27
    //            /
    //           17
    root = tree.getRootNode()

    tree.logger.clear()
    tree.inorder(root)
    expect(tree.logger.toString()).toEqual('9 10 13 15 17 22 25 27')

    // Removing node with two children
    tree.remove(15)
    //          17
    //         /  \
    //        10   25
    //       / \   / \
    //      9  13 22  27
    root = tree.getRootNode()

    tree.logger.clear()
    tree.inorder(root)
    expect(tree.logger.toString()).toEqual('9 10 13 17 22 25 27')
    expect(tree.getRootNode()?.data).toEqual(17)

    tree.logger.clear()
    tree.postorder(root)
    expect(tree.logger.toString()).toEqual('9 13 10 22 27 25 17')

    tree.logger.clear()
    tree.preorder(root)
    expect(tree.logger.toString()).toEqual('17 10 9 13 25 22 27')
  })

  it('searches nodes', () => {
    expect(tree.findMinNode(tree.getRootNode())).toEqual({
      'data': 5,
      'left': null,
      'right': null,
    })

    expect(tree.findMinNode(tree.getRootNode()?.right)).toEqual({
      'data': 17,
      'left': null,
      'right': null,
    })
  })
})
