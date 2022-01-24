class Node {
  /** @var {any} */
  data = null

  /** @var {Node} */
  left = null

  /** @var {Node} */
  right = null

  constructor (data) {
    this.data = data
  }
}

class BinarySearchTree {
  logger = {
    storage: [],
    log (data) {
      this.storage.push(data)
    },
    toString () {
      return this.storage.join(' ')
    },
    clear () {
      this.storage = []
    },
  }

  constructor () {
    this.root = null
  }

  insert (data) {
    const node = new Node(data)

    if (!this.root) {
      this.root = node
    } else {
      this.insertNode(this.root, node)
    }
  }

  /**
   * @param {Node} node
   * @param {Node} newNode
   */
  insertNode (node, newNode) {
    // if the data is less than the node
    // data move left of the tree
    if (newNode.data < node.data) {
      // if left is null insert node here
      if (node.left === null)
        node.left = newNode
      else

        // if left is not null recur until
        // null is found
        this.insertNode(node.left, newNode)
    }

      // if the data is more than the node
    // data move right of the tree
    else {
      // if right is null insert node here
      if (node.right === null)
        node.right = newNode
      else

        // if right is not null recur until
        // null is found
        this.insertNode(node.right, newNode)
    }
  }

  remove (data) {
    this.removeNode(this.root, data)
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
   * @param {Node} node
   * @param {any} key
   * @returns {Node}
   */
  removeNode (node, key) {

    // if the root is null then tree is
    // empty
    if (node === null)
      return null

    // if data to be delete is less than
    // roots data then move to left subtree
    else if (key < node.data) {
      node.left = this.removeNode(node.left, key)
      return node
    }

    // if data to be delete is greater than
    // roots data then move to right subtree
    else if (key > node.data) {
      node.right = this.removeNode(node.right, key)
      return node
    }

    // if data is similar to the root's data
    // then delete this node
    else {
      // deleting node with no children
      if (node.left === null && node.right === null) {
        node = null
        return node
      }

      // deleting node with one children
      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }

      // Deleting node with two children
      // minimum node of the right subtree
      // is stored in aux
      const aux = this.findMinNode(node.right)
      node.data = aux.data

      node.right = this.removeNode(node.right, aux.data)
      return node
    }

  }

  // Helper function
  // finds the minimum node in tree
  // searching starts from given node
  findMinNode (node) {
    // if left of a node is null
    // then it must be minimum node
    if (node.left === null)
      return node
    else
      return this.findMinNode(node.left)
  }

  /**
   * Traverse the left subtree i.e perform inorder on left subtreeVisit
   * the rootTraverse the right subtree i.e perform inorder on right subtree
   * @param {Node} node
   */
  inorder (node) {
    if (node !== null) {
      this.inorder(node.left)
      this.logger.log(node.data)
      this.inorder(node.right)
    }
  }

  /**
   * Visit the rootTraverse the left subtree i.e perform preorder on left
   * subtreeTraverse the right subtree i.e perform preorder on right subtree
   * @param {Node} node
   */
  preorder (node) {
    if (node !== null) {
      this.logger.log(node.data)
      this.preorder(node.left)
      this.preorder(node.right)
    }
  }

  /**
   * Traverse the left subtree i.e perform postorder on left subtreeTraverse
   * the right subtree i.e perform postorder on right subtreeVisit the root
   * @param {Node} node
   */
  postorder (node) {
    if (node !== null) {
      this.postorder(node.left)
      this.postorder(node.right)
      this.logger.log(node.data)
    }
  }

  /**
   * @returns {Node}
   */
  getRootNode () {
    return this.root
  }

  /**
   * @param {Node} node
   * @param {any} data
   * @return {null|Node}
   */
  search (node, data) {
    if (node === null) return null
    if (data < node.data) return this.search(node.left, data)
    if (data > node.data) return this.search(node.right, data)

    return node
  }
}

module.exports = { BinarySearchTree }