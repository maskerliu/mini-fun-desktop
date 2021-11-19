import { GridNode } from "../astar/Graph";
import GMap from "./GMap";
import PlayerUnitConfig from "./GameConfig";
import GPlayer, { GPlayerType } from "./GPlayer";

export const PlayerUnit_Width: number = 60;
export const PlayerUnit_Height: number = 60;

export enum GPlayerUnitType {
  Tank = 0,
  Medical = 1,
  Plane = 2,
  Soldier = 3
}

export default class GPlayerUnit {

  id: string;
  name: string;
  color: string;
  startPos: GridNode;
  playerType: GPlayerType;
  type: GPlayerUnitType;
  avatar: string; // 单位类型

  range: number; // 攻击范围
  hp: number; // 生命值

  animTimers: any[] = [];
  path: GridNode[] = null;
  curDeg: number = 0;

  private zoom: number = 1;

  private map: GMap = null;
  public elPlayer: HTMLElement = null;
  private elProfile: HTMLElement = null;
  private elHP: HTMLElement = null;

  public isSelected: boolean = false;
  private destPos: GridNode = null;

  public constructor(startPos: GridNode, playerType: GPlayerType, unitType: GPlayerUnitType, map: GMap) {
    this.id = `p${startPos.toString()}${new Date().getMilliseconds()}`;
    this.startPos = startPos;
    this.playerType = playerType;
    this.type = unitType;
    this.map = map;

    switch (this.type) {
      case GPlayerUnitType.Tank:
        this.avatar = `tank_${playerType}`;
        this.zoom = 0.3;
        break;
      case GPlayerUnitType.Medical:
        this.avatar = `medical_${playerType}`;
        this.zoom = 0.3;
        break;
      case GPlayerUnitType.Plane:
        this.avatar = `plane_heavy`;
        this.zoom = 0.6;
        break;
      case GPlayerUnitType.Soldier:
        this.avatar = `soldier_${playerType}`;
        this.zoom = 0.6;
        break;
    }
  }

  public bindAvatar(player: HTMLElement, dir: number) {
    this.elPlayer = player;
    this.elHP = player.querySelector("div.unit_hp_bar.hp");
    this.elProfile = player.querySelector("div.unit_profile");

    this.curDeg = dir;

    this.elHP.style.width = `${this.hp}%`;
    let hpColor = "#4bdf78"
    if (this.hp <= 30) {
      hpColor = "#d82727";
    } else if (this.hp <= 70) {
      hpColor = "#e6aa2b";
    }
    this.elHP.style.background = hpColor;

    let offsetX = (PlayerUnit_Width - this.map.tileWidth) / 2;
    let offsetY = (PlayerUnit_Height - this.map.tileHeight) / 2;
    this.elPlayer.style.margin = `${-offsetY}px ${-offsetX}px`;
    this.elPlayer.style.transform = `translate(${this.map.tileWidth * this.startPos.y}px, ${this.map.tileHeight * this.startPos.x}px)`;

    this.elProfile.style.top = 15 / this.zoom + 'px';
    this.elProfile.style.left = 15 / this.zoom + 'px';
    this.elProfile.style.transform = `rotate(${dir}deg)`;

  }

  public setDest(row: number, col: number) {
    this.stopAnim();

    this.destPos = new GridNode(row, col, this.map.mapInfo[row][col]);
    this.path = this.map.findPath(this.startPos, this.destPos, false);
    let sTime = performance ? performance.now() : new Date().getTime();
    let fTime = performance ? performance.now() : new Date().getTime();
    let duration = (fTime - sTime).toFixed(2);

    if (this.path.length > 0) {
      this.animTimers = [];
      this.animByPath();
    }
  }

  public stopAnim() {

    if (this.animTimers == null) {
      return;
    }

    this.animTimers.forEach((timer: number, index: number) => { clearTimeout(timer); });
    this.animTimers = null;
    this.path = null;
  }

  private animByPath() {
    let deg = 0;
    this.animTimers = [];
    for (let i = 0; i < this.path.length; ++i) {
      let timer = setTimeout(() => {
        if (this.path[i].x > this.startPos.x) deg = 90;
        else if (this.path[i].x < this.startPos.x) deg = 270;

        if (this.path[i].y > this.startPos.y) deg = 0;
        else if (this.path[i].y < this.startPos.y) deg = 180;


        if (deg == 270 && (this.curDeg == 0 || this.curDeg == -90)) {
          deg = -90;
        }

        if (this.curDeg == -90 && deg == 180) {
          this.elProfile.style.transform = `rotate(270deg)`;
        }
        this.startPos = this.path[i];
        this.curDeg = deg;

        this.elPlayer.style.transition = "transform 300ms linear";
        this.elPlayer.style.transform = `translate(${this.map.tileWidth * this.path[i].y}px, ${this.map.tileHeight * this.path[i].x}px) `;

        this.elProfile.style.transition = "transform 100ms linear";
        this.elProfile.style.transform = `rotate(${deg}deg)`;
      }, 300 * (i + 1));

      this.animTimers.push(timer);
    }
  }

  private autoAttack() { // 自动攻击

  }
}