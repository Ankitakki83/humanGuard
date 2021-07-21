import express from "express";
import compression from "compression";
import path from "path";
import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import Loadable from "react-loadable";
import { getBundles } from "react-loadable-ssr-addon";

import store from "./src/configureStore";
import App from "./src/App";
import fs from "fs";
import { Helmet } from "react-helmet";
import { matchRoutes } from "react-router-config";
import Routes from "./src/Route";
import cloneDeep from "lodash.clonedeep";

import { isArabicLanguageUrl } from "./src/Utils/UserAgent";

// const helmet = require("helmet");

const BASE_PATH = process.env.BASE_PATH;
const PORT = process.env.PORT ? process.env.PORT : 3000;

const server = express();

server.use(compression());
server.use(function(req, res, next) {
  req.url = req.url.replace(BASE_PATH, "/");
  if (req.url.includes("index.html")) {
    req.url = req.url.replace("index.html", "");
  }

  next();
});
server.use(
  `/robots.txt`,
  express.static(path.join(__dirname, "public/robots.txt"))
);
server.use(
  `/sitemap.xml`,
  express.static(path.join(__dirname, "public/sitemap.xml"))
);
server.use(
  `/manifest.json`,
  express.static(path.join(__dirname, "public/manifest.json"))
);
server.use(
  `/favicon.ico`,
  express.static(path.join(__dirname, "public/favicon.ico"))
);
server.use(
  `/icon_192.png`,
  express.static(path.join(__dirname, "public/icon_192.png"))
);

server.use(`/assets`, express.static(path.join(__dirname, "public/assets/")));
server.use(
  `/.well-known`,
  express.static(path.join(__dirname, ".well-known/"))
);

// server.use(`/index.html`, express.static(path.join(__dirname, "dist")));

server.get("*.js", function(req, res, next) {
  if (req.url !== "/service-worker.js") {
    let url = req.url.split("?");
    let gipVersionFile = "/dist" + url[0] + ".gz";
    if (fs.existsSync(__dirname + gipVersionFile)) {
      req.url = gipVersionFile + "?" + url[1];
      res.set("Content-Encoding", "gzip");
    } else {
      req.url = "/dist" + req.url;
    }
  } else {
    req.url = "/dist" + req.url;
  }
  res.set("Content-Type", "application/javascript");
  next();
});

server.get("*.css", function(req, res, next) {
  // let url = req.url.split("?");
  // let gipVersionFile = "/dist" + url[0] + ".gz";
  // if (fs.existsSync(__dirname + gipVersionFile)) {
  //   req.url = gipVersionFile + "?" + url[1];
  //   res.set("Content-Encoding", "gzip");
  // } else {
  req.url = "/dist" + req.url;
  // }
  next();
});
server.use("/dist", express.static(path.join(__dirname, "dist")));

if (typeof localStorage === "undefined") {
  global.localStorage = {};
}

server.get("*", async (req, res) => {
  const filePath = path.resolve(__dirname, "dist/index.html");
  fs.readFile(filePath, "utf8", async (err, htmlData) => {
    if (err) {
      console.error("err", err);
      return res.status(404).end();
    }

    return res.send(htmlData);
  });
});
Loadable.preloadAll()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Running on http://localhost:${PORT}/`);
    });
  })
  .catch(err => {
    console.log(err);
  });
