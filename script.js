let availableQ = [];

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
let shuffleQuestions, currentQuestionIndex;
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreBar = document.getElementById('score');
const currentScore = document.getElementById('current-score');


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
});


function Question(question, answers) {
    this.question = question;
    this.answers = answers;
    availableQ.push(this);
}

let q1 = new Question(`What's the tallest mountain in the world?`, [{
        text: 'Zugspitze',
        correct: false
    },
    {
        text: 'K2',
        correct: false
    },
    {
        text: 'Mount Everest',
        correct: true
    }
])
let q2 = new Question(` Where was the fortune cookie invented?`, [{
    text: 'Wuhan',
    correct: false
}, {
    text: 'San Francisco',
    correct: true
}, {
    text: 'Amsterdam',
    correct: false
}, {
    text: 'Nankin',
    correct: false
}])
let q3 = new Question(` In what country is Timbuktu?`, [{
    text: 'Mali',
    correct: true
}, {
    text: 'Togo',
    correct: false
}, {
    text: 'Kenya',
    correct: false
}])
let q4 = new Question(`What is the most common colour of toilet paper in France?`, [{
    text: 'red',
    correct: false
}, {
    text: 'blue',
    correct: false
}, {
    text: 'white',
    correct: false
}, {
    text: 'pink',
    correct: true
}])
let q5 = new Question(`Which country has the most meteorites per square meters?`, [{
    text: 'USA',
    correct: false
}, {
    text: 'Tanzania',
    correct: false
}, {
    text: 'Estonia',
    correct: true
}, {
    text: 'Kazachstan',
    correct: false
}])
let q6 = new Question(`If you dug a hole through the centre of the earth starting from Wellington in New Zealand, which European country would you end up in?`, [{
    text: 'Georgia',
    correct: false
}, {
    text: 'Italy',
    correct: false
}, {
    text: 'Spain',
    correct: true
}, {
    text: 'Poland',
    correct: false
}])


function startGame() {
    console.log('started');
    startButton.classList.add('hide');
    scoreBar.classList.remove('hide');

    shuffleQuestions = availableQ.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
            //console.log(answer)
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}