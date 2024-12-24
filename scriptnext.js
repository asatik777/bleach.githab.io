// Функция для плавной прокрутки к разделам
document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Извлекаем ID целевого раздела
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 80, // Прокручиваем с отступом
            behavior: 'smooth' // Плавная прокрутка
        });
    });
});

// Функция для проверки теста (если есть форма)
const testForm = document.querySelector('.test-form');
if (testForm) {
    testForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const selectedAnswers = [];
        const questions = document.querySelectorAll('.question');
        questions.forEach(question => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            if (selectedOption) {
                selectedAnswers.push({
                    question: question.querySelector('label').innerText,
                    answer: selectedOption.nextElementSibling.innerText
                });
            }
        });
        alert('Вы выбрали:\n' + selectedAnswers.map(answer => `${answer.question}: ${answer.answer}`).join('\n'));
    });
}

// Простая функция для отправки формы
const termsList = document.getElementById('persList');
const descriptionDiv = document.getElementById('description');
const searchInput = document.getElementById('searchInput');

// Функция для отображения описания и изображения
function showDescriptionAndImage(target) {
    const description = target.getAttribute('data-description');
    const imageUrl = target.getAttribute('data-image');
    descriptionDiv.innerHTML = '';

    // Добавляем текст описания
    const descriptionText = document.createElement('p');
    descriptionText.textContent = description || "Описание отсутствует";
    descriptionDiv.appendChild(descriptionText);

    // Добавляем изображение, если оно есть
    if (imageUrl) {
        const image = document.createElement('img');
        image.src = imageUrl;
        descriptionDiv.appendChild(image);
    }
}

// Обработчик клика на элемент списка
termsList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'LI') {
        showDescriptionAndImage(target);
    }
});

// Функция фильтрации списка
function filterItems(searchValue) {
    const items = Array.from(termsList.querySelectorAll('li')); // Преобразуем элементы списка в массив
    const filteredItems = items.filter(item => 
        item.textContent.toLowerCase().includes(searchValue.toLowerCase()) // Фильтруем по введенному тексту
    );

    // Если строка поиска пуста, отображаем все элементы
    if (searchValue === '') {
        filteredItems.push(...items); // Добавляем все элементы, если строка поиска пустая
    }

    // Отображаем отфильтрованный список
    termsList.innerHTML = '';
    if (filteredItems.length > 0) {
        filteredItems.forEach(item => termsList.appendChild(item)); // Вставляем отфильтрованные элементы
    } else {
        descriptionDiv.innerHTML = "<p>Персонажи не найдены.</p>";
    }
}

// Обработчик ввода в поле поиска
searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.trim(); // Получаем значение поиска
    filterItems(searchValue); // Фильтруем элементы списка
});

// Инициализация фильтрации при загрузке страницы
filterItems(''); // Начальная загрузка всех элементов
