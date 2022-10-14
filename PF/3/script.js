// Selecting Elements
var startButton = document.querySelector(".startButton");
var displayBox = document.querySelector(".displayBox");
var quitButton = displayBox.querySelector(".quit");
var resultButton = document.querySelector(".result");
var continueButton = displayBox.querySelector(".continue");
var quizBox = document.querySelector(".quizBox");
var answerList = document.querySelector(".answerList");
var currentQuestionCounter = quizBox.querySelector(".questionNumberOn");
var timerCount = quizBox.querySelector(".timerSeconds");
var result = document.querySelector(".scoreResults");
var userScore = document.querySelector(".answersCorrect");
var userInitialsInput = document.getElementById("inputInitials");
var submitButton = document.querySelector(".submitButton");
var highscore = document.querySelector(".highscore");
var viewHighscore = document.querySelector(".viewHighscore");
var usersList = document.querySelector(".users");
var deleteScores = document.querySelector(".deleteScores");
var backButton = document.querySelector(".backButton");
var inputContent = document.querySelector(".inputContent");
var finishText = document.querySelector(".finishText");
const qImg = document.getElementById("qImg");
var questionCounter = 0;
var counter;
const useranswer = [];
var gameSetting = {
    score: 0,
    timeTotal: 10
}

// Start Quiz Button Click Functionality
// displays "Display Box"
// starts timer
startButton.onclick = function () {
    displayBox.classList.add("activeDisplayBox");
}

// Exit Quiz Button Click Functionality
// hides "Display Box"
quitButton.onclick = function () {
    displayBox.classList.remove("activeDisplayBox");
}

answerList.addEventListener('click', (event) => {
    if (event.target.matches('.answer')) {
        if (questionCounter < questions.length - 1) {
            questionCounter++;
            currentQuestionCounter.innerHTML = questionCounter + 1;
            displayQuestions(questionCounter);
        } else {
            showScoreResults();
        }
    }
})

resultButton .addEventListener('click', (event) => {

    displayresult()
  
    
    
        } 
)

// Continue Button Click Functionality
//displays "Quiz Box"
continueButton.addEventListener('click', (event) => {
    event.preventDefault();
    displayBox.classList.remove("activeDisplayBox");
    quizBox.classList.add("activeQuizBox");
    startTimer();
    displayQuestions(0);
    finishText.innerHTML = 'You finished the quiz!'
})

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (userInitialsInput.value && userInitialsInput.value !== '') {
        const users = JSON.parse(localStorage.getItem('users'))
        localStorage.setItem('users', JSON.stringify([{
            name: userInitialsInput.value,
            num: userScore.innerHTML
        }, ...(users || [])]));
        viewHighscore.classList.remove('hide');
        submitButton.classList.add('hide');
        userInitialsInput.remove();
        inputContent.innerHTML = 'Registered User Successfully!'
    }
})

viewHighscore.addEventListener('click', (event) => {
    event.preventDefault();
    result.classList.remove('activeResults');
    highscore.classList.add('activeHighScore');
    const users = JSON.parse(localStorage.getItem('users'))
    if (users) {
        const getAllUsers = users.sort((a, b) => b.num - a.num).map((element, index) => {
            return (
                `<li class="user">
                    <span>${index + 1}. ${element.name}</span>
                    <span>${element.num}</span>
                </li>`
            )
        })
        usersList.innerHTML = getAllUsers.join(' ')
    } else {
        usersList.innerHTML = `<li>No HighScore</li>`
    }
})



backButton.addEventListener('click', (event) => {
    event.preventDefault();
    result.classList.add("activeResults")
    highscore.classList.remove("activeHighScore")
})

// grabbing questions and answers from 'questions' array
function displayQuestions(index) {
    var questionText = document.querySelector(".question");
    var questionElement = '<span>' + questions[index].numberQuestion + ". " + questions[index].question + '</span>';
    var questioncode = `<div class="answer"><pre><code>${questions[index].code}</code></pre></div>`;
    var answerElement = `<div class="answer">${questions[index].answer[0]}<span></span></div>
    <div class="answer">${questions[index].answer[1]}<span></span></div>
    <div class="answer">${questions[index].answer[2]}<span></span></div>
    <div class="answer">${questions[index].answer[3]}<span></span></div>`;
   
    qImg.innerHTML = questioncode;
    questionText.innerHTML = questionElement;
    answerList.innerHTML = answerElement;

    var allAnswers = answerList.querySelectorAll(".answer");
    for (var i = 0; i < allAnswers.length; i++) {
        allAnswers[i].setAttribute('onclick', 'answerSelected(this)');
    }
}

function displayresult() {
    result.innerHTML =`<br>
    <div class = "result1"> <div style="color: blue" class="answer"><pre><code>${questions[0].numberQuestion + ". " + questions[0].question}</code></pre><span></span></div>
    <div class="answer"><pre><code>${questions[0].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[0]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[0].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[1].numberQuestion + ". " + questions[1].question}<span></span></div>
    <div class="answer"><pre><code>${questions[1].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[1]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[1].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[2].numberQuestion + ". " + questions[2].question}<span></span></div>
    <div class="answer"><pre><code>${questions[2].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[2]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[2].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[3].numberQuestion + ". " + questions[3].question}<span></span></div>
    <div class="answer"><pre><code>${questions[3].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer: ${useranswer[3]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer: ${questions[3].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[4].numberQuestion + ". " + questions[4].question}<span></span></div>
    <div class="answer"><pre><code>${questions[4].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[4]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[4].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[5].numberQuestion + ". " + questions[5].question}<span></span></div>
    <div class="answer"><pre><code>${questions[5].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[5]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[5].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[6].numberQuestion + ". " + questions[6].question}<span></span></div>
    <div class="answer"><pre><code>${questions[6].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[6]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[6].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[7].numberQuestion + ". " + questions[7].question}<span></span></div>
    <div class="answer"><pre><code>${questions[7].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[7]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[7].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[8].numberQuestion + ". " + questions[8].question}<span></span></div>
    <div class="answer"><pre><code>${questions[8].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[8]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[8].correctAnswer}<span></span></div>
    <br>
    <div style="color: blue" class="answer">${questions[9].numberQuestion + ". " + questions[9].question}<span></span></div>
    <div class="answer"><pre><code>${questions[9].code}</code></pre></div>
    <br>
    <div style="color: red" class="answer">Your Answer : ${useranswer[9]}<span></span></div>
    <div style="color: green" class="answer">Correct Answer : ${questions[9].correctAnswer}<span></span></div></div>
    `;
    
}

// comparing user selected answer to correct answer
function answerSelected(answer) {
    var userResponse = answer.textContent;
    useranswer.push(userResponse)
    var correctResponse = questions[questionCounter].correctAnswer;
    if (userResponse == correctResponse) {
        gameSetting.score++;
    } else {
        // gameSetting.timeTotal -= 5;
        //pass
        gameSetting.score=gameSetting.score-0.25;
    }
}
// hides display box, quizbox, and shows results
function showScoreResults() {
    displayBox.classList.remove("activeDisplayBox")
    quizBox.classList.remove("activeQuizBox")
    result.classList.add("activeResults")
    userScore.innerHTML = gameSetting.score;
}

// create functionality to timer
function startTimer(resetTimer) {
    counter = setInterval(timer, 10000*6)
    function timer() {
        if (resetTimer) {
            clearInterval(counter);
        }
        timerCount.textContent = gameSetting.timeTotal;
        gameSetting.timeTotal--;
        if (gameSetting.timeTotal < 9) {
            var singleNumber = timerCount.textContent;
            timerCount.textContent = "0" + singleNumber;
        }
        if (gameSetting.timeTotal < 0) {
            clearInterval(counter);
            timerCount.textContent = "00";
        }
    }
}


let defaultInterval = () => setInterval(() => {
    const activeResultsPage = document.querySelector('.activeResults')
    const activeHighScorePage = document.querySelector('.activeHighScore')
    if (activeResultsPage || activeHighScorePage) {
        clearInterval(defaultInterval);
    } else if (timerCount.innerHTML === "00") {
        result.classList.add('activeResults');
        quizBox.classList.remove('activeQuizBox');
        userScore.innerHTML = gameSetting.score;
        finishText.innerHTML = 'You ran out of time!'
        clearInterval(defaultInterval);
    }
}, 1000);
defaultInterval()
// Questions and Answers
var questions = [
    {
        numberQuestion: 1,
        question: `What will be the output of the following Python code?`,
		code:`>>> a={"a":1,"b":2,"c":3}
>>> b=dict(zip(a.values(),a.keys()))
>>> b`,
        imgSrc : 'q1.png',
        correctAnswer: "D) "+"{1: 'a', 2: 'b', 3: 'c'}",
        answer: [
            "A) "+"{'a': 1, 'b': 2, 'c': 3}",
            "B) "+"An exception is thrown",
            "C) "+"{'a': 'b': 'c': }",
            "D) "+"{1: 'a', 2: 'b', 3: 'c'}"
        ]
    },
    {
        numberQuestion: 2,
        question: `What will be the output of the following Python code snippet?`,
        imgSrc : "q2.png",
		code:`a={1:"A",2:"B",3:"C"}
print(a.setdefault(3))`,
        correctAnswer: "B) "+"C",
        answer: [
            "A) "+`{1: ‘A’, 2: ‘B’, 3: ‘C’}`,
            "B) "+"C",
            "C) "+"{1: 3, 2: 3, 3: 3}",
            "D) "+"No method called setdefault() exists for dictionary"
        ]
    },
    {
        numberQuestion: 3,
        question: `What will be the output of above Python code?`,
        code:`a = {} 
a[1] = 1
a['1'] = 2
a[1]= a[1]+1
count = 0
for i in a: 
    count += a[i] 
print(count) `,
        imgSrc : "q3.png",
        correctAnswer: "A) "+"4",
        answer: [
            "A) "+"4",
            "B) "+"2",
            "C) "+'1',
            "D) "+"Error"
        ]
    },
    {
        numberQuestion: 4,
        question: `What will be the output?`,
		code:`test = {1:'A', 2:'B', 3:'C'} 
del test[1] 
test[1] = 'D'
del test[2] 
print(len(test)) `,
        imgSrc : "q4.png",
        correctAnswer: "A) "+`2`,
        answer: [
            "A) "+`2`,
            "B) "+"1",
            "C) "+`0`,
            "D) "+"Error"
        ]
    },
    {
        numberQuestion: 5,
        question: `What will be the result of  Python code?`,
        code:`a ={} 
a['a']= 1
a['b']=[2, 3, 4] 
print(a)`,
        imgSrc : "na.png",
        correctAnswer: "B) "+`{‘b’: [2, 3, 4], ‘a’: 1}`,
        answer: [
            "A) "+`{‘b’: [2], ‘a’: 1}`,
            "B) "+`{‘b’: [2, 3, 4], ‘a’: 1}`,
            "C) "+`{‘b’: [2], ‘a’: [3]}`,
            "D) "+"Error"
        ]
    },
    {
        numberQuestion: 6,
        question: `What is the output of the following program?`,
		code:`D = dict() 
for x in enumerate(range(2)):              
    D[x[0]] = x[1] 
    D[x[1]+7] = x[0] 
print(D) `,
        imgSrc : "na.png",
        correctAnswer: "C) "+"{0: 0, 7: 0, 1: 1, 8: 1}",
        answer: [
            "A) "+"KeyError",
            "B) "+"{0: 1, 7: 0, 1: 1, 8: 0}",
            "C) "+"{0: 0, 7: 0, 1: 1, 8: 1}",
            "D) "+"{1: 1, 7: 2, 0: 1, 8: 1}"
        ]
    },
    {
        numberQuestion: 7,
        question: `What is the output of the following program?`,
        code:`D = {1 : {'A' : {1 : "A"}, 2 : "B"}, 3 :"C", 'B' : "D", "D": 'E'} 
print(D[D[D[1][2]]], end = " ") 
print(D[D[1]["A"][2]])`,
        imgSrc : "na.png",
        correctAnswer: "D) "+`E KeyError`,
        answer: [
            "A) "+`D C`,
            "B) "+`E B`,
            "C) "+`D B`,
            "D) "+`E KeyError`
        ]
    },
    {
        numberQuestion: 8,
        question: `Which of the following will give error?`,
        code:`Suppose dict1={"a":1,"b":2,"c":3}`,
        imgSrc : "q8.png",
        correctAnswer: "D) "+"None of these",
        answer: [
            "A) "+"print(len(dict1))",
            "B) "+`print(dict1.get("b"))`,
            "C) "+`dict1["a"]=5`,
            "D) "+"None of these"
        ]
    },
    {
        numberQuestion: 9,
        question: `What is the output of the following program?`,
        code:`D = dict() 
for i in range (3): 
    for j in range(2): 
        D[i] = j 
print(D)`,
        imgSrc : "na.png",
        correctAnswer: "B) "+"{0: 1, 1: 1, 2: 1}",
        answer: [
            "A) "+"{0: 0, 1: 0, 2: 0}",
            "B) "+"{0: 1, 1: 1, 2: 1}",
            "C) "+"{0: 0, 1: 0, 2: 0, 0: 1, 1: 1, 2: 1}",
            "D) "+"TypeError: Immutable object"
        ]
    },
    {
        numberQuestion: 10,
        question: `Which of the options below could possibly be the output of the following program?`,
        code:`D = {1 : [1, 2, 3], 2: (4, 6, 8)} 
D[1].append(4) 
print(D[1], end = " ") 
L = list(D[2]) 
L.append(10) 
D[2] = tuple(L) 
print(D[2]) 
`,
        imgSrc : "na.png",
        correctAnswer: "D) "+"[1, 2, 3, 4] (4, 6, 8, 10)",
        answer: [
            "A) "+`[1, 2, 3, 4] [4, 6, 8, 10]`,
            "B) "+"[1, 2, 3] (4, 6, 8)",
            "C) "+"[1, 2, 3, 4] TypeError: tuples are immutable",
            "D) "+"[1, 2, 3, 4] (4, 6, 8, 10)"
        ]
    }
]