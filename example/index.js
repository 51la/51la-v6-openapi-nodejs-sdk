// 引入模块
const LaApi = require('51la-v6-openapi-nodejs-sdk');

// 初始化函数
const getLaApiData = new LaApi.init();

// 设置参数
getLaApiData.setOptions({
  ak: 'your accessKey',  // 请填写您的accessKey  可在 https://v6.51.la/user/application/openapi 查看。
  sk: 'your secretKey', // 请填写您的secretKey type=1时（即选择低安全性校验时），可不填写。
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
