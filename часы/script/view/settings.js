(function() {

class Settings {
	constructor(data) {
		this.timezones = data.timezonesButtons,
		this.formatToggle = data.formatToggle,
		this.matches = [],
		this.controlButtonHeandler = this.controlButtonHeandler.bind(this),
		this.addButtonHeandler = this.addButtonHeandler.bind(this),
		this.searchCityHeandler = this.searchCityHeandler.bind(this),
		this.renderPopup = this.renderPopup.bind(this)
	}

	get popupField () {
		return `<div class="popup__field"></div>`;
	}

	get inputTemplate () {
		return `<input type="text" class="add-city__input" placeholder="cities name...">
				<div class="add-city__popup"></div>`;
	}

	get templateButton () {
		return `<div class="button-wrapper">
				<div class="button__shadow">
					<button class="city-buttons__button button"></button>
				</div>
				<div class="del-button__shadow">
					<button class="del-button button">
						<span class="del-button__simbol"></span>
						<span class="del-button__simbol"></span>
					</button>
				</div>
			</div>`;
	}
	
	get template () {
		return `<div class="city-buttons">
			
		</div>

		<div class="settings-control">
			<div class="button__shadow">
				<button class="button__add button">add city...</button>
			</div>

			<div class="format-control">
				<span class="format-control__spec">24</span>
				<span class="format-control__spec">12</span>
				<div class="format-control__button button"></div>
			</div>

			<div class="button__shadow">
				<a href="#about" class="about-button button">About</a>
			</div>
		</div>`;
	}

	formatControlUpdate() {
		if(window.model.formatToggle === 12) {
			document.querySelector('.format-control__button').style = 'right: -5px;';
			document.querySelectorAll('.format-control__spec')[0].classList.remove('spec--active');
			document.querySelectorAll('.format-control__spec')[1].classList.add('spec--active');
		} else {
			document.querySelector('.format-control__button').style = 'left: -5px;';
			document.querySelectorAll('.format-control__spec')[1].classList.remove('spec--active');
			document.querySelectorAll('.format-control__spec')[0].classList.add('spec--active');
		};
	}

	cityButtonHeandler(evt) {
		for(let i of document.querySelectorAll('.city-buttons__button')) {
			i.parentNode.classList.remove('button-active');
		};
		evt.target.parentNode.classList.add('button-active');
		for(let i of document.querySelectorAll('.button-wrapper')) {
			if(i.contains(evt.target)) {
				window.model.timezone = i.id;
			};
		};
		for(let i of document.querySelectorAll('.button-wrapper')) {
			if(i.contains(evt.target)) {
				localStorage.setItem('timezone', i.id);
			};
		};
	}

	delButtonHeandler(evt) {
		let newCitysArray = [];
		for(let i of document.querySelectorAll('.button-wrapper')) {
			if(i.contains(this)) {
				i.remove();
				if(i.firstElementChild.classList.contains('button-active')) {
					if(document.querySelectorAll('.city-buttons__button')[0]) {
						document.querySelectorAll('.city-buttons__button')[0].click();
					};
				};
			} else {
				newCitysArray.push(i.id);
			};
		};
		window.model.timezonesButtons = newCitysArray;
		localStorage.setItem('timezonesButtons', newCitysArray);
	}

	addButtonHeandler(evt) {
		evt.target.parentNode.style = 'box-shadow: none;';
		evt.target.parentNode.innerHTML = this.inputTemplate;
		document.querySelector('.add-city__input').focus();
		window.controller.getTimezones();
	}

	controlButtonHeandler() {
		if(window.model.formatToggle === 24) {
			window.model.formatToggle = 12;
			this.formatControlUpdate();
			localStorage.setItem('formatToggle', 12);
		} else {
			window.model.formatToggle = 24;
			this.formatControlUpdate();
			localStorage.setItem('formatToggle', 24);
		};
	}

	popupFieldHeandler() {
		document.querySelector('.add-city__popup').innerHTML = null;
		const div = document.createElement("div");
		div.innerHTML = window.controller.settingsItem.templateButton;
		div.querySelector('.city-buttons__button').textContent = this.textContent;
		div.querySelector('.city-buttons__button').addEventListener('click', window.controller.settingsItem.cityButtonHeandler);
		div.querySelector('.del-button').addEventListener('click', window.controller.settingsItem.delButtonHeandler);
		div.querySelector('.button-wrapper').id = this.classList[1];
		document.querySelector('.city-buttons').appendChild(div.firstChild);
		window.model.timezonesButtons.push(this.classList[1]);
		localStorage.setItem('timezonesButtons', window.model.timezonesButtons);
	}

	renderPopup(value) {
		document.querySelector('.add-city__popup').innerHTML = null;
		for(let i of this.matches) {
			this.id = i;
			const wrapper = document.createElement("div");
			wrapper.innerHTML = this.popupField;
			if(i.split('/').length > 1) {
				wrapper.firstChild.textContent = i.split('/')[i.split('/').length - 1].replace('_', ' ');
				wrapper.firstChild.classList.add(i);
				wrapper.firstChild.addEventListener('click', this.popupFieldHeandler);
				document.querySelector('.add-city__popup').appendChild(wrapper.firstChild);
			};
		};
		if(this.matches.length === 0) {
			document.querySelector('.add-city__popup').innerHTML = null;
			document.querySelector('.add-city__popup').innerHTML = this.popupField;
			document.querySelector('.popup__field').textContent = 'empty...';
		};
		if(!value) {
			document.querySelector('.add-city__popup').innerHTML = null;
		};
	}

	searchCityHeandler() {
		let value = document.querySelector('.add-city__input').value;
		if(value.split('').length > 0) {
			this.matches = window.model.timezones.filter(function(i) {
				if(i.toLowerCase().replace('_', ' ').indexOf(value.toLowerCase()) > -1) {
					return true;
				};
			});
		};
		this.renderPopup(value);
	}

	bindCityInput() {
		document.querySelector('.add-city__input').addEventListener('input', this.searchCityHeandler);
	}

	bind() {
		for(let i of this.element.querySelectorAll('.city-buttons__button')) {
			i.addEventListener('click', this.cityButtonHeandler);
		};
		for(let i of this.element.querySelectorAll('.del-button')) {
			i.addEventListener('click', this.delButtonHeandler);
		};
		this.element.querySelector('.button__add').addEventListener('click', this.addButtonHeandler);
		this.element.querySelector('.format-control').addEventListener('click', this.controlButtonHeandler);
	}

	render(container) {
		const wrapper = document.createElement("div");
		wrapper.innerHTML = this.template;
		for(let i of this.timezones) {
			const j = document.createElement("div");
			j.innerHTML = this.templateButton;
			j.querySelector('.city-buttons__button').textContent = i.split('/')[i.split('/').length - 1].replace('_', ' ');
			j.querySelector('.button-wrapper').id = i;
			if(i === window.model.timezone) {
				j.querySelector('.button__shadow').classList.add('button-active');
			}
			wrapper.firstChild.appendChild(j.firstChild);
		};
		let fragment = document.createDocumentFragment();
		for(let i of wrapper.children) {
			let wrapper2 = i.cloneNode(true);
			fragment.appendChild(wrapper2);
		};
		container.appendChild(fragment);
		this.element = container;
		this.formatControlUpdate();
		this.bind();
	}
};

window.settings = Settings;

})();