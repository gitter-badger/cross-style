module.exports = {
  handle: function(options) {
    "use strict";

    var $ = require('jquery'),
      selector = options.selector,
      valueCss = options.valueCss;

    if ($) {
      switch (valueCss) {
        case 'center':
          $(window).resize(function() {
            var height = $(this).height();
            var heightEle = $(selector).height();
            $(selector).css('margin-top', ((height - heightEle) / 2) + 'px');
          });
          $(window).trigger('resize');
          break;
        default:
          break;
      }
    }
  }
};
