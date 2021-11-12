import { GridNode, } from "./astar/Graph";
import Graph from "./astar/Graph";
import AStar, { Heuristics } from "./astar/AStar";

export enum MapWeight {
  WALL = 0,
  WEIGHT1 = 1,
  WEIGHT3 = 3,
  WEIGHT5 = 5
}

export default class GMap {

  tileWidth: number = 0;
  tileHeight: number = 0;
  mapInfo: Array<Array<number>>;
  graph: Graph;

  public clean() {
    this.mapInfo = null;
    this.graph = null;
  }

  public isWall(row: number, col: number): boolean {
    return this.mapInfo[row][col] === MapWeight.WALL;
  }

  public generateMap(row: number, col: number, tileWidth: number, tileHeight: number, wallDensity: number, multiWeight: boolean) {
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.mapInfo = new Array<Array<number>>(row);
    for (let i = 0; i < row; ++i) {
      this.mapInfo[i] = new Array(col);
      for (let j = 0; j < col; ++j) {
        var cellWeight = Math.floor(Math.random() * wallDensity);
        if (cellWeight !== MapWeight.WALL) {
          cellWeight = multiWeight ? (Math.floor(Math.random() * 3)) * 2 + 1 : 1;
        }

        this.mapInfo[i][j] = cellWeight;
      }
    }
    this.graph = new Graph(this.mapInfo, false);
  }

  public findPath(startPos: GridNode, destPos: GridNode, closest: boolean): GridNode[] {
    return AStar.search(this.graph, startPos, destPos, closest, Heuristics.manhattan);
  }
}