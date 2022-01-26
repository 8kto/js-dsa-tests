/**
 * @link https://levelup.gitconnected.com/finding-the-shortest-path-in-javascript-pt-1-breadth-first-search-67ae4653dbec
 */
let breadthFirstSearch = (tree, rootNode, searchValue) => {
  // make a queue array
  let queue = []
  let path = []
  // populate it with the node that will be the root of your search
  queue.push(rootNode)

  // search the queue until it is empty
  while (queue.length) {
    // assign the top of the queue to variable currentNode
    let currentNode = queue.shift()
    path.push(currentNode.value)

    // if currentNode is the node we're searching for, break & alert
    if (currentNode.value === searchValue) {
      return path
    }

    // if currentNode has a left child node, add it to the queue.
    if (currentNode.left !== null) {
      queue.push(tree[currentNode.left])
    }

    // if currentNode has a right child node, add it to the queue.
    if (currentNode.right !== null) {
      queue.push(tree[currentNode.right])
    }
  }

  console.log('Sorry, no such node found :(')
  return null
}

module.exports = { breadthFirstSearch }