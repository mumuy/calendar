import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
// import fetch from 'node-fetch';
// import pkg from './load-package.cjs';
import * as pkg from './package.json';

console.log('pkg',pkg);
// copyright
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
 *`;

export default [{
    input: './src/calendar.js',
    output:[{
        file: './dist/calendar.min.js',
        format: 'umd',
        name: 'calendar',
        banner
    }],
    plugins: [
        terser(),
        resolve(),
        babel({
            babelHelpers: 'runtime',
            exclude:'node_modules/**'
        })
    ]
}];

// rollup.rollup({
//     input: './src/widget-calendar.js',
//     plugins: [
//         terser(),
//         resolve(),
//         babel({
//             babelHelpers: 'runtime',
//             exclude:'node_modules/**'
//         })
//     ]
// }).then(bundle => {
//     return bundle.write({
//         file: './dist/widget-calendar.min.js',
//         format: 'iife',
//         banner
//     });
// });
