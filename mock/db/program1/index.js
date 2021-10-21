/**
 * 项目入口文件
 * 导入random_mock.js，随机模拟数据
 * 导入当前项目所有子模块的假数据
 */

const projectName = "program1";
const db = require("./index.json");
const fs = require("fs");
const path = require("path");

// json
const projectPath = path.resolve("./mock/db/" + projectName);
const dbFilesName = fs.readdirSync(projectPath);
const modulesName = dbFilesName.filter((ele) => {
  if (ele.indexOf(".") === -1) {
    return true;
  } else {
    return false;
  }
});
modulesName.forEach((module) => {
  db[module] = require("./" + module);
});

// mockjs, 需要mockJS模拟数据时使用，当前目录添加random_mock.js
const randomMock = require("./random_mock");
Object.keys(randomMock).forEach((item) => {
  const pathList = item.replace("/", "").split("/");
  if(!pathList.length) return;
  let temp = db;
  for(let i = 0; i < pathList.length; i++) {
    const key = pathList[i];
    if(temp[key]) {
      temp = temp[key];
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
  Object.assign(temp, randomMock[item]);
});

module.exports = db;
