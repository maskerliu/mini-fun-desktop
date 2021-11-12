import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import { StateHandlerRoom } from "./rooms/StateHandlerRoom";


export default Arena({
  getId: () => "Your Colyseus App",
  
  initializeGameServer: (gameServer) => {

    gameServer.define("state_handler", StateHandlerRoom)
      .enableRealtimeListing();

    gameServer.onShutdown(function () {
      console.log(`game server is going down.`);
    });
  },

  initializeExpress: (app) => {
    // app.use('/', serveIndex(path.join(__dirname, "static"), { 'icons': true }))
    // app.use('/', express.static(path.join(__dirname, "static")));

    // app.use(serveIndex(path.join(__dirname, "static"), {'icons': true}))
    // app.use(express.static(path.join(__dirname, "static")));

    // (optional) attach web monitoring panel
    app.use('/colyseus', monitor());
  },


  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  }
});