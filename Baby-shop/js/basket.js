URL_BASKET_LOAD = 'PHP/basket_ajax.php';

seeCookie = function() {
	var name = 'Basket';
	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
		    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	};
	var cookieStr = getCookie(name);
	if(cookieStr) {
		var cookieArray = cookieStr.split(',');
		for(var i = 0; i < cookieArray.length; i++) {
			cookieArray[i] = cookieArray[i].split('-');
			cookieArray[i][0] = parseInt(cookieArray[i][0]);
			cookieArray[i][1] = parseInt(cookieArray[i][1]);
		};
	};
	return cookieArray;
};

sortArray = function(array, newArray) {
	newArray[newArray.length] = array[0];
	for(var i = 0; i < array.length; i++) {
		if(newArray[newArray.length-1][0] === array[i][0]) {
			array.splice(i,1);
			i--
		};
	};
	if(array.length > 0) {
		sortArray(array, newArray);
	};
};
var cookieList = [];
if(seeCookie()) {
	sortArray(seeCookie(), cookieList);
};


var cookieArray = seeCookie();
var xhrArray = [];
for (var i = 0; i < cookieList.length; i++) {
	cookieList[i][1] = 0;
	xhrArray[i] = cookieList[i][0];
	for (var j = 0; j < cookieArray.length; j++) {
		if(cookieList[i][0] === cookieArray[j][0]) {
			cookieList[i][1] = cookieList[i][1] + cookieArray[j][1];
		};
	};
};
jsonArray = JSON.stringify(xhrArray);

renderbasket = function(data) {
	if(data) {
		var container = document.querySelector('.basket-wrapper');
		var fragment = document.createDocumentFragment();
		var total = 0;
		for (var i = 0; i < data.length; i++) {
			var useTemplate = document.querySelector('.basket-template').content.cloneNode(true);
			if(data[i][5] !== 'empty') {
				useTemplate.querySelector('.basket-item__photo-img').src = 'images/items/' + data[i][0] + '/360/' + data[i][5];
			} else {
				useTemplate.querySelector('.basket-item__photo-img').src = 'images/empty.png';
			};
			useTemplate.querySelector('.basket-item__name').textContent = data[i][1];
			useTemplate.querySelector('.add-category__label-info').textContent = cookieList[i][1];
			if(data[i][3]) {
				useTemplate.querySelector('.basket-item__price').textContent = data[i][3];
				useTemplate.querySelector('.basket-item__total').textContent = data[i][3] * cookieList[i][1];
				total = total + (data[i][3] * cookieList[i][1]);
			} else {
				useTemplate.querySelector('.basket-item__price').textContent = data[i][2];
				useTemplate.querySelector('.basket-item__total').textContent = data[i][2] * cookieList[i][1];
				total = total + (data[i][2] * cookieList[i][1]);
			};
			fragment.appendChild(useTemplate);
		};
		container.appendChild(fragment);
		document.querySelector('.basket__header-price').textContent = total;
		countButtons();
	} else {
		document.querySelector('.basket').classList.add('done');
		document.querySelector('.basket__empty').classList.remove('done');
	};
};

xhrBasketHeandler = function(evt) {
	if(this.status == 200) {
		var basketData = this.response;
		renderbasket(basketData);
	};
};

loadBasket = function(data) {
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.addEventListener('load', xhrBasketHeandler);
	xhr.open('POST', URL_BASKET_LOAD);
	xhr.send(data);
};

loadBasket(jsonArray);


/*КНОПКИ КОЛИЧЕСТВА УДАЛЕНИЯ ТОВАРОВ В КОРЗИНЕ*/

getPerem = function() {
	basket = {
		lButtons: document.querySelectorAll('.add-category__spot-left'),
		rButtons: document.querySelectorAll('.add-category__spot-right'),
		delButtons: document.querySelectorAll('.item-button'),
		number: document.querySelectorAll('.add-category__label-info'),
		prices: document.querySelectorAll('.basket-item__price'),
		totals: document.querySelectorAll('.basket-item__total'),
		sum: document.querySelector('.basket__header-price'),
		items: document.querySelectorAll('.basket-item'),
		buttons: document.querySelectorAll('.item__buttons')
	};
	return basket;
};

rewriteCookies = function(delId) {
	getPerem();
	var delFlag = false;
	if(delId !== undefined) {
		cookieList.splice(delId,1);
		delFlag = true;
	};
	var name = 'Basket';
	var date = new Date;
	date.setDate(date.getDate() + 365);
	date =  date.toUTCString();
	var newCookie = name + '=';
	for(var i = 0; i < cookieList.length; i++) {
		xhrArray[i] = cookieList[i][0];
		var id = cookieList[i][0];
		var count = cookieList[i][1];
		if(i === 0) {
			newCookie = newCookie + id + "-" + count;
		} else {
			newCookie = newCookie + ',' + id + "-" + count;
		};
	};
	newCookie = newCookie + ";expires=" + date;
	document.cookie = newCookie;
	checkCookie();
	if(delFlag) {
		basket.items[delId].remove();
		basket.buttons[delId].remove();
		getPerem();

		if(!basket.lButtons[0]) {
			document.querySelector('.basket').classList.add('done');
			document.querySelector('.basket__empty').classList.remove('done');
		};
	};
};

countButtons = function() {
	getPerem();

	lButtonHeandler = function(evt) {
		getPerem();
		summa = 0;
		for(var i = 0; i < basket.lButtons.length; i++) {
			if(event.target.contains(basket.lButtons[i]) && basket.number[i].textContent > 1) {
				basket.number[i].textContent--;
				cookieList[i][1]--;
				basket.totals[i].textContent = basket.prices[i].textContent * basket.number[i].textContent;
				rewriteCookies();
			};
		};
		for(var i = 0; i < basket.totals.length; i++) {
			summa = summa + basket.prices[i].textContent * basket.number[i].textContent;
		};
		basket.sum.textContent = summa;
	};

	rButtonHeandler = function(evt) {
		getPerem();
		summa = 0;
		for(var i = 0; i < basket.rButtons.length; i++) {
			if(event.target.contains(basket.rButtons[i]) && basket.number[i].textContent < 9) {
				basket.number[i].textContent++;
				cookieList[i][1]++;
				basket.totals[i].textContent =basket.prices[i].textContent * basket.number[i].textContent;
				rewriteCookies();
			};
		};
		for(var i = 0; i < basket.totals.length; i++) {
			summa = summa + basket.prices[i].textContent * basket.number[i].textContent;
		};
		basket.sum.textContent = summa;
	};

	delButtonHeandler = function(evt) {
		getPerem();
		summa = 0;
		for(var i = 0; i < basket.delButtons.length; i++) {
			if(evt.target.contains(basket.delButtons[i])) {
				rewriteCookies(i);
				getPerem();
				i--;
			} else {
				getPerem();
				summa = summa + basket.prices[i].textContent * basket.number[i].textContent;
			};
			basket.sum.textContent = summa;
		};
	};

	for(var i = 0; i < basket.lButtons.length; i++) {
		basket.lButtons[i].addEventListener('click', lButtonHeandler);
		basket.rButtons[i].addEventListener('click', rButtonHeandler);
		basket.delButtons[i].addEventListener('click', delButtonHeandler);
	};
};
