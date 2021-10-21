/**
 * 
 * 接收put请求，生成JSON数据
 * 基于项目已有接口，在响应拦截器上将所有成功请求的数据PUT至此服务器
 * 后续请求成功接收后会更新JSON文件
 * 参数：@path-接口路径, @data-响应结果
 * 
 */
const fs = require("fs");
const path = require("path");
const dbPath = "./mock/db/";
const defaultFileName = 'index.json';

module.exports = function generateJsonApi(url, data) {
  const urlInList = url.replace("/", "").split("/");
  if(!urlInList.length) return;

  const projectPath = dbPath + urlInList[0] + "/";
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    fs.appendFileSync(projectPath + defaultFileName, "{}", {
      encoding: "utf-8",
    });
    const entryScript = fs.readFileSync(
      path.resolve("./mock/entry_template.js"),
      { encoding: "utf-8" }
    );
    fs.appendFileSync(
      projectPath + "/index.js",
      entryScript.replace("__projectName__", urlInList[0]),
      { encoding: "utf-8" }
    );
  }

  let filePath = projectPath + defaultFileName, jsonKeys = [];
  if (urlInList.length > 2) {
    const modulePath = projectPath + urlInList[1] + "/";
    if (!fs.existsSync(modulePath)) {
      fs.mkdirSync(modulePath);
      fs.appendFileSync(modulePath + defaultFileName, "{}", { encoding: "utf-8" });
    }
    filePath = modulePath + defaultFileName;
    jsonKeys = urlInList.slice(2);
  } else {
    jsonKeys = urlInList.slice(1);
  }

  const res = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
  let temp = res;
  console.log(jsonKeys);
  for(const key of jsonKeys) {
    if(temp[key]) {
      temp = temp[key]
    } else {
      if(temp['__child_apis__']) {
        temp['__child_apis__'].push(key);
      } else {
        temp['__child_apis__'] = [key];
      }
      temp[key] = {};
      temp = temp[key];
    }
  }
  Object.assign(temp, data);

  fs.writeFileSync(filePath, JSON.stringify(res), { encoding: "utf-8" });
  
}
