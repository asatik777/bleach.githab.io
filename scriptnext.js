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
document
