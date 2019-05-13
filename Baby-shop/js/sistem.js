'use strict';

/*ОТКРЫТИЕ И ЗАКРЫТИЕ МЕНЮ НА ГЛАВНОЙ СТРАНИЦЕ*/


var SUBCATEGORY_SIZE = 64.8;
var CATEGORY_SIZE = 92.8;
var openMenuButton = document.querySelector('.navigation-button');
var openCategoryButton = document.querySelectorAll('.main-navigation__category-button');
var searchButton = document.querySelector('.search-button');
var filterButton = document.querySelector('.filter-button')
var menu = document.querySelector('.main-navigation__category-list');
var subcategory = document.querySelectorAll('.main-navigation__subcategory-list');
var subcategoryWrapper = document.querySelectorAll('.main-navigation__subcategory-wrapper');
var buttonWrapper = document.querySelector('.buttons-wrapper')
var header = document.querySelector('.main-header__content-wrapper');
var body = document.querySelector('body');
var subcategoryIcon = document.querySelectorAll('.main-navigation__category-icon');
var categorySize =document.querySelectorAll('.main-navigation__category-item');
var subcategorySize = document.querySelectorAll('.main-navigation__subcategory-link');



/*Функция возвращает координаты блока element*/
var getPosition = function(element) {
	return element.getBoundingClientRect();
};

/*Функция "прилепляет" элемент stick к верхней границе вьюпорта, если элемент check находится вне вьюпорта,
в противном случае, прилепляет в нижней границе элемента check.*/
var stickElement = function(check, stick) {
	if(getPosition(check).bottom < 0) {
		stick.style.top = '0px';
	} else {
		stick.style.top = check.getBoundingClientRect().bottom + 'px';
	};
};

var closeSubcategoryHeandler = function(evt) {
	evt.preventDefault();
	for(i = 0; i < openCategoryButton.length; i++) {
		if(evt.target.localName === 'span') {
			if(openCategoryButton[i] === evt.target.parentElement) {
				menu.style.height = parseInt(menu.style.height) - parseInt(subcategory[i].style.height) + 'px';
				subcategory[i].style.height = '0px';
				openCategoryButton[i].parentElement.style.color = 'white';
				openCategoryButton[i].classList.remove('rotate');
				subcategoryIcon[i].classList.remove('red');
				openCategoryButton[i].addEventListener('click', openSubcategoryHeandler);
				openCategoryButton[i].removeEventListener('click', closeSubcategoryHeandler);
			};
		} else {
			if(openCategoryButton[i] === evt.target) {
				menu.style.height = parseInt(menu.style.height) - parseInt(subcategory[i].style.height) + 'px';
				subcategory[i].style.height = '0px';
				openCategoryButton[i].parentElement.style.color = 'white';
				openCategoryButton[i].classList.remove('rotate');
				subcategoryIcon[i].classList.remove('red');
				openCategoryButton[i].addEventListener('click', openSubcategoryHeandler);
				openCategoryButton[i].removeEventListener('click', closeSubcategoryHeandler);
				
			};
		};
	};
};

var openSubcategoryHeandler = function(evt) {
	evt.preventDefault();

	var SUBCATEGORY_SIZE = 64.8;
	var CATEGORY_SIZE = 92.8;
	var openMenuButton = document.querySelector('.navigation-button');
	var openCategoryButton = document.querySelectorAll('.main-navigation__category-button');
	var searchButton = document.querySelector('.search-button');
	var filterButton = document.querySelector('.filter-button')
	var menu = document.querySelector('.main-navigation__category-list');
	var subcategory = document.querySelectorAll('.main-navigation__subcategory-list');
	var subcategoryWrapper = document.querySelectorAll('.main-navigation__subcategory-wrapper');
	var buttonWrapper = document.querySelector('.buttons-wrapper')
	var header = document.querySelector('.main-header__content-wrapper');
	var body = document.querySelector('body');
	var subcategoryIcon = document.querySelectorAll('.main-navigation__category-icon');
	var categorySize =document.querySelectorAll('.main-navigation__category-item');
	var subcategorySize = document.querySelectorAll('.main-navigation__subcategory-link');
	
	for(i = 0; i < openCategoryButton.length; i++) {
		console.log(subcategory);
		menu.style.height = parseInt(menu.style.height) - parseInt(subcategory[i].style.height) + 'px';
		subcategory[i].style.height = '0px';
		openCategoryButton[i].parentElement.style.color = 'white';
		openCategoryButton[i].classList.remove('rotate');
		subcategoryIcon[i].classList.remove('red');

		openCategoryButton[i].addEventListener('click', openSubcategoryHeandler);
		if(evt.target.localName === 'span') {
			if(openCategoryButton[i] == evt.target.parentElement) {
				subcategory[i].style.height = ((subcategoryWrapper[i].children.length) * subcategorySize[0].offsetHeight) + 'px';
				menu.style.height = parseInt(menu.style.height) + parseInt(subcategory[i].style.height) + 'px';
				openCategoryButton[i].parentElement.style.color = '#e23709';
				openCategoryButton[i].classList.add('rotate');
				subcategoryIcon[i].classList.add('red');
				openCategoryButton[i].removeEventListener('click', openSubcategoryHeandler);
				openCategoryButton[i].addEventListener('click', closeSubcategoryHeandler);
			};
		} else {
			if(openCategoryButton[i] == evt.target) {
				subcategory[i].style.height = ((subcategoryWrapper[i].children.length) * subcategorySize[0].offsetHeight) + 'px';
				menu.style.height = parseInt(menu.style.height) + parseInt(subcategory[i].style.height) + 'px';
				openCategoryButton[i].parentElement.style.color = '#e23709';
				openCategoryButton[i].classList.add('rotate');
				subcategoryIcon[i].classList.add('red');
				openCategoryButton[i].removeEventListener('click', openSubcategoryHeandler);
				openCategoryButton[i].addEventListener('click', closeSubcategoryHeandler);
			};
		};
	};
};

var scrollHeandler = function() {
	if(getPosition(header).bottom > 0) {
		menu.style.position = 'absolute';
	} else {
		menu.style.position = 'fixed';
	};
};

/*Обработчик, открывающий главное меню, при нажатии на кнопку openMenuButton.*/
var openMenuHeandler = function(evt) {
	var catSize =document.querySelectorAll('.main-navigation__category-item')[0];
	menu.style.height = ((menu.children.length) * catSize.offsetHeight) + 'px';
	if(getPosition(header).bottom < 0) {
		menu.style.position = 'fixed';
	};

	searchButton.classList.add('hidden');
	filterButton.classList.add('hidden');
	openMenuButton.classList.add('navigation-button--active');
	openMenuButton.removeEventListener('click', openMenuHeandler);
	openMenuButton.addEventListener('click', closeMenuHeandler);
	window.addEventListener('scroll', scrollHeandler);
	var openCategoryButton = document.querySelectorAll('.main-navigation__category-button');
	for(var i = 0; i < openCategoryButton.length; i++) {
		openCategoryButton[i].addEventListener('click', openSubcategoryHeandler);
	};
};

/*Обработчик, закрывающий главное меню, при нажатии на кнопку openMenuButton.*/
var closeMenuHeandler = function() {
	setTimeout(function(){
		menu.style.top = null;
		menu.style.position = null;
	}, 500);
	
	menu.style.height = '0';
	searchButton.classList.remove('hidden');
	filterButton.classList.remove('hidden');
	openMenuButton.classList.remove('navigation-button--active');
	openMenuButton.addEventListener('click', openMenuHeandler);
	openMenuButton.removeEventListener('click', closeMenuHeandler);
	window.removeEventListener('scroll', scrollHeandler);
	for(var i = 0; i < openCategoryButton.length; i++) {
		openCategoryButton[i].removeEventListener('click', openSubcategoryHeandler);
		subcategory[i].style.height = '0px';
		openCategoryButton[i].parentElement.style.color = 'white';
		openCategoryButton[i].classList.remove('rotate');
		subcategoryIcon[i].classList.remove('red');
	};
};




if(document.documentElement.clientWidth < 1024) {
	openMenuButton.addEventListener('click', openMenuHeandler);
} else {
	menu.style.height = 'auto';
};










/*ПОЛЬЗОВАТЕЛЬСКОЕ МЕНЮ*/
var userMenu = 	{
	menu: document.querySelector('.user-navigation__user-menu'),        /*Выпадающее меню меню*/
	oButton: document.querySelector('.user-navigation__login'),         /*Кнопка открытия меню*/
	cButton: document.querySelector('.navigation-button'),              /*Кнопка закрытия меню*/
	enter: document.querySelector('.user-navigation__enter'),           /*Раздел меню с авторизацией*/
	reg: document.querySelector('.user-navigation__reg'),               /*Раздел меню с регистрацией*/
	regButton: document.querySelector('.user-menu__reg'),               /*Кнопка открытия регистрации*/
	forget: document.querySelector('.user-navigation__forget'),         /*Раздел меню с восстановлением пароля*/
	forgetButton: document.querySelector('.user-menu__forget'),         /*Кнопка открытия восстановления пароля*/
	regBack: document.querySelector('.user-navigation__back-reg'),      /*Кнопка "назад" в разделе регистрации*/
	forgetBack: document.querySelector('.user-navigation__back-forget') /*Кнопка "назад" в разделе восстановления пароля*/
};

userMenu.backHeandler = function() {
	userMenu.reg.style.opacity = '0';
	userMenu.forget.style.opacity = '0';
	setTimeout(function() {
		userMenu.reg.classList.add('hidden');
		userMenu.forget.classList.add('hidden');
		userMenu.enter.style.opacity = '1';
	}, 500);
	userMenu.regBack.removeEventListener('click', userMenu.backHeandler);
};

userMenu.openRegHeandler = function() {
	userMenu.enter.style.opacity = '0';
	userMenu.reg.classList.remove('hidden');
	userMenu.regBack.addEventListener('click', userMenu.backHeandler);
	setTimeout(function() {
		userMenu.reg.style.opacity = '1';
	}, 500);
};

userMenu.openForgetHeandler = function() {
	userMenu.enter.style.opacity = '0';
	userMenu.forget.classList.remove('hidden');
	userMenu.forgetBack.addEventListener('click', userMenu.backHeandler);
	setTimeout(function() {
		userMenu.forget.style.opacity = '1';
	}, 500);
};

userMenu.openUserMenuHeandler = function() {
	
	if(userMenu.menu === document.querySelector('.user-navigation__user-menu')) {
		userMenu.oButton.classList.add('user-navigation__login--active');
	};

	if(userMenu.cButton.classList.contains('navigation-button--active')) {
		
		search.clodeSearchHeandler();
		setTimeout(open, 500);
		if(document.documentElement.clientWidth < 1024) {
			closeMenuHeandler();
		};	
	}  else {
		open();
	};

	function open() {
		userMenu.menu.style.height = userMenu.menu.children[0].offsetHeight + 'px';
		userMenu.menu.style.top = document.querySelector('.main-header').offsetHeight - document.querySelector('.main-navigation__category-list').offsetHeight + 'px';
		userMenu.cButton.classList.add('navigation-button--active');
		document.querySelector('.search-button').classList.add('hidden');
		document.querySelector('.filter-button').classList.add('hidden');
		if(document.documentElement.clientWidth > 1023) {
			setTimeout (function() {
				userMenu.cButton.style.display = 'block';
			}, 500);	
		};
	};

	userMenu.forgetButton.addEventListener('click', userMenu.openForgetHeandler);
	userMenu.regButton.addEventListener('click', userMenu.openRegHeandler);
	userMenu.oButton.removeEventListener('click', userMenu.openUserMenuHeandler);
	userMenu.cButton.addEventListener('click', userMenu.closeUserMenuHeandler);
	openMenuButton.removeEventListener('click', openMenuHeandler);
};

userMenu.closeUserMenuHeandler = function() {
	if(userMenu.menu === document.querySelector('.user-navigation__user-menu')) {
		userMenu.oButton.classList.remove('user-navigation__login--active');
	};

	userMenu.menu.style.height = '0';
	userMenu.cButton.classList.remove('navigation-button--active');
	document.querySelector('.search-button').classList.remove('hidden');
	document.querySelector('.filter-button').classList.remove('hidden');
	if(document.documentElement.clientWidth > 1023) {
		userMenu.cButton.style.display = 'none';	
	};
	setTimeout(function() {
		userMenu.reg.classList.add('hidden');
		userMenu.reg.style.opacity = '0';
		userMenu.forget.classList.add('hidden');
		userMenu.forget.style.opacity = '0';
		userMenu.enter.style.opacity = '1';
	}, 500);

	userMenu.forgetButton.removeEventListener('click', userMenu.openForgetHeandler);
	userMenu.regButton.removeEventListener('click', userMenu.openRegHeandler);
	userMenu.oButton.addEventListener('click', userMenu.openUserMenuHeandler);
	userMenu.cButton.removeEventListener('click', userMenu.closeUserMenuHeandler);
	openMenuButton.addEventListener('click', openMenuHeandler);
};

userMenu.oButton.addEventListener('click', userMenu.openUserMenuHeandler);






/*ПОИСК*/
var search = {
	menu: document.querySelector('.search'),                   /*меню поиска*/
	oButton: document.querySelector('.search-button'),         /*кнопка открытия поиска*/
	cButton: document.querySelector('.navigation-button')      /*кнопка закрытия поиска*/
}

search.ScrollHeandler = function() {
	if(getPosition(document.querySelector('.main-header')).bottom > 0) {
		search.menu.style.position = 'absolute';
	} else {
		search.menu.style.position = 'fixed';
	};
};
search.ScrollHeandler = search.ScrollHeandler.bind(search);

search.openSearchHeandler = function() {
	if(getPosition(document.querySelector('.main-header')).bottom < 0) {
		search.menu.style.position = 'fixed';
	};

	search.menu.style.height = search.menu.children[0].offsetHeight + 'px';
	search.cButton.classList.add('navigation-button--active');
	document.querySelector('.search-button').classList.add('hidden');
	document.querySelector('.filter-button').classList.add('hidden');
	if(document.documentElement.clientWidth > 1023) {
		setTimeout(function() {
			search.cButton.style.display = 'block';
		}, 500);
	};
	

	window.addEventListener('scroll', search.ScrollHeandler);
	search.oButton.removeEventListener('click', search.openSearchHeandler);
	search.cButton.addEventListener('click', search.clodeSearchHeandler);
	openMenuButton.removeEventListener('click', openMenuHeandler);
};

search.clodeSearchHeandler = function() {
	search.menu.style.height = '0';
	search.cButton.classList.remove('navigation-button--active');
	document.querySelector('.search-button').classList.remove('hidden');
	document.querySelector('.filter-button').classList.remove('hidden');
	if(document.documentElement.clientWidth > 1023) {
		search.cButton.style.display = 'none';
	};
	
	setTimeout(function(){
		search.menu.style.top = null;
		search.menu.style.position = null;
	}, 500);

	window.removeEventListener('scroll', search.ScrollHeandler);
	search.oButton.addEventListener('click', search.openSearchHeandler);
	search.cButton.removeEventListener('click', search.clodeSearchHeandler);
	openMenuButton.addEventListener('click', openMenuHeandler);
}

search.oButton.addEventListener('click', search.openSearchHeandler);



