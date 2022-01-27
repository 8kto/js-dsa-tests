/**
 * @link https://adrianmejia.com/data-structures-for-beginners-graphs-time-complexity-tutorial
 */
export class GraphNode {
  private value: unknown
  private readonly adjacents: GraphNode[]

  constructor(value) {
    this.value = value
    this.adjacents = []
  }

  addAdjacent(node) {
    this.adjacents.push(node)
  }

  removeAdjacent(node) {
    const index = this.adjacents.indexOf(node)
    if (index !== -1) {
      this.adjacents.splice(index, 1)

      return node
    }
  }

  getAdjacents() {
    return this.adjacents
  }

  isAdjacent(node) {
    return this.adjacents.indexOf(node) !== -1
  }
}

export class Graph {
  static UNDIRECTED = Symbol('directed graph') // two-ways edges
  static DIRECTED = Symbol('undirected graph') // one-way edges

  private nodes: Map<any, any>;
  private readonly edgeDirection: any;

  constructor(edgeDirection = Graph.UNDIRECTED) {
    this.nodes = new Map()
    this.edgeDirection = edgeDirection
  }

  addEdge(source, destination) {
    const sourceNode = this.addVertex(source)
    const destinationNode = this.addVertex(destination)

    sourceNode.addAdjacent(destinationNode)
    if (this.edgeDirection === Graph.UNDIRECTED) {
      destinationNode.addAdjacent(sourceNode)
    }

    return [sourceNode, destinationNode]
  }

  addVertex(value) {
    if (this.nodes.has(value)) return this.nodes.get(value)

    const vertex = new GraphNode(value)
    this.nodes.set(value, vertex)

    return vertex
  }

  removeVertex(value) {
    const current = this.nodes.get(value)
    if (current) {
      for (const node of this.nodes.values()) {
        node.removeAdjacent(current)
      }
    }

    this.nodes.delete(value)
  }

  removeEdge(source, destination) {
    const sourceNode = this.nodes.get(source)
    const destinationNode = this.nodes.get(destination)

    if (destinationNode && sourceNode) {
      sourceNode.removeAdjacent(destinationNode)
      if (this.edgeDirection === Graph.UNDIRECTED) {
        destinationNode.removeAdjacent(sourceNode)
      }
    }

    return [sourceNode, destinationNode]
  }

  * bfs(first) {
    const visited = new Map()
    const queue = [first]

    while (queue.length) {
      const vertex = queue.shift()
      if (!visited.has(vertex)) {
        yield vertex
        visited.set(vertex, true)
        vertex.getAdjacents().forEach(adj => queue.push(adj))
      }
    }
  }

  * dfs(first) {
    const visited = new Map()
    const stack = [first]

    while (stack.length) {
      const vertex = stack.pop()
      if (!visited.has(vertex)) {
        yield vertex
        visited.set(vertex, true)
        vertex.getAdjacents().forEach(adj => stack.push(adj))
      }
    }
  }
}
