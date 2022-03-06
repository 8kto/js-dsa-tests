/**
 * Dijkstra`s Algo from Grokking algorithms
 * Time complexity: https://www.baeldung.com/cs/dijkstra-time-complexity
 */

/**
        A
     '/ |` \
    6   |   1
   /    |    \,
Start   3    End
   \    |    /`
    2   |   5
     \, | /
        B
 */

type Graph = Record<string, Record<string, number>>

/**
 * Utils is similar to the BFS in graphs
 */
const buildPath = (
  parents: Record<string, string | null>,
  goal: keyof typeof parents
): string => {
  const st = [goal]
  let u: string | null = goal

  while ((u = parents[u])) {
    st.unshift(u)
  }

  return st.join('-')
}

const dijkstrasAlgo = (
  graph: Graph,
  root: keyof typeof graph,
  target: keyof typeof graph
): string => {
  const costs: Record<string, number> = {}
  const parents: Record<string, string | null> = {}
  const processed: Record<string, boolean> = {}

  // Fill the costs and parents for those nodes that are adjacents to the root
  const rootNeighbors = graph[root]
  Object.keys(graph).forEach(node => {
    costs[node] = rootNeighbors[node] ?? Infinity
    parents[node] = rootNeighbors[node] ? root : null
  })

  // While there are non-visited nodes, find the minimal one
  const findLowestCostNode = (costs: Record<string, number>) => {
    let min = Infinity
    let res

    for (const node in costs) {
      if (!processed[node] && min > costs[node]) {
        res = node
        min = costs[node]
      }
    }

    return res
  }

  let node
  while ((node = findLowestCostNode(costs))) {
    const cost = costs[node]
    const neighbors = graph[node]

    for (let n in neighbors) {
      let newCost = cost + neighbors[n]

      if (costs[n] > newCost) {
        costs[n] = newCost
        parents[n] = node
      }
    }

    processed[node] = true
  }

  return buildPath(parents, target)
}

export {}

describe('Dijkstra`s Algo', () => {
  it('does find the shortest path', () => {
    const graph: Graph = {
      start: { a: 6, b: 2 },
      a: { end: 1 },
      b: { a: 3, end: 5 },
      end: {},
    }

    expect(dijkstrasAlgo(graph, 'start', 'end')).toEqual('start-b-a-end')
  })

  it('does find the shortest path 2', () => {
    const graph: Graph = {
      start: { a: 5, d: 2 },
      a: { b: 4, c: 2 },
      b: { c: 6, end: 3 },
      c: { end: 1 },
      d: { c: 7, a: 8 },
      end: {},
    }

    expect(dijkstrasAlgo(graph, 'start', 'end')).toEqual('start-a-c-end')
  })
})
