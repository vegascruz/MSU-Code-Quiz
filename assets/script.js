// Selects the span tag that is for our timer
var timer = document.querySelector(".timer");
var secondsLeft = 91;

const startButton = document.getElementById("btnStart");
const questionContainerElement = document.getElementById('questionContainer');
const mainMenu = document.getElementById('mainMenu');
const finalPage = document.getElementById('finalPage');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answerButtons');


let shuffledQuestions, currentQuestionIndex;
let response = document.getElementById("response");


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
    button.classList.add('answerBtn')
  if(answer.correct){
    //add code here
    button.dataset.correct = answer.correct;
  }
  button.addEventListener('click', selectAnswer);
  answerButtonElement.appendChild(button);
  });
}
//clears everything out
function resetState(){
  while(answerButtonElement.firstChild){
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}
function selectAnswer(e){
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  nextSet();
}

//this function will display the next set of questions... IF THERE ARE ANY, otherwise show final page
function nextSet(){
  if(shuffledQuestions.length > currentQuestionIndex + 1){
      currentQuestionIndex ++;
      setNextQuestion();
      console.log(correct);
  }else{
    finalPage.classList.remove('hide');
    questionElement.classList.add('hide');
    answerButtonElement.classList.add('hide');
  }

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