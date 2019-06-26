/*Класс для создания кнопок старта и остановы*/

(function() {
class Button {
	constructor(name, text, status, buttonClickHeandler) {
		this._name = name,
		this.status = status,
		this._text = text,
		this.buttonClickHeandler = buttonClickHeandler.bind(this)
	}

	get template() {
		return `
		<button class="button ${this._name}-button ${this.status}">
			${this._text}
		</button>
		`;
	}

	bind() {
		this._element.addEventListener('click', this.buttonClickHeandler);
	}

	unbind() {
		this._element.removeEventListener('click', this.buttonClickHeandler);
	}

	render() {
		const container = document.querySelector('.buttons-container');
		container.insertAdjacentHTML('beforeEnd', this.template);
		this._element = container.children[container.children.length - 1];
		if(this.status !== 'active') {
			this._element.disabled = true;
		};
		this.bind();
	}
}

onStatus = function() {
	for(let i = 0; i < window.tape.tapeArray.length; i++) {
		window.tape.tapeArray[i]._speed = window.settings.speed;
	};

	startButton._element.disabled = true;
	startButton._element.classList.remove('active');
	startButton.status = 'disabled';

	stopButton._element.disabled = false;
	stopButton._element.classList.add('active');
	stopButton.status = 'active';
	startButton.timerId = setTimeout(function() {
		offStatus();
	}, window.settings.timeRotate);
};

offStatus = function() {
	clearTimeout(startButton.timerId);
	stopButton._element.disabled = true;
	stopButton._element.classList.remove('active');
	stopButton.status = 'disabled';

	startButton._element.disabled = false;
	startButton._element.classList.add('active');
	startButton.status = 'active';
};

window.buttons = {
	Button,
	onStatus,
	offStatus
};

})();