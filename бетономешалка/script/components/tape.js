/*Класс для создания вращающихся пустых барабанов */

(function() {
class Tape {
	constructor(speed) {
		this._shift = 0,
		this._speed = speed,
		this._shiftValue = 0
	}

	get template() {
		return `
		<div class="tape-wrapper">
			<div class="tape" id="${this._shiftValue}"></div>
		</div>
		`;
	}

	get _residue() {
		return this._shift % 100;
	}

	render() {
		const container = document.querySelector('.tapes-container');
		container.insertAdjacentHTML('beforeEnd', this.template);
		this._element = container.children[container.children.length - 1];
		this._tape = this._element.querySelector('.tape');
	}

	shiftQueue() {
		this._shift = 0;
		if(this._shiftValue < window.settings.tapeItemCount -1) {
			this._shiftValue++;
		} else {
			this._shiftValue = 0;
		};
	}

	shiftTape() {
		if(this._element) {
			this._element.remove();
			
		};
		this.render();
		this._tape.style = 'bottom: -' + this._shift + 'px;';
		this._shift = this._shift + this._speed;
		if(this._shift > 100) {
			this.shiftQueue();
		};
	}
}
let tapeArray = [];
renderTapes = function() {
	for(let i = 0; i < 5; i++) {
		tapeArray[i] = new Tape(window.settings.speed);
		tapeArray[i].render();
	};
};

window.tape = {
	renderTapes,
	tapeArray
}

})();