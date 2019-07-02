(function() {

class Analog_clock {
	constructor(data) {
		if(parseInt(data.hour) > 11) {
			this.hour = (((parseInt(data.hour) -12) * 30) + parseInt(data.min) / 2);
		} else {
			this.hour = ((parseInt(data.hour) * 30) + parseInt(data.min) / 2);
		}
		this.min = (parseInt(data.min) * 6);
		this.sec = (parseInt(data.sec) * 6);
		this.city = window.model.timezone.split('/')[window.model.timezone.split('/').length - 1].replace('_', ' ');
	}
	
	get template () {
		return `<h1 class="main-title">${this.city}</h1>
		<div class="time__wrapper">
		<div class="time__center">
			<div class="time__marks">
				<div class="title__wrapper">
					<div class="marks__title">
						<div class="title__point"></div>
					</div>
					<div class="marks__title">
						<div class="title__point"></div>
					</div>
					<div class="marks__title">
						<div class="title__point"></div>
					</div>
					<div class="marks__title">
						<div class="title__point"></div>
					</div>	
				</div>
				<div class="hour__wrapper">
					<div class="marks__hour">
						<div class="hour__point"></div>
					</div>
					<div class="marks__hour">
						<div class="hour__point"></div>
					</div>
					<div class="marks__hour">
						<div class="hour__point"></div>
					</div>
					<div class="marks__hour">
						<div class="hour__point"></div>
					</div>
					<div class="marks__hour">
						<div class="hour__point"></div>
					</div>
					<div class="marks__hour">
						<div class="hour__point"></div>
					</div>
					<div class="marks__hour">
						<div class="hour__point"></div>
					</div>
					<div class="marks__hour">
						<div class="hour__point"></div>
					</div>
				</div>
				<div class="min__wrapper">
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
					<div class="marks__min">
						<div class="min__point"></div>
					</div>
				</div>
			</div>
			<div class="arrow time__hour-arrow"></div>
			<div class="arrow time__min-arrow"></div>
			<div class="arrow time__sec-arrow">
				<div class="sec-arrow__color-container"></div>
			</div>
		</div>
	</div>`;
	}

	preRotate() {
		this.element.querySelector('.time__sec-arrow').style = 'transform: rotate(' + this.sec + 'deg);';
		this.element.querySelector('.time__min-arrow').style = 'transform: rotate(' + this.min + 'deg);';
		this.element.querySelector('.time__hour-arrow').style = 'transform: rotate(' + this.hour + 'deg);';
	}

	rotate() {
		if(this.sec < 354) {
			this.sec += 6;
			this.element.querySelector('.time__sec-arrow').style = 'transform: rotate(' + this.sec + 'deg);';
		} else {
			this.sec = 0;
			this.element.querySelector('.time__sec-arrow').style = 'transform: rotate(' + this.sec + 'deg);';
			if(this.min < 354) {
				this.min +=6;
				this.element.querySelector('.time__min-arrow').style = 'transform: rotate(' + this.min + 'deg);';
				if(this.hour < 359.5) {
					this.hour += 0.5;
					this.element.querySelector('.time__hour-arrow').style = 'transform: rotate(' + this.hour + 'deg);';
				} else {
					this.hour = 0;
					this.element.querySelector('.time__hour-arrow').style = 'transform: rotate(' + this.hour + 'deg);';
				};
			} else {
				this.min = 0;
				this.element.querySelector('.time__min-arrow').style = 'transform: rotate(' + this.min + 'deg);';
				if(this.hour < 359.5) {
					this.hour += 0.5;
					this.element.querySelector('.time__hour-arrow').style = 'transform: rotate(' + this.hour + 'deg);';
				} else {
					this.hour = 0;
					this.element.querySelector('.time__hour-arrow').style = 'transform: rotate(' + this.hour + 'deg);';
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
		this.element = container;
	}
};

window.analog_clock = Analog_clock;

})();