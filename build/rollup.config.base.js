import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { name } from '../package.json';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel';

export default {
  // 入口文件
  input: path.resolve(__dirname, '../src/index.js'),
  output: {
    // 打包名称
    name: name,
    exports: 'named',
    // 启用代码映射，便于调试之用
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    babel({
      exclude: '../node_modules/**'
    })
  ]
};