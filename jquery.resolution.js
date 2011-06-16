/* 
* Part of Nitriques Solutions inc. (http://www.nitriques.com) jQuery plug-in bundle
* 
* Use this plugin to automatically switch css class on root element in order to accomodate differents
* screen resolution.
* 
* Usage $.ntr$fontSize(opts);
* 
* options w and h always means that the css class will be applied if the resolution is less than mention
* 
* Examples:
* 
* 1- Default:      ****  resulting css will be 'resolution-w1024'
* 		$.ntr$resolution({
* 			res: [
* 				{w:1024}
* 			]
* 		});
* 
* 2- With options: 
* 		$.ntr$resolution({
*           res: [
* 				{w:1024}
* 			],
*           prefix: 'my-resolution', // css prefix class
*           root: '#my-root' 		// root DOM element that gets the css class
* 		});
* 
* 4- With width and height resolution options:  ****  resulting css will be 'resolution-w1024-h720'
* 		$.ntr$resolution({
* 			res: [
* 				{w:1024, h:720}
* 			]
* 		});
* 
* 4- With multiple resolution options:  ** NOTE they must be in ASC order
* 		$.ntr$resolution({
* 			res: [
* 				{w:1024, h:720},  //****  resulting css will be 'resolution-w1024-h720'
* 				{w:1024},         //****  resulting css will be 'resolution-w1024'
* 				{w:1200},         //****  resulting css will be 'resolution-w1200'
*               {h:900},          //****  resulting css will be 'resolution-h900'
* 			]
* 		});
* 
* Liscence under the The Code Project Open License (CPOL)
* http://www.codeproject.com/info/cpol10.aspx

* Name: jquery.resolution.js
* Date: 2011-06-16
* Version: 1.0

* Pre-requisites: none;

* 
* Version 1.0
* 	Initial version

*/
(function ($, undefined) {
	
	var defaults = {
			res: [],
			root: 'body',
			prefix: 'resolution'
		};
	
	$.extend({ // jQuery plugin
	    ntr$resolution: function(options) {

			var opts = $.extend({}, defaults, options),
				win = $(window);
			
			function getClass(w, h) {
				var c = opts.prefix + '-';
				if (w && h) {
					c += 'w' + w + '-h' + h; 
				} else if (w) {
					c += 'w' + w;
				} else if (h) {
					c += 'h' + h;
				}
				
				return c;
			}
			
			function process() {
				var x = 0,
					ww = win.width(),
					wh = win.height(),
					found = false,
					res = null;
				
				// remove all resolution classes
				// from : http://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
				$(opts.root).attr('class',
		           function(i, c){
		              return c.replace(new RegExp('[ ]?'+opts.prefix+'-[^ ]+','g'), '');
		           }
				);
				
				// try to match a resolution
				while (!found && x < opts.res.length) {
					// update pointer
					res = opts.res[x];
					
					if (res.w && res.h) {
						found = ww < res.w && wh < res.h;
					} else if (res.w) {
						found = ww < res.w;
					} else if (res.h) {
						found = wh < res.h;
					}
					
					// increment
					x++;
				}
				
				// set class if found
				if (found && res) {
					$(opts.root).addClass(getClass(res.w, res.h));
				}
				
				return false;
			}
			
			// process once to detect the current resolution
			process();
			
			// hook events
			win.resize(process);
			
			return $;
		}
			
	}); // extend

})(jQuery);