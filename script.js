//SGN your JS code here.
let userScore = 0;

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Get the questions container element
const questionsElement = document.getElementById("questions");

// Function to render the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
  
  // Retrieve selected indexes from sessionStorage and set checked attribute
  const selectedIndexes = JSON.parse(sessionStorage.getItem("selectedIndexes"));
  if (selectedIndexes) {
    selectedIndexes.forEach(index => {
      const radioBtn = document.querySelector(`input[index="${index}"]`);
      if (radioBtn) {
        radioBtn.checked = true;
      }
    });
  }
}

// Add event listener to the submit button to calculate the score
document.getElementById("submit").addEventListener("click", function() {
  // Reset user's score before calculating
  userScore = 0;
  const selectedIndexes = [];
  // Loop through each question
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    // Get the selected choice for the current question
    const selectedChoice = document.querySelector(`input[name="question-${i}"]:checked`);
    // Check if selected choice exists and matches the answer
    if (selectedChoice && selectedChoice.value === question.answer) {
      userScore++; // Increment score for correct answer
      selectedIndexes.push(selectedChoice.getAttribute("index"));
    }
  }
  // Store selected indexes in sessionStorage
  sessionStorage.setItem("selectedIndexes", JSON.stringify(selectedIndexes));
  // Display user's score on the page
  const scoreOutput = document.getElementById("score");
  scoreOutput.textContent = `Your score is ${userScore} out of ${questions.length}.`;
  // Store user's score in local storage
  localStorage.setItem("userScore", userScore);
});

// Call renderQuestions function to display the quiz
renderQuestions();