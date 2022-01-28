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
  bfs(goal: Vertex, root: Vertex): unknown

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

  bfs(goal: Vertex, root: Vertex = this.vertices[0]) {
    const adj = this.adjacent

    const queue = []
    queue.push(root)

    const discovered: Record<Vertex, boolean> = {}
    discovered[root] = true

    while (queue.length) {
      const v = queue.shift()
      console.log(v)

      // NB the only purpose of this line is to calm down the strict linter
      if (!v) return false

      if (v === goal) {
        return true
      }

      for (let i = 0; i < adj[v].length; i++) {
        if (!discovered[adj[v][i]]) {
          discovered[adj[v][i]] = true
          queue.push(adj[v][i])
        }
      }
    }

    return false
  }
}
