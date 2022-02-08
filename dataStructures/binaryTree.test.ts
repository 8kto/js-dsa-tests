// import { BinarySearchTree } from './binaryTree'

import { Logger, Node } from './binaryTree'

export class BinarySearchTree<T> {
  private root: Node<T> | null
  private logger: Logger

  constructor() {
    this.root = null
    this.logger = new Logger()
  }

  insert(data: T) {
    const node = new Node<T>(data)

    if (!this.root) {
      this.root = node
    } else {
      this.insertNode(this.root, node)
    }
  }

  insertNode(rootNode: Node<T>, node: Node<T>) {
    // if the data is less than the rootNode
    // data move left of the tree
    if (node.data < rootNode.data) {
      // if left is null insert rootNode here
      if (rootNode.left === null) rootNode.left = node
        // if left is not null recur until
      // null is found
      else this.insertNode(rootNode.left, node)
    }

      // if the data is more than the rootNode
    // data move right of the tree
    else {
      // if right is null insert rootNode here
      if (rootNode.right === null) rootNode.right = node
        // if right is not null recur until
      // null is found
      else this.insertNode(rootNode.right, node)
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
  removeNode(rootNode: Node<T> | null, data: T) {
    // if the root is null then tree is
    // empty
    if (rootNode === null) return null
      // if data to be deleted is less than
    // roots data then move to left subtree
    else if (data < rootNode.data) {
      rootNode.left = this.removeNode(rootNode.left, data)

      return rootNode
    }

      // if data to be deleted is greater than
    // roots data then move to right subtree
    else if (data > rootNode.data) {
      rootNode.right = this.removeNode(rootNode.right, data)

      return rootNode
    }

      // if data is similar to the root's data
    // then delete this node
    else {
      // deleting node with no children
      if (rootNode.left === null && rootNode.right === null) {
        rootNode = null

        return rootNode
      }

      // deleting node with one child
      if (rootNode.left === null) {
        rootNode = rootNode.right

        return rootNode
      } else if (rootNode.right === null) {
        rootNode = rootNode.left

        return rootNode
      }

      // Deleting node with two children
      // minimum node of the right subtree
      // is stored in aux
      const aux = this.findMinNode(rootNode.right)
      rootNode.data = aux.data

      rootNode.right = this.removeNode(rootNode.right, aux.data)

      return rootNode
    }
  }

}

describe('BinarySearchTree', () => {
  let tree

  beforeEach(() => {
    tree = new BinarySearchTree()
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
    expect(tree.getRootNode().data).toEqual(17)

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

    expect(tree.findMinNode(tree.getRootNode().right)).toEqual({
      'data': 17,
      'left': null,
      'right': null,
    })
  })
})
