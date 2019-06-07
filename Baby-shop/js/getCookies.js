getCookies = function(id) {
	if(document.querySelector('.add-category__label-info')) {
		var count = document.querySelector('.add-category__label-info').textContent;
	} else {
		var count = 1;
	};
	var name = 'Basket';
	var date = new Date;
	date.setDate(date.getDate() + 365);
	date =  date.toUTCString();

	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
		    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	};
	if(getCookie(name)) {
		var oldCookies = getCookie(name);
		var newCookies = name + "=" + oldCookies + "," + id + "-" + count + ";expires=" + date;
	} else {
		var newCookies = name + "=" + id + "-" + count + ";expires=" + date;
	};
	document.cookie = newCookies;
	checkCookie();
};