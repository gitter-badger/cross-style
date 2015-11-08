(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
module.exports = {
  handle: function(options) {
    "use strict";

    var selector = options.selector,
      valueCss = options.valueCss;

    // border-radius: Opera 10.5, IE 9, Safari 5, Chrome, Firefox 4, iOS 4, Android 2.1+
    // -moz-border-radius: Firefox 1-3.6
    // -webkit-border-radius: Safari 3-4, iOS 1-3.2, Android 1.6-
    // -khtml-border-radius: For old Konqueror browsers
    // -behavior: IE 6-8
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      var cssText = elements[i].getAttribute('style').trim();
      var semicolon = cssText[cssText.length - 1] == ';' ? '': ';';
      elements[i].setAttribute('style', cssText + semicolon + 'border-radius:' + valueCss + '; -moz-border-radius:' + valueCss + '; -webkit-border-radius:' + valueCss +
                                        '; -khtml-border-radius:' + valueCss + '; -behavior: url(../vendors/css-pie/2.0-beta-1/PIE.htc)');
    }
  }
};

},{}],3:[function(require,module,exports){
module.exports = {
  'cs-v-text-align': require('./alignment/cs-v-text-align'),
  'cs-border-radius': require('./border/cs-border-radius')
};

},{"./alignment/cs-v-text-align":1,"./border/cs-border-radius":2}],4:[function(require,module,exports){
(function() {
  "use strict";

  window.crossStyle = {
    cssProperties: require('./configurations'),
    spacePattern: /\s/g,
    cssRulesPattern: /([^{]+)({+)(([^{:]+)(:+)([^}:;]+)(;?)[\s\n]?)+(}+)/g,
    cssSelectorPattern: /([^{}]+){[^{}]+}/g,
    cssPropertyPattern: /([^{}:;]+)([:]+)([^{}:;]+)([;]?)/g,
    helpers: {
      ajax: {
        xmlHttpFactories: [
          function() {
            return new XMLHttpRequest();
          },
          function() {
            return new ActiveXObject("Msxml2.XMLHTTP");
          },
          function() {
            return new ActiveXObject("Msxml3.XMLHTTP");
          },
          function() {
            return new ActiveXObject("Microsoft.XMLHTTP");
          }
        ],
        createXmlHttpObject: function() {
          var xmlHttp = false;
          for (var i = 0; i < window.crossStyle.helpers.ajax.xmlHttpFactories.length; i++) {
            try {
              xmlHttp = window.crossStyle.helpers.ajax.xmlHttpFactories[i]();
            } catch (e) {
              continue;
            }
            break;
          }
          return xmlHttp;
        },
        sendRequest: function(url, data, callback) {
          var request = window.crossStyle.helpers.ajax.createXmlHttpObject();
          if (!request) return;
          var method = (data) ? "POST" : "GET";
          request.open(method, url, true);
          request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          if (data)
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          request.onreadystatechange = function() {
            if (request.readyState != 4) return;
            if (request.status != 200 && request.status != 304) {
              return;
            }
            callback(request);
          };
          if (request.readyState == 4) return;
          request.send(data);
        }
      }
    },
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
        if (propertyKey == key) {
          var value = window.crossStyle.cssProperties[key];
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
      window.crossStyle.helpers.ajax.sendRequest(stylesheetUrl, null, function(response) {
        window.crossStyle.handleSingleStylesheet(response.responseText);
      });
    },
    handle: function(styles) {
      for (var i = 0; i < styles.length; i++) {
        window.crossStyle.getStylesheet(styles[i].href);
      }
    }
  };

  window.crossStyle.bootstrap();
})();

},{"./configurations":3}]},{},[4]);
