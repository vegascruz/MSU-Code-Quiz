//these variables below are all my data in which I grab from the html document
//to manipulate. 
var timer = document.querySelector(".timer");
let correctAnswers = 0;
let secondsLeft = 0

const startButton = document.getElementById("btnStart");
const questionContainerElement = document.getElementById('questionContainer');
const mainMenu = document.getElementById('mainMenu');
const finalPage = document.getElementById('finalPage');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answerButtons');
const submitButton = document.getElementById('submitBtn');
const highScoresPage = document.getElementById('highScoresPage');
const highScoresList = document.getElementById('highScoresList');
const highScoresLink = document.getElementById('highScoresLink');

let shuffledQuestions, currentQuestionIndex;
let response = document.getElementById('response');
let initialsTxt;

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];


              //             FUNCTIONS             //

//this function will display the questions and answers based onClick
function startQuiz(){
  secondsLeft = 61;
  correctAnswers = 0;
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
  }else{//however many seconds off the clock
    secondsLeft -= 30;
    document.getElementById('lineBreak').classList.remove('hide');
    response.innerHTML = "Wrong!";
  }
//while there are still array questions, setNextQuestion() will run... else. The final page will load
  if(shuffledQuestions.length > currentQuestionIndex + 1){
      currentQuestionIndex ++;
      setNextQuestion();
  }else{
    loadFinalPage();
  }
}

//where our answer is being saved
function selectedAnswer(e){
  const selectedButton = e.target;
  const answer = selectedButton.dataset.correct;
  nextSet(answer);
}

//this will load the final submit page
function loadFinalPage(){
  document.getElementById('initialsTxt').value = '';
  secondsLeft = 0;
  timer.textContent = "";
  document.getElementById('lineBreak').classList.add('hide');
  finalPage.classList.remove('hide');
  document.getElementById('finalScore').innerText = correctAnswers + ".";
  questionContainerElement.classList.add('hide');
  answerButtonElement.classList.add('hide');

}

//this function won't PHYSICALLY allow special chars, spaces and numbers in our initialsTxt
function onlyLetters(key) {
  var keycode = (key.which) ? key.which : key.keyCode;

  if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123))  
  {     
         return true;    
  }
  else
  {
      return false;
  }
       
}

//this will submit your score after the click event. Value is only 3 chars(set on the index page)
//if initials is blank, submit won't run. Everything is being saved/run in local storage.
function submit(){
  initialsTxt = document.getElementById('initialsTxt').value.toString();
  if(initialsTxt == ""){
    response.innerHTML = "Initials can't be blank"
  }
  else{
      initialsTxt = initialsTxt.toUpperCase();
      localStorage.setItem("recentInitials", initialsTxt);

      localStorage.setItem("mostRecentScore", correctAnswers);
      let mostRecentScore = localStorage.getItem("mostRecentScore");

      const score = {
        score: mostRecentScore,
        name: initialsTxt
      };

      highScores.push(score);
      highScores = highScores.sort(function (a, b) {  return b.score - a.score;  });

      highScores.splice(5);
      console.log(highScores);

      localStorage.setItem("highScores", JSON.stringify(highScores));

      showHighScores();
  }
}

//this will show the high scores page. In so doing, you need to append all the scores from the 
//highScores array into the select drop down box
function showHighScores(){
  //this hides the high scores link if the user is already on the page
  highScoresLink.classList.add('hide');
  highScoresPage.classList.remove('hide');

  //if any of these pages are active, these if statements will remove them so only the high scores page shoes
  if(!document.getElementById('lineBreak').classList.contains('hide')){
    document.getElementById('lineBreak').classList.add('hide');
  }
  if(!response.classList.contains('hide')){
    response.classList.add('hide');
  }
  if(!finalPage.classList.contains('hide')){
    finalPage.classList.add('hide');
  }
  if(!questionContainerElement.classList.contains('hide')){
    questionContainerElement.classList.add('hide');
  }
  if(!answerButtonElement.classList.contains('hide')){
    answerButtonElement.classList.add('hide');
  }
  if(!mainMenu.classList.contains('hide')){
    mainMenu.classList.add('hide');
  }
  if(!startButton.classList.contains('hide')){
    startButton.classList.add('hide');
  }

  initialsTxt.innerHTML = '';
  highScoresList.innerHTML = "";

  for(var i = 0; i < highScores.length; i++) {
    var highScore = highScores[i];
    var el = document.createElement('option');
    el.textContent = (i + 1) + ". " + highScore.name + " - " + highScore.score;
    el.value = highScore.score;
    highScoresList.appendChild(el);
  }
  response.classList.add('hide');
  finalPage.classList.add('hide');
}

//this will send you back to the start page
function goBack(){
  mainMenu.classList.remove('hide');
  highScoresLink.classList.remove('hide');
  highScoresPage.classList.add('hide');
  startButton.classList.remove('hide');  
}

//this will run when the clear scores button is clicked
function clearHighScores(){
  localStorage.clear();
  highScores = [];

  highScoresList.innerHTML = "";
}

//function for the timer
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      timer.innerText = secondsLeft;
      secondsLeft--;

      //if the finalPage element contains the class called hide ANNNNNND the seconds left are less than 0
      //we will load the final page and set the response to 'ran out of time'
      //else if the page is already loaded
      if(secondsLeft <= 0 && finalPage.classList.contains('hide')){
        clearInterval(timerInterval);
        loadFinalPage();
        response.innerHTML = "Ran out of time!";
      }

      if(!finalPage.classList.contains('hide')){
        timer.innerText = "";
        clearInterval(timerInterval);
      }

      if(!highScoresPage.classList.contains('hide')){
        timer.innerText = "";
        clearInterval(timerInterval);
      }

    }, 1000);

}

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