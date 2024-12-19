const loginInput = document.getElementById('login');
const birthdateInput = document.getElementById('birthdate');
const loginError = document.getElementById('loginError');
const birthdateError = document.getElementById('birthdateError');
const form = document.getElementById('loginForm');

function validateLogin() {
    const loginValue = loginInput.value;
    const loginPattern = /^[а-яА-Я0-9]{4,10}$/;
    if (!loginPattern.test(loginValue)) {
        loginError.style.display = 'block';
        return false;
    }
    loginError.style.display = 'none';
    return true;
}

function validateBirthdate() {
    const birthdateValue = new Date(birthdateInput.value);
    const minDate = new Date('1950-12-17');
    const maxDate = new Date('2024-12-28');
    if (birthdateValue < minDate || birthdateValue > maxDate) {
        birthdateError.style.display = 'block';
        return false;
    }
    birthdateError.style.display = 'none';
    return true;
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isLoginValid = validateLogin();
    const isBirthdateValid = validateBirthdate();

    if (isLoginValid && isBirthdateValid) {
        window.location.href = 'next.html';
    }
});
