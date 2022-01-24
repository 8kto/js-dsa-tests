const { BinarySearchTree } = require('./binaryTree')

describe('BinarySearchTree', () => {
  let tree

  beforeEach(() => {
    tree = new BinarySearchTree()
  })

  it('adds nodes', () => {
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

    expect(tree.logger.toString()).toEqual('')
    tree.inorder(tree.getRootNode())
    expect(tree.logger.toString()).toEqual('5 7 9 10 13 15 17 22 25 27')
  })

  it('removes nodes', () => {
    let root
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
    root = tree.getRootNode()

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
})