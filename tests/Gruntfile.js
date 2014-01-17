module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  jasmine: {
      src: ['../js/LifeBoard.js', '../js/LifeCell.js', '../js/SudokuApp.js'],
      options: {
        specs: 'spec/*spec.js',
        keepRunner:true,
        template: require('grunt-template-jasmine-requirejs'),
      }
  }

  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask("default", "jasmine");

};
