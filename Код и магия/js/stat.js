window.renderStatistics = function (ctx, names, times) {
	var swift = 60;
	var heightBar = 0;
	var f = Math.round((Math.random() * (1 - 0.5) + 0.5) * 100) / 100;

	ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	ctx.fillRect(100, 10, 420, 270);
	ctx.clearRect(90, 0, 420, 270);
	ctx.fillStyle = ('White');
	ctx.fillRect(90, 0, 420, 270);
	ctx.fillStyle = ('Black');
	ctx.font = '16px PT Mono';
	ctx.fillText('Ура вы победили!', 220, 20);
	ctx.fillText('Список результатов:', 210, 36);

	var result = {};

	for (var i = 0; i < names.length; i++) {
		result[names[i]] = times[i];
	}

	arrayFilter = function(arrayName) {
		for (i = 0; i < arrayName.length; i++) {
			for (var j = i + 1; j < arrayName.length; j++) {
				var a = arrayName[i];
				var b = names[i];
				if (arrayName[j] > arrayName[i]) {
					arrayName[i] = arrayName[j];
					arrayName[j] = a;
					names[i] = names[j];
					names[j] = b;
				}
			}
		}
	}

	arrayFilter(times);

	for (i = 0; i < names.length; i++) {
		if (names[i] == 'Вы') {
			ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		} else {
			ctx.fillStyle = 'rgba(0, 0, 255,' + Math.round((Math.random() * (1 - 0.2) + 0.2) * 100) / 100 + ')';
		}
		swift = swift + 90;
		heightBar = times[i] * 150 / times[0];
		ctx.fillRect(swift, 100 + (150 - heightBar), 40, heightBar);
		ctx.fillStyle = ('Black');
		ctx.fillText(names[i], swift, 70);
		ctx.fillText(Math.round(times[i]), swift, 90);
	}
}