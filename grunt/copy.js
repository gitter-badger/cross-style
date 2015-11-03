module.exports = {
  main: {
  	files: [
  		{
		  	expand: true,
		    cwd: 'src/assets/fonts',
		    src: '**',
		    dest: 'build/fonts/'
		},
		{
		  	expand: true,
		    cwd: 'src/assets/img',
		    src: '**',
		    dest: 'build/img/'
		},
		{
			src: './src/app.js',
			dest: './build/app.js'
		}
	],
  },
};