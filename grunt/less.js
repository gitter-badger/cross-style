module.exports = {
  development: {
    options: {
      compress: false,
      yuicompress: true,
      optimization: 2
    },
    files: {
      './build/stylesheets/test.css': ['./src/stylesheets/less/test.less']
    }
  }
};
