# mock-server

mock-server 前端 mock 服务器  
技术栈 nodejs json-server mockjs

## 说明：

### 启动

    yarn install
    yarn mock

### 目录说明

- mock
  - db
    - program 每个项目一个文件夹,自动生成
      - module 项目各个模块的接口
      - random_mock.js 每个项目的mockjs 生成假数据在这写
    - index.js 静态mock对象
    - random_mock.js 随机mock对象
  - routes 路由匹配 rewriter
  - index.js 主入口

### 插入旧接口

> - 修改 put_method_demo.js 首行的项目名称 projectName
> - 将 put_method_demo.js 放入项目，在 axios 响应拦截器中调用 generateJsonApi 方法
> - 也可在单个接口的响应里调用，更新单个接口
> - 本地启动项目，在浏览器调用响应接口即更新 mock 服务器数据
> - 数据更新后需重启 mock 服务器才能应用新数据

### 添加新接口

> - 在项目目录下添加 random_mock.js，示例 random_mock_demo.js，语法请参考[mockjs](http://mockjs.com/)

### 使用

> - 前端项目(vue.config.js) 配置代理，将接口转发至此 mock 服务器

```
module.exports = {
    ...
    devServer: {
        ...
        proxy: {
        '/projectname': {
            target: 'http://localhost:3000',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
            "^/projectname": "/projectname"
            }
        },
        }
    }
}
```
