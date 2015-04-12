'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['node_modules/**'],
        reporter: require('jshint-stylish')
      },
      all: [
        '**/*.js',
      ]
    },

  });

  grunt.registerTask('lint', ['jshint']);

  grunt.renameTask('pm2deploy', 'deploy');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['lint']);
};
