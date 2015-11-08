module.exports = {
  handle: function(options) {
    "use strict";

    var $ = require('jquery'),
      selector = options.selector,
      valueCss = options.valueCss;

    if ($) {
      /*
       ** border-top-right-radius: Opera 10.5, IE 9, Safari 5, Chrome, Firefox 4, iOS 4, Android 2.1+
       ** -moz-border-top-right-radius: Firefox 1-3.6
       ** -webkit-border-top-right-radius: Safari 3-4, iOS 1-3.2, Android 1.6-
       ** -khtml-border-top-right-radius: For old Konqueror browser
       ** behavior: IE 6-8
       */
      $(selector).css('border-top-right-radius', valueCss)
        .css('-moz-border-top-right-radius', valueCss)
        .css('-webkit-border-top-right-radius', valueCss)
        .css('-khtml-border-top-right-radius', valueCss)
        .css('behavior', 'url(../vendors/css-pie/2.0-beta-1/PIE.htc)');
    }
  }
};
