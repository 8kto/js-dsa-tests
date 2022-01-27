/**
 * @link https://adrianmejia.com/data-structures-for-beginners-graphs-time-complexity-tutorial
 */
export class GraphNode<T = unknown> {
  public value: T
  private readonly adjacents: GraphNode<T>[]

  constructor(value: T) {
    this.value = value
    this.adjacents = []
  }

  addAdjacent(node: GraphNode<T>) {
    this.adjacents.push(node)
  }

  removeAdjacent(node: GraphNode<T>) {
    const index = this.adjacents.indexOf(node)
    if (index !== -1) {
      this.adjacents.splice(index, 1)

      return node
    }
  }

  getAdjacents(): GraphNode<T>[] {
    return this.adjacents
  }

  isAdjacent(node: GraphNode<T>) {
    return this.adjacents.indexOf(node) !== -1
  }
}

export class Graph<T = unknown> {
  static UNDIRECTED = Symbol('directed graph') // two-ways edges
  static DIRECTED = Symbol('undirected graph') // one-way edges

  private readonly nodes: Map<T, GraphNode<T>>
  private readonly edgeDirection: typeof Graph.UNDIRECTED | typeof Graph.DIRECTED

  constructor(edgeDirection = Graph.UNDIRECTED) {
    this.nodes = new Map()
    this.edgeDirection = edgeDirection
  }

  getNodes() {
    return this.nodes
  }

  addEdge(source: T, destination: T) {
    const sourceNode = this.addVertex(source)
    const destinationNode = this.addVertex(destination)

    sourceNode.addAdjacent(destinationNode)
    if (this.edgeDirection === Graph.UNDIRECTED) {
      destinationNode.addAdjacent(sourceNode)
    }

    return [sourceNode, destinationNode]
  }

  addVertex(value: T) {
    if (this.nodes.has(value)) return this.nodes.get(value)

    const vertex = new GraphNode<T>(value)
    this.nodes.set(value, vertex)

    return vertex
  }

  removeVertex(value: T) {
    const current = this.nodes.get(value)
    if (current) {
      for (const node of this.nodes.values()) {
        node.removeAdjacent(current)
      }
    }

    this.nodes.delete(value)
  }

  removeEdge(source: T, destination: T) {
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

  * bfs(first: GraphNode<T>): Generator<GraphNode<T>> {
    const visited = new Map<GraphNode, boolean>()
    const queue: GraphNode<T>[] = [first]

    while (queue.length) {
      const vertex = queue.shift()
      if (!visited.has(vertex)) {
        yield vertex
        visited.set(vertex, true)
        vertex.getAdjacents().forEach(adj => queue.push(adj))
      }
    }
  }

  * dfs(first: GraphNode<T>) {
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
