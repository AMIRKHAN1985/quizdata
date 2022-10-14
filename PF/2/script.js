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
        question: `Which of the following is correct with respect to above Python code?
		`,
		code:`d={"a":3,"b":7}`,
        imgSrc : 'q1.png',
        correctAnswer: "D) "+"All of the above.",
        answer: [
            "A) "+"a dictionary d is created.",
            "B) "+"a and b are the keys of dictionary d",
            "C) "+"3 and 7 are the values of dictionary d",
            "D) "+"All of the above."
        ]
    },
    {
        numberQuestion: 2,
        question: `Which one of the following is correct?`,
        imgSrc : "q2.png",
		code:``,
        correctAnswer: "B) "+"In python, a dictionary can have two same values with different keys",
        answer: [
            "A) "+"In python, a dictionary can have two same keys with different values.",
            "B) "+"In python, a dictionary can have two same values with different keys",
            "C) "+"In python, a dictionary can have two same keys or same values but cannot have two same key-value pair",
            "D) "+"In python, a dictionary can neither have two same keys nor two same values."
        ]
    },
    {
        numberQuestion: 3,
        question: `What will be the output of above Python code?`,
        code:`d1={"abc":5,"def":6,"ghi":7}

print(d1[0])`,
        imgSrc : "q3.png",
        correctAnswer: "D) "+"Error",
        answer: [
            "A) "+"abc",
            "B) "+"5",
            "C) "+'{"abc":5}',
            "D) "+"Error"
        ]
    },
    {
        numberQuestion: 4,
        question: `What will the above Python code do?`,
        code:`dict={"Phy":94,"Che":70,"Bio":82,"Eng":95}

   dict.update({"Che":72,"Bio":80})`,
        imgSrc : "q4.png",
        correctAnswer: "C) "+`It will simply update the dictionary as dict={"Phy":94,"Che":72,"Bio":80,"Eng":95}`,
        answer: [
            "A) "+`It will create new dictionary as dict={"Che":72,"Bio":80} and old dict will be deleted.`,
            "B) "+"It will throw an error as dictionary cannot be updated.",
            "C) "+`It will simply update the dictionary as dict={"Phy":94,"Che":72,"Bio":80,"Eng":95}`,
            "D) "+"It will not throw any error but it will not do any changes in dict"
        ]
    },
    {
        numberQuestion: 5,
        question: `What will be the result of above Python code?`,
        code:`dict={"Joey":1,"Rachel":2}

   dict.update({"Phoebe":2})

   print(dict)`,
        imgSrc : "na.png",
        correctAnswer: "A) "+`{"Joey":1,"Rachel":2,"Phoebe":2}`,
        answer: [
            "A) "+`{"Joey":1,"Rachel":2,"Phoebe":2}`,
            "B) "+`{"Joey":1,"Rachel":2}`,
            "C) "+`{"Joey":1,"Phoebe":2}`,
            "D) "+"Error"
        ]
    },
    {
        numberQuestion: 6,
        question: `Which of the following is False regarding dictionary in Python?`,
		code:``,
        imgSrc : "na.png",
        correctAnswer: "C) "+"The value of a dictionary can be accessed with the help of indices.",
        answer: [
            "A) "+"Values of a dictionary can be string,integers or combination of both.",
            "B) "+"Keys of a dictionary can be string,integers or combination of both",
            "C) "+"The value of a dictionary can be accessed with the help of indices.",
            "D) "+"None of the above"
        ]
    },
    {
        numberQuestion: 7,
        question: `Which of the following will delete key_value pair for key="tiger" in dictionary?`,
        code:`dic={"lion":"wild","tiger":"wild","cat":"domestic","dog":"domestic"}`,
        imgSrc : "na.png",
        correctAnswer: "A) "+`del dic["tiger"]`,
        answer: [
            "A) "+`del dic["tiger"]`,
            "B) "+`dic["tiger"].delete()`,
            "C) "+`delete(dic.["tiger"])`,
            "D) "+`del(dic.["tiger"])`
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
        question: `Which of the following Python codes will give same output if
(i) dict.pop("book")
(ii) del dict["book"]
(iii) dict.update({"diary":1,"novel":5})`,
        code:`dict={"diary":1,"book":3,"novel":5}`,
        imgSrc : "na.png",
        correctAnswer: "B) "+"i, ii",
        answer: [
            "A) "+"i, ii, iii",
            "B) "+"i, ii",
            "C) "+"i, iii",
            "D) "+"ii, iii"
        ]
    },
    {
        numberQuestion: 10,
        question: `What will be the output of the following Python code?`,
        code:`>>> a={i: i*i for i in range(6)}
>>> a`,
        imgSrc : "na.png",
        correctAnswer: "D) "+"{0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}",
        answer: [
            "A) "+`Dictionary comprehension doesn’t exist`,
            "B) "+"{0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6:36}",
            "C) "+"{0: 0, 1: 1, 4: 4, 9: 9, 16: 16, 25: 25}",
            "D) "+"{0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}"
        ]
    }
]