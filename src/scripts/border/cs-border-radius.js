module.exports = {
  handle: function(options) {
    "use strict";

    var $ = require('jquery'),
      selector = options.selector,
      valueCss = options.valueCss;

    if ($) {
      $(selector).css('border-radius', valueCss)                         // Opera 10.5, IE 9, Safari 5, Chrome, Firefox 4, iOS 4, Android 2.1+
                 .css('-moz-border-radius', valueCss)                    // Firefox 1-3.6
                 .css('-webkit-border-radius', valueCss)                 // Safari 3-4, iOS 1-3.2, Android 1.6-
                 .css('-khtml-border-radius', valueCss)                  // For old Konqueror browsers
                 .css('behavior', 'url(../vendors/css-pie/2.0-beta-1/PIE.htc)');        // IE 6-8
    }
  }
};
