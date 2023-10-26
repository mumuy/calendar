const terser = require('@rollup/plugin-terser');        // 代码压缩
const resolve = require('@rollup/plugin-node-resolve'); // 使用node_modules包
const babel = require('@rollup/plugin-babel');          // ECMAScript转码
const importAssertionsPlugin = require('rollup-plugin-import-assert').importAssertionsPlugin;
const importAssertions = require('acorn-import-assertions').importAssertions;
const pkg = require('./package');                       // 获取package信息

// 版权调整
const repository = pkg.repository.url.replace(/(.+)(:\/\/.+)\.git$/,'https$2');
const now = new Date();
const date = (new Date(now.getTime()-now.getTimezoneOffset()*60000)).toISOString().substr(0,10);
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright (c) 2022-present, ${pkg.author}
 *
 * Released under the ${pkg.license} License
 * ${repository}
 *
 * Created on: ${date}
 */`;

module.exports = [{
    input: './src/calendar.js',
    output:[{
        file: pkg.main,
        format: 'umd',
        name: 'calendar',
        banner
    },{
        file: pkg.module,
        format: 'esm',
        banner
    }],
    acornInjectPlugins: [ importAssertions ],
    plugins: [
        resolve(),
        importAssertionsPlugin(),
        terser(),
        babel({
            babelHelpers: 'runtime',
            exclude:'node_modules/**'
        })
    ],
    watch: {
        exclude: 'node_modules/**'
    }
},{
    input: './src/widget-calendar.js',
    output:[{
        file: './dist/widget-calendar.min.js',
        format: 'iife',
        banner
    }],
    acornInjectPlugins: [ importAssertions ],
    plugins: [
        resolve(),
        importAssertionsPlugin(),
        terser(),
        babel({
            babelHelpers: 'runtime',
            exclude:'node_modules/**'
        })
    ],
    watch: {
        exclude: 'node_modules/**'
    }
}];
