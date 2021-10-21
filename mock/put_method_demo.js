/**
 * 
 * 若需要将原接口数据自动生成JSON
 * 将此文件临时注入项目
 * 将响应结果put到mock服务器
 * 更新后需重启mock服务器才会应用新数据
 * 
 */

  // 项目axios拦截器用，全局
  // 也可置于单个请求，更新单个接口
  // if(response.data.code === 200) {
  //   try {
  //     generateJsonApi(requestUrl, response.data);
  //   } catch (error) {
  //     console.log('---API生成JSON错误---');
  //     console.log(error);
  //   }
  // }


// 项目名称，匹配./mock/db/的目录名
const projectName = "";

const mockServerUrl = 'http://localhost:3000'
import axios from "axios";

const service = axios.create({
  timeout: 3000,
  // 允许跨域带token
  baseURL: mockServerUrl,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export default function generateJsonApi(path, response) {
  const url = path
    .split("?")[0]
    .replace("api/v1", projectName);
  service
    .put(url, response)
    .then((res) => {
        console.log('---请求生成JSON，成功---');
        console.log(res);
    })
    .catch((err) => {
        console.log('---请求生成JSON，失败---');
    });
}
