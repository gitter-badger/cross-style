(function() {
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
      for (var cssPropertyConfiguration in window.crossStyle.cssProperties) {
        var key = cssPropertyConfiguration;
        var value = window.crossStyle.cssProperties[key];
        if (propertyKey == key) {
          value.handle({
            selector: selector,
            keyCss: propertyKey,
            valueCss: propertyValue
          });
          break;
        }
      }
    },
    handleCssProperties: function(selector, cssProperties) {
      for (var i = 0; i < cssProperties.length; i++) {
        var cssProperty = cssProperties[i];
        window.crossStyle.cssPropertyPattern.lastIndex = 0;
        var extractedCssProperty = window.crossStyle.cssPropertyPattern.exec(cssProperty);
        if (extractedCssProperty.length >= 4) {
          var propertyKey = extractedCssProperty[1];
          var propertyValue = extractedCssProperty[3];
          window.crossStyle.handleCssProperty(selector, propertyKey, propertyValue);
        }
      }
    },
    handleSingleStylesheet: function(cssText) {
      cssText = cssText.replace(window.crossStyle.spacePattern, "");
      var cssRules = cssText.match(window.crossStyle.cssRulesPattern);

      for (var i = 0; i < cssRules.length; i++) {
        var cssRule = cssRules[i];
        window.crossStyle.cssSelectorPattern.lastIndex = 0;
        var selector = window.crossStyle.cssSelectorPattern.exec(cssRule)[1];
        var cssProperties = cssRule.match(window.crossStyle.cssPropertyPattern);

        window.crossStyle.handleCssProperties(selector, cssProperties);
      }
    },
    getStylesheet: function(stylesheetUrl) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          window.crossStyle.handleSingleStylesheet(xhttp.responseText);
        }
      };
      xhttp.open("GET", stylesheetUrl, true);
      xhttp.send();
    },
    handle: function(styles) {
      for (var i = 0; i < styles.length; i++) {
        window.crossStyle.getStylesheet(styles[i].href);
      }
    }
  };

  window.crossStyle.bootstrap();
})();
