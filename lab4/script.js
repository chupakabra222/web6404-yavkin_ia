class ExpeditionRequest {
    constructor(callsign, email, accessCode, destination, consent) {
        this.callsign = callsign;
        this.email = email;
        this.accessCode = accessCode;
        this.destination = destination;
        this.consent = consent;
        this.submittedAt = new Date().toLocaleString('ru-RU');
    }

    printToConsole() {
        const maskedCode = '*'.repeat(this.accessCode.length);
        const consentText = this.consent ? 'Да' : 'Нет';
        const output = [
            '=== Заявка в космическую экспедицию ===',
            `Позывной (логин): ${this.callsign}`,
            `Электронная почта: ${this.email}`,
            `Код доступа: ${maskedCode}`,
            `Целевой сектор: ${this.destination}`,
            `Согласие на обработку данных: ${consentText}`,
            `Время отправки: ${this.submittedAt}`,
            '======================================='
        ].join('\n');

        console.log(output);
    }
}

const formElement = document.getElementById('expedition-form');
const statusElement = document.getElementById('form-status');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const callsign = document.getElementById('callsign').value.trim();
    const email = document.getElementById('email').value.trim();
    const accessCode = document.getElementById('access-code').value.trim();
    const destination = document.getElementById('destination').value;
    const consent = document.getElementById('consent').checked;

    statusElement.classList.add('form__status_visible');

    if (!callsign || !accessCode) {
        statusElement.textContent = 'Позывной и код доступа не могут состоять только из пробелов.';
        statusElement.classList.add('form__status_state_error');
        return;
    }

    if (!emailPattern.test(email)) {
        statusElement.textContent = 'Введите корректный адрес электронной почты.';
        statusElement.classList.add('form__status_state_error');
        return;
    }

    const request = new ExpeditionRequest(
        callsign,
        email,
        accessCode,
        destination,
        consent
    );

    request.printToConsole();

    statusElement.textContent = 'Данные успешно сформированы и выведены в консоль браузера (F12).';
    statusElement.classList.remove('form__status_state_error');
    formElement.reset();
});
