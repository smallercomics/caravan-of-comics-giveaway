module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.initConfig({
		sass: {                              
			dist: {                          
		    	options: {                      
		        	style: 'expanded'
		      	},
		      	files: {                        
		        	'dist/css/main.css': 'src/main.scss',    
		      	}
		    }
		},
		uglify: {
      		options: {
        		banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      		},
      		dist: {
  		    	files: {
          			'dist/js/main.min.js': 'src/main.js',   
        		}
      		}
    	},
    	copy: {
	  		files: {
				cwd: 'src/img',   // set working folder / root to copy
				src: '**/*',      // copy all files and subfolders
				dest: 'dist/img', // destination folder
				expand: true      // required when using cwd
	  		}
		}
	});

  /**
   * Custom task to build website pages.
	 * Takes any .yaml files from src/artists/*
	 * and builds an html page from each, copies over images
	 * and other assets.
   */
  grunt.registerTask('build', 'Build website', function() {
    
    var markdown = require( "markdown" ).markdown;

    /*
     * manifest.yaml contains the running order of all artists
     * and global config.
     */
    var manifest = grunt.file.readYAML('src/manifest.yaml')
        template = grunt.file.read('src/tpl/page.tpl'),
  		  artists = [],
        pages = [];

    /**
     * Whether this artist's work should be available to download
     */
    var is_available = function(src_folder){
      this_index = manifest.run.indexOf(src_folder) + 1;
      day = manifest.day;
      
      if ( (day == this_index) || ( (day-1) == this_index)){
        return true;
      }
      return false;
    }
    
    /**
     * Whether this artist should be visible on site at all.
     */
    var is_linkable = function(src_folder){
      this_index = manifest.run.indexOf(src_folder) + 1;
      day = manifest.day;

      return (this_index <= day);
    }

    /**
     * Read in all the artists content.yaml files
     */
    manifest.run.map(function(src_folder){
      artists[src_folder] = grunt.file.readYAML(grunt.file.expand('src/artists/' + src_folder +'/*.yaml'));
      artists[src_folder].slug = src_folder;
    })
    
    manifest.run
  		.map(function(src_folder){

  			var data = artists[src_folder];
        
        /**
         * For each artist/page work out if they have a next/previous artist,
         * and construct the links if they do
         */
        var idx = manifest.run.indexOf(src_folder),
            prev = (idx-1 >=0) ? manifest.run[idx-1] : false,
            next = (idx+1 < manifest.run.length) ? manifest.run[idx+1] : false;

        if (next){
          if ((idx+1)<Number(manifest.day)){
            data.next_one = "<a href='"+ artists[next].slug +".html'>" + artists[next].name + " &raquo;</a>" ; 
          }else{
            data.next_one = "Next week is <strong>" + artists[next].name + "</strong>";
          }
        }else{
          data.next_one = false;  
        }
        data.prev_one = prev? "<a href='"+ artists[prev].slug +".html'>&laquo; " + artists[prev].name + "</a>" : false;
        
        data.src_folder = src_folder;

        return data;
  		})
  		.map(function(page){
  			
        if (is_linkable(page.slug)){
          
          /**
           * Transform markdown
           */
  			  page.description = markdown.toHTML(page.description);
  			  page.further = markdown.toHTML(page.further);
        
          if (page.links){
            page.links.map(function (item){
              item.description = markdown.toHTML(item.description);
              return item;
            });
          }

          page.download_is_available = is_available(page.slug);
        
  			  // copy required files
          var files = ['banner.jpg', 'cover.jpg', 'chip.jpg', page.slug+ ".jpg" ];

          if (page.sponsor){
            files.push(page.sponsor.image);
          }

          if (page.links){
            files = files.concat(page.links.map(function(item){
              return item.image;
            }));
          }
  			
          files.map(function(file){
  				  grunt.file.copy('src/artists/' + page.slug + '/' + file, 'dist/assets/' + page.slug + '/' + file);
  			  });

          if (page.sponsor){
            page.sponsor.image = 'assets/' + page.slug + '/' + page.sponsor.image;
          }else{
            page.sponsor = false;
          }

  			  var out = grunt.template.process(template,{data:page});
          grunt.file.write('dist/' + page.slug + '.html', out);  
        }
  			
	  	});
		  
      // current
      var current_day = manifest.run[manifest.day-1];
      
      grunt.log.writeln('> copying ' + current_day + ' to index file');

      grunt.file.copy('dist/' + current_day + '.html', 'dist/index.html');
		
  });

  grunt.registerTask('default', ['build', 'sass', 'uglify', 'copy'	]);
};