const { Graph } = require('./graph')

describe('Graph', () => {
  it('searches [bfs]', () => {
    const graph = new Graph(Graph.UNDIRECTED)

    const [first] = graph.addEdge(1, 2)
    graph.addEdge(1, 3)
    graph.addEdge(1, 4)
    graph.addEdge(5, 2)
    graph.addEdge(6, 3)
    graph.addEdge(7, 3)
    graph.addEdge(8, 4)
    graph.addEdge(9, 5)
    graph.addEdge(10, 6)

    const bfsFromFirst = graph.bfs(first)

    expect(bfsFromFirst.next().value.value).toBe(1)
    expect(bfsFromFirst.next().value.value).toBe(2)
    expect(bfsFromFirst.next().value.value).toBe(3)
    expect(bfsFromFirst.next().value.value).toBe(4)
  })

  it('searches [dfs]', () => {
    const graph = new Graph(Graph.UNDIRECTED)

    const [first] = graph.addEdge(1, 2)
    graph.addEdge(1, 3)
    graph.addEdge(1, 4)
    graph.addEdge(5, 2)
    graph.addEdge(6, 3)
    graph.addEdge(7, 3)
    graph.addEdge(8, 4)
    graph.addEdge(9, 5)
    graph.addEdge(10, 6)

    const dfsFromFirst = graph.dfs(first)
    const visitedOrder = Array.from(dfsFromFirst)
    const values = visitedOrder.map(node => node.value)

    expect(values).toEqual([1, 4, 8, 3, 7, 6, 10, 2, 5, 9])
  })
})