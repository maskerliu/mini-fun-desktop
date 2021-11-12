
export class GridNode {
  x: number;
  y: number;
  weight: number;

  f: number = 0;
  g: number = 0;
  h: number = 0;

  visited: boolean = false;
  closed: boolean = false;
  parent: GridNode = null;

  public constructor(x: number, y: number, weight: number) {
    this.x = x;
    this.y = y;
    this.weight = weight;
  }

  public getCost(fromNeighbor: GridNode) {
    if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
      return this.weight * 1.41421;
    }
    return this.weight;
  }

  public isWall(): boolean {
    return this.weight === 0;
  }

  public equal(node: GridNode): boolean {
    return (this.x === node.x && this.y === node.y);
  }

  public clean() {
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.visited = false;
    this.closed = false;
    this.parent = null;
  }

  toString(): string {
    return `${this.x}_${this.y}`
  }
}

export default class Graph {

  private nodes: Array<GridNode>;
  private grid: Array<Array<GridNode>>;
  private dirtyNodes: Array<GridNode>;

  private diagonal: boolean = false;

  public constructor(gridIn: Array<Array<number>>, diagonal: boolean) {
    this.nodes = [];
    this.diagonal = diagonal;
    this.grid = [];
    for (let x = 0; x < gridIn.length; ++x) {
      this.grid[x] = [];
      for (let y = 0, row = gridIn[x]; y < row.length; ++y) {
        let node = new GridNode(x, y, row[y]);
        this.grid[x][y] = node;
        this.nodes.push(node);
      }
    }

    this.init();
  }

  private init() {
    this.dirtyNodes = [];
    for (let i = 0; i < this.nodes.length; ++i) {
      this.nodes[i].clean();
    }
  }

  public cleanDirty() {
    for (var i = 0; i < this.dirtyNodes.length; i++) {
      this.dirtyNodes[i].clean();
    }
    this.dirtyNodes = [];
  }

  public markDirty(node: GridNode) {
    this.dirtyNodes.push(node);
  }

  public neighbors(node: GridNode): Array<GridNode> {
    let ret = [];
    let x = node.x;
    let y = node.y;
    let grid = this.grid;

    // West
    if (grid[x - 1] && grid[x - 1][y]) {
      ret.push(grid[x - 1][y]);
    }

    // East
    if (grid[x + 1] && grid[x + 1][y]) {
      ret.push(grid[x + 1][y]);
    }

    // South
    if (grid[x] && grid[x][y - 1]) {
      ret.push(grid[x][y - 1]);
    }

    // North
    if (grid[x] && grid[x][y + 1]) {
      ret.push(grid[x][y + 1]);
    }

    if (this.diagonal) {
      // Southwest
      if (grid[x - 1] && grid[x - 1][y - 1]) {
        ret.push(grid[x - 1][y - 1]);
      }

      // Southeast
      if (grid[x + 1] && grid[x + 1][y - 1]) {
        ret.push(grid[x + 1][y - 1]);
      }

      // Northwest
      if (grid[x - 1] && grid[x - 1][y + 1]) {
        ret.push(grid[x - 1][y + 1]);
      }

      // Northeast
      if (grid[x + 1] && grid[x + 1][y + 1]) {
        ret.push(grid[x + 1][y + 1]);
      }
    }
    return ret;
  }

  public toString(): string {
    let graphStr = [];
    let nodes = this.grid;
    for (let x = 0; x < nodes.length; ++x) {
      let rowDebug = [];
      let row = nodes[x];
      for (var y = 0; y < row.length; ++y) {
        rowDebug.push(row[y].weight);
      }
      graphStr.push(rowDebug.join(" "));
    }
    return graphStr.join("\n");
  }
}