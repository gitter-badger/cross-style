module.exports = {
  development: {
    options: {
      compress: false,
      yuicompress: true,
      optimization: 2
    },
    files: {
      './build/css/tdo.css': ['./src/assets/less/**/*.less']
    }
  }
};