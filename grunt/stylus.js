module.exports = {
  development: {
    options: {
      compress: false
    },
    files: {
      './build/stylesheets/test.css': ['./src/stylesheets/stylus/test.styl']
    }
  }
};
