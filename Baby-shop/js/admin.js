/*РАБОТА КНОПОК, ОТКРЫВАЮЩИХ РАЗДЕЛЫ*/

menuWork = function(sections, buttons, choseLabels, choiseInputs) {
	this.sections = sections,
	this.buttons = buttons,
	this.choseLabels = choseLabels,
	this.choiseInputs = choiseInputs
};

menuWork.prototype.bindContext = function() {
	this.openSectionHeandler = this.openSectionHeandler.bind(this);
	this.closeSectionHeandler = this.closeSectionHeandler.bind(this);
	this.closeAllSectionsHeandler = this.closeAllSectionsHeandler.bind(this);
	this.openChoseCategoryHeandler = this.openChoseCategoryHeandler.bind(this);
	this.closeChoseCategoryHeandler = this.closeChoseCategoryHeandler.bind(this);
};

menuWork.prototype.hangHeandler = function() {
	for (var i = 0; i < this.sections.length; i++) {
		this.sections[i].style.height = this.buttons[i].offsetHeight + 'px';
		this.buttons[i].addEventListener('click', this.openSectionHeandler);
	};

	window.addEventListener('click', this.closeAllSectionsHeandler);	
}

menuWork.prototype.closeAllSectionsHeandler = function(evt) {
	for (var i = 0; i < this.sections.length; i++) {
		if (this.sections[i].style.height = 'auto' && !this.sections[i].contains(evt.target)) {
			this.sections[i].style.height = this.buttons[0].offsetHeight + 'px';
			this.sections[i].style.width = null;
			
			this.buttons[i].addEventListener('click', this.openSectionHeandler);
			this.buttons[i].removeEventListener('click', this.closeSectionHeandler);

			if(this.choseLabels) {
				for(var j = 0; j < this.choseLabels.length; j++) {
					if(document.querySelector('.remove-category__chose').classList.contains('admin-section--active')) {
						this.choseLabels[j].removeEventListener('click', choseLabelsHeandler);
					};
					this.choseLabels[j].classList.remove('chose__label--checked');
				};
				for(var u = 0; u < this.choiseInputs.length; u++) {
					this.choiseInputs[u].checked = false;
				};
			};
			this.sections[i].classList.remove('admin-section--active');
		};
	};
};

menuWork.prototype.closeSectionHeandler = function(evt) {
	evt.preventDefault();
	evt.target.parentElement.style.height = this.buttons[0].offsetHeight + 'px';
	evt.target.parentElement.style.width = null;
	evt.target.parentElement.classList.remove('admin-section--active');
	evt.target.addEventListener('click', this.openSectionHeandler);
	evt.target.removeEventListener('click', this.closeSectionHeandler);
	var choseLabels = document.querySelectorAll('.chose__label');
	if(this.choseLabels) {
		for(var i = 0; i < this.choseLabels.length; i++) {
			this.choseLabels[i].removeEventListener('click', choseLabelsHeandler);
			this.choseLabels[i].classList.remove('chose__label--checked');
		};
		for(var i = 0; i < this.choiseInputs.length; i++) {
			this.choiseInputs[i].checked = false;
		};
	};
};


menuWork.prototype.closeChoseCategoryHeandler = function(evt) {
	evt.preventDefault();
	evt.target.parentElement.style.height = this.buttons[0].offsetHeight + 'px';
	evt.target.parentElement.style.width = null;
	evt.target.parentElement.classList.remove('admin-section--active');
	evt.target.addEventListener('click', this.openChoseCategoryHeandler);
	evt.target.removeEventListener('click', this.closeChoseCategoryHeandler);
	var choseCategory = document.querySelectorAll('.add-cart__chose-category-label');
	var choseSubategory = document.querySelectorAll('.add-cart__chose-subcategory-label');

	var choseCategoryRedact = document.querySelectorAll('.redact-cart__chose-category-label');
	var choseSubategoryRedact = document.querySelectorAll('.redact-cart__chose-subcategory-label');
	if(event.target == document.querySelector('.add-cart__chose-category-button')) {
		
		for(var i = 0; i < choseCategory.length; i++) {
			if(choseCategory[i].children[0].checked == true) {
				//document.querySelector('.add-cart__chose-subcategory-discript').textContent = null;
				document.querySelector('.add-cart__chose-category-discript').textContent = choseCategory[i].innerText.split('\n')[0];
			};
		};
	};

	if(event.target == document.querySelector('.add-cart__chose-subcategory-button')) {
		for(var i = 0; i < choseSubategory.length; i++) {
			if(choseSubategory[i].children[0].checked == true) {
				document.querySelector('.add-cart__chose-subcategory-discript').textContent = choseSubategory[i].innerText.split('\n')[0];
			};
		};
	};

	if(event.target == document.querySelector('.redact-cart__chose-category-button-two')) {
		
		for(var i = 0; i < choseCategoryRedact.length; i++) {
			if(choseCategoryRedact[i].children[0].checked == true) {
				//document.querySelector('.redact-cart__chose-subcategory-discript-two').textContent = null;
				document.querySelector('.redact-cart__chose-category-discript-two').textContent = choseCategoryRedact[i].innerText.split('\n')[0];
			};
		};
	};

	if(event.target == document.querySelector('.redact-cart__chose-subcategory-button-two')) {
		for(var i = 0; i < choseSubategoryRedact.length; i++) {
			if(choseSubategoryRedact[i].children[0].checked == true) {
				document.querySelector('.redact-cart__chose-subcategory-discript-two').textContent = choseSubategoryRedact[i].innerText.split('\n')[0];
			};
		};
	};
};

menuWork.prototype.openChoseCategoryHeandler = function(evt) {
	evt.preventDefault();
	if(evt.target == document.querySelector('.add-cart__chose-category-button')) {
		document.querySelector('.add-cart__chose-category-discript').textContent = null;
	};
	if(evt.target == document.querySelector('.add-cart__chose-subcategory-button')) {
		document.querySelector('.add-cart__chose-subcategory-discript').textContent = null;
	};

	if(evt.target == document.querySelector('.redact-cart__chose-category-button-two')) {
		document.querySelector('.redact-cart__chose-category-discript-two').textContent = null;
	};
	if(evt.target == document.querySelector('.redact-cart__chose-subcategory-button-two')) {
		document.querySelector('.redact-cart__chose-subcategory-discript-two').textContent = null;
	};

	choseCategoryHeandler = function(evt) {
		document.querySelector('.add-cart__chose-subcategory-discript').textContent = null;
		document.querySelector('.redact-cart__chose-subcategory-discript-two').textContent = null;

		for(var i = 0; i < this.choseLabels.length; i++) {
			if(this.choseLabels[i] == evt.target) {
				for(var j = 0; j < this.choseLabels.length; j++) {
					this.choseLabels[j].classList.remove('chose__label--checked');
				};
				var id = this.choseLabels[i].children[1].textContent;
				subscribesId = document.querySelectorAll('.add-cart__chose-subcategory-id');
				inputs = document.querySelectorAll('.add-cart__chose-subcategory-input');

				subscribesIdRedact = document.querySelectorAll('.redact-cart__chose-subcategory-id');
				inputsRedact = document.querySelectorAll('.redact-cart__chose-subcategory-input');
				for (var j = 0; j < subscribesId.length; j++) {
					inputs[j].checked = false;
					subscribesId[j].parentElement.classList.add('visually-hidden');
					subscribesId[j].parentElement.classList.remove('chose__label--checked');
				};
				for (var j = 0; j < subscribesIdRedact.length; j++) {
					inputsRedact[j].checked = false;
					subscribesIdRedact[j].parentElement.classList.add('visually-hidden');
					subscribesIdRedact[j].parentElement.classList.remove('chose__label--checked');
				};
				this.choseLabels[i].classList.add('chose__label--checked');
				for (var j = 0; j < subscribesId.length; j++) {
					if(subscribesId[j].textContent == id) {
						subscribesId[j].parentElement.classList.remove('visually-hidden');
						subscribesIdRedact[j].parentElement.classList.remove('visually-hidden');
					};
				};
				if(document.querySelector('.add-cart__chose-category').contains(evt.target)) {
					document.querySelector('.add-cart__chose-subcategory-subscribe').classList.remove('visually-hidden');
					document.querySelector('.add-cart__chose-subcategory').classList.remove('visually-hidden');
				};
				if(document.querySelector('.redact-cart__chose-category').contains(evt.target)) {
					document.querySelector('.redact-cart__chose-subcategory-subscribe-two').classList.remove('visually-hidden');
					document.querySelector('.redact-cart__chose-subcategory').classList.remove('visually-hidden');
				};
			};
		};
	};
	choseCategoryHeandler = choseCategoryHeandler.bind(this);

	if(evt.target == document.querySelector('.chose__button') || document.querySelector('.add-cart__chose-subcategory-button')) {
		for(var i = 0; i < this.choseLabels.length; i++) {
			this.choseLabels[i].removeEventListener('click', choseCategoryHeandler);
			this.choseLabels[i].addEventListener('click', choseCategoryHeandler);
		};
	};

	for (var i = 0; i < this.buttons.length; i++) {
		if (this.buttons[i] == evt.target) {
			this.sections[i].style.height = 'auto';
			this.sections[i].style.width = '40%';
			this.sections[i].classList.add('admin-section--active');
			this.buttons[i].removeEventListener('click', this.openChoseCategoryHeandler);
			this.buttons[i].addEventListener('click', this.closeChoseCategoryHeandler);
			if(window.screen.width < 768) {
				this.sections[i].style.width = '76%';
			};
		};
	};
}




menuWork.prototype.openSectionHeandler = function(evt) {
	choseLabelsHeandler = function(evt) {
		for(var i = 0; i < this.choseLabels.length; i++) {
			if(this.choseLabels[i] == evt.target) {
				this.choseLabels[i].classList.toggle('chose__label--checked');
			};
			if(evt.target.classList.contains('redact-category__chose-label')) {
				for(var j = 0; j < this.choseLabels.length; j++) {
					this.choseLabels[j].classList.remove('chose__label--checked');
					if(this.choseLabels[j] == evt.target) {
						this.choseLabels[j].classList.toggle('chose__label--checked');
					};
				};
			};
		};
	};
	choseLabelsHeandler = choseLabelsHeandler.bind(this);

	evt.preventDefault();
	for (var i = 0; i < this.buttons.length; i++) {
		if (this.buttons[i] == evt.target) {
			this.sections[i].style.height = 'auto';
			this.sections[i].style.width = '76%';
			this.sections[i].classList.add('admin-section--active');
			this.buttons[i].removeEventListener('click', this.openSectionHeandler);
			this.buttons[i].addEventListener('click', this.closeSectionHeandler);
		};
	};

	if(evt.target == document.querySelector('.remove-category__chose-button')) {
		for(var i = 0; i < this.choseLabels.length; i++) {
			this.choseLabels[i].addEventListener('click', choseLabelsHeandler);
		};
	};

	if(evt.target == document.querySelector('.redact-category__chose-button')) {
		for(var i = 0; i < this.choseLabels.length; i++) {
			this.choseLabels[i].addEventListener('click', choseLabelsHeandler);
		};
	};
};

/*ВНЕШНИЕ РАЗДЕЛЫ*/

var adminMenu = new menuWork(
	document.querySelectorAll('.admin-section'),
	document.querySelectorAll('.admin-button')
);

adminMenu.bindContext();
adminMenu.hangHeandler();

/*ВНУТРЕННИЕ РАЗДЕЛЫ РАБОТЫ С ТОВАРАМИ*/

var adminSubMenu = new menuWork(
	document.querySelectorAll('.cart-redact__item'),
	document.querySelectorAll('.cart-redact__title')
);

adminSubMenu.bindContext();
adminSubMenu.hangHeandler();

/*ВЫБОР КАТЕГОРИИ ПРИ ДОБАВЛЕНИИ ТОВАРА*/

var choseCategory = new menuWork(
	document.querySelectorAll('.add-cart__chose-category'),
	document.querySelectorAll('.add-cart__chose-category-button'),
	document.querySelectorAll('.add-cart__chose-category-label'),
	document.querySelectorAll('.add-cart__chose-category-input'),
);

choseCategory.bindContext();
for (var i = 0; i < choseCategory.sections.length; i++) {
	choseCategory.sections[i].style.height = choseCategory.buttons[i].offsetHeight + 'px';
	choseCategory.buttons[i].addEventListener('click', choseCategory.openChoseCategoryHeandler);
};

/*ВЫБОР ПОДКАТЕГОРИИ ПРИ ДОБАВЛЕНИИ ТОВАРА*/

var choseSubcategory = new menuWork(
	document.querySelectorAll('.add-cart__chose-subcategory'),
	document.querySelectorAll('.add-cart__chose-subcategory-button'),
	document.querySelectorAll('.add-cart__chose-subcategory-label'),
	document.querySelectorAll('.add-cart__chose-subcategory-input'),
);

choseSubcategory.bindContext();
for (var i = 0; i < choseCategory.sections.length; i++) {
	choseSubcategory.sections[i].style.height = choseSubcategory.buttons[i].offsetHeight + 'px';
	choseSubcategory.buttons[i].addEventListener('click', choseSubcategory.openChoseCategoryHeandler);
};








/*ВЫБОР КАТЕГОРИИ ПРИ ИЗМЕНЕНИИ ТОВАРА*/

var choseCategoryRedact = new menuWork(
	document.querySelectorAll('.redact-cart__chose-category'),
	document.querySelectorAll('.redact-cart__chose-category-button-two'),
	document.querySelectorAll('.redact-cart__chose-category-label'),
	document.querySelectorAll('.redact-cart__chose-category-input'),
);

choseCategoryRedact.bindContext();
for (var i = 0; i < choseCategoryRedact.sections.length; i++) {
	choseCategoryRedact.sections[i].style.height = choseCategoryRedact.buttons[i].offsetHeight + 'px';
	choseCategoryRedact.buttons[i].addEventListener('click', choseCategoryRedact.openChoseCategoryHeandler);
};

/*ВЫБОР ПОДКАТЕГОРИИ ПРИ ИЗМЕНЕНИИ ТОВАРА*/

var choseSubcategoryRedact = new menuWork(
	document.querySelectorAll('.redact-cart__chose-subcategory'),
	document.querySelectorAll('.redact-cart__chose-subcategory-button-two'),
	document.querySelectorAll('.redact-cart__chose-subcategory-label'),
	document.querySelectorAll('.redact-cart__chose-subcategory-input'),
);

choseSubcategoryRedact.bindContext();
for (var i = 0; i < choseCategoryRedact.sections.length; i++) {
	choseSubcategoryRedact.sections[i].style.height = choseSubcategoryRedact.buttons[i].offsetHeight + 'px';
	choseSubcategoryRedact.buttons[i].addEventListener('click', choseSubcategoryRedact.openChoseCategoryHeandler);
};














/*ВНУТРЕННИЕ РАЗДЕЛЫ РАБОТЫ С МЕНЮ*/

var adminSubMenu = new menuWork(
	document.querySelectorAll('.menu-redact__item'),
	document.querySelectorAll('.menu-reduct__title')
);

adminSubMenu.bindContext();
adminSubMenu.hangHeandler();

/*ВЫБОР КАТЕГОРИИ ДЛЯ ИЗМЕНЕНИЯ*/

var redactCategory = new menuWork(
	document.querySelectorAll('.redact-category__chose'),
	document.querySelectorAll('.redact-category__chose-button'),
	document.querySelectorAll('.redact-category__chose-label'),
	document.querySelectorAll('.redact-category__chose-input'),
);

redactCategory.bindContext();
redactCategory.hangHeandler();

/*ВЫБОР КАТЕГОРИИ ДЛЯ УДАЛЕНИЯ*/

var removeCategory = new menuWork(
	document.querySelectorAll('.remove-category__chose'),
	document.querySelectorAll('.remove-category__chose-button'),
	document.querySelectorAll('.remove-category__chose-label'),
	document.querySelectorAll('.remove-category__chose-input'),
);

removeCategory.bindContext();
removeCategory.hangHeandler();

/*РАБОТА INPUT TYPE = FILE (ОДИН ФАЙЛ)*/

var VALID_FORMAT = ['png', 'jpg', 'jpeg'];

var inputFile = {
	input: document.querySelectorAll('.upload-input'),
	subscribe: document.querySelectorAll('.admin-upload__subscribe'),
	subscribeInvalid: document.querySelectorAll('.admin-upload__invalid')
};

inputFileHeandler = function(evt) {
	for (var i = 0; i < inputFile.input.length; i++) {
		if (evt.target == inputFile.input[i]) {
			var file = inputFile.input[i].files[0];
			var fileName = file.name.toLowerCase();
			var validValue = VALID_FORMAT.some(function(currentValue) {
				return fileName.endsWith(currentValue);
			});
			if (validValue) {
				inputFile.subscribe[i].textContent = file.name;
				inputFile.subscribeInvalid[i].textContent = null;
			} else {
				inputFile.subscribe[i].textContent = null;
				inputFile.subscribeInvalid[i].textContent = 'Только форматы png, jpg, jpeg';
			};
		};
	};
};

for (var i = 0; i < inputFile.input.length; i++) {
	inputFile.input[i].addEventListener('change', inputFileHeandler);
};

/*РАБОТА INPUT TYPE = FILE (НЕСКОЛЬКО ФАЙЛОВ)*/

var VALID_FORMAT = ['png', 'jpg', 'jpeg'];

var inputFileMultiple = {
	input: document.querySelectorAll('.upload-input--multiple'),
	subscribe: document.querySelectorAll('.admin-upload__subscribe-wrapper--multiple'),
	subscribeInvalid: document.querySelectorAll('.admin-upload__invalid--multiple'),
	template: document.querySelector('.admin-upload__subscribe-template--multiple').content
};

multipleRadioHeandler = function() {
	var subscribes = document.querySelectorAll('.admin-upload__subscribe--multiple');
	for(var i = 0; i < subscribes.length; i++) {
		subscribes[i].classList.remove('admin-upload__subscribe--active');
	};
	this.parentElement.classList.add('admin-upload__subscribe--active');
};

inputFileMultipleHeandler = function(evt) {
	for (var i = 0; i < inputFileMultiple.input.length; i++) {
		if (evt.target == inputFileMultiple.input[i]) {
			inputFileMultiple.items = inputFileMultiple.subscribe[i].querySelectorAll('.admin-upload__subscribe--multiple');
			for(u = 0; u < inputFileMultiple.items.length; u++) {
				inputFileMultiple.subscribe[i].removeChild(inputFileMultiple.items[u]);
			};

			var file = inputFileMultiple.input[i].files;
			var fragment = document.createDocumentFragment();
			for(var j = 0; j < file.length; j++) {
				templateUse = inputFileMultiple.template.cloneNode(true);
				var fileName = file[j].name.toLowerCase();
				var validValue = VALID_FORMAT.some(function(currentValue) {
					return fileName.endsWith(currentValue);
				});
				if (validValue) {
					templateUse.querySelector('.admin-upload__subscribe--multiple').insertAdjacentHTML('afterbegin', fileName);
					templateUse.querySelector('.admin-upload__subscribe-input--multiple').value = fileName;
					templateUse.querySelector('.admin-upload__subscribe-input--multiple').addEventListener('change', multipleRadioHeandler);
					fragment.appendChild(templateUse);
					inputFileMultiple.subscribeInvalid[i].textContent = null;
				} else {
					inputFileMultiple.subscribeInvalid[i].textContent = 'Только форматы png, jpg, jpeg';
					return;
				};
			};
			inputFileMultiple.subscribe[i].appendChild(fragment);
		};
	};
};

for (var i = 0; i < inputFileMultiple.input.length; i++) {
	inputFileMultiple.input[i].addEventListener('change', inputFileMultipleHeandler);
};

/*КНОПКА ПОЗИЦИИ КАТЕГОРИИ В РАЗДЕЛЕ ДОБАВЛЕНИЯ КАТЕГОРИИ*/

var spot = {
	left: document.querySelector('.add-category__spot-left'),
	right: document.querySelector('.add-category__spot-right'),
	number: document.querySelector('.add-category__label-info'),
	categories: document.querySelectorAll('.remove-category__chose-label')
};

leftSpotHeadler = function() {
	if(spot.number.textContent != 1) {
		spot.number.textContent = spot.number.textContent - 1; 
	};
};

rightSpotHeadler = function() {
	if(spot.number.textContent != spot.categories.length + 1) {
		spot.number.textContent = Number(spot.number.textContent) + 1; 
	};
};

spot.left.addEventListener('click', leftSpotHeadler);
spot.right.addEventListener('click', rightSpotHeadler);

/*КНОПКА ПОЗИЦИИ КАТЕГОРИИ В РАЗДЕЛЕ ИЗМЕНЕНИЯ КАТЕГОРИИ*/

var spotRedact = {
	left: document.querySelector('.redact-category__spot-left'),
	right: document.querySelector('.redact-category__spot-right'),
	number: document.querySelector('.redact-category__label-info'),
	categories: document.querySelectorAll('.remove-category__chose-label')
};

leftSpotHeadlerRedact = function() {
	if(spotRedact.number.textContent != 1) {
		spotRedact.number.textContent = spotRedact.number.textContent - 1; 
	};
};

rightSpotHeadlerRedact = function() {
	if(spotRedact.number.textContent != spotRedact.categories.length + 1) {
		spotRedact.number.textContent = Number(spotRedact.number.textContent) + 1; 
	};
};

spotRedact.left.addEventListener('click', leftSpotHeadlerRedact);
spotRedact.right.addEventListener('click', rightSpotHeadlerRedact);

/*КНОПКА ДОБАВЛЕНИЯ НОВОЙ ПОДКАТЕГОРИИ В РАЗДЕЛЕ ДОБАВЛЕНИЯ КАТЕГОРИИ*/

var subCat = {
	button: document.querySelector('.add-subcategory__plus'),
	section: document.querySelector('.add-subcategory__item'),
	wrapper: document.querySelector('.add-subcategory__wrapper'),
	input: document.querySelector('.add-subcategory__input'),
	number: 2
};

subCatHeandler = function() {
	var template = subCat.section.cloneNode(true);
	template.querySelector('.add-subcategory__input').name = 'add-subcategory__name-' + subCat.number;
	template.querySelector('.add-subcategory__input').value = null;
	subCat.number++;
	subCat.wrapper.appendChild(template);
	subCat.section.classList.add('inactuvSection');
	subCat.button.removeEventListener('click', subCatHeandler);

	sections = document.querySelectorAll('.add-subcategory__item');
	subCat.section = sections[sections.length - 1];

	buttons = document.querySelectorAll('.add-subcategory__plus');
	subCat.button = buttons[buttons.length - 1];
	subCat.button.addEventListener('click', subCatHeandler);
};

subCat.button.addEventListener('click', subCatHeandler);

/*КНОПКА ДОБАВЛЕНИЯ НОВОЙ ПОДКАТЕГОРИИ В РАЗДЕЛЕ ИЗМЕНЕИЯ КАТЕГОРИИ*/

var subCatRedact = {
	button: document.querySelector('.redact-subcategory__plus'),
	section: document.querySelector('.redact-subcategory__item'),
	wrapper: document.querySelector('.redact-subcategory__wrapper'),
	input: document.querySelector('.redact-subcategory__input'),
	number: 2
};

subCatHeandlerRedact = function() {
	var template = subCatRedact.section.cloneNode(true);
	template.querySelector('.redact-subcategory__input').name = 'redact-subcategory__name-' + subCatRedact.number;
	template.querySelector('.redact-subcategory__input').value = null;
	subCatRedact.number++;
	subCatRedact.wrapper.appendChild(template);
	subCatRedact.section.classList.add('inactuvSection');
	subCatRedact.button.removeEventListener('click', subCatHeandler);

	sections = document.querySelectorAll('.redact-subcategory__item');
	subCatRedact.section = sections[sections.length - 1];

	buttons = document.querySelectorAll('.redact-subcategory__plus');
	subCatRedact.button = buttons[buttons.length - 1];
	subCatRedact.button.addEventListener('click', subCatHeandlerRedact);
};

subCatRedact.button.addEventListener('click', subCatHeandlerRedact);

/*ЧЕКБОКС SALE В РАЗДЕЛЕ ДОБАВЛЕНИЯ ТОВАРА*/

checkboxWork = function() {
	checkboxHeandler = function() {
		document.querySelector('.add-cart__sale-label').classList.toggle('add-cart__sale--active');
		document.querySelector('.add-cart__old-price').classList.toggle('add-cart__old-price--hidden');
	};
	document.querySelector('.add-cart__sale').addEventListener('click', checkboxHeandler);
};

checkboxWork();

/*СБРОС ФОРМЫ ДОБАВЛЕНИЯ ТОВАРА ПРИ ОТПРАВКЕ*/

submitFormHeandler = function(evt) {
	var form = document.querySelector('.add-cart__form');
	var buttons = form.querySelectorAll('.chose__button');
	var categories = form.querySelectorAll('.add-cart__chose-category-label');
	var subcategories = form.querySelectorAll('.add-cart__chose-subcategory-label');
	var uploadSubscribes = form.querySelectorAll('.admin-upload__subscribe--multiple');

	for(var i = 0; i < buttons.length; i++) {
		if(buttons[i].parentElement.classList.contains('admin-section--active')) {
			buttons[i].click();
		};
		document.querySelector('.add-cart__chose-category-discript').textContent = null;
		document.querySelector('.add-cart__chose-subcategory-discript').textContent = null;
	};

	for(var i = 0; i < categories.length; i++) {
		categories[i].classList.remove('chose__label--checked');
	};

	for(var i = 0; i < subcategories.length; i++) {
		subcategories[i].classList.remove('chose__label--checked');
	};

	for(var i = 0; i < uploadSubscribes.length; i++) {
		uploadSubscribes[i].textContent = null;
	};

	document.querySelector('.add-cart__chose-subcategory').classList.add('visually-hidden');
	document.querySelector('.add-cart__chose-subcategory-subscribe').classList.add('visually-hidden');
	document.querySelector('.add-cart__sale-label').classList.remove('add-cart__sale--active');
	document.querySelector('.add-cart__old-price').classList.remove('add-cart__old-price--hidden');
};

document.querySelector('.add-cart__submit').addEventListener('click', submitFormHeandler);

/*ЧЕКБОКС SALE В РАЗДЕЛЕ ИЗМЕНЕНИЯ ТОВАРА*/

checkboxRedactWork = function() {
	checkboxRedactHeandler = function() {
		document.querySelector('.redact-cart__sale-label-two').classList.toggle('add-cart__sale--active');
		document.querySelector('.redact-cart__old-price-two').classList.toggle('add-cart__old-price--hidden');
	};
	document.querySelector('.redact-cart__sale-two').addEventListener('click', checkboxRedactHeandler);
};

checkboxRedactWork();

/*КНОПКИ УДАЛЕНИЯ ФОТО В ФОРМЕ ИЗМЕНЕНИЯ ТОВАРА*/

delPhotoHeandler = function(evt) {
	cancelButtons = document.querySelectorAll('.template__photo-cancel');
	photoWrapper = document.querySelector('.redact-cart__old-fhoto-wrapper');
	photoItems = document.querySelectorAll('.template__photo-wrapper');
	photoDel = document.querySelector('.redact-cart__old-fhoto-del');
	for(var i = 0; i < cancelButtons.length; i++) {
		if(cancelButtons[i].contains(evt.target)) {
			var adres = photoItems[i].querySelector('.template__photo-img').src.split('/');
			adres = adres.reverse()[0];
			photoDel.value = photoDel.value + adres + " ";
			photoWrapper.removeChild(photoItems[i]);
		};
	};
};

/*СБРОС ФОРМЫ ИЗМЕНЕНИЯ ТОВАРА ПРИ ОТПРАВКЕ*/

submitFormRedactHeandler = function(evt) {
	var form = document.querySelector('.redact-cart__form-two');
	var buttons = form.querySelectorAll('.redact-cart__form-two .chose__button');
	var categories = form.querySelectorAll('.redact-cart__chose-category-label');
	var subcategories = form.querySelectorAll('.redact-cart__chose-subcategory-label');
	var uploadSubscribes = form.querySelectorAll('.redact-cart__form-two .admin-upload__subscribe--multiple');

	for(var i = 0; i < buttons.length; i++) {
		if(buttons[i].parentElement.classList.contains('admin-section--active')) {
			buttons[i].click();
		};
		document.querySelector('.redact-cart__chose-category-discript-two').textContent = null;
		document.querySelector('.redact-cart__chose-subcategory-discript-two').textContent = null;
	};

	for(var i = 0; i < categories.length; i++) {
		categories[i].classList.remove('chose__label--checked');
	};

	for(var i = 0; i < subcategories.length; i++) {
		subcategories[i].classList.remove('chose__label--checked');
	};

	for(var i = 0; i < uploadSubscribes.length; i++) {
		uploadSubscribes[i].textContent = null;
	};

	document.querySelector('.redact-cart__chose-subcategory').classList.add('visually-hidden');
	document.querySelector('.redact-cart__chose-subcategory-subscribe-two').classList.add('visually-hidden');
	document.querySelector('.redact-cart__sale-label-two').classList.remove('add-cart__sale--active');
	document.querySelector('.redact-cart__old-price-two').classList.remove('add-cart__old-price--hidden');
	document.querySelector('.redact-cart__form').classList.remove('visually-hidden');
	document.querySelector('.redact-cart__form-two').classList.add('visually-hidden');

	var photoMiniatures = document.querySelectorAll('.template__photo-wrapper');
	for(var i = 0; i < photoMiniatures.length; i++) {
		document.querySelector('.redact-cart__old-fhoto-wrapper').removeChild(photoMiniatures[i]);
	};
};

document.querySelector('.redact-cart__submit-two').addEventListener('click', submitFormRedactHeandler);