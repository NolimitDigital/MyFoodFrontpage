// page init
jQuery(function(){
	jQuery('.btn-submit, .btn-green').pressedState({
		pressedClass: 'pressed'
	});
});

/*
 * jQuery Pressed State helper plugin
 */
;(function($){
	$.fn.pressedState = function(o) {
		var options = $.extend({
			pressedClass: 'pressed'
		},o);
		
		// add handlers
		return this.each(function(){
			var item = $(this);
			if(isTouchDevice) {
				item.bind('touchstart', function() {
					item.addClass(options.pressedClass);
					$(document).one('touchend', function() {
						item.removeClass(options.pressedClass);
					});
				})
			} else {
				item.bind('mousedown', function() {
					item.addClass(options.pressedClass);
					item.bind('mouseup.pstate mouseleave.pstate', function() {
						item.removeClass(options.pressedClass).unbind('.pstate');
					}).bind('mousemove.pstate', function(e) {
						e.preventDefault();
					});
				});
			}
		});
	}
	
	// detect device type
	var isTouchDevice = (function() {
		try {
			return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		} catch (e) {
			return false;
		}
	}());
	
}(jQuery));