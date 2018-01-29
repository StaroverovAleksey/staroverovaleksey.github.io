var openMenu = document.querySelector('.main-nav__toggle--open');
var closeMenu = document.querySelector('.main-nav__toggle--close');
var menu = document.querySelectorAll('.main-nav__item');
closeMenu.addEventListener('click', function() {
	for (var i = 0; i < 4; i++) {
		menu[i].classList.add('hidden');
	}
	
	closeMenu.classList.add('hidden');
});

openMenu.addEventListener('click', function() {
	for (var i = 0; i < 4; i++) {
		menu[i].classList.remove('hidden');
	}
	closeMenu.classList.remove('hidden');
})