window.tape.renderTapes();					/*Первоначальный рендер барабанов и итемов на них*/
window.tape_item.fillTape();

let coef = 0;
stopping = function(coef) {					/*Поочередная остановка барабанов с выравниванием нижнего края*/
	for(let i = coef; i < window.tape.tapeArray.length; i++) {
		window.tape.tapeArray[i].shiftTape();
	};
	window.tape_item.fillTape();
	if(coef < window.tape.tapeArray.length) {
		if(window.tape.tapeArray[coef]._residue !== window.tape.tapeArray[coef]._speed) {
			setTimeout(function() {
				stopping(coef);
			}, window.settings.frameTime);
		} else {
			coef++;
			stopping(coef);
		};
	};
};

rotate = function() {							/*Вращение барабанов. На каждом фрейме проверяется состояние кнопки запуска.
												При деактивации кнопки запускается функция stopping*/
	window.tape_item.tapeItemArray = null;
	window.tape_item.tapeItemArray = [];
	for(let i = 0; i < window.tape.tapeArray.length; i++) {
		window.tape.tapeArray[i].shiftTape();
	};
	window.tape_item.fillTape();
	if(startButton.status === 'disabled') {
		setTimeout(function() {
			rotate();
		}, window.settings.frameTime);
	} else {
		stopping(coef);
	};
};

start = function() {                  /*Запуск вращения при нажатии кнопки*/
	window.buttons.onStatus();
	rotate();
};

stop = function() {
	window.buttons.offStatus();
};

const startButton = new window.buttons.Button('start', 'Крутить!', 'active', start);
startButton.render();

const stopButton = new window.buttons.Button('stop', 'Стоп!', 'disabled', stop);
stopButton.render();