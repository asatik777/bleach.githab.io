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
  
    // Объект с информацией о персонажах
    const charactersData = {
        "Рукия Кучики": "Рукия Кучики — младшая сестра Бьякуи Кучики и офицер отряда Готэй 13. Она известна своей решимостью и чувством долга. Рукия играет ключевую роль в становлении Ичиго как шинигами. Обладает сильным боевым духом и верностью своим друзьям.",
        "Орихиме Иноуэ": "Орихиме Иноуэ — добрая и искренняя девушка, обладающая уникальными силами, которые позволяют исцелять раны и управлять временем. Её искренняя забота о друзьях вдохновляет окружающих. Несмотря на внешнюю хрупкость, Орихиме проявляет внутреннюю силу в трудных ситуациях.",
        "Йоруичи Шихоин": "Йоруичи Шихоин — бывший капитан второго отряда Готэй 13 и мастер скрытных техник. Её быстрота и ловкость поражают даже опытных бойцов. Йоруичи обладает мудростью лидера и остроумием, что делает её ценной союзницей в любой битве.",
        "Рангику Мацумото": "Рангику Мацумото — лейтенант 10-го отряда Готэй 13, известная своей харизмой и яркой личностью. Она часто выглядит беспечной, но обладает острым умом и стратегическим мышлением. Её сила и верность делают её незаменимым членом команды.",
        "Исане Котецу": "Исане Котецу — лейтенант четвертого отряда Готэй 13. Она играет важную роль в медицинской поддержке шинигами, сохраняя спокойствие в самых тяжёлых ситуациях. Её преданность работе вдохновляет её коллег и друзей.",
        "Бамбиетта Бастербайн": "Бамбиетта Бастербайн — одна из квинси, известная своими разрушительными способностями и безжалостным характером. Она проявляет невероятную силу в бою, но её безрассудность иногда ставит её в опасные ситуации. Её история полна трагизма и конфликтов.",
        "Сой Фон": "Сой Фон — капитан второго отряда Готэй 13 и мастер скрытных операций. Её строгая дисциплина и преданность службе делают её одним из самых надёжных капитанов. Она владеет смертоносной техникой дзанпакто и глубоко уважает своего наставника.",
        "Кирио Хикифуне": "Кирио Хикифуне — член Королевской гвардии, известная своим вкладом в развитие технологий и кулинарии для шинигами. Она обладает добрым сердцем и невероятной силой, скрытой за её мягким характером. Её достижения оставили значительный след в истории Готэй 13.",
        "Ячиру Кусаджиши": "Ячиру Кусаджиши — лейтенант 11-го отряда, обладающая бесконечной энергией и весёлым нравом. Её связь с Кенпачи Зараки уникальна и наполнена глубоким уважением. Несмотря на детскую внешность, Ячиру демонстрирует выдающиеся боевые способности.",
        "Унахана Рецу": "Унахана Рецу — капитан 4-го отряда Готэй 13 и один из самых опытных шинигами. Её мастерство в лечении и бою делает её легендарной фигурой. Она скрывает своё прошлое, полное битв и сложных решений, под маской доброты и спокойствия.",
        "Маширо Куна": "Маширо Куна — весёлая и энергичная вайзард, которая всегда полна энтузиазма. Её боевой стиль уникален и полон неожиданных движений. Она находит радость в каждом моменте жизни, даже в разгар битвы.",
        "Мурамаса": "Мурамаса — материализованный дух дзанпакто, обладающий загадочной аурой и мощной энергией. Его действия часто продиктованы стремлением к свободе и самопознанию. История Мурамасы — это рассказ о внутренней борьбе и принятии своей судьбы.",
        "Сенбонзакура": "Сенбонзакура — дзанпакто Бьякуи Кучики, известный своей элегантной и смертоносной техникой. Его способность разделять лезвия на тысячи лепестков делает его одним из самых мощных оружий. Сенбонзакура воплощает честь и изящество.",
        "Ичиго Куросаки": "Ичиго Куросаки — главный герой истории, шинигами с уникальной способностью совмещать силы людей, шинигами и квинси. Его решимость защищать своих близких и стремление к справедливости делают его сильным лидером. Ичиго всегда готов принять вызов, даже если цена высока.",
        "Шукуро Цукишима": "Шукуро Цукишима — квинси с уникальной способностью изменять воспоминания других людей. Его манипуляции могут полностью перевернуть ход событий. Однако за его действиями скрывается глубокая личная боль и внутренний конфликт."
    };
    
    
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('searchInput');
        const persList = document.getElementById('persList');
        const characterInfoContainer = document.getElementById('characterInfo');
    
        if (!searchInput || !persList || !characterInfoContainer) {
            console.error("Ошибка: Один или несколько элементов отсутствуют в DOM.");
            return;
        }
    
        const items = Array.from(persList.querySelectorAll('li'));
        console.log("Найдено элементов списка:", items.length); // Диагностика количества элементов списка
    
        // Обработчик ввода для поиска
        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.toLowerCase().trim();
            console.log("Текущее значение ввода:", searchValue); // Диагностика текущего ввода
    
            let hasResults = false;
    
            items.forEach(item => {
                console.log("Проверяется элемент:", item.textContent); // Текст текущего элемента
                if (item.textContent.toLowerCase().includes(searchValue)) {
                    item.style.display = '';
                    hasResults = true;
                } else {
                    item.style.display = 'none';
                }
            });
    
            let noResults = persList.querySelector('.no-results');
            if (!hasResults) {
                if (!noResults) {
                    noResults = document.createElement('li');
                    noResults.textContent = 'Персонажи не найдены.';
                    noResults.className = 'no-results';
                    noResults.style.color = 'red';
                    noResults.style.listStyleType = 'none';
                    persList.appendChild(noResults);
                }
            } else if (noResults) {
                noResults.remove();
            }
        });
    
        // Обработчик клика для отображения информации о персонаже
        items.forEach(item => {
            item.addEventListener('click', () => {
                const characterName = item.textContent.trim();
                const characterInfo = charactersData[characterName];
    
                if (characterInfo) {
                    characterInfoContainer.textContent = characterInfo;
                } else {
                    characterInfoContainer.textContent = 'Информация о персонаже не найдена.';
                }
            });
        });
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

// Получаем элементы слайдера
const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.slider-button.prev');
const nextButton = document.querySelector('.slider-button.next');
const sliderNumber = document.querySelector('.slider-number'); // Элемент для отображения номера слайда

let currentIndex = 0; // Текущий индекс слайда

// Функция для обновления слайда
function updateSlide() {
    const slideWidth = slides[0].clientWidth; // Ширина слайда
    sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // Обновление номера слайда
    sliderNumber.innerHTML = `${currentIndex + 1} / ${slides.length}`;

    // Отключаем кнопку "Назад", если текущий слайд первый
    prevButton.disabled = currentIndex === 0;
    // Отключаем кнопку "Вперед", если текущий слайд последний
    nextButton.disabled = currentIndex === slides.length - 1;
}

// Обработчик для кнопки "Назад"
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--; // Переход на предыдущий слайд
        updateSlide();
    }
});

// Обработчик для кнопки "Вперед"
nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
        currentIndex++; // Переход на следующий слайд
        updateSlide();
    }
});

// Обновление при изменении размера окна
window.addEventListener('resize', updateSlide);

// Инициализация
updateSlide();
