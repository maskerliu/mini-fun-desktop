import path from "path";
import "./game";
import "./IPCService";
import MainApp from "./MainApp";

if (process.env.NODE_ENV !== "development") {
  (<any>global).__static = path.join(__dirname, "/static").replace(/\\/g, "\\\\");
}

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

MainApp.start();