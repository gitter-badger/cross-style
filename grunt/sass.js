module.exports = {
  scss: {
    options: { // Target options
      sourcemap: 'none'
    },
    files: {
      './build/stylesheets/test.css': ['./src/stylesheets/scss/test.scss']
    }
  },
  sass: {
    options: { // Target options
      sourcemap: 'none'
    },
    files: {
      './build/stylesheets/test.css': ['./src/stylesheets/sass/test.sass']
    }
  }
};
