const questions = [
    { id: 1, question: "Сколько вам лет?", placeholder: "Например: 15" },
    { id: 2, question: "Какой у вас рост (см)?", placeholder: "Например: 170" },
    { id: 3, question: "Какой у вас вес (кг)?", placeholder: "Например: 60" },
    { id: 4, question: "Сколько раз в неделю вы занимаетесь спортом?", placeholder: "Например: 3" },
    { id: 5, question: "Сколько часов вы спите в день?", placeholder: "Например: 8" },
    { id: 6, question: "Есть ли у вас аллергия на продукты?", placeholder: "Если да, укажите какие" },
    { id: 7, question: "Сколько стаканов воды вы пьете в день?", placeholder: "Например: 6" },
    { id: 8, question: "Как часто вы едите фастфуд?", placeholder: "Например: 2 раза в неделю" },
    { id: 9, question: "Есть ли у вас хронические заболевания?", placeholder: "Если да, укажите какие" },
    { id: 10, question: "Какой тип питания вы предпочитаете?", placeholder: "Например: обычный/вегетарианский" }
];

const breakfastOptions = [
    { meal: "Овсяная каша с фруктами и орехами", calories: 300 },
    { meal: "Творог с медом и ягодами", calories: 350 },
    { meal: "Омлет с овощами и цельнозерновым хлебом", calories: 400 },
    { meal: "Смузи-боул с гранолой", calories: 320 },
    { meal: "Цельнозерновые блины с бананом", calories: 380 },
    { meal: "Йогурт с мюсли и свежими фруктами", calories: 290 },
    { meal: "Сырники со сметаной и фруктами", calories: 400 },
    { meal: "Авокадо-тост с яйцом пашот", calories: 350 },
    { meal: "Протеиновый коктейль с овсянкой", calories: 310 },
    { meal: "Рисовая каша с миндалем и медом", calories: 330 }
];

const lunchOptions = [
    { meal: "Куриная грудка с киноа и овощами", calories: 450 },
    { meal: "Рыбный суп с булгуром", calories: 400 },
    { meal: "Индейка с бурым рисом и брокколи", calories: 420 },
    { meal: "Чечевичный суп с овощами", calories: 380 },
    { meal: "Паста с индейкой и соусом песто", calories: 500 },
    { meal: "Салат с тунцом и авокадо", calories: 440 },
    { meal: "Гречка с куриными тефтелями", calories: 460 },
    { meal: "Овощной суп с фрикадельками", calories: 390 },
    { meal: "Рис с морепродуктами", calories: 470 },
    { meal: "Фасолевый суп с индейкой", calories: 410 }
];

const dinnerOptions = [
    { meal: "Запеченная рыба с овощами", calories: 350 },
    { meal: "Индейка на гриле с салатом", calories: 380 },
    { meal: "Куриный рулет с овощами", calories: 400 },
    { meal: "Творожная запеканка с ягодами", calories: 330 },
    { meal: "Омлет с сыром и овощами", calories: 360 },
    { meal: "Рыбные котлеты с пюре из цветной капусты", calories: 370 },
    { meal: "Курица тушеная с овощами", calories: 390 },
    { meal: "Киноа с овощами и тофу", calories: 340 },
    { meal: "Индейка с печеными овощами", calories: 380 },
    { meal: "Лосось на пару с зеленью", calories: 410 }
];

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

let currentQuestion = 0;
const answers = [];
const questionTitle = document.getElementById('question-title');
const answerInput = document.getElementById('answer-input');
const nextButton = document.getElementById('next-button');
const resultsContainer = document.getElementById('results-container');
const mealPlanContainer = document.getElementById('meal-plan');

function displayQuestion() {
    const question = questions[currentQuestion];
    questionTitle.textContent = `Вопрос ${currentQuestion + 1}: ${question.question}`;
    answerInput.placeholder = question.placeholder;
    answerInput.value = answers[currentQuestion] || '';
    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progressPercentage}%`
}

function generateMealPlan() {
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffledBreakfasts = shuffleArray([...breakfastOptions]);
    const shuffledLunches = shuffleArray([...lunchOptions]);
    const shuffledDinners = shuffleArray([...dinnerOptions]);

    return days.map((day, index) => {
        const breakfast = shuffledBreakfasts[index];
        const lunch = shuffledLunches[index];
        const dinner = shuffledDinners[index];
        return {
            day,
            breakfast: `${breakfast.meal} (${breakfast.calories} ккал)`,
            lunch: `${lunch.meal} (${lunch.calories} ккал)`,
            dinner: `${dinner.meal} (${dinner.calories} ккал)`,
            totalCalories: breakfast.calories + lunch.calories + dinner.calories
        };
    });
}

nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        answers[currentQuestion] = answerInput.value; // Сохраняем ответ
        currentQuestion++;
        displayQuestion(); // Показать следующий вопрос
    } else {
        // Сохраняем последний ответ
        answers[currentQuestion] = answerInput.value;
        // Генерируем план питания
        const mealPlan = generateMealPlan();
        displayMealPlan(mealPlan);
    }
});

// Функция для отображения плана питания
function displayMealPlan(mealPlan) {
    resultsContainer.style.display = 'block';
    document.getElementById('survey-container').style.display = 'none'; // Скрыть опросник

    mealPlan.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'meal-day';
        dayDiv.innerHTML = `
            <h3>${day.day}</h3>
            <div>Завтрак: ${day.breakfast}</div>
            <div>Обед: ${day.lunch}</div>
            <div>Ужин: ${day.dinner}</div>
            <div>Общая калорийность: ${day.totalCalories} ккал</div>
        `;
        mealPlanContainer.appendChild(dayDiv);
    });
}

// Инициализация первого вопроса
displayQuestion();


