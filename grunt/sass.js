module.exports = {
  development: {
    options: { // Target options
      sourcemap: 'none'
    },
    files: {
      //'./build/stylesheets/test.css': ['./src/stylesheets/sass/test.sass']
      './build/stylesheets/test.css': ['./src/stylesheets/scss/test.scss']
    }
  }
};
