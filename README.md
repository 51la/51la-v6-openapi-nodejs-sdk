# 51la-v6-openapi-nodejs-sdk

## 简介

51la 统计 v6 开放接口 api 插件（Node.js）

## 安装

```
npm i 51la-v6-openapi-nodejs-sdk --save
```

## 使用说明

```
// 引入模块
const LaApi = require('51la-v6-openapi-nodejs-sdk');

// 初始化函数
const getLaApiData = new LaApi.init();

// 设置参数
getLaApiData.setOptions({
  ak: 'your accessKey',
  sk: 'your secretKey',
  type: 2, // 加密方式（非必传，默认为中等） 1为低安全性 2为中等 3为高安全性（双向加密，插件会帮助你完成解密操作）
})

// API调用 (DEMO)

// Promise then
getLaApiData.requestApi('/sitegroup/list', {
  // 参数
}).then(result => {
  console.log(result.data)
}).catch(error => {
  console.log(error)
})

// Promise async/await
// const result = await getLaApiData.requestApi('/sitegroup/list');

```
