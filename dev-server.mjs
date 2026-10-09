// 내 컴퓨터에서 미리보기용 서버. 배포에는 쓰이지 않습니다.
// 실행: node dev-server.mjs  →  http://localhost:3000
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import handler from "./api/inquiries.js";

const root = process.cwd();
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

createServer(async (req, res) => {
  const path = new URL(req.url, "http://localhost").pathname;

  if (path === "/api/inquiries") {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    try { req.body = raw ? JSON.parse(raw) : {}; } catch { req.body = {}; }
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (obj) => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(obj)); };
    return handler(req, res);
  }

  const file = normalize(join(root, path === "/" ? "index.html" : path));
  if (!file.startsWith(root) || !types[extname(file)]) {
    res.statusCode = 404;
    return res.end("not found");
  }
  try {
    const body = await readFile(file);
    res.setHeader("Content-Type", types[extname(file)]);
    res.end(body);
  } catch {
    res.statusCode = 404;
    res.end("not found");
  }
}).listen(process.env.PORT || 3000, function () {
  console.log("http://localhost:" + this.address().port);
});
