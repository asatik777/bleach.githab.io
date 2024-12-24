// Элементы для логина, даты рождения и пола
const loginInput = document.getElementById('login');
const birthdateInput = document.getElementById('birthdate');
const genderInputs = document.getElementsByName('gender');
const loginError = document.getElementById('loginError');
const birthdateError = document.getElementById('birthdateError');
const genderError = document.getElementById('genderError');
const form = document.getElementById('loginForm');

// Валидация логина
function validateLogin() {
    const loginValue = loginInput?.value.trim();
    const loginPattern = /^[а-яА-Я0-9]{4,10}$/; // Логин: 4-10 символов, кириллица и цифры
    if (!loginPattern.test(loginValue)) {
        loginError.textContent = 'Логин должен содержать только русские буквы и цифры, от 4 до 10 символов.';
        loginError.style.display = 'block';
        return false;
    }
    loginError.style.display = 'none';
    return true;
}

// Валидация даты рождения
function validateBirthdate() {
    const birthdateValue = birthdateInput?.value.trim();
    // Проверяем, что дата не пустая
    if (!birthdateValue) {
        birthdateError.textContent = 'Пожалуйста, выберите дату рождения.';
        birthdateError.style.display = 'block';
        return false;
    }

    const birthdate = new Date(birthdateValue);
    const minDate = new Date('1950-12-17');
    const maxDate = new Date('2024-12-28');

    // Проверяем, что дата находится в пределах заданных ограничений
    if (birthdate < minDate || birthdate > maxDate) {
        birthdateError.textContent = 'Дата должна быть в пределах от 17.12.1950 до 28.12.2024.';
        birthdateError.style.display = 'block';
        return false;
    }
    
    birthdateError.style.display = 'none';
    return true;
}

// Валидация пола
function validateGender() {
    const isGenderSelected = Array.from(genderInputs).some(input => input.checked);
    if (!isGenderSelected) {
        genderError.textContent = 'Пожалуйста, выберите пол.';
        genderError.style.display = 'block';
        return false;
    }
    genderError.style.display = 'none';
    return true;
}

// Обработчик отправки формы
form?.addEventListener('submit', (event) => {
    event.preventDefault();  // Предотвращаем отправку формы, чтобы сделать валидацию

    const isLoginValid = validateLogin();
    const isBirthdateValid = validateBirthdate();
    const isGenderValid = validateGender();

    // Если все поля валидны, отправляем форму
    if (isLoginValid && isBirthdateValid && isGenderValid) {
        // Сохраняем данные в localStorage
        localStorage.setItem('userLogin', loginInput.value.trim());
        localStorage.setItem('userBirthdate', birthdateInput.value.trim());
        localStorage.setItem('userGender', document.querySelector('input[name="gender"]:checked').value);

        window.location.href = 'next.html'; // Перенаправление, если все поля валидны
    }
});

// Плавная прокрутка к разделам и переход между страницами
function initializeMenuNavigation() {
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');

            // Проверяем, это внутренняя ссылка (начинается с #) или внешняя (файл)
            if (!href.startsWith('#')) {
                return; // Для внешних ссылок ничего не делаем
            }

            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Плавно прокручиваем к нужной секции
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Прокрутка с отступом
                    behavior: 'smooth',
                });
            }
        });
    });
}

// Исправление навигации при переключении между страницами
document.addEventListener('DOMContentLoaded', () => {
    initializeMenuNavigation();
});

// Обработчик для тестовой формы
const testForm = document.querySelector('.test-form');
testForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedAnswers = [];
    document.querySelectorAll('.question').forEach((question) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        if (selectedOption) {
            selectedAnswers.push({
                question: question.querySelector('label').innerText,
                answer: selectedOption.nextElementSibling.innerText,
            });
        }
    });

    if (selectedAnswers.length > 0) {
        // Формируем строку с ответами и выводим пользователю
        const resultText = selectedAnswers.map((ans) => `${ans.question}: ${ans.answer}`).join('\n');
        alert('Вы выбрали:\n' + resultText);
    } else {
        alert('Пожалуйста, выберите хотя бы один вариант.');
    }
});

// Обработчик для списка персонажей
const termsList = document.getElementById('persList');
const descriptionDiv = document.getElementById('description');
const searchInput = document.getElementById('searchInput');

// Отображение описания и изображения
function showDescriptionAndImage(target) {
    const description = target.getAttribute('data-description') || 'Описание отсутствует';
    const imageUrl = target.getAttribute('data-image') || null;

    descriptionDiv.innerHTML = ''; // Очищаем предыдущее описание

    // Текст описания
    const descriptionText = document.createElement('p');
    descriptionText.textContent = description;
    descriptionDiv.appendChild(descriptionText);

    // Изображение
    if (imageUrl) {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = 'Изображение персонажа';
        image.style.maxWidth = '100%';
        image.style.borderRadius = '8px';
        descriptionDiv.appendChild(image);
    }
}

// Обработчик клика по персонажу (используем делегирование событий)
termsList?.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'LI') {
        showDescriptionAndImage(target);
    }
});

// Фильтрация списка
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const persList = document.getElementById('persList');
    const items = Array.from(persList.querySelectorAll('li'));

    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase().trim();

        items.forEach(item => {
            if (item.textContent.toLowerCase().includes(searchValue)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });

        // Если ничего не найдено
        const isEmpty = items.every(item => item.style.display === 'none');
        if (isEmpty) {
            if (!persList.querySelector('.no-results')) {
                const noResults = document.createElement('li');
                noResults.textContent = 'Персонажи не найдены.';
                noResults.className = 'no-results';
                noResults.style.color = 'red';
                persList.appendChild(noResults);
            }
        } else {
            const noResults = persList.querySelector('.no-results');
            if (noResults) noResults.remove();
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem("userName") || "Не указано";
    const userGender = localStorage.getItem("userGender") || "Не указано";
    const userBirthdate = localStorage.getItem("userBirthdate") || "Не указано";
    const userScore = localStorage.getItem("userScore") || "Нет данных";

    // Обновление информации на странице
    document.getElementById("userName").textContent = userName;
    document.getElementById("userGender").textContent = userGender;
    document.getElementById("userBirthdate").textContent = userBirthdate;
    document.getElementById("userScore").textContent = userScore;
});

// Сохранение данных из формы на index.html
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const login = document.getElementById("login").value.trim();
        const birthdate = document.getElementById("birthdate").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;

        // Сохранение в локальное хранилище
        localStorage.setItem("userName", login);
        localStorage.setItem("userBirthdate", birthdate);
        localStorage.setItem("userGender", gender);
        localStorage.setItem("userScore", "Нет данных"); // Предварительное значение

        // Переход на сайт
        window.location.href = "account.html";
    });
}

// Добавление логики сохранения баллов в локальное хранилище при завершении теста
document.addEventListener('DOMContentLoaded', function () {
    const isTestPage = window.location.pathname.endsWith("test.html");
    if (!isTestPage) return;

    const quizForm = document.getElementById('bleach-quiz');
    const submitButton = document.getElementById('submit-quiz');
    const resultDiv = document.getElementById('result');

    const correctAnswers = {
        q1: '1', // Ичиго
        q2: '1', // Занпакто
        q3: '1', // Рыбья маска
        q6: '1', // Айзен
        q9: '1', // Свет
        q4: 'Бякуя', // Капитан 6-го отряда
        q5: 'Блетцщтель', // Техника квинси
        q7: 'Шухей', // Лейтенант с шарфиком
        q8: 'Отравление', // Сила Сойфон
        q10: 'Хохо', // Техника Иккаку
    };

    submitButton.addEventListener('click', function () {
        let score = 0;
        let totalQuestions = Object.keys(correctAnswers).length;

        for (let key in correctAnswers) {
            const question = quizForm.querySelector(`[name="${key}"]`);
            if (question) {
                if (question.type === 'radio') {
                    const selectedOption = quizForm.querySelector(`input[name="${key}"]:checked`);
                    if (selectedOption && selectedOption.value === correctAnswers[key]) {
                        score++;
                    }
                } else if (question.type === 'text') {
                    if (question.value.trim().toLowerCase() === correctAnswers[key].toLowerCase()) {
                        score++;
                    }
                }
            }
        }

        // Вычисление баллов
        const maxScore = 100;
        const pointsPerCorrectAnswer = maxScore / totalQuestions;
        const totalScore = Math.round(score * pointsPerCorrectAnswer);

        // Сохранение баллов в локальное хранилище
        localStorage.setItem("userScore", `${totalScore} из 100`);

        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `
            <p>Вы набрали ${score} из ${totalQuestions} правильных ответов.</p>
            <p>Ваши баллы: ${totalScore} из 100.</p>
            <button id="retry-quiz" style="margin-top: 20px; background-color: #6c0202; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Попробовать ещё раз</button>
        `;

        quizForm.style.display = 'none';

        document.getElementById('retry-quiz').addEventListener('click', function () {
            quizForm.reset();
            quizForm.style.display = 'block';
            resultDiv.style.display = 'none';
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Извлекаем баллы из localStorage
    const testScore = localStorage.getItem('testScore');
    const scoreElement = document.getElementById('test-score');

    if (testScore) {
        scoreElement.textContent = `${testScore} из 100`;
    } else {
        scoreElement.textContent = 'Не пройдено';
    }
});
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');

    let currentIndex = 0; // Текущий индекс слайда

    // Функция для обновления слайда
    function updateSlide() {
        const slideWidth = slides[0].clientWidth; // Ширина слайда
        sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Обработчик для кнопки "Назад"
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Переход на предыдущий слайд
        updateSlide();
    });

    // Обработчик для кнопки "Вперед"
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length; // Переход на следующий слайд
        updateSlide();
    });

    // Обновление при изменении размера окна
    window.addEventListener('resize', updateSlide);

    // Инициализация
    updateSlide();