/*global jQuery */
/*!
 * jquery.optimumfit.js 1.0
 *
 * Copyright 2013, Derek King http://hyperlounge.com
 * Released under the MIT license
 *
 */

(function( $ ){

	$.fn.optimumFit = function() {

		return this.each(function(){

			// Store the object
			var $this = $(this),
				$parent = $this.parent().addClass('optimumfit'),
				ie8 = document.documentMode == 8,
				ie7 = !ie8 && (document.documentMode == 7 || navigator.appVersion.indexOf("MSIE 7.") != -1);

			$this.css({
				position: 'absolute',
				width: $this.width() + 'px',
				height: $this.height() + 'px',
				'-webkit-transform': 'translate3d(0,0,0)',
				'-moz-transform': 'translate3d(0,0,0)',
				'-ms-transform': 'translate3d(0,0,0)',
				'-o-transform': 'translate3d(0,0,0)',
				transform: 'translate3d(0,0,0)'
			});

			var originalSize = {
				width: $this.width(),
				height: $this.height()
			};

			function fit() {
				var outerSize = {width:$parent.width(), height:$parent.height()};
				var scale = Math.min(outerSize.height / originalSize.height, outerSize.width / originalSize.width);
				if (ie7) {
					$this.css({
						top: (outerSize.height - originalSize.height * scale) / 2,
						left: (outerSize.width - originalSize.width * scale) / 2,
						'zoom': scale
					});
				} else if (ie8) {
					$this.css({
						top: (outerSize.height - originalSize.height * scale) / (2 * scale),
						left: (outerSize.width - originalSize.width * scale) / (2 * scale),
						'zoom': scale
					});
				} else {
					$this.css({
						top: Math.floor((outerSize.height - originalSize.height) / 2),
						left: Math.floor((outerSize.width - originalSize.width) / 2),
						'-webkit-transform': 'scale(' + scale + ', ' + scale + ')',
						'-ms-transform': 'scale(' + scale + ', ' + scale + ')',
						'-moz-transform': 'scale(' + scale + ')'
					});
				}
			}

			fit();

			$(window).on('resize.optimumfit orientationchange.optimumfit', fit);
		});

	};

})( jQuery );
