'use strict'

const fs = require('fs')
const serveStatic = require('serve-static')

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      watch: {
        files: {
          './dist/public/scripts/script.js': ['./src/public/scripts/*.js'],
        },
        options: {
          transform: ['hbsfy', 'babelify']
        }
      },
      dist: {
        files: {
          './dist/public/scripts/script.js': ['./src/public/scripts/*.js'],
        },
        options: {
          transform: ['hbsfy', 'babelify', 'uglifyify']
        }
      }
    },

    clean: {
      dist: ['./dist']
    },


    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/public/css',
            src: '*.css',
            dest: './dist/public/css'
          },
          {
            expand: true,
            cwd: 'src',
            src: 'views/*.html',
            dest: './dist/'
          },
          {
            expand: true,
            cwd: 'src',
            src: 'app.js',
            dest: './dist/'
          },
          {
            expand: true,
            cwd: 'src',
            src: 'config.json',
            dest: './dist/'
          },
        ]

      }
    },

    watch: {
      static: {
        files: ['./src/**/*.css', './src/views/*.html'],
        tasks: ['copy'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['./src/**/*.js', './src/**/*.hbs'],
        tasks: ['browserify:watch'],
        options: {
          livereload: true
        }
      }
    }
  })

  grunt.registerTask('default', ['clean', 'copy', 'browserify:dist'])
  grunt.registerTask('start', ['default', 'watch'])

}
