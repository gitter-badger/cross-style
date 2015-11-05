(function($) {
  "use strict";

  window.crossStyle = {
    cssProperties: require('./configurations'),
    cssRulesPattern: /(([a-zA-Z\n\s.#-]+){([a-zA-Z:;\n\s-]+)}){1}/g,
    spacePattern: /\s/g,
    cssRulePattern: /([a-zA-Z\n\s.#-]+){([a-zA-Z:;\n\s-]+)}/i,
    bootstrap: function() {
      var cssNum = document.styleSheets.length;
      var timeout = setInterval(function() {
        if (document.styleSheets.length >= cssNum) {
          window.crossStyle.handle(document.styleSheets);
          clearInterval(timeout);
        }
      }, 10);
    },
    handleCssProperty: function(rule, propertyKey, propertyValue) {
      $.each(window.crossStyle.cssProperties, function(key, value) {
        if (propertyKey == key) {
          value.handle({
            selector: rule,
            keyCss: propertyKey,
            valueCss: propertyValue
          });
          return false;
        }
      });
    },
    handleCssProperties: function (rule, properties) {
      $.each(properties, function (k, property) {
        property = property.split(':');
        if (property.length == 2) {
          var propertyKey = property[0];
          var propertyValue = property[1];
          window.crossStyle.handleCssProperty(rule, propertyKey, propertyValue);
        }
      });
    },
    handleSingleStylesheet: function(cssText) {
      cssText = cssText.replace(window.crossStyle.spacePattern, "");
      var cssRules = cssText.match(window.crossStyle.cssRulesPattern);

      $.each(cssRules, function(i, cssRule) {
        cssRule = cssRule.match(window.crossStyle.cssRulePattern);
        for (var j = 1; j < cssRule.length; j += 2) {
          var rule = cssRule[j];
          var properties = cssRule[j + 1].split(';');
          window.crossStyle.handleCssProperties(rule, properties);
        }
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
