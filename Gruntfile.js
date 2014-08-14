'use strict';

module.exports = function(grunt) {
	// Force use of Unix newlines
	grunt.util.linefeed = '\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			dist: ['dist', 'docs/dist']
		},
		less: {
			compile: {
				src: 'less/<%= pkg.name %>.less',
				dest: 'dist/css/<%= pkg.name %>.css'
			},
			minify: {
				options: {
					cleancss: true
				},
				src: 'less/<%= pkg.name %>.less',
				dest: 'dist/css/<%= pkg.name %>.min.css'
			}
		},
		uglify: {
			minify: {
				src: 'js/<%= pkg.name %>.js',
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		},
		copy: {
			js: {
				src: 'js/*',
				dest: 'dist/'
			},
			docs: {
				expand: true,
				cwd: 'dist',
				src: '*/*',
				dest: 'docs/dist'
			}
		},
		usebanner: {
			options: {
				banner: '/*!\n' +
					' * Bootstrap-submenu v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
					' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
					' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
					' */\n'
			},
			dist: ['dist/*/*', 'docs/dist/*/*']
		}
	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies'
	});

	grunt.registerTask('default', ['clean', 'less', 'uglify', 'copy', 'usebanner']);
};
