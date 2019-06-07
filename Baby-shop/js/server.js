/*ОТПРАВКА ДАННЫХ ИЗ ФОРМ*/

URL = 'PHP/clientData.php';
URL_SPOT = 'PHP/spotAjax.php';
URL_DEL_CATEGORY = 'PHP/delCategoryAjax.php';

var uploadData = {
	form: document.querySelectorAll('.admin-form'),
	submit: document.querySelectorAll('.submit-button'),
	status: document.querySelectorAll('.submit-status'),
	statusSql: document.querySelectorAll('.sql-status'),
	numberForm: [0]
};

updateSpot = function() {
	document.querySelector('.add-category__label-info').textContent = this.response;
};

updateDelCategory = function() {
	var jsonParse = JSON.parse(this.response);
	var result = [];
	var resultId = [];
	for(var i = 0; i < jsonParse.length; i++) {
		result[i] = jsonParse[i][0];
		resultId[i] = jsonParse[i][1];
	};

	var delWrapper = document.querySelector('.chose__label-wrapper-del');
	var delCategories = document.querySelectorAll('.remove-category__chose-label');
	var template = document.querySelector('.del-category__template').content;
	var fragment = document.createDocumentFragment();
	for(var i = 0; i < delCategories.length; i++) {
		delWrapper.removeChild(delCategories[i]);
	};

	for(var i = 0; i < result.length; i++) {
		var templateUse = template.cloneNode(true);
		var templateInput = templateUse.querySelector('.remove-category__chose-input');
		templateUse.querySelector('.remove-category__chose-label').insertAdjacentHTML('afterbegin', result[i]);
		templateUse.querySelector('.remove-category__chose-input').name = resultId[i];
		fragment.appendChild(templateUse);
	};
	delWrapper.appendChild(fragment);

	var removeCategory = new menuWork(
	document.querySelectorAll('.remove-category__chose'),
	document.querySelectorAll('.remove-category__chose-button'),
	document.querySelectorAll('.remove-category__chose-label'),
	document.querySelectorAll('.remove-category__chose-input'),
	);

	removeCategory.bindContext();
	removeCategory.hangHeandler();

	spot.categories = document.querySelectorAll('.remove-category__chose-label');
};

updateXhr = function() {
	var xhrSpot = new XMLHttpRequest();
	xhrSpot.addEventListener('load', updateSpot);
	xhrSpot.open('POST', URL_SPOT);
	xhrSpot.send(null);

	var xhrDelCategory = new XMLHttpRequest();
	xhrDelCategory.addEventListener('load', updateDelCategory);
	xhrDelCategory.open('POST', URL_DEL_CATEGORY);
	xhrDelCategory.send(null);
}

fillRedactCartForm = function(data) {
	document.querySelector('.redact-cart__id-two').value = data[0];
	document.querySelector('.redact-cart__name-two').value = data[1];
	document.querySelector('.redact-cart__code-two').value = data[2];
	document.querySelector('.redact-cart__new-price-two').value = data[4];
	document.querySelector('.redact-cart__old-price-two').value = data[3];
	if(data[5]) {
		document.querySelector('.redact-cart__sale-two').checked = true;
		document.querySelector('.redact-cart__sale-label-two').classList.add('add-cart__sale--active');
		document.querySelector('.redact-cart__old-price-two').classList.add('add-cart__old-price--hidden');
	};
	document.querySelector('.redact-cart__manufactured-two').value = data[6];
	document.querySelector('.redact-cart__material-two').value = data[7];
	document.querySelector('.redact-cart__discription-two').value = data[8];
	document.querySelector('.redact-cart__subscribe-two').value = data[9];

	var categoryList = document.querySelectorAll('.redact-cart__chose-category-label');
	var subcategoryList = document.querySelectorAll('.redact-cart__chose-subcategory-label');
	for(var i = 2; i < categoryList.length; i++) {
		if(categoryList[i].innerText.split('\n')[0] === data[13]) {
			document.querySelector('.redact-cart__chose-category-button-two').click();
			categoryList[i].click();
			document.querySelector('.redact-cart__chose-category-button-two').click();
		};
	};
	for(var i = 2; i < subcategoryList.length; i++) {
		if(subcategoryList[i].innerText.split('\n')[0] === data[14]) {
			document.querySelector('.redact-cart__chose-subcategory-button-two').click();
			subcategoryList[i].click();
			document.querySelector('.redact-cart__chose-subcategory-button-two').click();
		};
	};

	var fragment = document.createDocumentFragment();
	var useFragment;
	var mainPhoto = data[10].split('.')[0];
	if(data[15]) {
		for(var i = 2; i < data[15].length; i++) {
			var usePhoto = data[15][i].split('.')[0];
			useFragment = document.querySelector('.redact-cart__old-fhoto-template').content.cloneNode(true);
			useFragment.querySelector('.template__photo-img').src = 'images/items/' + data[0] + '/360/' + data[15][i];
			useFragment.querySelector('.admin-upload__subscribe-input--multiple').addEventListener('change', multipleRadioHeandler);
			useFragment.querySelector('.admin-upload__subscribe-input--multiple').value = data[15][i];
			if(mainPhoto === usePhoto) {
				useFragment.querySelector('.template__photo-input').checked = true;
				useFragment.querySelector('.admin-upload__subscribe--multiple').classList.add('admin-upload__subscribe--active');
			};
			fragment.appendChild(useFragment);
		};	
	};
	document.querySelector('.redact-cart__old-fhoto-wrapper').appendChild(fragment);

	var cancelButtons = document.querySelectorAll('.template__photo-cancel');
	for(var i = 0; i <cancelButtons.length; i++) {
		cancelButtons[i].addEventListener('mousedown', delPhotoHeandler);
	};
};

fillRedactCategoryForm = function(data) {
	document.querySelector('.redact-category__label-info').textContent = data[4];
	document.querySelector('.redact-category__spot-input').value = data[4];
	console.log(document.querySelector('.redact-category__spot-input').value);
};

xhrHeandler = function(evt, status) {
	var formValue = uploadData.numberForm[0];
	var formName = uploadData.form[formValue];
	if(this.status == 200) {
		loadMenu();
		uploadData.status[formValue].textContent = 'Данные отправлены';
		uploadData.status[formValue].style.padding = '0 0 10px 0';
		uploadData.status[formValue].style.color = 'green';
		uploadData.form[formValue].reset();
		if(inputFile.subscribe[formValue]) {
			inputFile.subscribe[formValue].textContent = null;
			inputFile.subscribeInvalid[formValue].textContent = null;
		};
		uploadData.form[formValue].parentElement.parentElement.style.border = '1px solid green';
		if(this.response == 'Категория не пуста') {
			uploadData.statusSql[formValue].textContent = this.response;
			uploadData.form[formValue].parentElement.parentElement.style.border = '1px solid red';
		};
		if(this.response == 'Минимальная сторона фотографии не менее 1200px') {
			uploadData.statusSql[formValue].textContent = this.response;
			uploadData.form[formValue].parentElement.parentElement.style.border = '1px solid red';
		};
		if(formName.classList.contains('redact-cart__form')) {
			if(this.response =='Товар не найден') {
				uploadData.statusSql[formValue].textContent = this.response;
				uploadData.form[formValue].parentElement.parentElement.style.border = '1px solid red';
			} else {
				formName.classList.add('visually-hidden');
				uploadData.form[formValue].parentElement.parentElement.style.border = 'none';
				document.querySelector('.redact-cart__form-two').classList.remove('visually-hidden');
				var formData = JSON.parse(this.response);
				fillRedactCartForm(formData[0]);
			};
		};
		if(formName.classList.contains('redact-category__form')) {
			if(this.response == 'Категория не найдена') {
				uploadData.statusSql[formValue].textContent = this.response;
				uploadData.form[formValue].parentElement.parentElement.style.border = '1px solid red';
			} else {
				formName.classList.add('visually-hidden');
				uploadData.form[formValue].parentElement.parentElement.style.border = 'none';
				document.querySelector('.redact-category__form-two').classList.remove('visually-hidden');
				var formData = JSON.parse(this.response);
				fillRedactCategoryForm(formData);
			};
		};
		if(formName.classList.contains('redact-cart__form-two')) {
			if(this.response == 'Изменения внесены') {
				uploadData.status[formValue - 1].textContent = this.response;
			} else {
				uploadData.statusSql[formValue - 1].textContent = this.response;
			};
		};
		if(this.response == 'Категория удалена') {
			updateXhr();
			uploadData.status[formValue].textContent = this.response;
			uploadData.form[formValue].parentElement.parentElement.style.border = '1px solid green';
		};
		if(this.response == 'Товар удален') {
			uploadData.status[formValue].textContent = this.response;
			uploadData.form[formValue].parentElement.parentElement.style.border = '1px solid green';
		};
		if(this.response == 'Товар не найден') {
			uploadData.statusSql[formValue].textContent = this.response;
			uploadData.form[formValue].parentElement.parentElement.style.border = '1px solid red';
		};
		if(uploadData.statusSql[formValue].innerHTML) {
			uploadData.statusSql[formValue].style.padding = '0 0 10px 0';
			uploadData.status[formValue].textContent = null;
			uploadData.status[formValue].style.padding = null;
		};
	} else {
		uploadData.status[formValue].textContent = 'Ошибка ' + this.status;
		uploadData.status[formValue].style.padding = '0 0 10px 0';
		uploadData.status[formValue].style.color = 'red';
		uploadData.form[formValue].parentElement.parentElement.style.border = '1px solid red';
	};
};

submitHeandler = function(evt) {
	event.preventDefault();

	var spotNumber = document.querySelector('.add-category__label-info');
	var spotInput = document.querySelector('.add-category__spot-input');
	spotInput.value = Number(spotNumber.textContent);

	for(var i = 0; i < uploadData.form.length; i++) {
		if(evt.target === uploadData.submit[i]) {
			var data = new FormData(uploadData.form[i]);
			uploadData.numberForm = [i];
		};
	};
	var xhr = new XMLHttpRequest();
	
	xhr.addEventListener('load', xhrHeandler);
	xhr.open('POST', URL);
	xhr.send(data);
};

for(var i = 0; i < uploadData.form.length; i++) {
	uploadData.submit[i].addEventListener('click', submitHeandler);
};

/*СБРОС СТАТУСОВ*/

windowHeandler = function(evt) {
	for(var i = 0; i < uploadData.form.length; i++) {
		uploadData.status[i].textContent = null;
		uploadData.status[i].style.padding = null;
		uploadData.form[i].parentElement.parentElement.style.border = null;
		uploadData.statusSql[uploadData.numberForm].innerHTML = null;
		uploadData.statusSql[uploadData.numberForm].style.padding = null;
	};
};

window.addEventListener('click', windowHeandler);





























/*window.productList = [
	{name:
		'Двусторонний плед',
	photosLow: 
		['images/pp001/low/1',
		'images/pp001/low/2',
		'images/pp001/low/3',
		'images/pp001/low/4',
		],
	photosMiddle:
		['images/pp001/middle/1',
		'images/pp001/middle/2',
		'images/pp001/middle/3',
		'images/pp001/middle/4',
		],
	photoshigh:
		['images/pp001/high/1',
		'images/pp001/high/2',
		'images/pp001/high/3',
		'images/pp001/high/4',
		],
	prices:
		{new: 1990,
		old: null},
	discount: false,
	rating: 5,
	manufacturer: 'Beauty Home Fox',
	code: 'pp001',
	material: 'Хлопок, плюш, синтепон',
	description: 'Желая для своего ребёнка все самое лучшее, можете не сомневаться — приобретая у нас плед категории премиум, Вы получите плед высшего качества, которые будет долго радовать Вас и Вашего малыша.',
	specification: 'Польский хлопок, PREMIUM класса отличается от обычного хлопка гладкостью, мягкостью, насыщенностью цветов, прорисовкой каждой детали. Принты — как живые! Плотность 155 г/м2. Идеально подходит для детского текстиля и одежды. Мягкие тёплые пледы, в которые сразу хочется укутаться. Сшиты из лучших польских тканей: премиум плюша (плотность 380 г/м2) и премиум хлопка (155 г/м2). Плед находит широкое применение: на прогулку в коляску, в кроватку вместо одеяла, в качестве конверта на выписку. Уникальность пледа в том, что он двусторонний. В холодную погоду лучше укрывать плюшевой стороной к телу, в тёплую или дома — хлопковой стороной. Тем самым плед можно использовать круглый год, и зимой и летом. Все пледы ручной работы и сделаны с душой. У нас Вы можете приобрести как готовый плед, так и создать свой индивидуальный, неповторимый плед, сочетая предложенные расцветки хлопка и плюша. Можно добавить помпоны, кружево, подушечку в тон, бант на выписку. Расценки значительно ниже, чем у конкурентов, что приятно удивит.Размер пледа 100Х75, подушечка в подарок:)',
	feedbacks:
		[{
			data: '07.08.2047',
			name: 'Петя',
			feedback: 'Раз-раз',
			rating: 5
		},
		{
			data: '01.03.2049',
			name: 'Вася',
			feedback: 'Два-два',
			rating: 4
		},
		{
			data: '09.11.2159',
			name: 'Савелий Иннокентьевич',
			feedback: 'Три-три',
			rating: 3
		}]
	},

	{name:
		'Корова',
	photosLow: 
		['images/pp002/low/1',
		'images/pp002/low/2',
		'images/pp002/low/3',
		'images/pp002/low/4',
		],
	photosMiddle:
		['images/pp002/middle/1',
		'images/pp002/middle/2',
		'images/pp002/middle/3',
		'images/pp002/middle/4',
		],
	photoshigh:
		['images/pp002/high/1',
		'images/pp002/high/2',
		'images/pp002/high/3',
		'images/pp002/high/4',
		],
	prices:
		{new: 9990,
		old: 10000},
	discount: true,
	rating: 5,
	manufacturer: 'Колхоз 20 лет без урожая',
	code: 'pp001',
	material: 'Рога и копыта',
	description: 'Не только 10 литров молока в сутки, но и 100 килограмм парного мяса на черный день.',
	specification: 'Коро́ва — самка домашнего быка (лат. Bos taurus taurus), одомашненного подвида дикого быка (Bos taurus), парнокопытного жвачного животного подсемейства Быки (Bovinae); шире — самка любых видов крупного рогатого скота.Разводится для получения мяса, молока и кожи. Самцы вида называются быками, молодняк — телятами и тёлками, кастрированные самцы — волами. Молодых (до первой стельности) самок называют тёлками. Не́тель — это продуктивно осеменённая (стельная) тёлка. Беременность длится 9 месяцев. Различают мясные, мясо-молочные и молочные породы коров.',
	feedbacks:
		[{
			data: '07.08.2047',
			name: 'Петя',
			feedback: 'Раз-раз',
			rating: 5
		},
		{
			data: '01.03.2049',
			name: 'Вася',
			feedback: 'Два-два',
			rating: 4
		},
		{
			data: '09.11.2159',
			name: 'Савелий Иннокентьевич',
			feedback: 'Три-три',
			rating: 3
		}]
	},

	{name:
		'Тираннозавр',
	photosLow: 
		['images/pp003/low/1',
		'images/pp003/low/2',
		'images/pp003/low/3',
		'images/pp003/low/4',
		],
	photosMiddle:
		['images/pp003/middle/1',
		'images/pp003/middle/2',
		'images/pp003/middle/3',
		'images/pp003/middle/4',
		],
	photoshigh:
		['images/pp003/high/1',
		'images/pp003/high/2',
		'images/pp003/high/3',
		'images/pp003/high/4',
		],
	prices:
		{new: 5460,
		old: 9000},
	discount: true,
	rating: 3,
	manufacturer: 'Мир юрского периода',
	code: 'pp003',
	material: 'Зубы и когти',
	description: 'Молока не дает, зато выглядит прикольно',
	specification: 'Тиранноза́вр (лат. Tyrannosaurus — «ящер-тиран», от др.-греч. τύραννος [tyrannos] — «тиран» и σαῦρος [sauros] — «ящер, ящерица»[3], также встречается неправильное написание тираноза́вр[4]) — монотипический род плотоядных динозавров из группы целурозавров подотряда тероподов, включающий единственный валидный вид — Tyrannosaurus rex (лат. rex — «царь»). Обитал в западной части Северной Америки, которая в те времена представляла собой остров Ларамидию, и был наиболее распространённым из тираннозавридов. Окаменелые останки тираннозавров находят в различных геологических формациях, датирующихся маастрихтским веком мелового периода, около 67—65,5 миллионов лет назад[5]. Был одним из последних ящеротазовых динозавров, существовавших перед катаклизмом, положившим конец эре динозавров (мел-палеогеновым вымиранием).',
	feedbacks:
		[{
			data: '07.08.2047',
			name: 'Петя',
			feedback: 'Раз-раз',
			rating: 5
		},
		{
			data: '01.03.2049',
			name: 'Вася',
			feedback: 'Два-два',
			rating: 4
		},
		{
			data: '09.11.2159',
			name: 'Савелий Иннокентьевич',
			feedback: 'Три-три',
			rating: 3
		}]
	},

	{name:
		'Двусторонний плед',
	photosLow: 
		['images/pp001/low/1',
		'images/pp001/low/2',
		'images/pp001/low/3',
		'images/pp001/low/4',
		],
	photosMiddle:
		['images/pp001/middle/1',
		'images/pp001/middle/2',
		'images/pp001/middle/3',
		'images/pp001/middle/4',
		],
	photoshigh:
		['images/pp001/high/1',
		'images/pp001/high/2',
		'images/pp001/high/3',
		'images/pp001/high/4',
		],
	prices:
		{new: 1990,
		old: null},
	discount: false,
	rating: 5,
	manufacturer: 'Beauty Home Fox',
	code: 'pp001',
	material: 'Хлопок, плюш, синтепон',
	description: 'Желая для своего ребёнка все самое лучшее, можете не сомневаться — приобретая у нас плед категории премиум, Вы получите плед высшего качества, которые будет долго радовать Вас и Вашего малыша.',
	specification: 'Польский хлопок, PREMIUM класса отличается от обычного хлопка гладкостью, мягкостью, насыщенностью цветов, прорисовкой каждой детали. Принты — как живые! Плотность 155 г/м2. Идеально подходит для детского текстиля и одежды. Мягкие тёплые пледы, в которые сразу хочется укутаться. Сшиты из лучших польских тканей: премиум плюша (плотность 380 г/м2) и премиум хлопка (155 г/м2). Плед находит широкое применение: на прогулку в коляску, в кроватку вместо одеяла, в качестве конверта на выписку. Уникальность пледа в том, что он двусторонний. В холодную погоду лучше укрывать плюшевой стороной к телу, в тёплую или дома — хлопковой стороной. Тем самым плед можно использовать круглый год, и зимой и летом. Все пледы ручной работы и сделаны с душой. У нас Вы можете приобрести как готовый плед, так и создать свой индивидуальный, неповторимый плед, сочетая предложенные расцветки хлопка и плюша. Можно добавить помпоны, кружево, подушечку в тон, бант на выписку. Расценки значительно ниже, чем у конкурентов, что приятно удивит.Размер пледа 100Х75, подушечка в подарок:)',
	feedbacks:
		[{
			data: '07.08.2047',
			name: 'Петя',
			feedback: 'Раз-раз',
			rating: 5
		},
		{
			data: '01.03.2049',
			name: 'Вася',
			feedback: 'Два-два',
			rating: 4
		},
		{
			data: '09.11.2159',
			name: 'Савелий Иннокентьевич',
			feedback: 'Три-три',
			rating: 3
		}]
	},

	{name:
		'Корова',
	photosLow: 
		['images/pp002/low/1',
		'images/pp002/low/2',
		'images/pp002/low/3',
		'images/pp002/low/4',
		],
	photosMiddle:
		['images/pp002/middle/1',
		'images/pp002/middle/2',
		'images/pp002/middle/3',
		'images/pp002/middle/4',
		],
	photoshigh:
		['images/pp002/high/1',
		'images/pp002/high/2',
		'images/pp002/high/3',
		'images/pp002/high/4',
		],
	prices:
		{new: 9990,
		old: 10000},
	discount: true,
	rating: 5,
	manufacturer: 'Колхоз 20 лет без урожая',
	code: 'pp001',
	material: 'Рога и копыта',
	description: 'Не только 10 литров молока в сутки, но и 100 килограмм парного мяса на черный день.',
	specification: 'Коро́ва — самка домашнего быка (лат. Bos taurus taurus), одомашненного подвида дикого быка (Bos taurus), парнокопытного жвачного животного подсемейства Быки (Bovinae); шире — самка любых видов крупного рогатого скота.Разводится для получения мяса, молока и кожи. Самцы вида называются быками, молодняк — телятами и тёлками, кастрированные самцы — волами. Молодых (до первой стельности) самок называют тёлками. Не́тель — это продуктивно осеменённая (стельная) тёлка. Беременность длится 9 месяцев. Различают мясные, мясо-молочные и молочные породы коров.',
	feedbacks:
		[{
			data: '07.08.2047',
			name: 'Петя',
			feedback: 'Раз-раз',
			rating: 5
		},
		{
			data: '01.03.2049',
			name: 'Вася',
			feedback: 'Два-два',
			rating: 4
		},
		{
			data: '09.11.2159',
			name: 'Савелий Иннокентьевич',
			feedback: 'Три-три',
			rating: 3
		}]
	},

	{name:
		'Тираннозавр',
	photosLow: 
		['images/pp003/low/1',
		'images/pp003/low/2',
		'images/pp003/low/3',
		'images/pp003/low/4',
		],
	photosMiddle:
		['images/pp003/middle/1',
		'images/pp003/middle/2',
		'images/pp003/middle/3',
		'images/pp003/middle/4',
		],
	photoshigh:
		['images/pp003/high/1',
		'images/pp003/high/2',
		'images/pp003/high/3',
		'images/pp003/high/4',
		],
	prices:
		{new: 5460,
		old: 9000},
	discount: true,
	rating: 3,
	manufacturer: 'Мир юрского периода',
	code: 'pp003',
	material: 'Зубы и когти',
	description: 'Молока не дает, зато выглядит прикольно',
	specification: 'Тиранноза́вр (лат. Tyrannosaurus — «ящер-тиран», от др.-греч. τύραννος [tyrannos] — «тиран» и σαῦρος [sauros] — «ящер, ящерица»[3], также встречается неправильное написание тираноза́вр[4]) — монотипический род плотоядных динозавров из группы целурозавров подотряда тероподов, включающий единственный валидный вид — Tyrannosaurus rex (лат. rex — «царь»). Обитал в западной части Северной Америки, которая в те времена представляла собой остров Ларамидию, и был наиболее распространённым из тираннозавридов. Окаменелые останки тираннозавров находят в различных геологических формациях, датирующихся маастрихтским веком мелового периода, около 67—65,5 миллионов лет назад[5]. Был одним из последних ящеротазовых динозавров, существовавших перед катаклизмом, положившим конец эре динозавров (мел-палеогеновым вымиранием).',
	feedbacks:
		[{
			data: '07.08.2047',
			name: 'Петя',
			feedback: 'Раз-раз',
			rating: 5
		},
		{
			data: '01.03.2049',
			name: 'Вася',
			feedback: 'Два-два',
			rating: 4
		},
		{
			data: '09.11.2159',
			name: 'Савелий Иннокентьевич',
			feedback: 'Три-три',
			rating: 3
		}]
	},

	{name:
		'Двусторонний плед',
	photosLow: 
		['images/pp001/low/1',
		'images/pp001/low/2',
		'images/pp001/low/3',
		'images/pp001/low/4',
		],
	photosMiddle:
		['images/pp001/middle/1',
		'images/pp001/middle/2',
		'images/pp001/middle/3',
		'images/pp001/middle/4',
		],
	photoshigh:
		['images/pp001/high/1',
		'images/pp001/high/2',
		'images/pp001/high/3',
		'images/pp001/high/4',
		],
	prices:
		{new: 1990,
		old: null},
	discount: false,
	rating: 5,
	manufacturer: 'Beauty Home Fox',
	code: 'pp001',
	material: 'Хлопок, плюш, синтепон',
	description: 'Желая для своего ребёнка все самое лучшее, можете не сомневаться — приобретая у нас плед категории премиум, Вы получите плед высшего качества, которые будет долго радовать Вас и Вашего малыша.',
	specification: 'Польский хлопок, PREMIUM класса отличается от обычного хлопка гладкостью, мягкостью, насыщенностью цветов, прорисовкой каждой детали. Принты — как живые! Плотность 155 г/м2. Идеально подходит для детского текстиля и одежды. Мягкие тёплые пледы, в которые сразу хочется укутаться. Сшиты из лучших польских тканей: премиум плюша (плотность 380 г/м2) и премиум хлопка (155 г/м2). Плед находит широкое применение: на прогулку в коляску, в кроватку вместо одеяла, в качестве конверта на выписку. Уникальность пледа в том, что он двусторонний. В холодную погоду лучше укрывать плюшевой стороной к телу, в тёплую или дома — хлопковой стороной. Тем самым плед можно использовать круглый год, и зимой и летом. Все пледы ручной работы и сделаны с душой. У нас Вы можете приобрести как готовый плед, так и создать свой индивидуальный, неповторимый плед, сочетая предложенные расцветки хлопка и плюша. Можно добавить помпоны, кружево, подушечку в тон, бант на выписку. Расценки значительно ниже, чем у конкурентов, что приятно удивит.Размер пледа 100Х75, подушечка в подарок:)',
	feedbacks:
		[{
			data: '07.08.2047',
			name: 'Петя',
			feedback: 'Раз-раз',
			rating: 5
		},
		{
			data: '01.03.2049',
			name: 'Вася',
			feedback: 'Два-два',
			rating: 4
		},
		{
			data: '09.11.2159',
			name: 'Савелий Иннокентьевич',
			feedback: 'Три-три',
			rating: 3
		}]
	},

	{name:
		'Корова',
	photosLow: 
		['images/pp002/low/1',
		'images/pp002/low/2',
		'images/pp002/low/3',
		'images/pp002/low/4',
		],
	photosMiddle:
		['images/pp002/middle/1',
		'images/pp002/middle/2',
		'images/pp002/middle/3',
		'images/pp002/middle/4',
		],
	photoshigh:
		['images/pp002/high/1',
		'images/pp002/high/2',
		'images/pp002/high/3',
		'images/pp002/high/4',
		],
	prices:
		{new: 9990,
		old: 10000},
	discount: true,
	rating: 5,
	manufacturer: 'Колхоз 20 лет без урожая',
	code: 'pp001',
	material: 'Рога и копыта',
	description: 'Не только 10 литров молока в сутки, но и 100 килограмм парного мяса на черный день.',
	specification: 'Коро́ва — самка домашнего быка (лат. Bos taurus taurus), одомашненного подвида дикого быка (Bos taurus), парнокопытного жвачного животного подсемейства Быки (Bovinae); шире — самка любых видов крупного рогатого скота.Разводится для получения мяса, молока и кожи. Самцы вида называются быками, молодняк — телятами и тёлками, кастрированные самцы — волами. Молодых (до первой стельности) самок называют тёлками. Не́тель — это продуктивно осеменённая (стельная) тёлка. Беременность длится 9 месяцев. Различают мясные, мясо-молочные и молочные породы коров.',
	feedbacks:
		[{
			data: '07.08.2047',
			name: 'Петя',
			feedback: 'Раз-раз',
			rating: 5
		},
		{
			data: '01.03.2049',
			name: 'Вася',
			feedback: 'Два-два',
			rating: 4
		},
		{
			data: '09.11.2159',
			name: 'Савелий Иннокентьевич',
			feedback: 'Три-три',
			rating: 3
		}]
	},

	{name:
		'Тираннозавр',
	photosLow: 
		['images/pp003/low/1',
		'images/pp003/low/2',
		'images/pp003/low/3',
		'images/pp003/low/4',
		],
	photosMiddle:
		['images/pp003/middle/1',
		'images/pp003/middle/2',
		'images/pp003/middle/3',
		'images/pp003/middle/4',
		],
	photoshigh:
		['images/pp003/high/1',
		'images/pp003/high/2',
		'images/pp003/high/3',
		'images/pp003/high/4',
		],
	prices:
		{new: 5460,
		old: 9000},
	discount: true,
	rating: 3,
	manufacturer: 'Мир юрского периода',
	code: 'pp003',
	material: 'Зубы и когти',
	description: 'Молока не дает, зато выглядит прикольно',
	specification: 'Тиранноза́вр (лат. Tyrannosaurus — «ящер-тиран», от др.-греч. τύραννος [tyrannos] — «тиран» и σαῦρος [sauros] — «ящер, ящерица»[3], также встречается неправильное написание тираноза́вр[4]) — монотипический род плотоядных динозавров из группы целурозавров подотряда тероподов, включающий единственный валидный вид — Tyrannosaurus rex (лат. rex — «царь»). Обитал в западной части Северной Америки, которая в те времена представляла собой остров Ларамидию, и был наиболее распространённым из тираннозавридов. Окаменелые останки тираннозавров находят в различных геологических формациях, датирующихся маастрихтским веком мелового периода, около 67—65,5 миллионов лет назад[5]. Был одним из последних ящеротазовых динозавров, существовавших перед катаклизмом, положившим конец эре динозавров (мел-палеогеновым вымиранием).',
	feedbacks:
		[{
			data: '07.08.2047',
			name: 'Петя',
			feedback: 'Раз-раз',
			rating: 5
		},
		{
			data: '01.03.2049',
			name: 'Вася',
			feedback: 'Два-два',
			rating: 4
		},
		{
			data: '09.11.2159',
			name: 'Савелий Иннокентьевич',
			feedback: 'Три-три',
			rating: 3
		}]
	},

	{name:
		'Двусторонний плед',
	photosLow: 
		['images/pp001/low/1',
		'images/pp001/low/2',
		'images/pp001/low/3',
		'images/pp001/low/4',
		],
	photosMiddle:
		['images/pp001/middle/1',
		'images/pp001/middle/2',
		'images/pp001/middle/3',
		'images/pp001/middle/4',
		],
	photoshigh:
		['images/pp001/high/1',
		'images/pp001/high/2',
		'images/pp001/high/3',
		'images/pp001/high/4',
		],
	prices:
		{new: 1990,
		old: null},
	discount: false,
	rating: 5,
	manufacturer: 'Beauty Home Fox',
	code: 'pp001',
	material: 'Хлопок, плюш, синтепон',
	description: 'Желая для своего ребёнка все самое лучшее, можете не сомневаться — приобретая у нас плед категории премиум, Вы получите плед высшего качества, которые будет долго радовать Вас и Вашего малыша.',
	specification: 'Польский хлопок, PREMIUM класса отличается от обычного хлопка гладкостью, мягкостью, насыщенностью цветов, прорисовкой каждой детали. Принты — как живые! Плотность 155 г/м2. Идеально подходит для детского текстиля и одежды. Мягкие тёплые пледы, в которые сразу хочется укутаться. Сшиты из лучших польских тканей: премиум плюша (плотность 380 г/м2) и премиум хлопка (155 г/м2). Плед находит широкое применение: на прогулку в коляску, в кроватку вместо одеяла, в качестве конверта на выписку. Уникальность пледа в том, что он двусторонний. В холодную погоду лучше укрывать плюшевой стороной к телу, в тёплую или дома — хлопковой стороной. Тем самым плед можно использовать круглый год, и зимой и летом. Все пледы ручной работы и сделаны с душой. У нас Вы можете приобрести как готовый плед, так и создать свой индивидуальный, неповторимый плед, сочетая предложенные расцветки хлопка и плюша. Можно добавить помпоны, кружево, подушечку в тон, бант на выписку. Расценки значительно ниже, чем у конкурентов, что приятно удивит.Размер пледа 100Х75, подушечка в подарок:)',
	feedbacks:
		[{
			data: '07.08.2047',
			name: 'Петя',
			feedback: 'Раз-раз',
			rating: 5
		},
		{
			data: '01.03.2049',
			name: 'Вася',
			feedback: 'Два-два',
			rating: 4
		},
		{
			data: '09.11.2159',
			name: 'Савелий Иннокентьевич',
			feedback: 'Три-три',
			rating: 3
		}]
	},

	{name:
		'Корова',
	photosLow: 
		['images/pp002/low/1',
		'images/pp002/low/2',
		'images/pp002/low/3',
		'images/pp002/low/4',
		],
	photosMiddle:
		['images/pp002/middle/1',
		'images/pp002/middle/2',
		'images/pp002/middle/3',
		'images/pp002/middle/4',
		],
	photoshigh:
		['images/pp002/high/1',
		'images/pp002/high/2',
		'images/pp002/high/3',
		'images/pp002/high/4',
		],
	prices:
		{new: 9990,
		old: 10000},
	discount: true,
	rating: 5,
	manufacturer: 'Колхоз 20 лет без урожая',
	code: 'pp001',
	material: 'Рога и копыта',
	description: 'Не только 10 литров молока в сутки, но и 100 килограмм парного мяса на черный день.',
	specification: 'Коро́ва — самка домашнего быка (лат. Bos taurus taurus), одомашненного подвида дикого быка (Bos taurus), парнокопытного жвачного животного подсемейства Быки (Bovinae); шире — самка любых видов крупного рогатого скота.Разводится для получения мяса, молока и кожи. Самцы вида называются быками, молодняк — телятами и тёлками, кастрированные самцы — волами. Молодых (до первой стельности) самок называют тёлками. Не́тель — это продуктивно осеменённая (стельная) тёлка. Беременность длится 9 месяцев. Различают мясные, мясо-молочные и молочные породы коров.',
	feedbacks:
		[{
			data: '07.08.2047',
			name: 'Петя',
			feedback: 'Раз-раз',
			rating: 5
		},
		{
			data: '01.03.2049',
			name: 'Вася',
			feedback: 'Два-два',
			rating: 4
		},
		{
			data: '09.11.2159',
			name: 'Савелий Иннокентьевич',
			feedback: 'Три-три',
			rating: 3
		}]
	},

	{name:
		'Тираннозавр',
	photosLow: 
		['images/pp003/low/1',
		'images/pp003/low/2',
		'images/pp003/low/3',
		'images/pp003/low/4',
		'images/pp003/low/5'
		],
	photosMiddle:
		['images/pp003/middle/1',
		'images/pp003/middle/2',
		'images/pp003/middle/3',
		'images/pp003/middle/4',
		'images/pp003/low/5'
		],
	photoshigh:
		['images/pp003/high/1',
		'images/pp003/high/2',
		'images/pp003/high/3',
		'images/pp003/high/4',
		'images/pp003/low/5'
		],
	prices:
		{new: 5460,
		old: 9000},
	discount: true,
	rating: 3,
	manufacturer: 'Мир юрского периода',
	code: 'pp003',
	material: 'Зубы и когти',
	description: 'Молока не дает, зато выглядит прикольно',
	specification: 'Тиранноза́вр (лат. Tyrannosaurus — «ящер-тиран», от др.-греч. τύραννος [tyrannos] — «тиран» и σαῦρος [sauros] — «ящер, ящерица»[3], также встречается неправильное написание тираноза́вр[4]) — монотипический род плотоядных динозавров из группы целурозавров подотряда тероподов, включающий единственный валидный вид — Tyrannosaurus rex (лат. rex — «царь»). Обитал в западной части Северной Америки, которая в те времена представляла собой остров Ларамидию, и был наиболее распространённым из тираннозавридов. Окаменелые останки тираннозавров находят в различных геологических формациях, датирующихся маастрихтским веком мелового периода, около 67—65,5 миллионов лет назад[5]. Был одним из последних ящеротазовых динозавров, существовавших перед катаклизмом, положившим конец эре динозавров (мел-палеогеновым вымиранием).',
	feedbacks:
		[{
			data: '07.08.2047',
			name: 'Петя',
			feedback: 'Раз-раз',
			rating: 5
		},
		{
			data: '01.03.2049',
			name: 'Вася',
			feedback: 'Два-два',
			rating: 4
		},
		{
			data: '09.11.2159',
			name: 'Савелий Иннокентьевич',
			feedback: 'Три-три',
			rating: 3
		}]
	},
];*/