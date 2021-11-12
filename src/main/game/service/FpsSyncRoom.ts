import { Client, Room } from "colyseus";

const FRAME_RATE: number = 20;

export class FpsSyncRomm extends Room {
  seed: number = 0;
  frameIdx: number = 0;
  frameInterval: NodeJS.Timer = null;
  frameList: [any[]] = [[]];
  frameAcc: number = 3;

  actors: Map<string, any> = new Map();

  maxClients = 20;

  onCreate(options: any) {
    this.seed = Math.round(Math.random() * 1000000000);
    this.frameIdx = 0;
    this.frameInterval = setInterval(this.tick.bind(this), 1000 / FRAME_RATE);
  }

  onJoin(client: Client) {
    this.broadcast(`${client.sessionId} joined`);
  }

  onLeave(client: Client) {
    this.broadcast(`${client.sessionId} left`);
  }

  onDispose() {
    clearInterval(this.frameInterval);
    console.log("room disposed");
  }

  private tick(): void {
    let frames = [];
    frames.push([this.frameIdx, this.getFrameByIndex(this.frameIdx)]);
    this.broadcast("f", frames);
    this.frameIdx += this.frameAcc;
  }

  private getFrameByIndex(index: number) {
    if (this.frameList[index] === undefined) {
      this.frameList[index] = [];
    }
    return this.frameList[index];
  }

  private handlCMD(client: Client, message: any){
    // if (message[])
  }

  private getAllFrames(client: Client, message: any) {
    let frames = [];
    for (var i = 0, len = this.frameList.length; i < len; ++i) {
      if (this.frameList[i] !== null) {
        frames.push([i, this.frameList[i]]);
      }
    }

    if (frames.length === 0) { frames = [0, []]; }
    this.send(client, "fs", frames);
  }
}