import {Graph, GraphNode} from './graph'

describe('Graph', () => {
  it('addEdge', () => {
    const graph = new Graph<number>(Graph.UNDIRECTED)
    const [first1, third1] = graph.addEdge(1, 3)
    const [first2, second1] = graph.addEdge(1, 2)
    const [second2, third2] = graph.addEdge(2, 3)

    expect(first1).toBe(first2)
    expect(first1.value).toBe(1)
    expect(second1).toBe(second2)
    expect(second1.value).toBe(2)
    expect(third1).toBe(third2)
    expect(third1.value).toBe(3)
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
    expect(second1).toBe(second2)
    expect(second1.value).toBe(2)
    expect(third1).toBe(third2)
    expect(third1.value).toBe(3)
  })

  it('addVertex', () => {
    const graph = new Graph<number>(Graph.UNDIRECTED)
    graph.addVertex(10)
    graph.addVertex(20)
    const [first1, second1] = graph.addEdge(10, 20)

    expect(first1.value).toBe(10)
    expect(second1.value).toBe(20)
  })

  it('addVertex', () => {
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