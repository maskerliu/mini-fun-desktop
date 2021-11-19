import { GridNode } from "../astar/Graph";
import GMap from "./GMap";
import GPlayerUnit, { GPlayerUnitType } from "./GPlayerUnit";


export enum GPlayerType {
  UNKNOWN = -1,
  Beige = 0,
  Blue = 1,
  Green = 2,
  Red = 3
}


export default class GPlayer {

  pid: string = null;
  name: string = null;
  type: GPlayerType = GPlayerType.UNKNOWN;
  gold: number = 0; // 经济
  units: GPlayerUnit[] = null;


  constructor(pid: string, name: string, type: GPlayerType) {
    this.pid = pid;
    this.name = name;
    this.type = type;
    this.units = [];
  }

  generateUnit(type: GPlayerUnitType, map: GMap) {
    let unit: GPlayerUnit = new GPlayerUnit(new GridNode(1, 2), this.type, type, map);
    this.units.push(unit);
  }



}