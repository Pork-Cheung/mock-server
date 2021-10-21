/**
 * 项目入口文件
 * 导入random_mock.js，随机模拟数据
 * 导入当前项目所有子模块的假数据
 */

const fs = require("fs");

const db = {};

const projectNames = fs.readdirSync("./mock/db/").filter((ele) => {
  if (ele.indexOf(".") === -1) {
    return true;
  } else {
    return false;
  }
});
projectNames.forEach((projectName) => {
  const project = require("./" + projectName);
  db[projectName] = project;
});
module.exports = db;
