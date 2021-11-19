import { GridNode, } from "../astar/Graph";
import Graph from "../astar/Graph";
import AStar, { Heuristics } from "../astar/AStar";

export enum MapTileWeight {
  Barrel = -7, // 油桶
  Barricade = -6, // 路障
  Brick = -5,
  Crate = -4, // 箱子
  // Fence = -4,
  Sandbag = -3, // 沙袋
  Stone = -2,
  Tree = -1,
  Wall = 0,
  Weight1 = 1,
  Weight3 = 3,
  Weight5 = 5
}

export default class GMap {
  tileWidth: number = 0;
  tileHeight: number = 0;
  mapInfo: Array<Array<number>>;
  mapStyles: Array<Array<string>>;
  graph: Graph;


  public clean() {
    this.mapInfo = null;
    this.mapStyles = null;
    this.graph = null;
  }

  public isObstacle(row: number, col: number): boolean {
    return this.mapInfo[row][col] <= MapTileWeight.Wall;
  }

  public generateMap(row: number, col: number, tileWidth: number, tileHeight: number, wallDensity: number, multiWeight: boolean) {
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.mapInfo = new Array<Array<number>>(row);
    this.mapStyles = new Array<Array<string>>(row);
    for (let i = 0; i < row; ++i) {
      this.mapInfo[i] = new Array(col);
      this.mapStyles[i] = new Array(col);
      for (let j = 0; j < col; ++j) {
        var cellWeight = Math.floor(Math.random() * wallDensity);
        if (cellWeight !== MapTileWeight.Wall) {
          cellWeight = multiWeight ? (Math.floor(Math.random() * 3)) * 2 + 1 : 1;
        } else {
          cellWeight = -((Math.floor(Math.random() * 7)) + 1) % 10;
        }

        this.mapInfo[i][j] = cellWeight;

        switch (cellWeight) {
          case MapTileWeight.Barrel: // random from 0-7
            this.mapStyles[i][j] = `barrel_${((Math.floor(Math.random() * 7)) + 1)}`;
            break;
          case MapTileWeight.Barricade: // random from 0-1
            this.mapStyles[i][j] = `barricade_${((Math.floor(Math.random() * 1)) + 1)}`;
            break;
          case MapTileWeight.Brick: // random from 0-3
            this.mapStyles[i][j] = `brick_${((Math.floor(Math.random() * 3)) + 1)}`;
            break;
          case MapTileWeight.Crate: // random from 0-1
            this.mapStyles[i][j] = `crate_${((Math.floor(Math.random() * 1)) + 1)}`;
            break;
          case MapTileWeight.Sandbag: // random from 0-1
            this.mapStyles[i][j] = `sandbag_${((Math.floor(Math.random() * 1)) + 1)}`;
            break;
          case MapTileWeight.Stone: // random from 0-2
            this.mapStyles[i][j] = `stone_${((Math.floor(Math.random() * 2)) + 1)}`;
            break;
          case MapTileWeight.Tree: // random from 0-7
            this.mapStyles[i][j] = `tree_${((Math.floor(Math.random() * 7)) + 1)}`;
            break;
          case MapTileWeight.Wall: // random from 0-3
            this.mapStyles[i][j] = `brick_${((Math.floor(Math.random() * 3)) + 1)}`;
            break;
          default:
            this.mapStyles[i][j] = `empty`;
        }
      }
    }
    this.graph = new Graph(this.mapInfo, false);
  }

  public findPath(startPos: GridNode, destPos: GridNode, closest: boolean): GridNode[] {
    return AStar.search(this.graph, startPos, destPos, closest, Heuristics.manhattan);
  }

  // 生成 count个目标位置pos附近的点
  public getPositionAround(pos: GridNode, count: number): GridNode[] {
    let dest: GridNode[] = [];

    let row = this.mapInfo.length;
    let col = this.mapInfo[0].length;

    let i = 1;
    let x = pos.x, y = pos.y;
    while (dest.length < count) {
      i++;
      for (let j = 0; j < i; ++j) {

        if (x < j) { continue; }

        if (!this.isObstacle(x - j, y)) { dest.push(new GridNode(x - j, y)); }


      }



      if (this.isObstacle(x, y)) continue;
      else dest.push(new GridNode(x, y));
    }


    let minRange = Math.ceil(count / 4) + 1; // min i

    let obstacle = 0;

    let halfRange = Math.floor(minRange / 2);
    let leftRange = minRange - halfRange;

    if (pos.x < halfRange) { }

    for (let i = 0; i < minRange; ++i) {
      for (let j = 0; j < minRange; ++j) {
        if (dest.length == count) return dest;
        if (this.isObstacle(pos.x - i, pos.y - j)) {
          obstacle++;
        } else {
          dest.push(new GridNode(pos.x - i, pos.y - j));
        }
      }
    }


    return null;
  }
}