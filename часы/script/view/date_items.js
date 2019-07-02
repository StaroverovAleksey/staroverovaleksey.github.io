(function() {

class Date_items {
	constructor(data) {
		this.month = data.month,
		this.day = data.day,
		this.dayOfWeek = data.dayOfWeek,
		this.year = data.year
	}
	
	get template () {
		return `<p class="date__item date__number">${this.day}</p>
		<p class="date__item date__month">${this.month}</p>
		<p class="date__item date__year">${this.year}</p>
		<p class="date__item date__day">${this.dayOfWeek}</p>`;
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

window.date_items = Date_items;

})();