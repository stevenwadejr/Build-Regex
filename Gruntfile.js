module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: "/* \n" +
				" * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %>\n" +
				" * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>;\n" +
				" */"
		},
		less: {
			production: {
				files: {
					'src/css/bootstrap.css': 'src/bootstrap/less/bootstrap.less'
				}
			}
		},
		concat: {
			js: {
				src: [
					'<banner:meta.banner>',
					'src/bootstrap/js/button.js',
					'src/bootstrap/js/dropdown.js',
					'src/bootstrap/js/transition.js',
					'src/js/jquery.dragsort-0.5.1.js',
					'src/js/VerbalExpressions.js',
					'src/js/main.js'
				],
				dest: 'src/js/<%= pkg.name %>.js'
			},
			css: {
				src: [
					'<banner:meta.banner>',
					'src/css/fonts.css',
					'src/css/bootstrap.css',
					'src/css/main.css'
				],
				dest: 'src/css/<%= pkg.name %>.css'
			}
		},
		uglify: {
			js: {
				src: ['<banner:meta.banner>', 'src/js/<%= pkg.name %>.js'],
				dest: 'public/js/<%= pkg.name %>.min.js'
			}
		},
		cssmin: {
			css: {
				src: ['<banner:meta.banner>', 'src/css/<%= pkg.name %>.css'],
				dest: 'public/css/<%= pkg.name %>.min.css'
			}
		}
	});

	grunt.registerTask('default', ['less', 'concat', 'uglify', 'cssmin']);

};