const readlineSync = require("readline-sync");
const chalk = require("chalk");

let questionAnswer = [
  { question: "Who had the book of death note", answer: "light yagami" },
  {
    question: `Who is "he who remains" in marvel series Loki`,
    answer: "immortus",
  },
  {
    question: "S.H.I.E.L.D Full Form",
    answer: "strategic homeland intervention enforcement logistics division",
  },
  { question: `"bella ciao" Which series is this from`, answer: "money heist" },
];

let score,
  scoreBoard = [];

/**
 * @param {string} givenAnswer
 * @param {number} index
 */
const answerHandler = (givenAnswer, index) => {
  let correct = false;
  const realAnswer = questionAnswer[index].answer;

  if (realAnswer == givenAnswer.toLowerCase()) correct = true;
  else correct = false;

  if (correct) {
    questionAnswer[index].result = true;
    score++;
  } else {
    questionAnswer[index].result = false;
  }
};

const main = () => {
  console.clear();
  score = 0;

  const makeLine = () =>
    console.log("----------------------------------------------");
  makeLine();
  console.log(
    chalk.greenBright.bold("        🎉✨ Its time for a quizz! 🎉✨")
  );
  console.log("             By M Aswin Kishore          ");
  makeLine();

  const name = readlineSync.question(chalk.magenta("Please Enter Your Name: "));

  makeLine();
  questionAnswer.forEach((e, index) => {
    const givenAnswer = readlineSync
      .question(`${index + 1}. ${e.question} : `)
      .toLowerCase();
    answerHandler(givenAnswer, index);
  });

  makeLine();
  console.log(chalk.blue.bold("\nResults\n"));

  questionAnswer.forEach((e, index) => {
    const icon = questionAnswer[index].result ? "✔" : "❌";
    if (icon === "✔") console.log(chalk.green(`${icon}  ${e.question}`));
    else console.log(chalk.red(`${icon} ${e.question}`));
  });
  console.log(chalk.yellow(`\nScore: ${score}/${questionAnswer.length}`));

  makeLine();
  console.log(chalk.blue.bold("\nActual Answers"));
  questionAnswer = questionAnswer.map((e) => {
    return { question: e.question, answer: e.answer };
  });
  console.table(questionAnswer);

  scoreBoard.push({
    name,
    score,
  });

  makeLine();
  scoreBoard = scoreBoard.sort((a, b) => b.score - a.score);
  console.log(chalk.blue.bold("\nScore Board"));
  console.table(scoreBoard);

  if (readlineSync.keyInYN("\nDo you want to play again?")) main();
  else return;
};

main();
