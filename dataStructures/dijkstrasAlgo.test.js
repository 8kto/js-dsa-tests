import { findShortestPath } from './dijkstrasAlgo'

const getGraph = () => ({
  start: { A: 5, B: 2 },
  A: { start: 1, C: 4, D: 2 },
  B: { A: 8, D: 7 },
  C: { D: 6, finish: 3 },
  D: { finish: 1 },
  finish: {},
})

describe('Dijkstra`s', () => {
  let graph

  beforeEach(() => {
    graph = getGraph()
  })

  it('finds path', () => {
    expect(findShortestPath(graph, 'start', 'finish')).toEqual({
      distance: 8,
      path: ['start', 'A', 'D', 'finish'],
    })
  })

  it('finds path 2', () => {
    expect(findShortestPath(graph, 'A', 'B')).toEqual({
      distance: 3,
      path: ['A', 'start', 'B'],
    })
  })

  it('finds path 3', () => {
    expect(findShortestPath(graph, 'A', 'start')).toEqual({
      distance: 1,
      path: ['A', 'start'],
    })
  })
})
