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
		//stick.style.top = Math.trunc(Math.abs(body.getBoundingClientRect().top)) - check.offsetHeight + 'px';
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

var scrollHeandler = function(header,menu, evt) {
	stickElement(header, menu);
	console.dir(evt);
	window.addEventListener('mouseover', function(evt) {
		if(evt.target === menu) {
			console.dir(111);
		};
	});
};

/*Обработчик, открывающий главное меню, при нажатии на кнопку openMenuButton.*/
var openMenuHeandler = function(evt) {

	menu.style.height = ((menu.children.length) * categorySize) + 'px';
	menu.style.position = 'fixed';
	searchButton.classList.add('hidden');
	filterButton.classList.add('hidden');
	openMenuButton.classList.add('navigation-button--active');
	openMenuButton.removeEventListener('click', openMenuHeandler);
	openMenuButton.addEventListener('click', closeMenuHeandler);
	stickElement(header, menu);
	window.addEventListener('scroll', function(evt) {
		scrollHeandler(header, menu, evt);
	});
	for(var i = 0; i < openCategoryButton.length; i++) {
		openCategoryButton[i].addEventListener('click', openSubcategoryHeandler);
	};
	menu.style.transition = '0s';
};

/*Обработчик, закрывающий главное меню, при нажатии на кнопку openMenuButton.*/

/*var scrollHeandler = function(header, menu) {
	menu.style.transition = null;
	stickElement(header, menu);
}
*/
var closeMenuHeandler = function() {
	menu.style.transition = '0.5s';
	
	menu.style.height =  null;
	if(header.getBoundingClientRect().bottom < 0) {
		menu.style.top = '-' + header.offsetHeight + 'px';
	} else {
		menu.style.top = header.getBoundingClientRect().bottom;
	};
	
	//menu.style.position = 'absolute';
	searchButton.classList.remove('hidden');
	filterButton.classList.remove('hidden');
	openMenuButton.classList.remove('navigation-button--active');
	openMenuButton.addEventListener('click', openMenuHeandler);
	openMenuButton.removeEventListener('click', closeMenuHeandler);
	window.removeEventListener('scroll', function(evt) {
		scrollHeandler(header, menu, evt);
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







/*ПОВЕДЕНИЕ СЛАЙДЕРА В БЛОКЕ DISCOUNT*/
function Slider(right, left, array, counter, showRight, showLeft, hideRight, hideLeft, others, rightHeandler, leftHeandler) {
	this.rightButton = right;              /*Кнопка переключения слайдера направо*/
	this.leftButton = left;                /*Кнопка переключения слайдера налево*/
	this.slideArray = array;               /*Массив слайдов*/
	this.counter = counter;                /*Счетчик номера активного слайда в массиве слайдов*/
	this.showRight = showRight;            /*Класс с анимацией, показывающей новый слайд при нажатии правой кнопки*/
	this.showLeft = showLeft;              /*Класс с анимацией, показывающей новый слайд при нажатии левой кнопки*/
	this.hideRight = hideRight;            /*Класс с анимацией, показывающей старый слайд при нажатии правой кнопки*/
	this.hideLeft = hideLeft;              /*Класс с анимацией, показывающей старый слайд при нажатии левой кнопки*/
	this.others = others;                  /*Класс, применяемый к остальным слайдам*/
	this.rightHeandler = rightHeandler;    /*Обработчик на правой кнопке*/
	this.leftHeandler = leftHeandler;      /*Обработчик на правой кнопке*/
};

var discount = new Slider(
	rightButtonDiscount = document.querySelector('.discount-button--right'),
	leftButtonDiscount = document.querySelector('.discount-button--left')
	);
console.dir(discount);

var ANIMATION_TIME = 500;
var rightButtonDiscount = document.querySelector('.discount-button--right');
var leftButtonDiscount = document.querySelector('.discount-button--left');
var slidesDiscount = document.querySelectorAll('.discount-slide-wrapper');
slidesDiscount.counter = 0;

	function rightButtonHeandler(slideArrey, activButton, inactivButton, counter, evt) {
		evt.preventDefault();
		counter = slideArrey.counter;

		(function(){
			var previousSlide = counter - 1;
			if(previousSlide === slideArrey.length) {
				previousSlide = 0;
			};
			if(previousSlide === -1) {
				previousSlide = slideArrey.length -1;
			}
			slideArrey[previousSlide].classList.remove('show-right');
			slideArrey[previousSlide].classList.remove('show-left');
			slideArrey[previousSlide].classList.remove('hide');
			slideArrey[previousSlide].classList.add('hidden');
		})();
		
		(function(){
			slideArrey[counter].classList.remove('hidden');
			slideArrey[counter].classList.remove('show-right');
			slideArrey[counter].classList.remove('show-left');
			slideArrey[counter].classList.add('hide');
		})();
		
		(function(){
			var nextSlide = counter +1;
			if(nextSlide === slideArrey.length) {
				nextSlide = 0;
			};
			slideArrey[nextSlide].classList.remove('hidden');
			slideArrey[nextSlide].classList.remove('hide');
			slideArrey[nextSlide].classList.add('show-right');
			slideArrey[nextSlide].classList.remove('show-left');
		})();

		counter++;
		if(counter === slideArrey.length) {
			counter = 0;
		};

		inactivButton.classList.add('hidden');
		activButton.classList.add('activity');
		//activButton.removeEventListener('click', rightButtonHeandler);
		
		setTimeout(function() {
			inactivButton.classList.remove('hidden');
			activButton.classList.remove('activity');
			//activButton.addEventListener('click', callBackRightDiscount);
		}, ANIMATION_TIME);
		slideArrey.counter = counter;
	};

	function leftButtonHeandler(slideArrey, activButton, inactivButton,  counter, evt) {
		evt.preventDefault();
		counter = slideArrey.counter;

		(function(){
			var previousSlide = counter + 1;
			if(previousSlide === slideArrey.length) {
				previousSlide = 0;
			};
			slideArrey[previousSlide].classList.remove('show-right');
			slideArrey[previousSlide].classList.remove('show-left');
			slideArrey[previousSlide].classList.remove('hide');
			slideArrey[previousSlide].classList.add('hidden');
		})();
		
		(function(){
			slideArrey[counter].classList.remove('hidden');
			slideArrey[counter].classList.remove('show-right');
			slideArrey[counter].classList.remove('show-left');
			slideArrey[counter].classList.add('hide');
		})();
		
		(function(){
			var nextSlide = counter - 1;
			if(nextSlide < 0) {
				nextSlide = slideArrey.length - 1;
			};
			slideArrey[nextSlide].classList.remove('hidden');
			slideArrey[nextSlide].classList.remove('hide');
			slideArrey[nextSlide].classList.remove('show-right');
			slideArrey[nextSlide].classList.add('show-left');	
		})();

		counter--;
		if(counter < 0) {
			counter = slideArrey.length - 1;
		};

		inactivButton.classList.add('hidden');
		activButton.classList.add('activity');
		//activButton.removeEventListener('click', callBackLeftDiscount);
		
		setTimeout(function() {
			inactivButton.classList.remove('hidden');
			activButton.classList.remove('activity');
			//activButton.addEventListener('click', callBackLeftDiscount);
		}, ANIMATION_TIME);
		slideArrey.counter = counter;
	};

var callBackRightDiscount = rightButtonHeandler.bind(
	this,
	slidesDiscount,
	rightButtonDiscount,
	leftButtonDiscount,
	slidesDiscount.counter
	);
rightButtonDiscount.addEventListener('click', callBackRightDiscount);

var callBackLeftDiscount = leftButtonHeandler.bind(this, slidesDiscount, leftButtonDiscount, rightButtonDiscount, slidesDiscount.counter);
leftButtonDiscount.addEventListener('click', callBackLeftDiscount);





/*ПОВЕДЕНИЕ СЛАЙДЕРА В БЛОКЕ SET*/
ANIMATION_TIME = 500;
var rightButtonSet = document.querySelector('.set-button--right');
var leftButtonSet = document.querySelector('.set-button--left');
var slideSet = document.querySelectorAll('.set-wrapper');
slideSet.counter = 0;
console.log(document.querySelector('.set-button--right'));

var callBackRightSet = rightButtonHeandler.bind(this, slideSet, rightButtonSet, leftButtonSet, slideSet.counter);
rightButtonSet.addEventListener('click', callBackRightSet);

var callBackLeftSet = leftButtonHeandler.bind(this, slideSet, leftButtonSet, rightButtonSet, slideSet.counter);
leftButtonSet.addEventListener('click', callBackLeftSet);









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