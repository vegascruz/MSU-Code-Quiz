// Selects the span tag that is for our timer
var timer = document.querySelector(".timer");
var secondsLeft = 91;
let correctAnswers = 0;

const startButton = document.getElementById("btnStart");
const questionContainerElement = document.getElementById('questionContainer');
const mainMenu = document.getElementById('mainMenu');
const finalPage = document.getElementById('finalPage');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answerButtons');
const submitButton = document.getElementById('submitBtn');


let shuffledQuestions, currentQuestionIndex;
let response = document.getElementById('response');
let initialsTxt;


//             FUNCTIONS             //
//this function will display the questions and answers based onClick
function startQuiz(){
  
  //hides start menu
  mainMenu.classList.add('hide');
  startButton.classList.add('hide');
  //Shuffles questions
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  //shows first questions
  questionContainerElement.classList.remove('hide');
  answerButtonElement.classList.remove('hide');
  setNextQuestion();
  setTime();
}

//this will set the question based on an array of shuffled questions
function setNextQuestion(){
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

//this will display the questions/answers on each slide
function showQuestion(question){
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('answerBtn');
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectedAnswer)
    answerButtonElement.appendChild(button);
  });
}
//clears everything out
function resetState(){
  while(answerButtonElement.firstChild){
    answerButtonElement.removeAttribute('data-correct')
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}
 
//this function will display the next set of questions... IF THERE ARE ANY, otherwise show final page
function nextSet(answer){
  response.classList.remove('hide');
  if(answer == 'true'){
    //10 points for each answer correct
    correctAnswers += 10;
    document.getElementById('lineBreak').classList.remove('hide');
    response.innerHTML = "Correct!";
  }else{
    document.getElementById('lineBreak').classList.remove('hide');
    response.innerHTML = "Wrong!";
  }

  if(shuffledQuestions.length > currentQuestionIndex + 1){
      currentQuestionIndex ++;
      setNextQuestion();
  }else{
    loadFinalPage();
  }
}

function selectedAnswer(e){
  const selectedButton = e.target;
  const answer = selectedButton.dataset.correct;
  nextSet(answer);
}

function loadFinalPage(){
  //console.log(shuffledQuestions.length)

  document.getElementById('lineBreak').classList.add('hide');
  finalPage.classList.remove('hide');
  document.getElementById('finalScore').innerText = correctAnswers + ".";
  questionElement.classList.add('hide');
  answerButtonElement.classList.add('hide');

}
function submit(){
  showHighScores();
  initialsTxt = document.getElementById('initialsTxt').value;
  localStorage.setItem('score', correctAnswers);
  localStorage.setItem('initials', initialsTxt);
}

function showHighScores(){
  document.getElementById('response').classList.add('hide');
  document.getElementById('highScoresPage').classList.remove('hide');
  finalPage.classList.add('hide');
}

//function for the timer
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
    }

  }, 1000);
}
//setTime();  WE WILL USE THIS ONCE THE USER CLICKS 'START QUIZ'

//this is my array of questions and answers: only 3 based on the mockup
const questions = [
  {
    question: "Arrays in JavaScript can be used to store ________. ",
    answers:[
      {text: '1. numbers and strings', correct: false},
      {text: '2. other arrays', correct: false },
      {text: '3. booleans', correct: false},
      {text: '4. all of the above', correct: true}
    ]
  },
  {
    question: "String values must be enclosed within ________ when beind assigned to variables.",
    answers:[
      {text: '1. commas', correct: false},
      {text: '2. curly brackets', correct: false},
      {text: '3. quotes', correct: true},
      {text: '4. parenthisis', correct: false}
    ]
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers:[
      {text: '1. JavaScript', correct: false},
      {text: '2. terminal/bash', correct: false},
      {text: '3. for loops', correct: false},
      {text: '4. console.log', correct: true}
    ]
  }
]