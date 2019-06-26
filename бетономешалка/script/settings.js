window.settings = {
	frameTime: 33,          /*Время одного фрейма в мс. Значение 33 мс соответствует 30 fps.*/
	tapeItemCount: 8,       /*Количество символов в каждой ленте.*/
	timeRotate: 5000,       /*Время вращения автомата в мс.*/

	speedValues: {			/*Объект настроек рандомайзера в геттере скорости (смещения).*/
		minValue: 5,		/*Минимально возможное значение рандомайзера.*/
		maxValue: 50,		/*Максимально возможное значение рандомайзера.*/
		step: 1				/*Шаг рандомайзера.*/
	},
	get speed() {			/*Геттер скорости (смещения). Возвращает значение в px,
							на которое смещается символ в ленте за один фрейм.*/

		return Math.floor(Math.floor(Math.random()*(
			this.speedValues.maxValue
				- this.speedValues.minValue
					+ this.speedValues.step)
						+ this.speedValues.minValue)
							/ this.speedValues.step)
								* this.speedValues.step;
	}
};