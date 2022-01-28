import { Graph, IGraph } from './graph.shortestPath.bfs'

/*
     A
   / │ \
 B ──│── D
   \ │ /  \
     C     F
     │      \
     E       G
 */
const buildGraph = (graph: IGraph): IGraph => {
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

  return graph
}

describe('Shortest Path Graph Traversal', () => {
  let graph: IGraph

  beforeEach(() => {
    graph = buildGraph(new Graph())
  })

  it('graph does the job', () => {
    expect(graph.getVertices()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
    expect(graph.getEdges()).toEqual(9)
    expect(graph.getAdjacent()).toEqual({
      'A': ['B', 'C', 'D'],
      'B': ['A', 'C', 'D'],
      'C': ['A', 'B', 'D', 'E'],
      'D': ['A', 'B', 'C', 'F'],
      'E': ['C'],
      'F': ['D', 'G'],
      'G': ['F'],
    })
  })

  describe('BFS return edges', () => {
    it('returns false for unknown vertex', () => {
      expect(graph.bfsEdges('X')).toEqual(false)
    })

    it('simple search', () => {
      expect(graph.bfsEdges('G')).toEqual({
        'A': 0,
        'B': 1,
        'C': 1,
        'D': 1,
        'E': 2,
        'F': 2,
        'G': 3,
      })
    })
  })

  describe('BFS returns path', () => {
    it('returns false for unknown vertex', () => {
      expect(graph.bfsEdges('X')).toEqual(false)
    })

    it('simple search', () => {
      expect(graph.bfsEdges('G')).toEqual({
        'A': 0,
        'B': 1,
        'C': 1,
        'D': 1,
        'E': 2,
        'F': 2,
        'G': 3,
      })
    })
  })
})
