URL_ITEM_LOAD = 'PHP/item_ajax.php';

countWork = function(id) {
	var lButton = document.querySelector('.add-category__spot-left');
	var rButton = document.querySelector('.add-category__spot-right');
	var count = document.querySelector('.add-category__label-info').textContent;

	lButtonHeandler = function() {
		if(count > 1) {
			document.querySelector('.add-category__label-info').textContent = count - 1;
			count--;
		};
	};
	rButtonHeandler = function() {
		if(count < 9) {
			document.querySelector('.add-category__label-info').textContent = parseInt(count) + 1;
			count++;
		};
	};

	lButton.addEventListener('click', lButtonHeandler);
	rButton.addEventListener('click', rButtonHeandler);
};

galeryHeandler = function() {
	var secondPhotos = document.querySelectorAll('.second-photo__img');
	for(var i = 0; i < secondPhotos.length; i++) {
		secondPhotos[i].classList.remove('galery__photo--active');
	};
	var clickItem = event.target;
	clickItem.classList.add('galery__photo--active');
	var mainPhoto = document.querySelector('.main-pgoto__img');
	mainPhoto.src = clickItem.alt;
};

renderItem = function(data) {
	var container = document.querySelector('.item');
	var fragment = document.createDocumentFragment();
	useFragment = document.querySelector('.item__template').content.cloneNode(true);

	var screen = window.screen.width;
	switch(true) {
		case screen >= 570:
			var src = 'images/items/' + data[0] + '/1200/' + data[11];
		break;

		default:
			var src = 'images/items/' + data[0] + '/560/' + data[11];
		break;
	};
	useFragment.querySelector('.main-pgoto__img').src = src;

	var secondGalery = useFragment.querySelector('.galery__second-photo');
	for(var i = 0; i < data[14].length; i++) {
		var secondPhotoFragment = document.querySelector('.second-photo__img-template').content.cloneNode(true);
		var secondPhoto = secondPhotoFragment.querySelector('.second-photo__img');
		secondPhoto.src = 'images/items/' + data[0] + '/360/' + data[14][i];
		switch(true) {
			case screen >= 570:
				secondPhoto.alt = 'images/items/' + data[0] + '/1200/' + data[14][i];
			break;

			default:
				secondPhoto.alt = 'images/items/' + data[0] + '/560/' + data[14][i];
			break;
		};
		if(data[11] === data[14][i]) {
			secondPhoto.classList.add('galery__photo--active');
		};
		secondPhoto.addEventListener('click', galeryHeandler);
		secondGalery.appendChild(secondPhoto);
	};

	useFragment.querySelector('.item__title').textContent = data[1];
	useFragment.querySelector('.item__prices-old').textContent = data[3];
	if(data[5] === 'on') {
		useFragment.querySelector('.item__prices-new').textContent = data[4];
		useFragment.querySelector('.item__prices-old').style = 'text-decoration: line-through;';
	};

	var ratingItems = useFragment.querySelectorAll('.product-item__rating-item');
	for(var i = 0; i < data[6]; i++) {
		ratingItems[i].classList.add('product-item__rating-item--active');
	};

	useFragment.querySelector('.manufactured__text').textContent = data[7];
	useFragment.querySelector('.code__text').textContent = data[2];
	useFragment.querySelector('.discription__text').textContent = data[9];
	useFragment.querySelector('.subscribe__text').textContent = data[10];

	fragment.appendChild(useFragment);
	container.appendChild(fragment);
	getCommentsCount(); //VK.js
	countWork(data[0]);
	basketHeandler = function() {
		getCookies(data[0]);
	};
	document.querySelector('.item-button').addEventListener('click', basketHeandler);
};

xhrItemHeandler = function(evt) {
	if(this.status == 200) {
		var ItemData = this.response[0];
		renderItem(ItemData);
	};
};

loadList = function() {
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.addEventListener('load', xhrItemHeandler);
	xhr.open('POST', URL_ITEM_LOAD);
	xhr.send(null);
};

loadList();