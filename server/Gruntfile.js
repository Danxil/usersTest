'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'bin/www'
      }
    },
    watch: {
      options: {
        nospawn: true
      },
      server: {
        files: [
          'bin/www',
          'app.js',
          'routes/*.coffee'
        ],
        tasks: ['develop']
      },
      storage: {
        files: ['storage/*'],
        tasks: ['develop']
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('default', [
    'develop',
    'watch'
  ]);
};
