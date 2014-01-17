module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      karma: {
        unit: {
            configFile:"tests/karma.conf.js"
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-karma');
  grunt.registerTask('test', 'karma:unit');
};
