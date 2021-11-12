import { Client, Room } from "colyseus";
import http from 'http';
import { State } from "../../../common/GameStates";

export class StateHandlerRoom extends Room<State> {
  maxClients: number = 4;

  onCreate(options: any) {
    this.setState(new State());

    this.onMessage("move", (client: Client, data: any) => {
      console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
      this.state.movePlayer(client.sessionId, data);
    });
  }

  onAuth(client: Client, options: any, req: http.IncomingMessage) {
    return true;
  }

  onJoin(client: Client) {
    client.send("hello", "world");
    this.state.createPlayer(client.sessionId);
  }

  onLeave(client: Client) {
    this.state.removePlayer(client.sessionId);
  }

  onDispose() {
    console.log("dispose state handler room");
  }
}