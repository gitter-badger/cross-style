(function($) {
  "use strict";

  window.crossStyle = {
    cssProperties: require('./configurations'),
    spacePattern: /\s/g,
    cssRulesPattern: /([^{]+)({+)(([^{:]+)(:+)([^}:;]+)(;?)[\s\n]?)+(}+)/g,
    cssSelectorPattern: /([^{}]+){[^{}]+}/g,
    cssPropertyPattern: /([^{}:;]+)([:]+)([^{}:;]+)([;]?)/g,
    bootstrap: function() {
      var cssNum = document.styleSheets.length;
      var timeout = setInterval(function() {
        if (document.styleSheets.length >= cssNum) {
          window.crossStyle.handle(document.styleSheets);
          clearInterval(timeout);
        }
      }, 10);
    },
    handleCssProperty: function(selector, propertyKey, propertyValue) {
      $.each(window.crossStyle.cssProperties, function(key, value) {
        if (propertyKey == key) {
          value.handle({
            selector: selector,
            keyCss: propertyKey,
            valueCss: propertyValue
          });
          return false;
        }
      });
    },
    handleCssProperties: function (selector, cssProperties) {
      $.each(cssProperties, function (i, cssProperty) {
        window.crossStyle.cssPropertyPattern.lastIndex = 0;
        var extractedCssProperty = window.crossStyle.cssPropertyPattern.exec(cssProperty);
        if(extractedCssProperty.length >= 4) {
            var propertyKey = extractedCssProperty[1];
            var propertyValue = extractedCssProperty[3];
            window.crossStyle.handleCssProperty(selector, propertyKey, propertyValue);
        }
      });
    },
    handleSingleStylesheet: function(cssText) {
      cssText = cssText.replace(window.crossStyle.spacePattern, "");
      var cssRules = cssText.match(window.crossStyle.cssRulesPattern);

      $.each(cssRules, function(i, cssRule) {
        window.crossStyle.cssSelectorPattern.lastIndex = 0;
        var selector = window.crossStyle.cssSelectorPattern.exec(cssRule)[1];
        var cssProperties = cssRule.match(window.crossStyle.cssPropertyPattern);

        window.crossStyle.handleCssProperties(selector, cssProperties);
      });
    },
    handle: function(styles) {
      for (var i = 0; i < styles.length; i++) {
        $.get(styles[i].href, window.crossStyle.handleSingleStylesheet);
      }
    }
  };

  window.crossStyle.bootstrap();
})(require('jquery'));
