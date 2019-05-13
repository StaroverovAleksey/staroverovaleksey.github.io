URL_LIST_LOAD = 'PHP/list_ajax.php';

var toggleList = function() {
	var grid = {
		gridButton: document.querySelector('.list-buttons__grid'),
		listButton: document.querySelector('.list-buttons__list'),
		productCart: document.querySelectorAll('.product-item'),
		listClass: 'product-item--list',
		activClass: 'list-buttons--active'
	};

	gridHeandler = function() {
		grid.gridButton.classList.add(grid.activClass);
		grid.listButton.classList.remove(grid.activClass);
		for(var i = 0; i < grid.productCart.length; i++) {
			grid.productCart[i].classList.remove(grid.listClass);
		};
		grid.listButton.addEventListener('click', listHeandler);
		grid.gridButton.removeEventListener('click', gridHeandler);
	};

	listHeandler = function() {
		grid.gridButton.classList.remove(grid.activClass);
		grid.listButton.classList.add(grid.activClass);
		for(var i = 0; i < grid.productCart.length; i++) {
			grid.productCart[i].classList.add(grid.listClass);
		};
		grid.listButton.removeEventListener('click', listHeandler);
		grid.gridButton.addEventListener('click', gridHeandler);
	};

	grid.listButton.addEventListener('click', listHeandler);
};

renderList = function(data) {
	var list = {
		container: document.querySelector('.grid'),
		template: document.querySelector('.product-template').content
	};

	list.image = list.template.querySelector('.product-item__foto');
	list.name = list.template.querySelector('.product-item__name');
	list.priceNew = list.template.querySelector('.product-item__price-new');
	list.priceOld = list.template.querySelector('.product-item__price-old');
	list.rating = list.template.querySelectorAll('.product-item__rating-item');
	list.discription = list.template.querySelector('.product-item__discription');
	list.category = list.template.querySelector('.product-item__category');
	list.subcategory = list.template.querySelector('.product-item__subcategory');

	var fragment = document.createDocumentFragment();
	var useFragment;

	for(var i =0; i < data.length; i++) {
		useFragment = list.template.cloneNode(true);
		useFragment.querySelector('.product-item__id').textContent = data[i][0];
		useFragment.querySelector('.product-item__foto').src = data[i][7];
		useFragment.querySelector('.product-item__name').textContent = data[i][1];
		useFragment.querySelector('.product-item__price-new').textContent = data[i][2];
		useFragment.querySelector('.product-item__price-old').textContent = data[i][3];
		useFragment.querySelector('.product-item__discription').textContent = data[i][6];
		useFragment.querySelector('.product-item__category').textContent = data[i][8];
		useFragment.querySelector('.product-item__subcategory').textContent = data[i][9];

		if(!data[i][2]) {
			useFragment.querySelector('.product-item__price-old').style = "text-decoration: none;";
			useFragment.querySelector('.product-item__discount').style = "display: none;";
		};

		if(!data[i][4]) {
			useFragment.querySelector('.product-item__discount').style = "display: none;";
		};

		var rating = data[i][5];
		for(var j = 0; j < rating; j++) {
			useFragment.querySelectorAll('.product-item__rating-item')[j].classList.add('product-item__rating-item--active');
		};
		fragment.appendChild(useFragment);
	};
	list.container.appendChild(fragment);
	toggleList();
};

xhrListHeandler = function(evt) {
	if(this.status == 200) {
		var listData = this.response;
		renderList(listData);
	};
};

loadList = function() {
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.addEventListener('load', xhrListHeandler);
	xhr.open('POST', URL_LIST_LOAD);
	xhr.send(null);
};

loadList();