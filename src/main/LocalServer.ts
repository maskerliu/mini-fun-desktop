import compression from "compression";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { Server } from "http";
import path from "path";

const JSONBigInt = require("json-bigint");

const CorsOptions: {} = {
  credentials: true,
  optionsSuccessStatus: 200,
};

class LocalServer {
  private httpServer: Server | null;
  private httpApp: Application | null;

  constructor() {
    this.initHttpServer();
  }

  private initHttpServer(): void {
    this.httpApp = express();
    let corsOpts = Object.assign({

    }, CorsOptions);
    this.httpApp.use(cors(corsOpts));
    this.httpApp.use(compression());
    this.httpApp.use(express.static(path.resolve(__dirname, '../web')));
    // this.httpApp.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
    // this.httpApp.use(bodyParser.text({ type: "application/json", limit: '50mb' }));
    this.httpApp.use((req: any, resp: Response, next: any) => {
      if (/^\/burying-point\//.test(req.url)) {
        let buf: any[] = [];
        req.on("data", (data: any) => {
          buf.push(data);
        });
        req.on("end", () => {
          // req.rawbody = Buffer.concat(buf);
        });
      }
      next();
    });

    this.httpApp.all("*", (req: Request, resp: Response, next: any) => {
      if (/^\/mw\//.test(req.url) || /^\/appmock\//.test(req.url)) {

      } else if (/^\/burying-point\//.test(req.url)) {
        resp.end();
      } else {

      }
    });
  }

}

export default new LocalServer();
