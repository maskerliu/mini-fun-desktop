import { GridNode } from "./astar/Graph";
import GMap from "./GMap";

export const Player_Width: number = 50;
export const Player_Height: number = 50;

export default class GPlayer {

  id: string;
  name: string;
  color: string;
  startPos: GridNode;
  type: string; // tank

  hp: number;


  pathBreak: boolean = false;

  private map: GMap = null;
  private elPlayer: HTMLElement = null;
  private elProfile: HTMLElement = null;
  private elHP: HTMLElement = null;

  public isSelected: boolean = false;
  private destPos: GridNode = null;


  constructor(startPos: GridNode, name: string, type: string, hp: number, map: GMap) {
    this.id = `p${startPos.toString()}${new Date().getMilliseconds()}`;
    this.startPos = startPos;
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.map = map;
  }

  bindAvatar(player: HTMLElement) {
    this.elPlayer = player;
    this.elHP = player.querySelector("div.hp-bar.hp");
    this.elProfile = player.querySelector("div.player-profile");

    this.elHP.style.width = `${this.hp}%`;
    let hpColor = "#4bdf78"
    if (this.hp <= 30) {
      hpColor = "#d82727";
    } else if (this.hp <= 70) {
      hpColor = "#e6aa2b";
    }
    this.elHP.style.background = hpColor;

    let offsetX = (Player_Width - this.map.tileWidth)/2;
    let offsetY = (Player_Height - this.map.tileHeight)/2;
    console.log(`${-offsetY}px ${-offsetX}px`);
    this.elPlayer.style.margin = `${-offsetY}px ${-offsetX}px`;
    this.elPlayer.style.transition = "transform 20ms linear";
    this.elPlayer.style.transform = `translate(${this.map.tileWidth * this.startPos.y}px, ${this.map.tileHeight * this.startPos.x}px)`;

    this.elProfile.style.transition = "transform 20ms linear";
    this.elProfile.style.transform = `rotate(0deg)`;

  }

  setDest(row: number, col: number) {
    this.pathBreak = true;
    this.destPos = new GridNode(row, col, this.map.mapInfo[row][col]);

    let path = this.map.findPath(this.startPos, this.destPos, false);
    let sTime = performance ? performance.now() : new Date().getTime();
    let fTime = performance ? performance.now() : new Date().getTime();
    let duration = (fTime - sTime).toFixed(2);
    if (path.length === 0) {
      this.animateNoPath();
    } else {
      this.runToDest(path);
    }
  }

  runToDest(path: GridNode[]) {
    this.pathBreak = false;
    this.animateByStep(path, 0);
  }

  removePath(path: GridNode[]) {

  }

  animateNoPath() {

  }

  animateByStep(path: GridNode[], i: number) {
    if (i >= path.length) {
      this.removePath(path);
      this.startPos = this.destPos;
      return;
    }

    let deg = 0;
    if (i > 0) {
      if (path[i].x > path[i - 1].x) deg = 90;
      else if (path[i].x < path[i - 1].x) deg = -90;

      if (path[i].y > path[i - 1].y) deg = 0;
      else if (path[i].y < path[i - 1].y) deg = 180;
    } else {
      if (path[i].x > this.startPos.x) deg = 90;
      else if (path[i].x < this.startPos.x) deg = -90;

      if (path[i].y > this.startPos.y) deg = 0;
      else if (path[i].y < this.startPos.y) deg = 180;
    }
    this.startPos = path[i - 1];
    if (this.pathBreak) return;

    this.elPlayer.style.transition = "transform 200ms linear";
    this.elPlayer.style.transform = `translate(${this.map.tileWidth * path[i].y}px, ${this.map.tileHeight * path[i].x}px) `;

    this.elProfile.style.transition = "transform 200ms linear";
    this.elProfile.style.transform = `rotate(${deg}deg)`;

    setTimeout(() => { this.animateByStep(path, i + 1); }, 200);
  }
}