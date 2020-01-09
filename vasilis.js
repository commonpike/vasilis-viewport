/*
	201911*pike
	include this in your header just below the viewport meta tag
  and change the vasilisMin to your liking.
	https://www.quirksmode.org/blog/archives/2011/06/dynamically_cha.html
*/


var vasilisMin = 468
var vasilisTimer=null;
var vasilisPrev=0;
var vasilisCache='';

function vasilisViewport(minwidth) {

	if (!minwidth) minwidth=0;
	
	if (screen.width!=vasilisPrev) {
		
		vasilisPrev = screen.width;
		
		if (!vasilisCache) {
			var mvps = document.getElementsByTagName('meta');
			for (var i = 0; i < mvps.length; i++) {
				if (mvps[i].getAttribute('name')=='viewport') {
					vasilisCache=mvps[i].getAttribute('content');
				}
			}
		}
		
		var newViewport=vasilisCache;
		if (screen.width <= minwidth) {
			newViewport='width='+minwidth;
			// user-scalable=no, initial-scale=1,..
		}
		
		var mvps = document.getElementsByTagName('meta');
		for (var i = 0; i < mvps.length; i++) {
			if (mvps[i].getAttribute('name')=='viewport') {
				var curViewport = mvps[i].getAttribute('content');
				if (curViewport!=newViewport) {
					if (window.console) {
						console.log('Changing viewport to '+newViewport);
					}
					mvps[i].setAttribute('content',newViewport);
				}
			}
		}
		
	}
}

vasilisViewport(vasilisMin); 
window.onresize = function() { 
	clearTimeout(vasilisTimer);
    vasilisTimer = setTimeout(function(){   
    	vasilisViewport(vasilisMin); 
    },1000);
}
