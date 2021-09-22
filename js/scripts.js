'use strict';
// quote selectors
const quote = document.querySelector('.quote');
const quoteBtn = document.querySelector('.quote__btn');

// info selectors
const info = document.querySelector('.info');
const infoBtnBack = document.querySelector('.info__btn-back');
const infoBtnNext = document.querySelector('.info__btn-next');

// quiz exam selectors
const quizExam = document.querySelector('.quickquiz-exam');
const quizQuestion = document.querySelector('.quiz__ques');
const quizAnswer = document.querySelector('.quiz__answer');
const quizOption = document.querySelector('.quiz__option');
const newQuizOptions = document.querySelectorAll('.quiz__option');

// count selectors
const btnCountNext = document.querySelector('.count__btn--next');
const btnCountEnd = document.querySelector('.count__btn--end');

const boxCount = document.querySelector('.count__box');

const examTimeTik = document.querySelector('.examtime__tiktik');

const questionTime = document.querySelector('.timer__number');

const timerLine = document.querySelector('.timer__line');

const quizResult = document.querySelector('.quickquiz-result');

const resultBox = document.querySelector('.result__box');
const resultInfoAll = document.querySelector('.result__info--all');
const resultInfoRight = document.querySelector('.result__info--right');

const btnResultEnd = document.querySelector('.result__btn--end');
////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////
let questionNum = 0;
let initialQuestion = 1;
let userScore = 0;

let intTime = 15;
let timer = 10;

let countTime = 0;
let timeLead = 0;
let countLine;

////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////
quoteBtn.addEventListener('click', function () {
  quote.classList.add('quote-remove');
  info.classList.add('info-add');
});

infoBtnBack.addEventListener('click', function () {
  // quote.classList.add('quote-remove');
  info.classList.remove('info-add');
});

infoBtnNext.addEventListener('click', function () {
  info.classList.remove('info-add');
  quizExam.classList.add('quiz-exam-add');

  starterTimer2(intTime);
  randomQuestion(0);
  questionChange(1);
  examLeadTime(75);
  startTimeLine(0);
});
////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////
const randomQuestion = function (num) {
  const questionText =
    `<span class="quiz__text">` + questions[num].quesion + `<span>`;

  const answerOptions = `<p class="quiz__option"><span class="quiz__item"><strong class="quiz__number">${questions[num].optionNum[0]}</strong> ${questions[num].options[0]}</span></p>
<p class="quiz__option"><span class="quiz__item"><strong class="quiz__number">${questions[num].optionNum[1]}</strong> ${questions[num].options[1]}</span></p>
<p class="quiz__option"><span class="quiz__item"><strong class="quiz__number">${questions[num].optionNum[2]}</strong> ${questions[num].options[2]}</span></p>
<p class="quiz__option"><span class="quiz__item"><strong class="quiz__number">${questions[num].optionNum[3]}</strong> ${questions[num].options[3]}</span></p>`;

  quizQuestion.innerHTML = questionText;
  quizAnswer.innerHTML = answerOptions;

  const quizOptions = document.querySelectorAll('.quiz__option');

  for (let i = 0; i < quizOptions.length; i++) {
    quizOptions[i].setAttribute('onclick', 'selectedOption(this)');
  }
};
// randomQuestion(0);
////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////
const selected = function () {
  const quizOptionLen = quizAnswer.children.length;
  for (let i = 0; i < quizOptionLen; i++) {
    if (quizAnswer.children[i].textContent == questions[questionNum].answer) {
      quizAnswer.children[i].setAttribute(
        'class',
        'quiz__option quiz__option--correct'
      );
      quizAnswer.children[i].insertAdjacentHTML(
        'beforeend',
        '<span class="quiz__check"><i class="fas fa-check-circle"></i></span>'
      );
    }
  }
};

const disabled = function () {
  for (let i = 0; i < quizAnswer.children.length; i++) {
    quizAnswer.children[i].classList.add('quiz__option--disabled');
  }
  btnCountNext.classList.add('count__btn--show');
};
////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////

const selectedOption = function (ans) {
  clearInterval(countTime);
  clearInterval(countLine);
  // clearInterval(timeLead);
  const userAnswer = ans.textContent;
  const correctAnswer = questions[questionNum].answer;

  if (userAnswer === correctAnswer) {
    userScore++;
    console.log('Correct Answer!', `Your score is: ${userScore}`);

    ans.classList.add('quiz__option--correct');
    ans.insertAdjacentHTML(
      'beforeend',
      '<span class="quiz__check"><i class="fas fa-check-circle"></i></span>'
    );
  } else {
    ans.classList.add('quiz__option--incorrect');
    ans.insertAdjacentHTML(
      'beforeend',
      '<span class="quiz__times"><i class="fas fa-times-circle"></i></span>'
    );
    selected();
  }
  disabled();
};
////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////
// const notSelected = function () {};

////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////
const questionChange = function (curNum) {
  const countQuestion = `<span class="count__point">${questions.length}</span> টি প্রশ্নের মধ্যে, এটি <span class="count__point">${curNum}</span> নম্বর প্রশ্ন`;

  boxCount.innerHTML = countQuestion;
};

////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////
// timing function
// const starterTimer = function (isTime) {
//   const countdownTimer = function () {
//     const min = String(Math.trunc(isTime / 60)).padStart(2, '0');
//     const sec = String(isTime % 60).padStart(2, '0');
//     questionTime.textContent = `${min}:${sec}`;
//     isTime--;
//     // if (isTime < 10) {
//     //   examTimeTik.textContent = examTimeTik.textContent.padStart(2, '0');
//     // }
//     // if (isTime < 0) {
//     //   clearInterval(timer);
//     // }
//   };
//   timer = setInterval(countdownTimer, 1000);
// };

////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////

const examLeadTime = function (isTime) {
  const executionTime = function () {
    const min = String(Math.trunc(isTime / 60)).padStart(2, '0');
    const sec = String(isTime % 60).padStart(2, '0');
    examTimeTik.textContent = `${min}:${sec}`;
    console.log(min, sec);

    isTime--;

    if (isTime < 0) {
      clearInterval(timeLead);
      // restartExam();
      // examResult();
      quizExam.classList.remove('quiz-exam-add');
      quizResult.classList.add('quiz-result-show');

      if (userScore >= 3) {
        const resultText = `স্বাগতম! <strong>কুইজ</strong>প্রতিযোগীতা’২১ এ তুমি
            <span class="result__info result__info--all">${
              (questions.length * 100) / questions.length
            }(${questions.length})</span> এর মধ্যে
            <span class="result__info result__info--right">${
              (userScore * 100) / questions.length
            }(${userScore})</span> নম্বর অর্জন
            করেছ। সুতরাং তোমার গ্রেড হল “এ” ।`;

        resultBox.innerHTML = resultText;
      }
    }
  };
  timeLead = setInterval(executionTime, 1000);
};
// const examLeadTime = function (isTime) {
//   const executionTime = function () {
//     examTimeTik.textContent = isTime;
//     isTime--;

//     if (isTime < 0) {
//       clearInterval(timeLead);
//     }
//   };
//   timeLead = setInterval(executionTime, 1000);
// };

////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////
const starterTimer2 = function (time) {
  const countdownTimer2 = function () {
    questionTime.textContent = time;
    time--;

    if (time < 10) {
      questionTime.textContent = questionTime.textContent.padStart(2, '0');
    }
    if (time < 3 && time === 0) {
      selected();
      disabled();
    }
    if (time < 0) {
      clearInterval(countTime);
      clearInterval(countLine);

      questionNum++;
      initialQuestion++;
      randomQuestion(questionNum);
      questionChange(initialQuestion);
      starterTimer2(intTime);
      startTimeLine(0);
      btnCountNext.classList.remove('count__btn--show');
    }
  };
  countTime = setInterval(countdownTimer2, 1000);
};
////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////
const startTimeLine = function (time) {
  const progressLine = function () {
    time++;
    timerLine.style.width = `${time}px`;

    if (time > 500) clearInterval(countLine);
  };
  countLine = setInterval(progressLine, 29);
};
////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////
// btnCountNext.addEventListener('click', () => {
//   if (questionNum < questions.length - 1) {
//     questionNum++;
//     initialQuestion++;
//     randomQuestion(questionNum);
//     questionChange(initialQuestion);
//     clearInterval(countTime);
//     clearInterval(countLine);
//     starterTimer2(intTime);
//     startTimeLine(0);

//     btnCountNext.classList.remove('count__btn--show');

//   } else {
//     console.log('EXAM IS DONE');
//   }
// });

////////////////////////////////////////////////////////
/////////////////////////////////////////
// quoteBtn.addEventListener('click', function () {
//   quote.classList.add('quote-remove');
//   info.classList.add('info-add');
// });

// infoBtnBack.addEventListener('click', function () {
//   quote.classList.remove('quote-remove');
//   info.classList.remove('info-add');
// });

// infoBtnNext.addEventListener('click', function () {
//   info.classList.remove('info-add');
//   quizExam.classList.add('quiz-exam-add');
/////////////////////////////////////////////////////

btnCountNext.addEventListener('click', () => {
  if (questionNum < questions.length - 1) {
    questionNum++;
    initialQuestion++;
    randomQuestion(questionNum);
    questionChange(initialQuestion);
    clearInterval(countTime);
    clearInterval(countLine);
    starterTimer2(intTime);
    startTimeLine(0);

    btnCountNext.classList.remove('count__btn--show');

    if (questionNum === 4) {
      btnCountNext.textContent = `শেষ প্রশ্ন`;
    }
  } else {
    console.log('EXAM IS DONE');
    clearInterval(countTime);
    clearInterval(countLine);
    clearInterval(timeLead);
    examResult();
  }
});
////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////
const examResult = function () {
  quizExam.classList.remove('quiz-exam-add');
  quizResult.classList.add('quiz-result-show');

  if (userScore >= 3) {
    const resultText = `স্বাগতম! <strong>কুইজ</strong>প্রতিযোগীতা’২১ এ তুমি
            <span class="result__info result__info--all">${
              (questions.length * 100) / questions.length
            }(${questions.length})</span> এর মধ্যে
            <span class="result__info result__info--right">${
              (userScore * 100) / questions.length
            }(${userScore})</span> নম্বর অর্জন
            করেছ। সুতরাং তোমার গ্রেড হল “এ” ।`;

    resultBox.innerHTML = resultText;
  }
};

////////////////////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////////////////
const restartExam = function () {
  // quizResult.classList.remove('quiz-result-show');
  // quote.classList.remove('quote-remove');
  window.location.reload();
};
btnResultEnd.addEventListener('click', restartExam);
