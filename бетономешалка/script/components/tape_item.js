/*Класс для создания итемов, заполняющих барабаны*/

(function() {
class TapeItem {
	constructor(name, container) {
		this._name = name,
		this.container = container
	}

	get template() {
		return `
		<div class="tape-item">
			<p class="tape-item__title">${this._name}</p>
		</div>
		`;
	}

	render() {
		this.container.insertAdjacentHTML('beforeEnd', this.template);
		this._element = this.container.children[this.container.children.length - 1];
		this._tape = this._element.querySelector('.tape');
	}
}

let tapeItemArray = [];
fillTape = function() {
	for(let i = 0; i <tapeItemArray.length; i++) {
		tapeItemArray[i]._element.remove();
	};
	const containers = document.querySelectorAll('.tape');
	const items = document.querySelectorAll('.tape-item');
	for(let i = 0; i <items.length; i++) {
		items[i].remove();
	};
	for(let i = 0; i < containers.length; i++) {
		for (let j = 0; j < window.settings.tapeItemCount; j++) {
			let name = j - containers[i].id;
			if(name < 0) {
				name = name + window.settings.tapeItemCount;
			};
			new TapeItem(name, containers[i]).render();
		};
	};
};

window.tape_item = {
	fillTape,
	tapeItemArray
};

})();