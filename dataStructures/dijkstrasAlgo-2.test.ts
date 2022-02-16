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

const buildPath = (parents: Record<string, string | null>): string => {
  const st = [parents.end]
  let u: string | null = parents.end as string

  while ((u = parents[u])) {
    st.unshift(u)
  }
  st.push('end')

  return st.join('-')
}

const dijkstrasAlgo = (
  graph: Graph,
  costs: Record<string, number>,
  parents: Record<string, string | null>
) => {
  const processed = {} as Record<string, boolean>

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

  let node = findLowestCostNode(costs)

  while (node) {
    const cost: number = costs[node]
    const neighbors = graph[node]

    for (let n in neighbors) {
      console.log(node, 'neighbor:', n)

      let newCost = cost + neighbors[n]
      console.log({ newCost, cost, n: neighbors[n] })

      if (costs[n] > newCost) {
        costs[n] = newCost
        parents[n] = node
        console.log('updated for', n, { costs, parents })
      }
    }

    processed[node] = true
    node = findLowestCostNode(costs)
  }

  console.log({
    parents,
    costs,
    path: buildPath(parents),
  })

  return buildPath(parents)
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

    const costs: Record<string, number> = {
      a: 6,
      b: 2,
      end: Infinity,
    }

    const parents: Record<string, string | null> = {
      a: 'start',
      b: 'start',
      end: null,
    }

    expect(dijkstrasAlgo(graph, costs, parents)).toEqual('start-b-a-end')
  })

  it.only('does find the shortest path 2', () => {
    const graph: Graph = {
      start: { a: 5, d: 2 },
      a: { b: 4, c: 2 },
      b: { c: 6, end: 3 },
      c: { end: 1 },
      d: { c: 7, a: 8 },
      end: {},
    }

    const costs: Record<string, number> = {
      a: 5,
      d: 2,
      b: Infinity,
      c: Infinity,
      end: Infinity,
    }

    const parents: Record<string, string | null> = {
      a: 'start',
      d: 'start',
      b: null,
      c: null,
      end: null,
    }

    expect(dijkstrasAlgo(graph, costs, parents)).toEqual('start-a-c-end')
  })
})
