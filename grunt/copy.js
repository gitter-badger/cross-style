module.exports = {
  main: {
    files: [{
      expand: true,
      cwd: 'src/stylesheets/scss',
      src: '**',
      dest: 'build/stylesheets/scss/'
    }, {
      expand: true,
      cwd: 'src/vendors',
      src: '**',
      dest: 'build/vendors/'
    }, {
      src: 'src/index.html',
      dest: 'build/index.html'
    }, {
      src: 'src/server.js',
      dest: 'build/server.js'
    }]
  },
  less: {
    dist: [{
      expand: true,
      cwd: 'src/stylesheets/less',
      src: '**',
      dest: 'build/stylesheets/less/'
    }]
  },
  sass: {
    dist: [{
      expand: true,
      cwd: 'src/stylesheets/sass',
      src: '**',
      dest: 'build/stylesheets/sass/'
    }]
  },
  stylus: {
    dist: [{
      expand: true,
      cwd: 'src/stylesheets/stylus',
      src: '**',
      dest: 'build/stylesheets/stylus/'
    }]
  }
};
