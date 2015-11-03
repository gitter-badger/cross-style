module.exports = function (options) {
	var $ = option.jQuery,
		selector = options.selector,
		keyCss = options.keyCss,
		valueCss = options.valueCss;

	var handleVerticalTextAlign = function () {
		switch (valueCss) {
			case 'center':
				$(window).resize(function () {
					var height = $(this).height();
					$(selector).css('margin-top', (height / 2) +'px');
				});
				break;
			case 'center-fixed':
			case 'center-absolute':
				$(window).resize(function () {
					var height = $(this).height();
					$(selector).css('top', (height / 2) +'px');
				});
				break;
			default:

		}
	};

	switch (keyCss) {
		case 'v-text-align':
			handleVerticalTextAlign();
			break;
		default:
			break;
	}
};
