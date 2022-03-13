export class GraphFromDict<T extends string | number = string> {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly vertices: Record<T, T[]>) {}

  buildPath(goal: T, predecessors: Record<T, T | null>) {
    const st = [goal]
    let u: T | null = goal

    while ((u = predecessors[u])) {
      st.unshift(u)
    }

    return st.join('-')
  }

  bfsShortest(goal: T, root: T) {
    const queue = [root]
    const edges = { [root]: 0 }
    const visited = { [root]: true }
    const predecessors = { [root]: null } as Record<T, T | null>

    while (queue.length) {
      const v = queue.shift() as T

      if (v === goal) {
        return {
          distance: edges[v],
          path: this.buildPath(goal, predecessors),
        }
      }

      const adjs = this.vertices[v]
      adjs.forEach(val => {
        if (!visited[val]) {
          visited[val] = true
          queue.push(val)
          edges[val] = edges[v] + 1
          predecessors[val] = v
        }
      })
    }

    return false
  }
}

describe('Graph', () => {
  describe('shortest path over phone numpad', () => {
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
    const graph = new GraphFromDict<number>(vertices)

    it('does not find the shortest path', () => {
      expect(graph.bfsShortest(11, 1)).toEqual(false)
    })

    it('finds the shortest path 0', () => {
      expect(graph.bfsShortest(1, 1)).toEqual({
        'distance': 0,
        'path': '1',
      })
    })

    it('finds the shortest path 1', () => {
      expect(graph.bfsShortest(3, 7)).toEqual({
        'distance': 2,
        'path': '7-5-3',
      })
    })

    it('finds the shortest path 2', () => {
      expect(graph.bfsShortest(2, 1)).toEqual({
        'distance': 1,
        'path': '1-2',
      })
    })

    it('finds the shortest path 3', () => {
      expect(graph.bfsShortest(4, 3)).toEqual({
        'distance': 2,
        'path': '3-2-4',
      })
    })
  })
})
