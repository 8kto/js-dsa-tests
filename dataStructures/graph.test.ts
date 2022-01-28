//import {Graph, GraphNode} from './graph'

export class GraphNode<T = unknown> {
  value: T
  private adjacents: GraphNode<T>[]

  constructor(value: T) {
    this.value = value
    this.adjacents = []
  }

  addAdjacent(node: GraphNode<T>) {
    this.adjacents.push(node)
  }

  removeAdjacent(node: GraphNode<T>) {
    this.adjacents = this.adjacents.filter(n => n !== node)

    return node
  }

  getAdjacents() {
    return this.adjacents
  }

  isAdjacent(node: GraphNode<T>) {
    return this.adjacents.some(adj => adj === node)
  }
}

export class Graph<T> {
  static UNDIRECTED = Symbol('undirected graph')
  static DIRECTED = Symbol('directed graph')

  private direction
  private nodes: Map<T, GraphNode<T>>

  constructor(direction = Graph.UNDIRECTED) {
    this.direction = direction
    this.nodes = new Map()
  }

  getNodes() {
    return this.nodes
  }

  addVertex(value: T): GraphNode<T> {
    if (this.nodes.has(value)) return this.nodes.get(value)
    const node = new GraphNode<T>(value)
    this.nodes.set(value, node)

    return node
  }

  removeVertex(value: T) {
    const node = this.nodes.get(value)
    if (node) {
      for (const n of this.nodes.values()) {
        n.removeAdjacent(node)
        node.removeAdjacent(n)
      }
    }

    this.nodes.delete(value)
  }

  addEdge(src: T, target: T) {
    const srcVertex = this.addVertex(src)
    const targetVertex = this.addVertex(target)

    if (srcVertex && targetVertex) {
      srcVertex.addAdjacent(targetVertex)

      if (this.direction === Graph.UNDIRECTED) {
        targetVertex.addAdjacent(srcVertex)
      }
    }

    return [srcVertex, targetVertex]
  }

  removeEdge(src: T, target: T) {
    const srcVertex = this.addVertex(src)
    const targetVertex = this.addVertex(target)

    if (srcVertex && targetVertex) {
      srcVertex.removeAdjacent(targetVertex)

      if (this.direction === Graph.UNDIRECTED) {
        targetVertex.removeAdjacent(srcVertex)
      }
    }

    return [srcVertex, targetVertex]
  }

  *bfs(root: GraphNode) {
    const queue = []
    const visited = new Map()

    queue.push(root)
    while (queue.length) {
      const node = queue.shift()

      if (!visited.has(node)) {
        visited.set(node, true)
        yield node

        node.getAdjacents().forEach(adj => queue.push(adj))
      }
    }
  }

  *dfs(root: GraphNode) {
    const stack = [root]
    const visited = new Map()

    while (stack.length) {
      const node = stack.pop()
      if (!visited.has(node)) {
        visited.set(node, true)
        yield node

        node.getAdjacents().forEach(adj => stack.push(adj))
      }
    }
  }
}

describe('Graph', () => {
  it('addEdge', () => {
    const graph = new Graph<number>(Graph.UNDIRECTED)
    const [first1, third1] = graph.addEdge(1, 3)
    const [first2, second1] = graph.addEdge(1, 2)
    const [second2, third2] = graph.addEdge(2, 3)

    expect(first1).toBe(first2)
    expect(first1.value).toBe(1)
    expect(first1.isAdjacent(third1)).toBe(true)

    expect(second1).toBe(second2)
    expect(second1.value).toBe(2)
    expect(first1.isAdjacent(second1)).toBe(true)

    expect(third1).toBe(third2)
    expect(third1.value).toBe(3)
    expect(second1.isAdjacent(third1)).toBe(true)
  })

  it('removeEdge', () => {
    const graph = new Graph<number>(Graph.UNDIRECTED)
    graph.addEdge(1, 3)
    graph.addEdge(1, 2)
    graph.addEdge(2, 3)

    const [first1, third1] = graph.removeEdge(1, 3)
    const [first2, second1] = graph.removeEdge(1, 2)
    const [second2, third2] = graph.removeEdge(2, 3)

    expect(first1).toBe(first2)
    expect(first1.value).toBe(1)
    expect(first1.isAdjacent(third1)).toBe(false)

    expect(second1).toBe(second2)
    expect(second1.value).toBe(2)
    expect(first1.isAdjacent(second1)).toBe(false)

    expect(third1).toBe(third2)
    expect(third1.value).toBe(3)
    expect(third1.isAdjacent(second1)).toBe(false)
  })

  it('addVertex', () => {
    const graph = new Graph<number>(Graph.UNDIRECTED)
    graph.addVertex(10)
    graph.addVertex(20)
    const [first1, second1] = graph.addEdge(10, 20)

    expect(first1.value).toBe(10)
    expect(second1.value).toBe(20)
    expect(first1.isAdjacent(second1)).toBe(true)
    expect(second1.isAdjacent(first1)).toBe(true)
  })

  it('removeVertex', () => {
    const graph = new Graph<number>(Graph.UNDIRECTED)

    expect(graph.getNodes().size).toEqual(0)
    graph.addVertex(10)
    expect(graph.getNodes().size).toEqual(1)
    graph.addVertex(20)
    expect(graph.getNodes().size).toEqual(2)
    graph.removeVertex(10)
    expect(graph.getNodes().size).toEqual(1)
    graph.removeVertex(20)
    expect(graph.getNodes().size).toEqual(0)
  })

  // TODO find out whether needed or not
  it('removes adjacents for removed Vertex', () => {
    const graph = new Graph<number>(Graph.UNDIRECTED)

    const v1 = graph.addVertex(10)
    const v2 = graph.addVertex(20)
    graph.addEdge(10, 20)
    const [, v3] = graph.addEdge(20, 30)
    graph.addEdge(10, 30)

    expect(v1.isAdjacent(v2)).toBe(true)
    expect(v1.isAdjacent(v3)).toBe(true)
    expect(v2.isAdjacent(v1)).toBe(true)
    expect(v2.isAdjacent(v3)).toBe(true)
    expect(v3.isAdjacent(v2)).toBe(true)
    expect(v3.isAdjacent(v1)).toBe(true)

    graph.removeVertex(10)
    expect(v1.isAdjacent(v2)).toBe(false)
    expect(v1.isAdjacent(v3)).toBe(false)
    expect(v2.isAdjacent(v1)).toBe(false)
    expect(v2.isAdjacent(v3)).toBe(true)
    expect(v3.isAdjacent(v2)).toBe(true)
    expect(v3.isAdjacent(v1)).toBe(false)

    graph.removeVertex(20)
    expect(v1.isAdjacent(v2)).toBe(false)
    expect(v1.isAdjacent(v3)).toBe(false)
    expect(v2.isAdjacent(v1)).toBe(false)
    expect(v2.isAdjacent(v3)).toBe(false)
    expect(v3.isAdjacent(v2)).toBe(false)
    expect(v3.isAdjacent(v1)).toBe(false)

    graph.removeVertex(30)
    expect(v1.isAdjacent(v2)).toBe(false)
    expect(v1.isAdjacent(v3)).toBe(false)
    expect(v2.isAdjacent(v1)).toBe(false)
    expect(v2.isAdjacent(v3)).toBe(false)
    expect(v3.isAdjacent(v2)).toBe(false)
    expect(v3.isAdjacent(v1)).toBe(false)
  })

  describe('search', () => {
    let first: GraphNode<number>, graph: Graph<number>

    beforeEach(() => {
      graph = new Graph<number>(Graph.UNDIRECTED)
      ;[first] = graph.addEdge(1, 2)

      graph.addEdge(1, 3)
      graph.addEdge(1, 4)
      graph.addEdge(5, 2)
      graph.addEdge(6, 3)
      graph.addEdge(7, 3)
      graph.addEdge(8, 4)
      graph.addEdge(9, 5)
      graph.addEdge(10, 6)
    })

    it('bfs', () => {
      const bfsFromFirst = graph.bfs(first)

      expect(bfsFromFirst.next().value.value).toBe(1)
      expect(bfsFromFirst.next().value.value).toBe(2)
      expect(bfsFromFirst.next().value.value).toBe(3)
      expect(bfsFromFirst.next().value.value).toBe(4)
    })

    it('dfs', () => {
      const dfsFromFirst = graph.dfs(first)
      const visitedOrder = Array.from(dfsFromFirst)
      const values = visitedOrder.map(node => node.value)

      expect(values).toEqual([1, 4, 8, 3, 7, 6, 10, 2, 5, 9])
    })
  })
})
