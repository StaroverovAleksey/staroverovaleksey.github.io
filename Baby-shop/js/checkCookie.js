checkCookie = function() {
	var name = 'Basket';
	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
		    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	};
	var cookieStr = getCookie(name);
	var count = 0;
	if(cookieStr) {
		var cookieArray = cookieStr.split(',');
		for(var i = 0; i < cookieArray.length; i++) {
			cookieArray[i] = cookieArray[i].split('-');
			count += parseInt(cookieArray[i][1]);
		};
	};
	document.querySelector('.user-navigation__value').textContent = count;
};
checkCookie();