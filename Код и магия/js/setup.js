document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

randomNumber = function(maxNumber) {
	return Math.round(Math.random() * maxNumber);
}

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var secondNames = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];

var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [];

for (var i = 0; i < 4; i++) {
	wizards[i] = {
		name : names[randomNumber(names.length - 1)] + secondNames[randomNumber(secondNames.length - 1)],
		coatColor : coatColors[randomNumber(coatColors.length - 1)],
		eyesColor : eyesColors[randomNumber(eyesColors.length - 1)]
	}
};

console.log(wizards);

var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

for (i = 0; i < 4; i++) {
	wizardTemplate.querySelector('.setup-similar-label').textContent = wizards[i].name;
	wizardTemplate.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
	wizardTemplate.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
	fragment.appendChild(wizardTemplate.cloneNode(true));
};

similarList.appendChild(fragment);