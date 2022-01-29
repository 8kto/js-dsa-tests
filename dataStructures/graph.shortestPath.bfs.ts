/**
 * Shortest Path Graph Traversal
 * https://jarednielsen.com/data-structure-graph-shortest-path/?utm_source=pocket_mylist
 */
export type Vertex = string

/* eslint-disable no-unused-vars */

export interface IGraph {
  // Generic graph methods
  addVertex(v: Vertex): void
  addEdge(v: Vertex, w: Vertex): void
  getVertices(): Vertex[]
  getAdjacent(): Record<Vertex, Vertex[]>
  getEdges(): number

  // The goal of this file is to master this method
  bfs(goal: Vertex, root?: Vertex): { distance: number; path: string } | false

  // This is an intermediate method, which logic can be used in solving problems as well
  bfsEdges(goal: Vertex, root?: Vertex): Record<Vertex, number> | false
}
/* eslint-enable no-unused-vars */

export class Graph implements IGraph {
  private readonly vertices: Vertex[]
  private readonly adjacent: Record<Vertex, Vertex[]>
  private edges: number

  constructor() {
    this.vertices = []
    this.adjacent = {}
    this.edges = 0
  }

  getVertices(): Vertex[] {
    return this.vertices
  }

  getAdjacent(): Record<Vertex, Vertex[]> {
    return this.adjacent
  }

  getEdges(): number {
    return this.edges
  }

  addVertex(v: Vertex) {
    this.vertices.push(v)
    this.adjacent[v] = []
  }

  addEdge(v: Vertex, w: Vertex) {
    this.adjacent[v].push(w)
    this.adjacent[w].push(v)
    this.edges++
  }

  bfsEdges(goal: Vertex, root: Vertex = this.vertices[0]) {
    const queue: Vertex[] = []
    queue.push(root)

    const visited: Record<Vertex, boolean> = {}
    visited[root] = true

    const edges: Record<Vertex, number> = {}
    edges[root] = 0

    while (queue.length) {
      const vertex = queue.shift() as Vertex

      if (vertex === goal) return edges
      // A simple distance to the goal can be returned as:
      //if (vertex === goal) return edges[goal]

      for (let i = 0; i < this.adjacent[vertex].length; i++) {
        const adj = this.adjacent[vertex][i]

        if (!visited[adj]) {
          visited[adj] = true
          queue.push(adj)
          edges[adj] = edges[vertex] + 1
        }
      }
    }

    return false
  }

  buildPath(goal: Vertex, predecessors: Record<Vertex, Vertex | null>): string {
    const stack = [goal]

    let u: Vertex | null = goal
    while ((u = predecessors[u])) {
      stack.push(u)
    }

    return stack.reverse().join('-')
  }

  bfs(goal: Vertex, root: Vertex = this.vertices[0]) {
    const queue: Vertex[] = []
    queue.push(root)

    const visited: Record<Vertex, boolean> = {}
    visited[root] = true

    const edges: Record<Vertex, number> = {}
    edges[root] = 0

    const predecessors: Record<Vertex, Vertex | null> = {}
    predecessors[root] = null

    while (queue.length) {
      const vertex = queue.shift() as Vertex

      if (vertex === goal) {
        return {
          distance: edges[goal],
          path: this.buildPath(goal, predecessors),
        }
      }

      this.adjacent[vertex].forEach(adj => {
        if (!visited[adj]) {
          visited[adj] = true
          queue.push(adj)
          edges[adj] = edges[vertex] + 1
          predecessors[adj] = vertex
        }
      })
    }

    return false
  }
}
