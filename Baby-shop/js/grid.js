/*ПЕРЕКЛЮЧЕНИЕ МЕЖДУ СЕТКОЙ И СПИСКОМ*/

var grid = {
	gridButton: document.querySelector('.list-buttons__grid'),
	listButton: document.querySelector('.list-buttons__list'),
	productCart: document.querySelectorAll('.product-item'),
	listClass: 'product-item--list',
	activClass: 'list-buttons--active'
}

gridHeandler = function() {
	console.log(222);
	grid.gridButton.classList.add(grid.activClass);
	grid.listButton.classList.remove(grid.activClass);
	for(var i = 0; i < grid.productCart.length; i++) {
		grid.productCart[i].classList.remove(grid.listClass);
	};
	grid.listButton.addEventListener('click', listHeandler);
	grid.gridButton.removeEventListener('click', gridHeandler);
}

listHeandler = function() {
	console.log(111);
	grid.gridButton.classList.remove(grid.activClass);
	grid.listButton.classList.add(grid.activClass);
	for(var i = 0; i < grid.productCart.length; i++) {
		grid.productCart[i].classList.add(grid.listClass);
	};
	grid.listButton.removeEventListener('click', listHeandler);
	grid.gridButton.addEventListener('click', gridHeandler);
}

grid.listButton.addEventListener('click', listHeandler);