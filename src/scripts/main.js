(function () {

  var handleCrossStyle = function (styles) {

  };

	var cssnum = document.styleSheets.length;
	var ti = setInterval(function () {
		if (document.styleSheets.length >= cssnum) {
			handleCrossStyle(document.styleSheets);
			clearInterval(ti);
		}
	}, 10);
});
