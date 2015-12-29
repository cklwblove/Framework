(function(){
    'use strict';
    var gulp = require('gulp'),
        connect = require('gulp-connect'),
        open = require('gulp-open'),
        rename = require('gulp-rename'),
        header = require('gulp-header'),
        path = require('path'),
        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        tap = require('gulp-tap'),
        concat = require('gulp-concat'),
        jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish'),
        fs = require('fs'),
        paths = {
            root: './',
            dist: {
                root: 'dist/',
                scripts: 'dist/'
            },
            source: {
                root: 'src/',
                scripts: 'src/*.js'
            }
        },
        zero = {
            filename: 'zero',
            jsFiles: [
                'src/wrap-start.js',
                'src/zero-intro.js',
                'src/dom.js',
                'src/validate.js',
                'src/device.js',
                'src/zero-outro.js',
                'src/wrap-end.js'
            ]

        };
        
    function addJSIndent (file, t) {
        var addIndent = '        ';
        var filename = file.path.split('src\\')[1];
        console.log(file.path.split('src'));
        if (filename === 'wrap-start.js' || filename === 'wrap-end.js') {
            addIndent = '';
        }
        var add4spaces = ('zero-intro.js device.js dom.js validate.js zero-outro.js').split(' ');
        if (add4spaces.indexOf(filename) >= 0) {
            addIndent = '    ';
        }

        if (addIndent !== '') {
            var fileLines = fs.readFileSync(file.path).toString().split('\n');
            var newFileContents = '';
            for (var i = 0; i < fileLines.length; i++) {
                newFileContents += addIndent + fileLines[i] + (i === fileLines.length ? '' : '\n');
            }
            file.contents = new Buffer(newFileContents);
        }
    }
    /* ==================================================================
    Build
    ================================================================== */
    // Build Styles and Scripts
    gulp.task('scripts', function (cb) {
        gulp.src(zero.jsFiles)
            .pipe(tap(function (file, t){
                addJSIndent (file, t);
            }))
            .pipe(sourcemaps.init())
            .pipe(concat(zero.filename + '.js'))
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.dist.scripts))
            .pipe(connect.reload())
            .on('end', function () {
                cb();
            });
        
    });

})();