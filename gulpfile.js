const gulp = require('gulp');
const rename = require("gulp-rename");
const rollup = require('rollup');
const terser = require('@rollup/plugin-terser');
const pkg = require('./package');

// copyright
var repository = pkg.repository.url.replace(/(.+)(:\/\/.+)\.git$/,'https$2');
var now = new Date();
var date = (new Date(now.getTime()-now.getTimezoneOffset()*60000)).toISOString().substr(0,10);
var banner = `/*!
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

gulp.task('main', () => {
    return rollup.rollup({
        input: './src/calendar.js',
        plugins: [
            terser()
        ]
    }).then(bundle => {
        return bundle.write({
            file: './dist/calendar.min.js',
            format: 'umd',
            name: 'calendar',
            banner
        });
    });
});

gulp.task('widget', () => {
    return rollup.rollup({
        input: './src/widget-calendar.js',
        plugins: [
            terser()
        ]
    }).then(bundle => {
        return bundle.write({
            file: './dist/widget-calendar.min.js',
            format: 'iife',
            banner
        });
    });
});

gulp.task('default', gulp.series(['main', 'widget']))
