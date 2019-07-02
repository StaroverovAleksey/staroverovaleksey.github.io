(function() {
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

window.model =  {
	URL_TIMEZONES: 'https://worldtimeapi.org/api/timezone',
	URL_TIME: 'https://worldtimeapi.org/api/timezone/',

	error: false,
	formatToggle: 24,
	timezone: 'Europe/Moscow',
	timezonesButtons: [
		'Europe/Moscow',
		'America/New_York',
		'Asia/Tokyo'
	],
	timezones: undefined,
	activeButton: 'digit',
	date: {
		year: undefined,
		month: undefined,
		day: undefined,
		year: undefined,
		hour: undefined,
		min: undefined,
		sec: undefined,
		dayOfWeek: undefined
	},

	formatDate: function() {
		this.date.dayOfWeek = daysOfWeek[this.date.dayOfWeek];
		this.date.month = months[parseInt(this.date.month) - 1];
	},

	getTimeZones: function() {
		return new Promise(function(resolve, reject) {
			const xhr = new XMLHttpRequest();
			xhr.addEventListener('load', function() {
				if(this.status === 200) {
					window.model.timezones = this.response;
					resolve();
				} else {
					console.log(this.status);
					reject();
				};
			});
			xhr.responseType = 'json';
			xhr.open('GET', window.model.URL_TIMEZONES);
			xhr.send();
		});	
	},

	getTime: function() {
		return new Promise(function(resolve, reject) {
			const xhr = new XMLHttpRequest();
			xhr.addEventListener('load', function() {
				if(this.status === 200) {
					const date = window.model.date;
					date.dayOfWeek = this.response.day_of_week;
					[date.year, date.month, date.day, date.hour, date.min, date.sec] = this.response.datetime.split(/[-:.+T]/);
					window.model.formatDate();
					resolve();
				} else {
					console.log(this.status);
					reject();
				};
			});
			xhr.responseType = 'json';
			xhr.open('GET', window.model.URL_TIME + window.model.timezone);
			xhr.send();
		});	
	}
};

})();
