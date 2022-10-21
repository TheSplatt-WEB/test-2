import Choices from "../../node_modules/choices.js/public/assets/scripts/choices.js"

document.addEventListener("DOMContentLoaded", function () {
	//Глобальные переменные
	const body = document.querySelector('body');
	const mainForm = document.forms.mainForm;
	const inputs = mainForm.querySelectorAll('input.main-form__field');
	const selects = mainForm.querySelectorAll('select.main-form__field');
	const radioButtons = document.querySelectorAll('.main-form__radio-input');

	//Удаляем из инпутов все кроме цифр
	function cleanInput() {
		this.value = this.value.replace(/[^0-9]/g, "");
	}
	const codeInputs = document.querySelectorAll('.main-form__field--code');
	codeInputs.forEach(el => el.addEventListener('input', cleanInput));

	//Передаем/получаем данные из sessionStorage
	//Для всех инпутов
	inputs.forEach(function (e) {
		if (e.value === '') e.value = window.sessionStorage.getItem(e.name, e.value);
		window.sessionStorage.setItem(e.name, e.value);
		addStorage(e, 'input');
	})
	//Для всех селектов
	selects.forEach(function (e) {
		if (sessionStorage.getItem(e.name, e.value)) {
			const selectedOption = sessionStorage.getItem(e.name, e.value);
			e.options[selectedOption].selected = true;
		}
		window.sessionStorage.setItem(e.name, e.value);
		addStorage(e, 'change');

		//Стилизуем селекты при помощи плагина choice.js
		const choices = new Choices(e, {
			searchEnabled: false,
			allowHTML: true,
			itemSelectText: '',
			shouldSort: false,
			editItems: true,
		});

		//Сбрасываем выбор варианта в селектах до дефолтного при сбросе формы. Это необходимо из-за работы плагина choice.js
		mainForm.addEventListener('reset', function () {
			choices.setChoiceByValue('0');
		});
	})
	//Типовая функция передачи данных в sessionSrorage
	function addStorage(e, handler) {
		e.addEventListener(handler, function () {
			window.sessionStorage.setItem(e.name, e.value);
		})
	}
	mainForm.addEventListener('submit', function (e) {
		e.preventDefault();
		changeTheme(); //Функция применения выбранной темы
		//Заносим значение инпута с выбранной темой в sessionStorrage только по событию submit
		radioButtons.forEach(function (e) {
			if (e.checked) sessionStorage.setItem('theme', e.value);;
		})
	})
	//Получаем значение инпута с выбранной темой из sessionStorrage призагрузке страницы
	for (let i = 0; i < radioButtons.length; i++) {
		const radio = radioButtons[i];
		if (sessionStorage.getItem('theme')) {
			let theme = sessionStorage.getItem('theme');
			radio.checked = false;
			document.querySelector('input[name="theme"][value="' + theme + '"]').checked = true;
		}
	}
	//Применяем тему по событию sumbit
	function changeTheme() {
		mainForm.elements.dark.checked ? body.classList.add('dark-theme') : body.classList.remove('dark-theme');
	}
	changeTheme();
	//Сбрасываем значения формы к дефолтным по событию reset
	mainForm.addEventListener('reset', function () {
		body.classList.remove('dark-theme');
		sessionStorage.setItem('theme', 'light');

		inputs.forEach(function (e) {
			window.sessionStorage.setItem(e.name, '');
		})

		selects.forEach(function (e) {
			window.sessionStorage.setItem(e.name, '0');
		})
	});
});
