(function() {

class About {
	constructor() {
	}
	
	get template () {
		return `<div class="about__button button__shadow">
				<a href="#settings" class="button">Back</a>
			</div>
			<p class="about__discription">Block for discription...</p>`;
	}

	render(container) {
		container.innerHTML = this.template;
	}
};

window.about = About;

})();