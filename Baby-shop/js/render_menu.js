URL_MENU_LOAD = 'PHP/menu_ajax.php';

renderMenu = function() {
	var menu = {
		wrapperCat: document.querySelector('.main-navigation__category-list'),
		wrapperSub: document.querySelector('.main-navigation__subcategory-wrapper'),
		templateCat: document.querySelector('.menu__template').content,
		templateSub: document.querySelector('.subcategory__template').content
	};
	menu.items = menu.wrapperCat.querySelectorAll('.main-navigation__category-item')

	for(i = 0; i < menu.items.length; i++) {
		menu.wrapperCat.removeChild(menu.items[i]);
	};
	
	var templateCatUse;
	var templateSubUse;
	var fragment = document.createDocumentFragment();
	for(var i =0; i < menuData.length; i++) {
		templateCatUse = menu.templateCat.cloneNode(true);
		templateCatUse.querySelector('.main-navigation__category-link').insertAdjacentHTML('afterbegin', menuData[i][1]);
		templateCatUse.querySelector('.main-navigation__category-link').href = 'http://localhost/Baby-shop/list.php?category=' + menuData[i][0];
		if(menuData[i][3] !== null) {
			templateCatUse.querySelector('.main-navigation__accent-image').src = menuData[i][3];
		};
		if(menuData[i][2] !== null) {
			templateCatUse.querySelector('.main-navigation__accent-signature').textContent = menuData[i][2];
		} else {
			templateCatUse.querySelector('.main-navigation__accent-wrapper').classList.add('hidden');
		};
		var menuDataSub = menuData[i][5];
		var menuDataSubId = menuData[i][6];
		if(menuDataSub) {
			for(var j = 0; j < menuDataSub.length; j++) {
				templateSubUse = menu.templateSub.cloneNode(true);
				templateSubUse.querySelector('.main-navigation__subcategory-link').textContent = menuDataSub[j];
				templateSubUse.querySelector('.main-navigation__subcategory-link').href = 'http://localhost/Baby-shop/list.php?category=' + menuData[i][0] + '&subcategory=' + menuDataSubId[j];
				templateCatUse.querySelector('.main-navigation__subcategory-wrapper').appendChild(templateSubUse);
			}; 
		} else {
			templateCatUse.querySelector('.main-navigation__category-button').classList.add('hidden');
			templateCatUse.querySelector('.main-navigation__subcategory-list').classList.add('hidden');
			};
		fragment.appendChild(templateCatUse);
	};
	menu.wrapperCat.appendChild(fragment);
};

xhrMenuHeandler = function(evt) {
	if(this.status == 200) {
		menuData = this.response;
		renderMenu();
	};
};

loadMenu = function() {
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.addEventListener('load', xhrMenuHeandler);
	xhr.open('POST', URL_MENU_LOAD);
	xhr.send(null);
};
loadMenu();