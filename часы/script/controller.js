(function() {

window.controller = {

	getLocatStorage () {
		if(localStorage.getItem('activeButton')) {
			window.model.activeButton = localStorage.getItem('activeButton');	
		};

		if(localStorage.getItem('formatToggle')) {
			window.model.formatToggle = parseInt(localStorage.getItem('formatToggle'));	
		};

		if(localStorage.getItem('timezone')) {
			window.model.timezone = localStorage.getItem('timezone');	
		};

		if(localStorage.getItem('timezonesButtons')) {
			window.model.timezonesButtons = localStorage.getItem('timezonesButtons').split(',');	
		};
	},

	buttonsTrigger: (hash) => {
		let buttons = [];
		buttons = [...document.querySelectorAll('.header__link')];
		const activeButton = buttons.find(function(elem, i) {
			if(elem.hash.slice(1) === hash) {
				window.model.activeButton = hash;
				localStorage.setItem('activeButton', hash);
				return true;
			};
		});
		for(let i of buttons) {
			i.classList.remove('header__link--active');
		};
		if(activeButton) {
			activeButton.classList.add('header__link--active');
		} else {
			document.querySelector('.settings').classList.add('header__link--active');
		};
		if (activeButton === document.querySelector('.about-button')) {
			document.querySelector('.settings').classList.add('header__link--active');
		};	
	},

	deliteSection: () => {
		for(section of document.querySelectorAll('.global-container')) {
			section.innerHTML = null;
		};
	},

	renderDigit: () => {
		window.controller.deliteSection();
		if(this.digitClock) {
			clearInterval(this.digitClock.rotateTimerId);
		};
		if(this.analogClock) {
			clearInterval(this.analogClock.rotateTimerId);	
		};
		
		window.model.getTime()
			.then((resolve) => {
				let container = document.querySelector('.time');
				this.digitClock = new window.digit_clock(window.model.date);
				this.digitClock.render(container);

				container = document.querySelector('.date');
				dateItems = new window.date_items(window.model.date);
				dateItems.render(container);

				this.digitClock.rotateTimerId = setInterval(function() {
					this.digitClock.rotate();
				}, 1000);
			});
	},

	renderAnalog: () => {
		window.controller.deliteSection();

		if(this.analogClock) {
			clearInterval(this.analogClock.rotateTimerId);
		};
		if(this.digitClock) {
			clearInterval(this.digitClock.rotateTimerId);	
		};
		
		window.model.getTime()
			.then((resolve) => {
				let container = document.querySelector('.time');
				this.analogClock = new window.analog_clock(window.model.date);
				this.analogClock.render(container);

				container = document.querySelector('.date');
				dateItems = new window.date_items(window.model.date);
				dateItems.render(container);

				this.analogClock.preRotate();
				this.analogClock.rotateTimerId = setInterval(function() {
					this.analogClock.rotate();
				}, 1000);
			});
	},

	getTimezones: () => {
		window.model.getTimeZones()
			.then((resolve) => {
				window.controller.settingsItem.bindCityInput();
			});
	},

	renderSettings: () => {
		window.controller.deliteSection();
		if(this.analogClock) {
			clearInterval(this.analogClock.rotateTimerId);
		};
		if(this.digitClock) {
			clearInterval(this.digitClock.rotateTimerId);
		};

		window.model.getTime()
			.then((resolve) => {
				let container = document.querySelector('.settings-block');
				window.controller.settingsItem = new window.settings(window.model);
				window.controller.settingsItem.render(container);
			});
	},

	renderAbout() {
		window.controller.deliteSection();
		let container = document.querySelector('.about');
		window.controller.about = new window.about(window.model);
		window.controller.about.render(container);
	}
};


})();