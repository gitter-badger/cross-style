module.exports = {
  main: {
    files: [{
      expand: true,
      cwd: 'src/stylesheets/css',
      src: '**',
      dest: 'build/css/'
    },
    {
      expand: true,
      cwd: 'src/stylesheets/less',
      src: '**',
      dest: 'build/stylesheets/less/'
    },
    {
      expand: true,
      cwd: 'src/stylesheets/sass',
      src: '**',
      dest: 'build/stylesheets/sass/'
    },
    {
      expand: true,
      cwd: 'src/stylesheets/scss',
      src: '**',
      dest: 'build/stylesheets/scss/'
    },
    {
      expand: true,
      cwd: 'src/stylesheets/stylus',
      src: '**',
      dest: 'build/stylesheets/stylus/'
    },
    {
      src: 'src/index.html',
      dest: 'build/index.html'
    },
    {
      src: 'src/server.js',
      dest: 'build/server.js'
    }],
  },
};
