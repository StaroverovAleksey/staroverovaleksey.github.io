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
var buttonWrapper = document.querySelector('.buttons-wrapper')
var header = document.querySelector('.main-header__content-wrapper');
var body = document.querySelector('body');
var subcategoryIcon = document.querySelectorAll('.main-navigation__category-icon');
var subcategorySize = document.querySelector('.main-navigation__subcategory-link').offsetHeight;
var categorySize =document.querySelector('.main-navigation__category-item').offsetHeight;

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
	for(i = 0; i < openCategoryButton.length; i++) {
		menu.style.height = parseInt(menu.style.height) - parseInt(subcategory[i].style.height) + 'px';
		subcategory[i].style.height = '0px';
		openCategoryButton[i].parentElement.style.color = 'white';
		openCategoryButton[i].classList.remove('rotate');
		subcategoryIcon[i].classList.remove('red');

		openCategoryButton[i].addEventListener('click', openSubcategoryHeandler);
		if(evt.target.localName === 'span') {
			if(openCategoryButton[i] == evt.target.parentElement) {
				
				subcategory[i].style.height = ((subcategory[i].children.length -1) * subcategorySize) + 'px';
				menu.style.height = parseInt(menu.style.height) + parseInt(subcategory[i].style.height) + 'px';
				openCategoryButton[i].parentElement.style.color = '#e23709';
				openCategoryButton[i].classList.add('rotate');
				subcategoryIcon[i].classList.add('red');
				openCategoryButton[i].removeEventListener('click', openSubcategoryHeandler);
				openCategoryButton[i].addEventListener('click', closeSubcategoryHeandler);
			};
		} else {
			if(openCategoryButton[i] == evt.target) {

				subcategory[i].style.height = ((subcategory[i].children.length -1) * subcategorySize) + 'px';
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
	menu.style.height = ((menu.children.length) * categorySize) + 'px';
	if(getPosition(header).bottom < 0) {
		menu.style.position = 'fixed';
	};

	searchButton.classList.add('hidden');
	filterButton.classList.add('hidden');
	openMenuButton.classList.add('navigation-button--active');
	openMenuButton.removeEventListener('click', openMenuHeandler);
	openMenuButton.addEventListener('click', closeMenuHeandler);
	window.addEventListener('scroll', scrollHeandler);
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

openMenuButton.addEventListener('click', openMenuHeandler);









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
		closeMenuHeandler();
		search.clodeSearchHeandler();
		setTimeout(open, 500);
	}  else {
		open();
	};

	function open() {
		userMenu.menu.style.height = userMenu.menu.children[0].offsetHeight + 'px';
		userMenu.menu.style.top = document.querySelector('.main-header').offsetHeight + 'px';
		userMenu.cButton.classList.add('navigation-button--active');
		document.querySelector('.search-button').classList.add('hidden');
		document.querySelector('.filter-button').classList.add('hidden');
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









/*ПОВЕДЕНИЕ ОСНОВНОГО СЛАЙДЕРА НА ГЛАВНОЙ СТРАНИЦЕ.*/
(function() {

var DELAY = 5000;
var slides = document.querySelectorAll('.main-slider__image');
var counter = 1;

/*Функция коллбэк, с каждым запуском увеличивающая прозрачность одного слайда
и уменьшающая у остальных. */
var toIncreaseOpacity = function () {
	slides[counter].style.opacity = '1';

	if(counter === 0) {
		slides[slides.length - 1].style.opacity = '0';
	} else {
		slides[counter - 1].style.opacity = '0';
	}
	
	if(counter === slides.length - 1) {
		counter = 0;
	} else {
		counter++;
	};	
};

/*Функция-таймер.*/
var swapSlide = function recoll(collback) {
	collback();
	setTimeout(function() {
		recoll(collback);
	}, DELAY);
};

setTimeout(function() {
	swapSlide(toIncreaseOpacity);
}, DELAY);

})();





(function() {

/*УНИВЕРСАЛЬНЫЙ КОНСТРУКТОР, ОПИСЫВАЮЩИЙ ПОВЕДЕНИЕ СЛАЙДЕРА*/
function Slider(right, left, array, showRight, showLeft, hideRight, hideLeft, others, time) {
	this.rButton = right;              /*Кнопка переключения слайдера направо*/
	this.lButton = left;               /*Кнопка переключения слайдера налево*/
	this.slideArray = array;           /*Массив слайдов*/
	this.rShow = showRight;            /*Класс с анимацией, показывающей новый слайд при нажатии правой кнопки*/
	this.lShow = showLeft;             /*Класс с анимацией, показывающей новый слайд при нажатии левой кнопки*/
	this.rHide = hideRight;            /*Класс с анимацией, скрывающий старый слайд при нажатии правой кнопки*/
	this.lHide = hideLeft;             /*Класс с анимацией, скрывающий старый слайд при нажатии левой кнопки*/
	this.others = others;              /*Класс, применяемый к остальным слайдам*/
	this.time = time;                  /*Время работы анимации переключения слайдов*/
	this.counter = 0;                  /*Счетчик номера активного слайда в массиве слайдов*/	
};

Slider.prototype.rHeandler = rightButtonHeandler;              /*Обработчик на правой кнопке*/
Slider.prototype.lHeandler = leftButtonHeandler;               /*Обработчик на левой кнопке*/
Slider.prototype.bindContext = function() {    	               /*Привязка обработчиков к контексту*/
	this.rHeandler = this.rHeandler.bind(this);
	this.lHeandler = this.lHeandler.bind(this);  
};
Slider.prototype.hangHeandler = function() {                   /*Установка обработчиков на кнопки*/
	this.rButton.addEventListener('click', this.rHeandler);
	this.lButton.addEventListener('click', this.lHeandler);
};
	

function rightButtonHeandler(evt) {
	evt.preventDefault();
		
	var previousSlide = this.counter - 1;
	if(previousSlide === this.slideArray.length) {
		previousSlide = 0;
	};
	if(previousSlide === -1) {
		previousSlide = this.slideArray.length -1;
	}
	this.slideArray[previousSlide].classList.remove(this.rShow);
	this.slideArray[previousSlide].classList.remove(this.lShow);
	this.slideArray[previousSlide].classList.remove(this.rHide);
	this.slideArray[previousSlide].classList.remove(this.lHide);
	this.slideArray[previousSlide].classList.add(this.others);
		
	
	this.slideArray[this.counter].classList.remove(this.others);
	this.slideArray[this.counter].classList.remove(this.rShow);
	this.slideArray[this.counter].classList.remove(this.lShow);
	this.slideArray[this.counter].classList.remove(this.lHide);
	this.slideArray[this.counter].classList.add(this.rHide);
	
	var nextSlide = this.counter +1;
	if(nextSlide === this.slideArray.length) {
		nextSlide = 0;
	};
	this.slideArray[nextSlide].classList.remove(this.others);
	this.slideArray[nextSlide].classList.remove(this.rHide);
	this.slideArray[nextSlide].classList.remove(this.lHide);
	this.slideArray[nextSlide].classList.add(this.rShow);
	this.slideArray[nextSlide].classList.remove(this.lShow);
	
	this.counter++;
	if(this.counter === this.slideArray.length) {
		this.counter = 0;
	};

	this.lButton.classList.add('hidden');
	this.rButton.classList.add('activity');
	this.rButton.removeEventListener('click', this.rHeandler);
		
	var slider = this;
	setTimeout(function() {
		slider.lButton.classList.remove('hidden');
		slider.rButton.classList.remove('activity');
		slider.rButton.addEventListener('click', slider.rHeandler);
	}, slider.time);
};

function leftButtonHeandler(evt) {
	evt.preventDefault();

	var previousSlide = this.counter + 1;
	if(previousSlide === this.slideArray.length) {
		previousSlide = 0;
	};
	this.slideArray[previousSlide].classList.remove(this.rShow);
	this.slideArray[previousSlide].classList.remove(this.lShow);
	this.slideArray[previousSlide].classList.remove(this.lHide);
	this.slideArray[previousSlide].classList.remove(this.rHide);
	this.slideArray[previousSlide].classList.add(this.others);
		

	this.slideArray[this.counter].classList.remove(this.others);
	this.slideArray[this.counter].classList.remove(this.rShow);
	this.slideArray[this.counter].classList.remove(this.lShow);
	this.slideArray[this.counter].classList.remove(this.rHide);
	this.slideArray[this.counter].classList.add(this.lHide);
	

	var nextSlide = this.counter - 1;
	if(nextSlide < 0) {
		nextSlide = this.slideArray.length - 1;
	};
	this.slideArray[nextSlide].classList.remove(this.others);
	this.slideArray[nextSlide].classList.remove(this.lHide);
	this.slideArray[nextSlide].classList.remove(this.rHide);
	this.slideArray[nextSlide].classList.remove(this.rShow);
	this.slideArray[nextSlide].classList.add(this.lShow);

	this.counter--;
	if(this.counter < 0) {
		this.counter = this.slideArray.length - 1;
	};

	this.rButton.classList.add('hidden');
	this.lButton.classList.add('activity');
	this.lButton.removeEventListener('click', this.lHeandler);
	
	var slider = this;
	setTimeout(function() {
		slider.rButton.classList.remove('hidden');
		slider.lButton.classList.remove('activity');
		slider.lButton.addEventListener('click', slider.lHeandler);
	}, slider.time);
};

window.Slider = Slider;

})();


/*ПОДКЛЮЧЕНИЕ СЛАЙДЕРА В БЛОКЕ DISCOUNT*/
(function() {

	var slider = new window.Slider(
		document.querySelector('.discount-button--right'),
		document.querySelector('.discount-button--left'),
		document.querySelectorAll('.discount-slide-wrapper'),
		'show-right',
		'show-left',
		'hide',
		'hide',
		'hidden',
		500
	);
	
	slider.bindContext();
	slider.hangHeandler();
})();





/*ПОДКЛЮЧЕНИЕ СЛАЙДЕРА В БЛОКЕ SET*/
(function() {

	var slider = new window.Slider(
		document.querySelector('.set-button--right'),
		document.querySelector('.set-button--left'),
		document.querySelectorAll('.set-wrapper'),
		'show-right',
		'show-left',
		'hide-set',
		'hide-set',
		'hidden',
		500
	);
	
	slider.bindContext();
	slider.hangHeandler();
})();










/*Поведение пунктов меню и подменю на главной странице*/

/*Поведение блока set на главной странице*/

var openCartButton = document.querySelectorAll('.set-product__button');
var cart = document.querySelectorAll('.product-cart');

var searchParent = function (evt) {
	var parent = [];
	if(evt.target.parentElement.localName === 'div') {
		parent[0] = evt.target.parentElement;
	} else {
		parent[0] = evt.target.parentElement.parentElement;
	};

	if(evt.target.localName === 'button') {
		parent[1] = evt.target;
	} else {
		parent[1] = evt.target.parentElement;
	};
	
	return parent;
};

var closeAllCart = function(evt) {
	switch('product-cart') {
		case evt.target.classList[0]:
		return;

		case evt.target.parentElement.classList[0]:
		return;

		case evt.target.parentElement.parentElement.classList[0]:
		return;

		default:
		switch('set-product__button') {
			case evt.target.classList[0]:
			return;

			case evt.target.parentElement.classList[0]:
			return;

			default:
			for(var i =0; i < openCartButton.length; i++) {
				cart[i].classList.add('hidden');
				openCartButton[i].classList.remove('rotate');
				openCartButton[i].addEventListener('click', openCart);
			};
		};
	};
};

var closeCart = function(evt) {

	searchParent(evt)[0].children[2].classList.add('hidden');
	searchParent(evt)[1].classList.remove('rotate');

	searchParent(evt)[1].addEventListener('click', openCart);
	searchParent(evt)[1].removeEventListener('click', closeCart);
};

var openCart = function(evt) {

	for(var i =0; i < openCartButton.length; i++) {
		cart[i].classList.add('hidden');
		openCartButton[i].classList.remove('rotate');
		openCartButton[i].addEventListener('click', openCart);
	};

	searchParent(evt)[0].children[2].classList.remove('hidden');
	searchParent(evt)[1].classList.add('rotate')

	searchParent(evt)[1].removeEventListener('click', openCart);
	searchParent(evt)[1].addEventListener('click', closeCart);
};

for(var i = 0; i < openCartButton.length; i++) {
	openCartButton[i].addEventListener('click', openCart);
};

window.addEventListener('click', closeAllCart);