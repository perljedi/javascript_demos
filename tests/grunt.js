module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['../js/Life*.js']
    },
  jasmine_node: {
    projectRoot: ".",
    requirejs: false,
    forceExit: true,
    jUnit: {
      report: false,
      savePath : "./reports",
      useDotNotation: true,
      consolidate: true
    }
  }
});

  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask("default", "lint jasmine_node");

};
