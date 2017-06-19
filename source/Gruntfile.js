module.exports = function(grunt) {
  var autoprefixer = require('autoprefixer');
  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sourceRoot: 'assets',
    buildRoot: '../build',

    // and target css in the root of the theme
    cssDest: '../build/assets/css',

    jshint: {
      options: {
        force: true
      },
      all: ['<%= sourceRoot %>/js/script.js']
    },
    uglify: {
      dev: {
        options: {
          beautify: false,
          mangle: false
        },
        files: {
          '<%= buildRoot %>/assets/js/script.min.js': [
            '<%= sourceRoot %>/js/script.js'
          ]
        }
      },
      dist: {
        files: {
          '<%= buildRoot %>/assets/js/script.min.js': [
            '<%= sourceRoot %>/js/script.js'
          ]
        }
      }
    },
    sass: {
      dist: {
        files: {
          '<%= cssDest %>/style.css' : '<%= sourceRoot %>/sass/style.scss'
        }
      }
    },
    postcss: {
      options: {
        map: false, // inline sourcemaps
        unused: false,
        zindex: false,
        idents: false,

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: '<%= cssDest %>/*.css'
      }
    },
    watch : {
      scripts: {
        files: ['<%= sourceRoot %>/js/**/*.js'],
        tasks: ['jshint', 'uglify:dev', 'watch']
      },
      stylesheets: {
        files: ['<%= sourceRoot %>/sass/**/*.scss'],
        tasks: ['sass', 'postcss', 'watch']
      },
    }
  });

  // Load the plugins.

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'postcss', 'jshint', 'uglify:dev', 'watch']);// $ grunt
  grunt.registerTask('dist', ['sass', 'postcss', 'jshint', 'uglify:dist']);// $ grunt dist
};