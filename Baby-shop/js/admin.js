/*РАБОТА КНОПОК, ОТКРЫВАЮЩИХ РАЗДЕЛЫ*/

menuWork = function(sections, buttons) {
	this.sections = sections,
	this.buttons = buttons
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
		};
	};
};

menuWork.prototype.closeSectionHeandler = function(evt) {
	evt.target.parentElement.style.height = this.buttons[0].offsetHeight + 'px';
	evt.target.parentElement.style.width = null;
	evt.target.parentElement.classList.remove('admin-section--active');
	evt.target.addEventListener('click', this.openSectionHeandler);
	evt.target.removeEventListener('click', this.closeSectionHeandler);
};

menuWork.prototype.openSectionHeandler = function(evt) {
	for (var i = 0; i < this.buttons.length; i++) {
		if (this.buttons[i] == evt.target) {
			this.sections[i].style.height = 'auto';
			this.sections[i].style.width = '76%';
			this.sections[i].classList.add('admin-section--active');
			this.buttons[i].removeEventListener('click', this.openSectionHeandler);
			this.buttons[i].addEventListener('click', this.closeSectionHeandler);
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

/*РАБОТА INPUT TYPE = FILE*/

var VALID_FORMAT = ['png', 'jpg', 'jpeg'];

var inputFile = {
	input: document.querySelectorAll('.upload-input'),
	subscribe: document.querySelectorAll('.admin-upload__subscribe'),
	subscribeInvalid: document.querySelectorAll('.admin-upload__invalid')
}

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
