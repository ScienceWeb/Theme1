/* --------------- Query Selectors --------------- */

let quiz = document.querySelector("#quiz");
let intro = document.querySelector("#introduction");
let assesFT = document.querySelector("#assess-ft");
let progressBar = document.querySelector(".progress");
let startBtn = document.querySelector("#startBtn");
let timeSpan = document.querySelector("#timeSpan");
let questionH5 = document.querySelector("#question");
let answersDiv = document.querySelector("#answers");
let allDone = document.querySelector("#allDone");
let finalScore = document.querySelector("#finalScore");
let audioCorrect = document.querySelector("#audioCorrect");
let audioIncorrect = document.querySelector("#audioIncorrect");
let audioApplause = document.querySelector("#audioApplause");
let audioTollingBell = document.querySelector("#audioTollingBell");
let audioThunder = document.querySelector("#audioThunder");
let submit = document.querySelector("#submit");
let highScoresList = document.querySelector("#highScoresList");
let initials = document.querySelector("#initials");
let clearHighscoresBtn = document.querySelector("#clearHighscoresBtn");
let image_area = document.querySelector("#image_area");

/* ------- Global Variable Declarations ------- */

let totalSeconds = 250;
let timeRemining = totalSeconds;
let secondsElapsed = 0;
let discountSeconds = 0;
let currentQuestion = 0;
let progress = 0;
let correctAnswers = 0;
let correctScore = 0;
var localHighscoresArray = [];
let time = setInterval(timer, 1000);
let justRegistered = false;
clearInterval(time);

/* --------------- Quiz Array --------------- */

// Questions based on: Theme 1 - Variety and Classification
let quizArray = [
  {
    question:
      "1. Which of the following is not a living thing?",
    options: ["Robot", "Horse", "Fern", "Human being"],
    correct: 0,
    image: "",
  },
  {
    question: "2. Which of the following statements is not true?",
    options: [
      "Plants cannot move",
      "All living things need air, food and water",
      "Livings things reproduce",
      "Plant use the energy in sunlight to make food",
      
    ],
    correct: 0,
    image: "",
  },
  {
    question:
      "3. Which of the following objects will sink when placed in water?",
    options: [
      "Rock",
      "Cork",
      "Pencil",
      "Ping pong ball",
      
    ],
    correct: 0,
    image: "",
  },
  {
    question: "4. What property is used to describe an object that can be bent without breaking?",
    options: [
      "Flexible",
      "Floats in water",
      "Strong",
      "Hard",
      
    ],
    correct: 0,
    image: "",
  },
  {
    question:
      "5. Which of the following is not a sense organ? ",
    options: [
      "Hair",
      "Nose",
      "Tongue",
      "Ear",
    ],
    correct: 0,
    image: "",
  },
  {
    question:
      "6. How is classification useful to people?",
    options: [
      "All of the above",
      "It helps use to find things easily",
      "It helps us to know we are talking about the same thing",
      "It helps us to learn more about things",
      
    ],
    correct: 0,
    image: "",
  },
  {
    question: "7. Which property best describes an object that can be pressed together without breaking?",
    options: ["Strong", "Hard", "Flexible", "Soluble"],
    correct: 0,
    image: "",
  },
  {
    question:
      "8. Majid stirred some sand into a container of water. He noticed that the sand and water did not mix. What property of sand did Majid observe?",
    options: ["Sand is insoluble in water", "Sand is hard", "Sand floats in water", "Sand is strong"],
    correct: 0,
    image: "",
  },
  {
    question:
      "9. Elsa used a nail to scratch different objects. What property of materials was Elsa testing?",
    options: ["Hardness", "Flexibility", "Strength", "Solubility"],
    correct: 0,
    image: "",
  },
  {
    question: "10. A living thing is also called a /an _______________________.",
    options: ["Organism", "Habitat", "Non-living", "Material"],
    correct: 0,
    image: "",
  },
  {
    question:
      "11. Mimosa plants are examples of __________________________.",
    options: [
      "Herbs",
      "Shrubs",
      "Vegetables",
      "Trees",
      
    ],
    correct: 0,
    image: "",
  },
  {
    question: "12. Mosses, ________________ and ferns are examples of plants that do not produce flowers. ",
    options: ["Liverworts", "Lilies", "Roses", "Orchids"],
    correct: 0,
    image: "",
  },
  {
    question: "13. The ___________________of a material is how much it can be pulled apart or pressed together without breaking. ",
    options: [
      "Strength",
      "Solubility",
      "Flexibility",
      "Hardness",
      
    ],
    correct: 0,
    image: "",
  },
  {
    question: "14. What does it mean when a substance is said to be insoluble?",
    options: ["It does not dissolve in water", "It dissolves in water", "It floats on water", "It is edible"],
    correct: 0,
    image: "",
  },
  {
    question: "15. A metal spoon _____________________ when it is put in water",
    options: [
      "Sinks",
      "Shrinks",
      "Floats",
      "Melts",
      
    ],
    correct: 0,
    image: "metalspoon.jpg",
  },
  {
    question: "16. Trees are tall and have a hard thick stem called a _____________________. ",
    options: ["Trunk", "Branch", "Stylus", "Stalk"],
    correct: 0,
    image: "",
  },
  {
    question: "17. Which of the following objects will float on water?",
    options: ["A cork", "Marbles", "A nail clipper", "A key"],
    correct: 0,
    image: "Img2.jpg",
  },
  {
    question: "18. We use a ___________________________ to see small objects.",
    options: ["Microscope", "Schrodinger", "Ruler", "Telescope"],
    correct: 0,
    image: "microscope.jpg",
  },
  {
    question:
      "19. Iron, steel and aluminium are examples of _____________________.",
    options: [
      "Metal",
      "Plastic",
      "Ceramic",
      "Wood",
    ],
    correct: 0,
    image: "",
  },
  {
    question:
      "20. All living things can produce young. This process of producing young is called ____________________",
    options: [
      "Reproduction",
      "Respond to changes",
      "Movement",
      "Growing",
    ],
    correct: 0,
    image: "",
  },
  
];

/* ------------- Event Management ------------- */

startBtn.addEventListener("click", startQuiz);
answersDiv.addEventListener("click", assesSelection);
submit.addEventListener("click", addToHighscores);
clearHighscoresBtn.addEventListener("click", clearHighscores);
$("#staticBackdrop").on("shown.bs.modal", function (e) {
  loadHighScores();
});
$("#staticBackdrop").on("hidden.bs.modal", function (e) {
  if (justRegistered) {
    init();
  }
});

init();

/* ------------- Functions Declaration ------------- */

function init() {
  timeSpan.textContent = timeRemining;
  quiz.style.display = "none";
  allDone.style.display = "none";
  assesFT.style.display = "none";
  intro.style.display = "block";
  startBtn.style.display = "block";
  progressBar.style.display = "none";

  totalSeconds = 250;
  timeRemining = totalSeconds;
  secondsElapsed = 0;
  discountSeconds = 0;
  currentQuestion = 0;
  progress = 0;
  correctAnswers = 0;
  correctScore = 0;
  justRegistered = false;
  timeSpan.textContent = timeRemining;

  if (localStorage.getItem("highscore")) {
    localHighscoresArray = localStorage.getItem("highscore").split(",");
  }
  clearInterval(time);
  updateProgress();

  allDone.firstElementChild.setAttribute("class", "alert alert-info mt-0 mb-0");
  submit.setAttribute("class", "btn btn-info");
  progressBar.firstElementChild.setAttribute(
    "class",
    "progress-bar bg-info progress-bar-striped progress-bar-animated"
  );
}

function startQuiz() {
  intro.style.display = "none";
  startBtn.style.display = "none";
  quiz.style.display = "block";
  time = setInterval(timer, 1000);
  progressBar.style.display = "block";
  showQuestion();
}

function timer() {
  timeRemining = totalSeconds - secondsElapsed - 1 - discountSeconds;
  timeSpan.textContent = timeRemining;
  secondsElapsed++;
  if (timeRemining <= 0) {
    clearInterval(time);
    disableQuestions();
    gameOver("time_out");
  }
}

function showQuestion() {
  questionH5.textContent = quizArray[currentQuestion].question;
  var optionsBtnsArray = [];
  var indexArray = [];
  var image = document.createElement("img");
  image.setAttribute("src", quizArray[currentQuestion].image);
  image.setAttribute("class", "movie-image rounded");
  image_area.append(image);

  for (i = 0; i < quizArray[currentQuestion].options.length; i++) {
    var questionBtn = document.createElement("button");
    questionBtn.setAttribute("type", "button");
    questionBtn.setAttribute(
      "class",
      "list-group-item list-group-item-action list-group-item-info mt-1 answerButton"
    );
    questionBtn.setAttribute("data-index", i);
    if (i === 0) {
      questionBtn.setAttribute("correct", "yes");
    } else {
      questionBtn.setAttribute("correct", "no");
    }
    questionBtn.textContent = quizArray[currentQuestion].options[i];
    answersDiv.append(questionBtn);
    indexArray.push(i);
  }

  answersDiv.childNodes.forEach(function (child) {
    var rndIndex = Math.floor(Math.random() * indexArray.length);
    answersDiv.append(answersDiv.children[rndIndex]);
    indexArray.splice(rndIndex, 1);
  });
}

function disableQuestions() {
  let questionsAssed = document.querySelectorAll(".answerButton");
  questionsAssed.forEach((element) => {
    element.setAttribute(
      "class",
      "list-group-item list-group-item-action list-group-item-danger mt-1 answerButton disabled"
    );
    if (
      parseInt(element.getAttribute("data-index")) ===
      quizArray[currentQuestion].correct
    ) {
      element.setAttribute(
        "class",
        "list-group-item list-group-item-action list-group-item-success mt-1 answerButton disabled"
      );
    }
  });
}

function assesSelection(event) {
  if (event.target.matches("button")) {
    var index = parseInt(event.target.getAttribute("data-index"));
    var timeInterval = 1000;
    disableQuestions();
    if (event.target.getAttribute("correct") === "yes") {
      displayFTAlert(true);
      correctAnswers++;
    } else {
      discountSeconds += 3;
      clearInterval(time);
      time = setInterval(timer, 1000);
      displayFTAlert(false);
    }
    currentQuestion++;
    updateProgress();

    if (currentQuestion === quizArray.length) {
      timeInterval = 5000;
      gameOver("questions_done");
    } else {
      setTimeout(removeQuestionsButtons, 1000);
      setTimeout(showQuestion, 1001);
    }

    setTimeout(function () {
      assesFT.style.display = "none";
    }, timeInterval);
  }
}

function updateProgress() {
  progress = Math.floor((currentQuestion / quizArray.length) * 100);
  var styleStr = String("width: " + progress + "%; height: 100%;");
  progressBar.firstElementChild.setAttribute("style", styleStr);
  progressBar.firstElementChild.textContent = progress + " %";
  correctScore = Math.floor((correctAnswers / quizArray.length) * 100);
}

function displayFTAlert(correct) {
  if (correct) {
    audioCorrect.play();
    assesFT.setAttribute(
      "class",
      "alert alert-success mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML = "<strong>Correct</strong>";
    assesFT.style.display = "block";
  } else {
    audioIncorrect.play();
    assesFT.setAttribute(
      "class",
      "alert alert-danger mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML =
      "<strong>Incorrect. </strong> 3 secs. discounted. Keep trying!!";
    assesFT.style.display = "block";
    timeSpan.style.color = "red";
    setTimeout(function () {
      timeSpan.style.color = "black";
    }, 1000);
  }
}

function removeQuestionsButtons() {
  questionH5.textContent = "";
  var child = answersDiv.lastElementChild;
  while (child) {
    answersDiv.removeChild(child);
    child = answersDiv.lastElementChild;
  }
  while (image_area.hasChildNodes()) {
    image_area.removeChild(image_area.childNodes[0]);
  }
}

function gameOver(cause) {
  if (cause === "questions_done") {
    console.log("QUESTIONS DONE");
    setTimeout(() => {
      assesFT.setAttribute(
        "class",
        "alert alert-dark mt-0 mb-0 pt-0 pb-0 text-center"
      );
      assesFT.innerHTML = "<strong>Quiz finished</strong> Good luck!";
    }, 1500);
    clearInterval(time);
  } else if (cause === "time_out") {
    console.log("TIME OUT");
    disableQuestions();
    audioTollingBell.play();
    setTimeout(() => {
      audioTollingBell.pause();
    }, 4000);
    assesFT.setAttribute(
      "class",
      "alert alert-info mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML = "<strong>Time finished</strong> Good luck!";
  } else {
    return false;
  }
  assesFT.style.display = "block";
  if (correctScore >= 70) {
    setTimeout(() => {
      audioApplause.play();
    }, 5000);
  } else {
    setTimeout(() => {
      audioThunder.play();
      allDone.firstElementChild.setAttribute(
        "class",
        "alert alert-danger mt-0 mb-0"
      );
      progressBar.firstElementChild.setAttribute(
        "class",
        "progress-bar bg-danger progress-bar-striped progress-bar-animated"
      );
      submit.setAttribute("class", "btn btn-danger");
    }, 5000);
  }
  setTimeout(function () {
    finalScore.textContent = correctScore;
    quiz.style.display = "none";
    allDone.style.display = "block";
    assesFT.style.display = "none";
    removeQuestionsButtons();
  }, 5000);
}

function addToHighscores() {
  var highScoreElement = document.createElement("li");
  var highscoreStr = initials.value + " - " + correctScore;
  localHighscoresArray.push(highscoreStr);
  var highscoreArrayStr = localHighscoresArray.toString();
  highScoreElement.textContent = highscoreStr;
  highScoresList.append(highScoreElement);
  localStorage.setItem("highscore", localHighscoresArray);
  justRegistered = true;
  initials.value = "";
  // Modal
  $("#staticBackdrop").modal("show");
}

function loadHighScores() {
  var tempHighscoresArray = [];
  var tempHighscoresObject = {};
  var tempHighscoresObjectsArray = [];
  var tempLocalSCoreArray = [];
  while (highScoresList.hasChildNodes()) {
    highScoresList.removeChild(highScoresList.childNodes[0]);
  }
  var lastPos;
  var lastChar = "";
  var localScore = 0;
  var localStrScore = "";
  var tempHighscore = "";
  for (i = 0; i < localHighscoresArray.length; i++) {
    for (j = localHighscoresArray[i].length - 1; j >= 0; j--) {
      lastPos = localHighscoresArray[i].length - 1;
      lastChar = localHighscoresArray[i][lastPos - j];
      if (lastChar && lastChar >= 0 && lastChar <= 9) {
        localScore += lastChar;
      }
      if (j > 1) {
        if (j === 2 && lastChar === "1") {
        }
        localStrScore += lastChar;
      }

      localScore = parseInt(localScore);
    }

    tempHighscore = localScore + localStrScore;
    tempHighscoresArray.push(tempHighscore);
    tempHighscoresObject.score = localScore;
    tempHighscoresObject.scoreStr = localStrScore;

    tempHighscoresObjectsArray.push(tempHighscoresObject);
    tempLocalSCoreArray.push(localScore);
    localScore = 0;
    localStrScore = "";
    tempHighscoresObject = {};
  }
  tempLocalSCoreArray.sort(function (a, b) {
    return b - a;
  });
  var sortedScoresCompleteArray = [];
  var flagged = [];
  tempLocalSCoreArray.forEach(function (element) {
    tempHighscoresObjectsArray.forEach(function (object, index) {
      if (element === object.score && !flagged.includes(index)) {
        flagged.push(index);

        var tempScoreString = object.scoreStr + " " + object.score;
        sortedScoresCompleteArray.push(tempScoreString);
      }
    });
  });
  for (i = 0; i < sortedScoresCompleteArray.length; i++) {
    var highScoreElement = document.createElement("li");
    highScoreElement.textContent = sortedScoresCompleteArray[i];
    for (j = sortedScoresCompleteArray[i].length - 1; j >= 0; j--) {
      lastPos = sortedScoresCompleteArray[i].length - 1;
      lastChar = sortedScoresCompleteArray[i][lastPos - j];
      if (lastChar && lastChar >= 0 && lastChar <= 9) {
        localScore += lastChar;
      }
      if (j > 1) {
        localStrScore += lastChar;
      }

      localScore = parseInt(localScore);
    }

    tempHighscore = localScore + localStrScore;

    if (localScore > 80 && localScore <= 100) {
      highScoreElement.setAttribute(
        "class",
        "list-group-item list-group-item-success"
      );
    } else if (localScore > 70 && localScore <= 80) {
      highScoreElement.setAttribute(
        "class",
        "list-group-item list-group-item-info"
      );
    } else if (localScore > 60 && localScore <= 70) {
      highScoreElement.setAttribute(
        "class",
        "list-group-item list-group-item-primary"
      );
    } else if (localScore > 50 && localScore <= 60) {
      highScoreElement.setAttribute(
        "class",
        "list-group-item list-group-item-warning"
      );
    } else if (localScore <= 50) {
      highScoreElement.setAttribute(
        "class",
        "list-group-item list-group-item-danger"
      );
    }

    highScoresList.append(highScoreElement);
    tempHighscoresArray.push(tempHighscore);
    tempHighscoresObject.score = localScore;
    tempHighscoresObject.scoreStr = localStrScore;
    tempHighscoresObjectsArray.push(tempHighscoresObject);
    tempLocalSCoreArray.push(localScore);
    localScore = 0;
    localStrScore = "";
    tempHighscoresObject = {};
  }
}

function clearHighscores() {
  localHighscoresArray = [];
  localStorage.setItem("highscore", localHighscoresArray);
  loadHighScores();
}
