/* English Quest - simple JavaScript (Web Technology project)
   1. Register form validation   2. Login form validation   3. Admin login validation
   4. Small quiz feedback        5. Show student name on dashboard
   Accounts are stored in localStorage (demo only, not real security). */

// ----- Helpers -----
var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(input, message) {
  // show or clear the red message under a field
  var box = input.parentElement.querySelector(".invalid-feedback");
  if (message) {
    input.classList.add("is-invalid");
    box.textContent = message;
  } else {
    input.classList.remove("is-invalid");
    box.textContent = "";
  }
  return message === ""; // true when the field is OK
}
function showAlert(text, type) {
  document.getElementById("formMessage").innerHTML =
    '<div class="alert alert-' + type + '">' + text + "</div>";
}
function getUsers() {
  return JSON.parse(localStorage.getItem("eqUsers") || "[]");
}

// ----- 1. Register form -----
var registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("fullName");
    var email = document.getElementById("registerEmail");
    var pass = document.getElementById("registerPassword");
    var confirm = document.getElementById("confirmPassword");
    var terms = document.getElementById("terms");

    var ok = true;
    ok =
      showError(
        name,
        name.value.trim().length < 2
          ? "Enter your full name (at least 2 letters)."
          : "",
      ) && ok;
    ok =
      showError(
        email,
        !emailPattern.test(email.value.trim())
          ? "Enter a valid email, e.g. you@example.com."
          : "",
      ) && ok;
    ok =
      showError(
        pass,
        pass.value.length < 6 ? "Password must be at least 6 characters." : "",
      ) && ok;
    ok =
      showError(
        confirm,
        confirm.value !== pass.value ? "Passwords do not match." : "",
      ) && ok;
    ok =
      showError(
        terms,
        !terms.checked ? "Please tick this box to continue." : "",
      ) && ok;
    if (!ok) return;

    var users = getUsers();
    var address = email.value.trim().toLowerCase();
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === address) {
        showError(email, "This email is already registered.");
        return;
      }
    }
    users.push({
      name: name.value.trim(),
      email: address,
      password: pass.value,
    });
    localStorage.setItem("eqUsers", JSON.stringify(users));
    showAlert("Account created! Taking you to the login page...", "success");
    setTimeout(function () {
      window.location.href = "login.html";
    }, 1200);
  });
}

// ----- 2. Login form -----
var loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = document.getElementById("loginEmail");
    var pass = document.getElementById("loginPassword");

    var ok = true;
    ok =
      showError(
        email,
        !emailPattern.test(email.value.trim())
          ? "Enter a valid email address."
          : "",
      ) && ok;
    ok = showError(pass, pass.value === "" ? "Enter your password." : "") && ok;
    if (!ok) return;

    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email.value.trim().toLowerCase()) {
        if (users[i].password === pass.value) {
          localStorage.setItem("eqCurrentName", users[i].name);
          window.location.href = "dashboard.html";
        } else {
          showAlert("Wrong password. Please try again.", "danger");
        }
        return;
      }
    }
    showAlert(
      "No account found with this email. Please register first.",
      "warning",
    );
  });
}

// ----- 3. Admin login form (fixed demo account) -----
var adminForm = document.getElementById("adminLoginForm");
if (adminForm) {
  adminForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = document.getElementById("adminEmail");
    var pass = document.getElementById("adminPassword");

    var ok = true;
    ok =
      showError(
        email,
        !emailPattern.test(email.value.trim())
          ? "Enter a valid email address."
          : "",
      ) && ok;
    ok = showError(pass, pass.value === "" ? "Enter your password." : "") && ok;
    if (!ok) return;

    if (
      email.value.trim() === "admin@example.com" &&
      pass.value === "admin123"
    ) {
      window.location.href = "admin-dashboard.html";
    } else {
      showAlert("Wrong admin email or password.", "danger");
    }
  });
}

// ----- 4. Practical 14 style quizzes for the learning sections -----
var quizPanel = document.querySelector(".quiz-panel");

if (quizPanel) {
  var quizType = quizPanel.dataset.quiz;
  var questions = [];

  if (quizType === "grammar") {
    questions = [
      {
        question: "Which sentence is correct?",
        options: [
          "She go to college every day.",
          "She goes to college every day.",
          "She going to college every day.",
          "She gone to college every day.",
        ],
        answer: "She goes to college every day.",
      },
      {
        question: "Choose the correct past tense: “Yesterday, I ___ a movie.”",
        options: ["watch", "watches", "watched", "watching"],
        answer: "watched",
      },
      {
        question: "Choose the correct article: “He is ___ honest person.”",
        options: ["a", "an", "the", "no article"],
        answer: "an",
      },
      {
        question: "Which word is the adjective in “It is a beautiful place”?",
        options: ["It", "is", "beautiful", "place"],
        answer: "beautiful",
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "They was late.",
          "They is late.",
          "They are late.",
          "They be late.",
        ],
        answer: "They are late.",
      },
    ];
  } else if (quizType === "vocabulary") {
    questions = [
      {
        question: "What does “clarity” mean?",
        options: [
          "Being easy to understand",
          "Being very expensive",
          "Being difficult to find",
          "Being late",
        ],
        answer: "Being easy to understand",
      },
      {
        question: "Which word is closest in meaning to “adapt”?",
        options: ["Ignore", "Adjust", "Forget", "Repeat"],
        answer: "Adjust",
      },
      {
        question: "What does “reliable” mean?",
        options: [
          "Can be trusted",
          "Always confused",
          "Very noisy",
          "Hard to see",
        ],
        answer: "Can be trusted",
      },
      {
        question: "Choose the best meaning of “efficient”.",
        options: [
          "Working well without waste",
          "Taking more time than needed",
          "Not willing to learn",
          "Having no plan",
        ],
        answer: "Working well without waste",
      },
      {
        question: "Which word means “to make something better”?",
        options: ["Improve", "Avoid", "Delay", "Remove"],
        answer: "Improve",
      },
    ];
  } else if (quizType === "sentence") {
    questions = [
      {
        question: "Choose the correctly arranged sentence.",
        options: [
          "I tomorrow will submit the project.",
          "I will submit the project tomorrow.",
          "Tomorrow submit I the project will.",
          "Will I the project tomorrow submit.",
        ],
        answer: "I will submit the project tomorrow.",
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "My friend speaks English well.",
          "My friend English speaks well.",
          "Speaks my friend well English.",
          "Well English my friend speak.",
        ],
        answer: "My friend speaks English well.",
      },
      {
        question: "Which sentence uses “because” correctly?",
        options: [
          "Because I was tired, so I slept.",
          "I slept because I was tired.",
          "I because was tired slept.",
          "I slept I was because tired.",
        ],
        answer: "I slept because I was tired.",
      },
      {
        question: "Choose the correct question.",
        options: [
          "Where you are going?",
          "Where are you going?",
          "Where going are you?",
          "Where you going are?",
        ],
        answer: "Where are you going?",
      },
      {
        question: "Choose the correct sentence order.",
        options: [
          "Every morning reads she a book.",
          "A book every morning she reads.",
          "She reads a book every morning.",
          "Reads she every morning a book.",
        ],
        answer: "She reads a book every morning.",
      },
    ];
  } else if (quizType === "communication") {
    questions = [
      {
        question: "You meet a new project teammate. What is a natural opening?",
        options: [
          "Give me your work.",
          "Nice to meet you. I’m looking forward to working together.",
          "You are my teammate, yes?",
          "Project is later. Bye.",
        ],
        answer: "Nice to meet you. I’m looking forward to working together.",
      },
      {
        question:
          "You did not understand your teacher’s instruction. What should you say?",
        options: [
          "Say it again, now.",
          "I do not care.",
          "Could you please explain that once more?",
          "Your instruction is bad.",
        ],
        answer: "Could you please explain that once more?",
      },
      {
        question:
          "A teammate helps you complete a task. What is the best response?",
        options: [
          "That was your duty.",
          "Thank you for your help. I appreciate it.",
          "Finally, you did something.",
          "I expected that.",
        ],
        answer: "Thank you for your help. I appreciate it.",
      },
      {
        question:
          "You want to share an idea during a meeting. What can you say?",
        options: [
          "Be quiet, I have an idea.",
          "I have an idea I would like to share.",
          "My idea is the only good one.",
          "Listen to me and stop.",
        ],
        answer: "I have an idea I would like to share.",
      },
      {
        question:
          "You need more time to finish a task. What is a polite response?",
        options: [
          "I will do it whenever.",
          "Not possible. Stop asking.",
          "Could I have a little more time to complete it?",
          "You should wait.",
        ],
        answer: "Could I have a little more time to complete it?",
      },
    ];
  }

  var currentQuestion = 0;
  var score = 0;
  var questionSpot = document.getElementById("question");
  var optionsSpot = document.getElementById("options");
  var progressText = document.getElementById("progressText");
  var progressBar = document.getElementById("progressBar");
  var progressArea = document.getElementById("quizProgressArea");
  var quizControls = document.getElementById("quizControls");
  var nextBtn = document.getElementById("nextBtn");
  var resultSpot = document.getElementById("result");

  function displayQuestion() {
    var q = questions[currentQuestion];
    questionSpot.textContent = q.question;
    optionsSpot.innerHTML = "";
    progressText.textContent =
      "Question " + (currentQuestion + 1) + " of " + questions.length;
    progressBar.style.width =
      ((currentQuestion + 1) / questions.length) * 100 + "%";

    for (var i = 0; i < q.options.length; i++) {
      var col = document.createElement("div");
      col.className = "col-md-6";

      var label = document.createElement("label");
      label.className = "quiz-option d-flex align-items-center gap-2 h-100";
      label.setAttribute("for", "answer" + i);

      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.id = "answer" + i;
      radio.value = q.options[i];
      radio.className = "form-check-input mt-0";

      var optionText = document.createElement("span");
      optionText.textContent = q.options[i];

      label.appendChild(radio);
      label.appendChild(optionText);
      col.appendChild(label);
      optionsSpot.appendChild(col);
    }

    nextBtn.innerHTML =
      currentQuestion === questions.length - 1
        ? "Submit Quiz"
        : 'Next <i class="bi bi-arrow-right"></i>';
  }

  function nextQuestion() {
    var selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
      alert("Please select an answer before continuing.");
      return;
    }

    if (selected.value === questions[currentQuestion].answer) {
      score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    var percentage = Math.round((score / questions.length) * 100);

    progressArea.hidden = true;
    questionSpot.hidden = true;
    optionsSpot.hidden = true;
    quizControls.hidden = true;
    resultSpot.hidden = false;
    resultSpot.innerHTML = "";

    var heading = document.createElement("h2");
    heading.className = "section-title mb-3";
    heading.textContent = "Quiz Completed!";

    var scoreText = document.createElement("p");
    scoreText.className = "fs-4 mb-2";
    scoreText.textContent = "Your score: " + score + " / " + questions.length;

    var percentageText = document.createElement("p");
    percentageText.className = "muted mb-4";
    percentageText.textContent =
      "You answered " + percentage + "% of the questions correctly.";

    var restartBtn = document.createElement("button");
    restartBtn.type = "button";
    restartBtn.className = "btn btn-primary";
    restartBtn.textContent = "Restart Quiz";
    restartBtn.addEventListener("click", restartQuiz);

    resultSpot.appendChild(heading);
    resultSpot.appendChild(scoreText);
    resultSpot.appendChild(percentageText);
    resultSpot.appendChild(restartBtn);
  }

  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    progressArea.hidden = false;
    questionSpot.hidden = false;
    optionsSpot.hidden = false;
    quizControls.hidden = false;
    resultSpot.hidden = true;
    displayQuestion();
  }

  nextBtn.addEventListener("click", nextQuestion);
  displayQuestion();
}

// ----- 5. Dashboard: show the logged-in student's name -----
var nameSpot = document.getElementById("studentName");
if (nameSpot && localStorage.getItem("eqCurrentName")) {
  nameSpot.textContent = localStorage.getItem("eqCurrentName").split(" ")[0];
}

// ----- 6. Admin: show the real number of registered students -----
var studentCount = document.getElementById("registeredStudentCount");
if (studentCount) {
  studentCount.textContent = getUsers().length;
}

// ----- 7. Admin: list the accounts saved by the registration form -----
var studentTable = document.getElementById("registeredStudentsTable");
if (studentTable) {
  var users = getUsers();
  studentTable.innerHTML = "";

  if (users.length === 0) {
    studentTable.innerHTML =
      '<tr><td colspan="2">No students have registered yet.</td></tr>';
  } else {
    for (var i = 0; i < users.length; i++) {
      var row = document.createElement("tr");
      var nameCell = document.createElement("td");
      var emailCell = document.createElement("td");

      nameCell.textContent = users[i].name;
      emailCell.textContent = users[i].email;

      row.appendChild(nameCell);
      row.appendChild(emailCell);
      studentTable.appendChild(row);
    }
  }
}
