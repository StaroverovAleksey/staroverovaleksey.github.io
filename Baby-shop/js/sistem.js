var openMenuButton = document.querySelector('.main-navigation__button-wrapper');
var menu = document.querySelector('.main-navigation__category-list');

var openMenu = function(evt) {
	menu.classList.remove('visually-hidden');
	openMenuButton.classList.add('hidden');
};

openMenuButton.addEventListener('click', openMenu);