import { app } from "electron";
import fs from "fs";
import http from "http";
import path from "path";
import { } from "zlib";
import compressing from "compressing";
import fetch from "node-fetch";
import progress from "progress-stream";
import crypto from "crypto";

class GameMgrService {

  // 下载游戏包
  async download(resUrl: string, digest: string) {
    var fileName = new URL(resUrl).pathname.split("/").pop();
    var destFile = path.join(app.getPath("userData"), "games", fileName);
    const file = fs.createWriteStream(destFile)
    console.log("start download file", resUrl);
    http.get(resUrl, (resp) => {
      resp.on('data', (data) => {
        file.write(data);
      }).on("end", () => {
        file.end();
        // TODO add md5 check
        compressing.zip.uncompress(destFile, path.join(app.getPath("userData"), "games")).then(() => {
          console.log("unzip successfully");
        }).catch(err => { console.log("unzip failed", err); });

      });
    });
  }

  progressDownload(resUrl: string) {
    var fileName = new URL(resUrl).pathname.split("/").pop();
    var destFile = path.join(app.getPath("userData"), "games", fileName);
    try {
      fs.rmSync(destFile);
    } catch (err) { console.log(err); };
    try {
      fs.rmSync(destFile.split(".").shift());
    } catch (err) { console.log(err); };

    var tmpFile = destFile + ".tmp";
    const fileStream = fs.createWriteStream(tmpFile)
      .on("error", (err) => {
        console.error('error==>', err)
      })
      .on("ready", () => {
        console.log("开始下载:", resUrl);
      })
      .on("finish", () => {
        fs.renameSync(tmpFile, destFile);
        console.log('文件下载完成:', destFile);
      });

    fetch(resUrl, {
      method: "GET",
      headers: { "Content-Type": "application/octet-stream" }
    }).then(resp => {
      let fSize = resp.headers.get("content-length");
      let str = progress({ length: Number(fSize), time: 1 });
      str.on("progess", (progressData: any) => {
        let precentage = Math.round(progressData.percentage) + "%";
        console.log(precentage);
      });
      resp.body.pipe(str).pipe(fileStream);
    });
  }
}

export default new GameMgrService();