/**
 * Binary Search Tree
 *
 * @link https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
 */

export class Node<T = unknown> {
  data: T
  left: Node<T> | null = null
  right: Node<T> | null = null

  constructor(data: T) {
    this.data = data
  }
}

export class Logger {
  storage: unknown[] = []

  log(data: unknown) {
    this.storage.push(data)
  }

  toString() {
    return this.storage.join(' ')
  }

  clear() {
    this.storage = []
  }
}

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

  // Helper function
  // finds the minimum node in tree
  // searching starts from given node
  findMinNode(node: Node<T>): Node<T> {
    // if left of a node is null
    // then it must be minimum node
    if (node.left === null) return node
    else return this.findMinNode(node.left)
  }

  /**
   * Traverse the left subtree i.e. perform inorder on left subtreeVisit
   * the rootTraverse the right subtree i.e. perform inorder on right subtree
   */
  inorder(node: Node<T> | null) {
    if (node !== null) {
      this.inorder(node.left)
      this.logger.log(node.data)
      this.inorder(node.right)
    }
  }

  /**
   * Visit the rootTraverse the left subtree i.e perform preorder on left
   * subtreeTraverse the right subtree i.e perform preorder on right subtree
   */
  preorder(node: Node<T> | null) {
    if (node !== null) {
      this.logger.log(node.data)
      this.preorder(node.left)
      this.preorder(node.right)
    }
  }

  /**
   * Traverse the left subtree i.e perform postorder on left subtreeTraverse
   * the right subtree i.e perform postorder on right subtreeVisit the root
   */
  postorder(node: Node<T> | null) {
    if (node !== null) {
      this.postorder(node.left)
      this.postorder(node.right)
      this.logger.log(node.data)
    }
  }

  getRootNode() {
    return this.root
  }

  search(node: Node<T> | null, data: T): Node<T> | null {
    if (node === null) return null
    if (data < node.data) return this.search(node.left, data)
    if (data > node.data) return this.search(node.right, data)

    return node
  }
}
