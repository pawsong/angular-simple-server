'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    availabletasks: {
      tasks: {
        options: {
          filter: 'include',
          tasks: ['default', 'lint', 'deploy']
        }
      }
    },
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

  grunt.renameTask('jshint', 'lint');
  grunt.renameTask('pm2deploy', 'deploy');
  grunt.registerTask('default', grunt.task._tasks.availabletasks.info, ['availabletasks']);
};
