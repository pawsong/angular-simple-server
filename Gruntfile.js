'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    availabletasks: {
      tasks: {
        options: {
          filter: 'include',
          tasks: [
            'default',
            'lint',
            'test',
            'serve',
            'deploy'
          ]
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

    mochaTest: {
      all: ['test/*.test.js']
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    }
  });

  function aliasTask(oldTask, newTask) {
    grunt.registerTask(newTask, grunt.task._tasks[oldTask].info, [oldTask]);
  }

  grunt.renameTask('pm2deploy', 'deploy');

  aliasTask('jshint', 'lint');
  aliasTask('mochaTest', 'test');
  aliasTask('nodemon', 'serve');
  aliasTask('availabletasks', 'default');

};
