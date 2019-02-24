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
var subcategoryIcon = document.querySelectorAll('.main-navigation__category-icon')

/*Функция возвращает координаты блока element*/
var getPosition = function(element) {
	return element.getBoundingClientRect();
};

/*Функция "прилепляет" элемент stick к верхней границе вьюпорта, если элемент check находится вне вьюпорта,
в противном случае, прилепляет в нижней границе элемента check.*/
var stickElement = function(check, stick) {
	if(getPosition(check).bottom <= 0) {
		stick.style.top = Math.trunc(Math.abs(body.getBoundingClientRect().top)) - check.offsetHeight + 'px';
	} else {
		stick.style.top = check.getBoundingClientRect().top + 'px';
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
				
				subcategory[i].style.height = ((subcategory[i].children.length -1) * SUBCATEGORY_SIZE) + 'px';
				menu.style.height = parseInt(menu.style.height) + parseInt(subcategory[i].style.height) + 'px';
				openCategoryButton[i].parentElement.style.color = '#e23709';
				openCategoryButton[i].classList.add('rotate');
				subcategoryIcon[i].classList.add('red');
				openCategoryButton[i].removeEventListener('click', openSubcategoryHeandler);
				openCategoryButton[i].addEventListener('click', closeSubcategoryHeandler);
			};
		} else {
			if(openCategoryButton[i] == evt.target) {

				subcategory[i].style.height = ((subcategory[i].children.length -1) * SUBCATEGORY_SIZE) + 'px';
				menu.style.height = parseInt(menu.style.height) + parseInt(subcategory[i].style.height) + 'px';
				console.dir(subcategory[i].offsetHeight)
				openCategoryButton[i].parentElement.style.color = '#e23709';
				openCategoryButton[i].classList.add('rotate');
				subcategoryIcon[i].classList.add('red');
				openCategoryButton[i].removeEventListener('click', openSubcategoryHeandler);
				openCategoryButton[i].addEventListener('click', closeSubcategoryHeandler);
				console.log(menu.style.height);
			};
		};
	};
};

/*Обработчик, открывающий главное меню, при нажатии на кнопку openMenuButton.*/
var openMenuHeandler = function(evt) {
	menu.style.height = ((menu.children.length) * CATEGORY_SIZE) + 'px';
	searchButton.classList.add('hidden');
	filterButton.classList.add('hidden');
	openMenuButton.classList.add('navigation-button--active');
	openMenuButton.removeEventListener('click', openMenuHeandler);
	openMenuButton.addEventListener('click', closeMenuHeandler);
	stickElement(header, menu);
	window.addEventListener('scroll', function() {
		stickElement(header, menu);
	});
	for(var i = 0; i < openCategoryButton.length; i++) {
		openCategoryButton[i].addEventListener('click', openSubcategoryHeandler);
	};
};

/*Обработчик, закрывающий главное меню, при нажатии на кнопку openMenuButton.*/
var closeMenuHeandler = function() {
	menu.style.height = '0px';
	searchButton.classList.remove('hidden');
	filterButton.classList.remove('hidden');
	openMenuButton.classList.remove('navigation-button--active');
	openMenuButton.addEventListener('click', openMenuHeandler);
	openMenuButton.removeEventListener('click', closeMenuHeandler);
	window.removeEventListener('scroll', function() {
		stickElement(header, menu);
	});
	for(var i = 0; i < openCategoryButton.length; i++) {
		openCategoryButton[i].removeEventListener('click', openSubcategoryHeandler);
		subcategory[i].style.height = '0px';
		openCategoryButton[i].parentElement.style.color = 'white';
		openCategoryButton[i].classList.remove('rotate');
		subcategoryIcon[i].classList.remove('red');
	};
};

openMenuButton.addEventListener('click', openMenuHeandler);











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