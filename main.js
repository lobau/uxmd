const fs = require("fs");
const path = require("path");
const querystring = require("querystring")
require("dotenv").config();

const render_route = require("./render_route.js");
const error_page = require("./error_page.js");
const create_page = require("./create_page.js");
const landing = require("./landing.js");

const db = {};
const autosave = {};
const githubStateStrings = {};


const initPgPool = require("./lib/pg.js")
const HttpClient = require("./lib/http_client.js")
const pool = initPgPool()
const githubClient = new HttpClient("https://github.com")

const generateUnique = (length = 24) => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

const save = (route) => {
  pool.query("UPDATE Documents SET body = $1 where route = $2;", [db[route], route])
        .then(() => {
          console.log("Row updated successfully");
        })
        .catch((e) => console.error(e.stack));
};

var app = require("http")
  .createServer(async function (req, res) {
    if (req.url === "/create") {
      let route = generateUnique();
      pool
        .query(
          `INSERT INTO Documents(route,body) VALUES('${route}','/root\n# Hello\nThis is the first state\n[Go to next state](#next)\n\n/next\n# Next state\nThis is the next state!\n[Back](#root)');`
        )
        .then(() => {
          create_page(route).then(
            function (html) {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(html);
              res.end();
            }.bind(res));
        })
        .catch((e) => console.error(e.stack));
    } else if(req.url === "/") {
      /* state for OAuth, see https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps*/
      const state = generateUnique()
      githubStateStrings[state] = true
      setTimeout(() => (delete githubStateStrings[state]), 1800000)
      landing(state).then(
        function (html) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(html);
          res.end();
        }.bind(res));
    } else if(req.url.includes("/github_auth?")) {
      const params = querystring.parse(req.url.split("/github_auth?")[1])
      // github state didn't work for us
      // if(!githubStateStrings[params.state]) {
      //   return error_page(400).then(
      //     function (html) {
      //       res.writeHead(400, { "Content-Type": "text/html" });
      //       res.write(html);
      //       res.end();
      //     }.bind(res));
      // }
      const code = params.code
      console.log(params)
      const result = await githubClient.getJson("/login/oauth/access_token", {
        code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET
      })

      // console.log("=====================")
      // console.log(result)
      // console.log("=====================")

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("It worked.");
      res.end();
    } else if (req.url.match("public/stolen_victory_duospace_regular.ttf")) {
      var fileStream = fs.createReadStream(path.join(__dirname + "/public/stolen_victory_duospace_regular.ttf"));
      res.writeHead(200, { "Content-Type": "application/x-font-ttf" });
      fileStream.pipe(res);
    } else if (req.url.match("public/stolen_victory_duospace_bold.ttf")) {
      var fileStream = fs.createReadStream(path.join(__dirname + "/public/stolen_victory_duospace_bold.ttf"));
      res.writeHead(200, { "Content-Type": "application/x-font-ttf" });
      fileStream.pipe(res);
    } else if (req.url.match("public/pop.ttf")) {
      var fileStream = fs.createReadStream(path.join(__dirname + "/public/pop.ttf"));
      res.writeHead(200, { "Content-Type": "application/x-font-ttf" });
      fileStream.pipe(res);
    } else if (req.url.match("public/favicon.svg")) {
      var fileStream = fs.createReadStream(
        path.join(__dirname + "/public/favicon.svg"),
        "UTF-8"
      );
      res.writeHead(200, { "Content-Type": "image/svg+xml" });
      fileStream.pipe(res);
    } else if (req.url.match("public/style.css")) {
      var fileStream = fs.createReadStream(
        path.join(__dirname + "/public/style.css"),
        "UTF-8"
      );
      res.writeHead(200, { "Content-Type": "text/css" });
      fileStream.pipe(res);
    } else if (req.url.match("public/syntax.css")) {
      var fileStream = fs.createReadStream(
        path.join(__dirname + "/public/syntax.css"),
        "UTF-8"
      );
      res.writeHead(200, { "Content-Type": "text/css" });
      fileStream.pipe(res);
    } else if (req.url.match("public/script.js")) {
      var fileStream = fs.createReadStream(
        path.join(__dirname + "/public/script.js"),
        "UTF-8"
      );
      res.writeHead(200, { "Content-Type": "text/javascript" });
      fileStream.pipe(res);
    } else if (req.url.match(/^\/([A-Za-z0-9]{16})/)) {
      var route = req.url.slice(1);
      pool
        .query("SELECT * FROM Documents WHERE route = $1;", [route])
        .then((result) => {

          var body, message;
          if (result.rows.length > 0) {
            body = result.rows[0].body;
            render_route(route, body).then(
              function (html) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(html);
                res.end();
              }.bind(res)
            );
          } else {
            error_page().then(
              function (html) {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.write(html);
                res.end();
              }.bind(res));
          }
        })
        .catch((e) => console.error(e.stack));
    } else {
      error_page().then(
        function (html) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(html);
          res.end();
        }.bind(res));
    }
  })
  .listen(process.env.PORT);

var io = require("socket.io")(app);

io.on("connection", (socket) => {
  const route = socket.handshake.query.name;
  socket.join(route);

  console.log("A user has connected from " + route);
  autosave[route] = setTimeout(() => {}, 1);

  socket.on("refresh", function () {
    body = db[route];
  });
  socket.on("updateDb", function (body) {
    db[route] = body;
    clearTimeout(autosave[route]);
    autosave[route] = setTimeout(function () {
      save(route);
    }, 1000);
  });
  socket.on("change", function (op) {
    if (
      op.origin == "+input" ||
      op.origin == "paste" ||
      op.origin == "+delete"
    ) {
      socket.broadcast.to(route).emit("change", op);
    }
  });
  socket.on("disconnect", function () {
    // TODO: save doc on the last disconnect?
  });
});
