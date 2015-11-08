module.exports = {
  handle: function(options) {
    "use strict";

    var selector = options.selector,
      valueCss = options.valueCss;

    /*
     ** border-bottom-right-radius: Opera 10.5, IE 9, Safari 5, Chrome, Firefox 4, iOS 4, Android 2.1+
     ** -moz-border-bottom-right-radius: Firefox 1-3.6
     ** -webkit-border-bottom-right-radius: Safari 3-4, iOS 1-3.2, Android 1.6-
     ** -khtml-border-bottom-right-radius: For old Konqueror browser
     ** behavior: IE 6-8
     */
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      var cssText = elements[i].getAttribute('style').trim();
      var semicolon = cssText[cssText.length - 1] == ';' ? '' : ';';
      elements[i].setAttribute('style', cssText + semicolon + 'border-bottom-right-radius:' + valueCss + '; -moz-border-bottom-right-radius:' + valueCss + '; -webkit-border-bottom-right-radius:' + valueCss +
        '; -khtml-border-bottom-right-radius:' + valueCss + '; behavior: url(../vendors/css-pie/2.0-beta-1/PIE.htc)');
    }
  }
};
