module.exports = function(grunt) {

    var config = {

		pkg : grunt.file.readJSON('package.json'),

		jshint : {
            files : ["Gruntfile.js", "js/**/*.js"]
		},

		clean : {
			dist : ["dist"]
		},

		concat : {
			options : {
				separator : ';'
			},
			dist : {
				src : ["js/**/*.js"],
				dest : "dist/js/<%= pkg.name %>.js"
			}
		},

		uglify : {
			options : {
				
			},
			dist : {
				files : {
					"dist/js/<%= pkg.name %>.min.js" : ["<%= concat.dist.dest %>"]
				}
			}
		},

		less : {
			dist : {
				src : ["less/**/*.less"],
				dest : "dist/css/<%= pkg.name %>.css"
			}
		},

		karma : {
			unit : {
				configFile: 'karma.conf.js'
			}
		}
	};
	
    grunt.initConfig(config);


	// define a task to perform initial setup, creating directory structure, etc...
	grunt.registerTask("install", "sets up the initial directory structure", function() {
        grunt.log.writeln("creating 'js' directory...");						   
        grunt.file.mkdir("js");
        grunt.log.writeln("creating 'less' directory...");						   
        grunt.file.mkdir("less");
        grunt.log.writeln("creating 'test' directory...");						   
        grunt.file.mkdir("test");
    });

	//grunt.registerTask("test", function() {
    //    grunt.log.writeln("log from test...");
    //});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-karma");

	grunt.registerTask("default", ["clean", "jshint", "less", "concat", "uglify"]);
};