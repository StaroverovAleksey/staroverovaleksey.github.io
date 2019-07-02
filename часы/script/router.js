(function() {

window.router = {
	hashHeandler: function() {
		let hash;
		if(window.location.hash) {
			hash = window.location.hash.slice(1);
		} else {
			hash = window.model.activeButton;
		};
		window.controller.buttonsTrigger(hash);
		switch(hash) {
			case 'digit':
				window.controller.renderDigit();
				break;
			case 'analog':
				window.controller.renderAnalog();
				break;
			case 'settings':
				window.controller.renderSettings();
				break;
			case 'about':
				window.controller.renderAbout();
				break;
			default:
				window.controller.renderDigit();
		};
	},

	bindHashListener: function() {
		window.addEventListener('hashchange', this.hashHeandler);
		this.hashHeandler();

		setInterval(function() {
			window.router.hashHeandler();	
		}, 300000);
	}
};

})();