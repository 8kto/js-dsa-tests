/**
 * @fileOverview Tests for the Binary Tree node adding
 */

import { Logger } from './binaryTree'

class Node<T> {
  left: Node<T> | null = null
  right: Node<T> | null = null

  // eslint-disable-next-line no-unused-vars
  constructor(public info: T) {}
}

class BinaryTree<T> {
  root: Node<T> | null
  logger: Logger

  constructor() {
    this.root = null
    this.logger = new Logger()
  }

  add(value: T) {
    if (!this.root) this.root = new Node<T>(value)
    let current = this.root

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (current.info > value) {
        if (current.left) current = current.left
        else {
          current.left = new Node<T>(value)
          break
        }
      } else if (current.info < value) {
        if (current.right) current = current.right
        else {
          current.right = new Node<T>(value)
          break
        }
      } else break
    }
  }

  inorder(root: Node<T> | null) {
    if (root) {
      this.inorder(root.left)
      this.logger.log(root.info)
      this.inorder(root.right)
    }
  }
}

describe('BinaryTree', () => {
  let tree: BinaryTree<number>

  beforeEach(() => {
    tree = new BinaryTree<number>()
    tree.add(15)
    tree.add(25)
    tree.add(10)
    tree.add(7)
    tree.add(22)
    tree.add(17)
    tree.add(13)
    tree.add(5)
    tree.add(9)
    tree.add(27)

    //          15
    //         /  \
    //        10   25
    //       / \   / \
    //      7  13 22  27
    //     / \    /
    //    5   9  17
  })

  it('adds nodes', () => {
    expect(tree.root?.info).toEqual(15)
    expect(tree.root?.left?.info).toEqual(10)
    expect(tree.root?.right?.info).toEqual(25)
    expect(tree.root?.left?.left?.info).toEqual(7)
    expect(tree.root?.left?.right?.info).toEqual(13)
    expect(tree.root?.left?.left?.left?.info).toEqual(5)
    expect(tree.root?.left?.left?.right?.info).toEqual(9)
  })

  it('has correct structure', () => {
    expect(tree.logger.toString()).toEqual('')
    tree.inorder(tree.root)
    expect(tree.logger.toString()).toEqual('5 7 9 10 13 15 17 22 25 27')
  })
})

export {}
