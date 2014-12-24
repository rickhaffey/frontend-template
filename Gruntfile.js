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


	// define a task to perform initial setup
	// this will:
	// i) remove the .git folder
	// ii) update package.json with the correct package name, and optional description
	// iii) create a base directory structure
	grunt.registerTask("install", "sets up the initial directory structure", function(packageName, packageDescription) {
        if(!packageName) {
            grunt.log.warn("Package name must be specified.  As an example: 'grunt install:Awesome_Package'");
		} else {
			// dis-associate the template from the template's git repository
			grunt.log.writeln("removing .git folder...");
			grunt.file.delete(".git");

			// update the pkg config values (name & description)
			var pkg = grunt.config.get("pkg");
			pkg.name = packageName;

			if(packageDescription) {
				pkg.description = packageDescription;
			}

			// write it back out to package.json
			grunt.log.writeln("updating package.json...");
			grunt.file.write("package.json", JSON.stringify(pkg, null, 2));
			
			grunt.log.writeln("creating 'js' directory...");						   
			grunt.file.mkdir("js");
			grunt.log.writeln("creating 'less' directory...");						   
			grunt.file.mkdir("less");
			grunt.log.writeln("creating 'test' directory...");						   
			grunt.file.mkdir("test");
		}
    });

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-karma");

	grunt.registerTask("default", ["clean", "jshint", "less", "concat", "uglify"]);
};
