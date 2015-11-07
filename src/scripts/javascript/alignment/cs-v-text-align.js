module.exports = {
  handle: function(options) {
    "use strict";

    var selector = options.selector,
      valueCss = options.valueCss;

    switch (valueCss) {
      case 'center':
        var resizeHandler = function() {
          var height = window.innerHeight;
          var elements = document.querySelectorAll(selector);
          for (var i = 0; i < elements.length; i++) {
            var heightEle = elements[i].offsetHeight;
            elements[i].style.marginTop = ((height - heightEle) / 2) + 'px';
          }
        };
        window.onresize = resizeHandler;
        resizeHandler();
        break;
      default:
        break;
    }
  }
};
