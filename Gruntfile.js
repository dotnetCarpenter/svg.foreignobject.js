module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    libPath: "/lib",
    // Metadata.
    bwr: grunt.file.readJSON('bower.json'),
    pkg: grunt.file.readJSON('package.json'),
    banner: '/** <%= bwr.name %> - v<%= bwr.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= bwr.homepage ? " * " + bwr.homepage + "\\n" : "" %>' +
      ' * Licensed under the <%= bwr.license %> license\n' +
      ' * http://www.wtfpl.net/txt/copying/\n **/\n',
    // Task configuration.
    uglify: {
      options: {
        banner: '<%= banner %>',
        compress: true,
        report: 'min'
      },
      dist: {
        src: '<%= bwr.name %>',
        dest: '<%= bwr.name.replace(".js", "") %>.min.js'
      }
    },
    shell: {
      bower: {
        command: "bower update"
      }
    },
    copy: {
      main: {
        files: [
          { src:"bower_components/svg.js/dist/svg.min.js", dest: "lib/svg.min.js" },
          { src:"bower_components/svg.js/dist/svg.js", dest: "lib/svg.js" }
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  /* check if we remembered to sync versions in bower.json and package.json,
   * the version from package.json is written in the banner */
  grunt.registerTask('version', 'Test bower.json and package.json versions', function version() {
    grunt.log.write('Checking if versions are in sync...');
    grunt.config.requires('bwr.version');
    grunt.config.requires('pkg.version');
    if( grunt.config.data.bwr.version === grunt.config.data.pkg.version ) {
      grunt.log.ok();
      return true;
    } else {
      grunt.log.writeln("");
      grunt.log.error(
        'bower.json version '
       + grunt.config.data.bwr.version
       + ' is not in sync with package.json version '
       + grunt.config.data.pkg.version
       + '.'
      );
      return false;
    }
  });

  // Default task.
  grunt.registerTask('default', ['version', 'uglify']);
  // update svg.js using bower and reading config from bower.json
  grunt.registerTask('update', ["shell", "copy"]);
};