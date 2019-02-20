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