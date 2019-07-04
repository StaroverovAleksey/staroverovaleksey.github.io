(function() {

class Digit_clock {
	constructor(data) {
		if(window.model.formatToggle === 12) {
			if(parseInt(data.hour) > 12) {
				this.hour = (parseInt(data.hour) - 12).toString();
				if(this.hour.split('').length < 2) {
					this.hour = '0' + this.hour;
				}
				this.noon = 'pm';
			} else {
				this.hour = data.hour;
				this.noon = 'am';
			};
		} else {
			this.hour = data.hour;
			this.noon = '';
		}
		this.min = data.min,
		this.sec = data.sec,
		this.city = window.model.timezone.split('/')[window.model.timezone.split('/').length - 1].replace('_', ' ');
	}

	get formatTemplate () {
		return `<p class="time__item noon">${this.noon}</p>`;
	}
	
	get template () {
		return `<h1 class="main-title">${this.city}</h1>
		<p class="time__item time__hour">${this.hour}</p>
		<p class="time__item min__colon">:</p>
		<p class="time__item time__min">${this.min}</p>
		<p class="time__item sec__colon">:</p>
		<p class="time__item time__sec">${this.sec}</p>`;
	}

	rotate() {
		if(this.element.querySelector('.time__sec')) {
			if(parseInt(this.sec) < 59) {
				this.sec++;
				this.element.querySelector('.time__sec').textContent = '0' + this.sec;
				if(this.sec.toString().split('').length > 1) {
					this.element.querySelector('.time__sec').textContent = this.sec;
				};
			} else {
				this.sec = 0;
				this.element.querySelector('.time__sec').textContent = '0' + this.sec;
				if(parseInt(this.min) < 59) {
					this.min++
					this.element.querySelector('.time__min').textContent = '0' + this.min;
					if(this.min.toString().split('').length > 1) {
						this.element.querySelector('.time__min').textContent = this.min;
					};
				} else {
					this.min = 0;
					this.element.querySelector('.time__min').textContent = '0' + this.min;
					if(this.hour < 23) {
						this.hour++;
						this.element.querySelector('.time__hour').textContent = '0' + this.hour;
						if(this.hour.toString().split('').length > 1) {
							this.element.querySelector('.time__hour').textContent = his.hour;
						};
					} else {
						this.hour = 0;
						this.element.querySelector('.time__hour').textContent = '0' + this.hour;
						window.controller.renderDigit();
					};
				};
			};
		};
		
	}

	render(container) {
		let children = [];
		children = [...container.children]
		for(let val of children) {
			val.remove();
		};
		container.insertAdjacentHTML('beforeEnd', this.template);
		if(window.model.formatToggle === 12) {
			container.insertAdjacentHTML('beforeEnd', this.formatTemplate);
		};
		this.element = container;
		//this.rotate();
	}
};

window.digit_clock = Digit_clock;

})();