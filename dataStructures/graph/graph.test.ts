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

export class Graph<T extends string | number = string> {
  static UNDIRECTED = Symbol('undirected graph')
  static DIRECTED = Symbol('directed graph')

  private readonly direction
  private readonly nodes: Map<T, GraphNode<T>>

  constructor(direction = Graph.UNDIRECTED) {
    this.direction = direction
    this.nodes = new Map()
  }

  getNodes() {
    return this.nodes
  }

  addVertex(value: T): GraphNode<T> {
    if (this.nodes.has(value)) {
      return this.nodes.get(value) as GraphNode<T>
    }

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
    const queue: GraphNode[] = []
    const visited = new Map()

    queue.push(root)
    while (queue.length) {
      const node = queue.shift() as GraphNode

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
      const node = stack.pop() as GraphNode
      if (!visited.has(node)) {
        visited.set(node, true)
        yield node

        node.getAdjacents().forEach(adj => stack.push(adj))
      }
    }
  }

  buildPath(goal: T, predecessors: Record<T, T | null>) {
    const st = [goal]
    let u: T | null = goal

    while ((u = predecessors[u])) {
      st.unshift(u)
    }

    return st.join('-')
  }

  bfsShortest(goal: T, root: T) {
    const queue: T[] = []
    const visited = {} as Record<T, boolean>
    const edges = {} as Record<T, number>
    const predecessors = {} as Record<T, T | null>

    queue.push(root)
    visited[root] = true
    edges[root] = 0
    predecessors[root] = null

    while (queue.length) {
      const v = queue.shift() as T

      if (v === goal) {
        return {
          distance: edges[goal],
          path: this.buildPath(goal, predecessors),
        }
      }

      const vertex = this.nodes.get(v) as GraphNode<T>
      const adjs = vertex.getAdjacents()

      adjs.forEach(({ value }) => {
        if (!visited[value]) {
          queue.push(value)
          visited[value] = true
          edges[value] = edges[v] + 1
          predecessors[value] = v
        }
      })
    }

    return false
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

      const visitedOrder = Array.from(bfsFromFirst)
      const values = visitedOrder.map(node => node.value)

      expect(values).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    it('dfs', () => {
      const dfsFromFirst = graph.dfs(first)
      const visitedOrder = Array.from(dfsFromFirst)
      const values = visitedOrder.map(node => node.value)

      expect(values).toEqual([1, 4, 8, 3, 7, 6, 10, 2, 5, 9])
    })
  })

  describe('BFS returns path', () => {
    const graph = new Graph<string>()
    graph.addVertex('A')
    graph.addVertex('B')
    graph.addVertex('C')
    graph.addVertex('D')
    graph.addVertex('E')
    graph.addVertex('F')
    graph.addVertex('G')

    graph.addEdge('A', 'B')
    graph.addEdge('A', 'C')
    graph.addEdge('A', 'D')
    graph.addEdge('B', 'C')
    graph.addEdge('B', 'D')
    graph.addEdge('C', 'D')
    graph.addEdge('C', 'E')
    graph.addEdge('D', 'F')
    graph.addEdge('F', 'G')

    it('returns false for unknown vertex', () => {
      expect(graph.bfsShortest('X', 'A')).toEqual(false)
    })

    it('shortest path search A-G', () => {
      const { distance, path } = graph.bfsShortest('G', 'A') || {}

      expect(distance).toEqual(3)
      expect(path).toEqual('A-D-F-G')
    })

    it('shortest path search A-E', () => {
      const { distance, path } = graph.bfsShortest('E', 'A') || {}

      expect(distance).toEqual(2)
      expect(path).toEqual('A-C-E')
    })

    it('shortest path search from vertex B-F', () => {
      const { distance, path } = graph.bfsShortest('F', 'B') || {}

      expect(distance).toEqual(2)
      expect(path).toEqual('B-D-F')
    })

    it('shortest path search from vertex G-E', () => {
      const { distance, path } = graph.bfsShortest('G', 'E') || {}

      expect(distance).toEqual(4)
      expect(path).toEqual('E-C-D-F-G')
    })

    describe('shortest path over phone numpad', () => {
      const graph = new Graph()
      /*
        7 8 9
        4 5 6
        1 2 3
       */
      const vertices = {
        1: [2, 4, 5],
        2: [1, 4, 5, 6, 3],
        3: [2, 5, 6],
        4: [1, 2, 5, 8, 7],
        5: [4, 1, 2, 3, 6, 9, 8, 7],
        6: [3, 2, 5, 8, 9],
        7: [4, 5, 8],
        8: [7, 4, 5, 6, 9],
        9: [5, 6, 8],
      }
      Object.entries(vertices).forEach(([vertex, adjs]) => {
        adjs.forEach(adj => {
          graph.addVertex(`${vertex}`)
          graph.addVertex(`${adj}`)
          graph.addEdge(`${vertex}`, `${adj}`)
        })
      })

      it('finds the shortest path 1', () => {
        expect(graph.bfsShortest('3', '7')).toEqual({
          'distance': 2,
          'path': '7-5-3',
        })
      })

      it('finds the shortest path 2', () => {
        expect(graph.bfsShortest('2', '1')).toEqual({
          'distance': 1,
          'path': '1-2',
        })
      })

      it('finds the shortest path 3', () => {
        expect(graph.bfsShortest('4', '3')).toEqual({
          'distance': 2,
          'path': '3-2-4',
        })
      })
    })
  })
})
