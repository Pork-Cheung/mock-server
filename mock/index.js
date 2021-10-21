const jsonServer = require("json-server");
const db = require("./db");
const routes = require("./routes");
const generateJsonApi = require("./generate_json_api");
const port = 3000;

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter(routes);

server.use(middlewares);

// 处理PUT请求，将数据写入JSON文件
// 将 POST 转为 GET
server.use(jsonServer.bodyParser);
server.use((request, res, next) => {
  if (request.method === "PUT" || request.method === "put") {
    generateJsonApi(request.path, request.body);
    res.status(200).jsonp({ msg: "Processing···" });
    return;
  }
  request.method = "GET";
  next();
});

// rewriter
server.use(rewriter);

// 处理响应body
const router = jsonServer.router(db);
router.render = (req, res) => {
  let body = res.locals.data;
  if (!Object.keys(body).length) {
    // console.log(req.originalUrl);
    let resoucesPaths = req.originalUrl.replace("/", "").split("/");
    body = db;
    // 按路由找到mock数据
    for (let i = 0; i < resoucesPaths.length; i++) {
      if (body[resoucesPaths[i]]) {
        body = body[resoucesPaths[i]];
      } else {
        res.status(404).jsonp({
          error: "not found!",
        });
        return;
      }
    }
    // 响应结果排除子接口
    if (body['__child_apis__']) {
      const res = {};
      Object.keys(body)
        .filter((key) => {
          return !body['__child_apis__'].includes(key) && key !== '__child_apis__';
        })
        .forEach((key) => {
          res[key] = body[key];
        });
      body = res;
    }
  }
  res.status(200).jsonp(body);
};
server.use(router);

// console.log(db);

server.listen(port, () => {
  console.log("open mock server at localhost:" + port);
});
