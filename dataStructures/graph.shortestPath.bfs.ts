/**
 * Shortest Path Graph Traversal
 * https://jarednielsen.com/data-structure-graph-shortest-path/?utm_source=pocket_mylist
 */
export type Vertex = string

export interface IGraph {
  // eslint-disable-next-line no-unused-vars
  addVertex(v: Vertex): void
  // eslint-disable-next-line no-unused-vars
  addEdge(v: Vertex, w: Vertex): void
  // eslint-disable-next-line no-unused-vars
  bfs(goal: Vertex, root?: Vertex): unknown | boolean
  // eslint-disable-next-line no-unused-vars
  bfsEdges(goal: Vertex, root?: Vertex): unknown | boolean

  getVertices(): Vertex[]
  getAdjacent(): Record<Vertex, Vertex[]>
  getEdges(): number
}

export class Graph implements IGraph {
  private vertices: Vertex[]
  private adjacent: Record<Vertex, Vertex[]>
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

  bfs(goal: Vertex, root: Vertex = this.vertices[0]) {
    const queue: Vertex[] = []
    queue.push(root)

    const visited: Record<Vertex, boolean> = {}
    visited[root] = true

    const edges: Record<Vertex, number> = {}
    edges[root] = 0

    while (queue.length) {
      const vertex = queue.shift() as Vertex

      if (vertex === goal) return edges

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
}
