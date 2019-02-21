/*Поведение меню на главной странице*/

var openMenuButton = document.querySelector('.main-navigation__open-button');
var closeMenuButton = document.querySelector('.main-navigation__close-button')
var menu = document.querySelector('.main-navigation__category-list');
var search = document.querySelector('.search-form__button');

var openMenu = function(evt) {
	menu.classList.remove('visually-hidden');
	openMenuButton.classList.add('hidden');
	search.classList.add('hidden');
};

var closeMenu = function() {
	menu.classList.add('visually-hidden');
	openMenuButton.classList.remove('hidden');
	search.classList.remove('hidden');
}

openMenuButton.addEventListener('click', openMenu);
closeMenuButton.addEventListener('click', closeMenu)

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