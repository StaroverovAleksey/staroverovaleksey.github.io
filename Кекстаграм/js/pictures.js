var pictureTemplate = document.querySelector('#picture-template').content;
var overlay = document.querySelector('.gallery-overlay');
var fragment = document.createDocumentFragment();
var picture = document.querySelector('.pictures');

var usersComments = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]


//Функция генерации псевдослучайного числа от min до max.
var randomNumber = function(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}


//Генерация массива с данными о фотографиях.
var usersPhoto = [];
for (var i = 0; i < 25; i++) {
	usersPhoto[i] = {
		url : 'photos/' + (i + 1) + '.jpg',
		likes : randomNumber(15, 200),
		comments : usersComments[randomNumber(0, 5)]
	}
}


//Функция генерации DOM-элемента с одной фотограцией.
var renderPhoto = function(photoArray) {
	pictureTemplate.querySelector('img').setAttribute('src', photoArray.url);
	pictureTemplate.querySelector('.picture-likes').textContent = photoArray.likes;
	pictureTemplate.querySelector('.picture-comments').textContent = photoArray.comments;
	return pictureTemplate;
}


//Заполнение блока для фотографий. Использование шаблона для оптимизации.
var blockFilling = function(amountPhoto, photoArray) {
	for (i = 0; i < amountPhoto; i++) {
		renderPhoto(photoArray[i]);
		fragment.appendChild(pictureTemplate.cloneNode(true));
	}
	return fragment;
}
picture.appendChild(blockFilling(25, usersPhoto));


//Заполнение данными DOM-элемента с выделенной фотографией и ее отрисовка.
overlay.querySelector('.gallery-overlay-image').setAttribute('src', usersPhoto[0].url);
overlay.querySelector('.likes-count').textContent = usersPhoto[0].likes;
overlay.querySelector('.comments-count').textContent = usersPhoto[0].comments;
document.querySelector('.gallery-overlay').classList.remove('hidden');