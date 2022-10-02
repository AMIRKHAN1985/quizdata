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
        question: `what is the output of following code?`,
        code:`list1=[10,10,10,10]
for x in list1:
    list1.remove(x)
print(list1)`,
        imgSrc : "q1.png",
        correctAnswer: "C) "+"[10,10]",
        answer: [
            "A) "+"[ ]",
            "B) "+"[10,10,10,10]",
            "C) "+"[10,10]",
            "D) "+"Error"
        ]
    },
    {
        numberQuestion: 2,
        question: `What will be the output of the following Python code?`,
        code:`veggies = ['carrot', 'broccoli', 'potato', 'asparagus']
veggies.insert(veggies.index('broccoli'), 'celery')
print(veggies)`,
        imgSrc : "q2.png",
        correctAnswer: "A) "+"[‘carrot’, ‘celery’, ‘broccoli’, ‘potato’, ‘asparagus’]",
        answer: [
            "A) "+"[‘carrot’, ‘celery’, ‘broccoli’, ‘potato’, ‘asparagus’]",
            "B) "+"[‘carrot’, ‘celery’, ‘potato’, ‘asparagus’]",
            "C) "+"[‘carrot’, ‘broccoli’, ‘celery’, ‘potato’, ‘asparagus’]",
            "D) "+"[‘celery’, ‘carrot’, ‘broccoli’, ‘potato’, ‘asparagus’]"
        ]
    },
    {
        numberQuestion: 3,
        question: `What will be the output of the following Python code?`,
        code:`m = [[x, x + 1, x + 2] for x in range(0, 3)]
print(m)`,
        imgSrc : "q3.png",
        correctAnswer: "B) "+"[[0, 1, 2], [1, 2, 3], [2, 3, 4]]",
        answer: [
            "A) "+"[[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
            "B) "+"[[0, 1, 2], [1, 2, 3], [2, 3, 4]]",
            "C) "+"[1, 2, 3, 4, 5, 6, 7, 8, 9]",
            "D) "+"[0, 1, 2, 1, 2, 3, 2, 3, 4]"
        ]
    },
    {
        numberQuestion: 4,
        question: `What will be the output of the following Python code snippet?`,
        code:`matrix = [[1, 2, 3, 4],
       [4, 5, 6, 7],
       [8, 9, 10, 11],
       [12, 13, 14, 15]]
 
for i in range(0, 4):
    print(matrix[i][1], end = " ")`,
        imgSrc : "q4.png",
        correctAnswer: "D) "+"2 5 9 13",
        answer: [
            "A) "+"1 2 3 4",
            "B) "+"4 5 6 7",
            "C) "+"1 3 8 12",
            "D) "+"2 5 9 13"
        ]
    },
    {
        numberQuestion: 5,
        question: `What will be the output of the following code snippet?`,
        code:`data = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
def fun(m):
    v = m[0][0]
    for row in m:
        for element in row:
            if v < element: v = element
    return v
print(fun(data[0]))`,
        imgSrc : "na.png",
        correctAnswer: "D) "+"4",
        answer: [
            "A) "+"1",
            "B) "+"2",
            "C) "+"3",
            "D) "+"4"
        ]
    },
    {
        numberQuestion: 6,
        question: `What will be the output of the following code snippet?`,
        code:`def f(i, values = []):
    values.append(i)
    print (values)
    return values
f(1)
f(2)
f(3)`,
        imgSrc : "na.png",
        correctAnswer: "C) "+"[1] [1, 2] [1, 2, 3]",
        answer: [
            "A) "+"[1] [2] [3]",
            "B) "+"[1, 2, 3]",
            "C) "+"[1] [1, 2] [1, 2, 3]",
            "D) "+"1 2 3"
        ]
    },
    {
        numberQuestion: 7,
        question: `What will be the output of the following code snippet?`,
        code:`arr = [1, 2, 3, 4, 5, 6]
for i in range(1, 6):
    arr[i - 1] = arr[i]
for i in range(0, 6): 
    print(arr[i], end = " ")`,
        imgSrc : "na.png",
        correctAnswer: "D) "+"2 3 4 5 6 6",
        answer: [
            "A) "+"1 2 3 4 5 6",
            "B) "+"2 3 4 5 6 1",
            "C) "+"1 1 2 3 4 5",
            "D) "+"2 3 4 5 6 6"
        ]
    },
    {
        numberQuestion: 8,
        question: `What will be the output of the following code snippet?`,
        code:`fruit_list1 = ['Apple', 'Berry', 'Cherry', 'Papaya']
fruit_list2 = fruit_list1
fruit_list3 = fruit_list1[:]
fruit_list2[0] = 'Guava'
fruit_list3[1] = 'Kiwi'
sum = 0
for ls in (fruit_list1, fruit_list2, fruit_list3):
    if ls[0] == 'Guava':
        sum += 1
    if ls[1] == 'Kiwi':
        sum += 20
print (sum)`,
        imgSrc : "q8.png",
        correctAnswer: "A) "+"22",
        answer: [
            "A) "+"22",
            "B) "+"21",
            "C) "+"0",
            "D) "+"43"
        ]
    },
    {
        numberQuestion: 9,
        question: `What is the output when following code is executed ?`,
        code:`names1 = ['Amir', 'Bear', 'Charlton', 'Daman']
names2 = names1
names3 = names1[:]
 
names2[0] = 'Alice'
names3[1] = 'Bob'
 
sum = 0
for ls in (names1, names2, names3):
    if ls[0] == 'Alice':
        sum += 1
    if ls[1] == 'Bob':
        sum += 10
 
print (sum)`,
        imgSrc : "na.png",
        correctAnswer: "B) "+"12",
        answer: [
            "A) "+"11",
            "B) "+"12",
            "C) "+"21",
            "D) "+"22"
        ]
    },
    {
        numberQuestion: 10,
        question: `What is the output when following code is executed ?`,
        code:`myList = [1, 5, 5, 5, 5, 1]
max = myList[0]
indexOfMax = 0
for i in range(1, len(myList)):
    if myList[i] > max:
        max = myList[i]
        indexOfMax = i
print(indexOfMax)`,
        imgSrc : "na.png",
        correctAnswer: "A) "+"1",
        answer: [
            "A) "+"1",
            "B) "+"2",
            "C) "+"3",
            "D) "+"4"
        ]
    }
]