/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Install `electron-debug` with `devtron`
require("electron-debug")({ showDevTools: true });

// Install `vue-devtools`
import { app } from "electron";

app.on("ready", async () => {

  try {
    // const {default: installExtension,} = require("electron-devtools-installer");
    // var vueDevToolsBeta = {id: "ljjemllljcmogpfapbkkighbhhppjdbg", electron: ">=1.2.1"};
    // var result = await installExtension(vueDevToolsBeta);
    // if (result) {
    //   console.log("load success: "+result);
    // }
  } catch(e) {
    console.log("vue devtools failed to install:", e);
  }

});

require("./index");
