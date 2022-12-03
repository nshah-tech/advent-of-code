const fs = require("fs/promises");
const winScore = 6;
const drawScore = 3;
const lossScore = 0;
const rockScore = 1;
const paperScore = 2;
const scissorScore = 3;

const start = async () => {
  const fileData = (await fs.readFile(__dirname + "/input.txt")).toString().split("\n");
  let totalScore = 0;
  fileData.forEach((round) => {
    totalScore += calculateScoreGuide1(round);
  });
  console.log("totalScore Guide 1", totalScore);
  let totalScoreGuide2 = 0;
  fileData.forEach((round) => {
    totalScoreGuide2 += calculateScoreGuide2(round);
  });
  console.log("totalScore Guide 2", totalScoreGuide2);
};
const calculateScoreGuide1 = (round) => {
  let roundArray = round.split(" ");
  switch (roundArray[0]) {
    case "A": //Rock
      switch (roundArray[1]) {
        case "X":
          return drawScore + rockScore;
        case "Y":
          return winScore + paperScore;
        case "Z":
          return lossScore + scissorScore;
      }
      break;
    case "B": //Paper
      switch (roundArray[1]) {
        case "X":
          return lossScore + rockScore;
        case "Y":
          return drawScore + paperScore;
        case "Z":
          return winScore + scissorScore;
      }
      break;
    case "C": //Scissors
      switch (roundArray[1]) {
        case "X":
          return winScore + rockScore;
        case "Y":
          return lossScore + paperScore;
        case "Z":
          return drawScore + scissorScore;
      }
      break;
  }
};
const calculateScoreGuide2 = (round) => {
  let roundArray = round.split(" ");
  switch (roundArray[0]) {
    case "A": //Rock
      switch (roundArray[1]) {
        case "X": //lose
          return lossScore + scissorScore;
        case "Y": // draw
          return drawScore + rockScore;
        case "Z": // win
          return winScore + paperScore;
      }
      break;
    case "B": //Paper
      switch (roundArray[1]) {
        case "X": //lose
          return lossScore + rockScore;
        case "Y": // draw
          return drawScore + paperScore;
        case "Z": // win
          return winScore + scissorScore;
      }
      break;
    case "C": //Scissors
      switch (roundArray[1]) {
        case "X": //lose
          return lossScore + paperScore;
        case "Y": // draw
          return drawScore + scissorScore;
        case "Z": // win
          return winScore + rockScore;
      }
      break;
  }
};
start();
