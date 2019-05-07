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
			this.sections[i].classList.remove('admin-section--active');
			this.buttons[i].addEventListener('click', this.openSectionHeandler);
			this.buttons[i].removeEventListener('click', this.closeSectionHeandler);

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

	};
	
};

menuWork.prototype.closeSectionHeandler = function(evt) {
	evt.preventDefault();
	evt.target.parentElement.style.height = this.buttons[0].offsetHeight + 'px';
	evt.target.parentElement.style.width = null;
	evt.target.parentElement.classList.remove('admin-section--active');
	evt.target.addEventListener('click', this.openSectionHeandler);
	evt.target.removeEventListener('click', this.closeSectionHeandler);
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

menuWork.prototype.openSectionHeandler = function(evt) {
	choseLabelsHeandler = function(evt) {
		for(var i = 0; i < this.choseLabels.length; i++) {
			if(this.choseLabels[i] == evt.target) {
				this.choseLabels[i].classList.toggle('chose__label--checked');
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
			this.choseLabels[i].removeEventListener('click', choseLabelsHeandler);
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

/*ВНУТРЕННИЕ РАЗДЕЛЫ*/

var adminSubMenu = new menuWork(
	document.querySelectorAll('.menu-redact__item'),
	document.querySelectorAll('.menu-reduct__title')
);

adminSubMenu.bindContext();
adminSubMenu.hangHeandler();

/*ВЫБОР КАТЕГОРИИ ДЛЯ УДАЛЕНИЯ*/

var removeCategory = new menuWork(
	document.querySelectorAll('.remove-category__chose'),
	document.querySelectorAll('.remove-category__chose-button'),
	document.querySelectorAll('.remove-category__chose-label'),
	document.querySelectorAll('.remove-category__chose-input'),
);

removeCategory.bindContext();
removeCategory.hangHeandler();

/*ВЫБОР КАТЕГОРИИ ДЛЯ ПЕРЕМЕЩЕНИЯ*/

var moveCategory = new menuWork(
	document.querySelectorAll('.move-category__chose'),
	document.querySelectorAll('.move-category__chose-button'),
	document.querySelectorAll('.move-category__chose-label'),
	document.querySelectorAll('.move-category__chose-input'),
);

moveCategory.bindContext();
moveCategory.hangHeandler();

/*РАБОТА INPUT TYPE = FILE*/

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