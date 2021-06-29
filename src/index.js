import sha256 from 'crypto-js/sha256';
import aes from 'crypto-js/aes';
import core from 'crypto-js/core';
import padPkcs7 from 'crypto-js/pad-pkcs7';
import FormatHex from 'crypto-js/format-hex'
import encUtf8 from 'crypto-js/enc-utf8';
import qs from 'qs';
import axios from 'axios';

// const requset_url = 'https://v6-open.51.la/open';
// const requset_url = 'http://vip-test.51.la/open';
const requset_url = 'http://192.168.1.237:9350/open';

function alphabeticalSort(a, b) {
  return a.localeCompare(b);
}

export function init() {

  let instance;

  function getInstance() {
    return {
      ak: '',
      sk: '',
      type: 2,
      setOptions: function (p) {
        if (!p.ak || !p.sk) {
          console.log('[51LA_OPENAPI] sign 参数加密失败: 缺少accessKey或secretKey参数!');
          return null;
        }
        this.ak = p.ak;
        this.sk = p.sk;
        (p.type && Number(p.type)) && (this.type = Number(p.type))
      },
      getSign: function () {
        try {
          if (!this.ak || !this.sk) {
            console.log('[51LA_OPENAPI] sign 参数加密失败: 还未设置accessKey或secretKey参数!');
            return null;
          }
          const nonce = Math.random().toString(36).slice(-4);
          const timestamp = new Date().valueOf();
          const params = {
            accessKey: this.ak,
            nonce,
            timestamp,
            secretKey: this.sk,
          };
          const queryString = qs.stringify(params, { sort: alphabeticalSort });
          return {
            accessKey: this.ak,
            nonce,
            timestamp,
            sign: sha256(queryString).toString().toUpperCase()
          }
        } catch (error) {
          return null;
        }
      },
      decrypt(str, sk, iv) {
        return aes.decrypt(FormatHex.parse(str), encUtf8.parse(sk), {
          iv: encUtf8.parse(iv),
          type: core.mode.CBC,
          padding: padPkcs7
        }).toString(encUtf8);
      },
      requestApi: async function (path, params = {}) {
        try {
          const sign = this.getSign();
          if (!sign) {
            console.log('[51LA_OPENAPI] 提示: 生成 sign 参数失败!');
            return;
          }
          const result = await axios({
            method: 'post',
            url: requset_url + path,
            data: {
              ...params,
              ...sign
            },
            // transformRequest: function (data) {
            //   data = qs.stringify(data);
            //   return data;
            // },
            // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          if (this.type === 3) {
            result.data = JSON.parse(this.decrypt(result.data, this.sk, this.sk.substring(0, 16)));
            return result
          }
          return result;
        } catch (error) {
          throw error;
        }
      }
    };
  }

  if (!instance) {
    instance = getInstance();
  }
  return instance;
}
