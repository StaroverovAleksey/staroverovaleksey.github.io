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
	this.rButton.addEventListener('mousedown', this.rHeandler);
	this.lButton.addEventListener('mousedown', this.lHeandler);
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
	this.rButton.removeEventListener('mousedown', this.rHeandler);
		
	var slider = this;
	setTimeout(function() {
		slider.lButton.classList.remove('hidden');
		slider.rButton.classList.remove('activity');
		slider.rButton.addEventListener('mousedown', slider.rHeandler);
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
	this.lButton.removeEventListener('mousedown', this.lHeandler);
	
	var slider = this;
	setTimeout(function() {
		slider.rButton.classList.remove('hidden');
		slider.lButton.classList.remove('activity');
		slider.lButton.addEventListener('mousedown', slider.lHeandler);
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