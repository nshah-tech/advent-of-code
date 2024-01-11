import { createReadStream } from 'fs';
import * as readline from 'readline';

// const FilePath = 'utils/day2-example';
const FilePath = 'utils/day2';

const fileStream = createReadStream(FilePath);

const readLineStream = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

interface Game {
  id: number;
  rounds: Round[];
}
interface Round {
  red: number;
  blue: number;
  green: number;
}

let sum = 0;
const gameLimit: Round = {
  red: 12,
  green: 13,
  blue: 14,
};
let power = 0;
readLineStream.on('line', (line) => {
  const game: Game = convertStringToGameObj(line);
  if (checkPossibility(game)) sum += game.id;
  power += calculatePower(game);
});

function calculatePower(game: Game): number {
  const rounds = game.rounds;
  const maxBalls = getEmptyRound();
  for (let index = 0; index < rounds.length; index++) {
    if (maxBalls.red < rounds[index].red) maxBalls.red = rounds[index].red
    if (maxBalls.blue < rounds[index].blue) maxBalls.blue = rounds[index].blue
    if (maxBalls.green < rounds[index].green) maxBalls.green = rounds[index].green
  }
  return maxBalls.red * maxBalls.green * maxBalls.blue;
}

function checkPossibility(game: Game): Boolean {
  for (let index = 0; index < game.rounds.length; index++) {
    let round = game.rounds[index];
    if (round.red > gameLimit.red || round.green > gameLimit.green || round.blue > gameLimit.blue) return false;
  }
  return true;
}

function convertStringToGameObj(line: string): Game {
  const game = getEmptyGame();
  game.id = Number(line.split(':')[0].replace('Game ', ''));
  const roundSplit = line.split(':')[1].split(';');
  for (let index = 0; index < roundSplit.length; index++) {
    const gameSet = roundSplit[index].split(',');
    let round: Round = getEmptyRound();
    gameSet.forEach((item) => {
      let dataSplit = item.split(' ');
      switch (dataSplit[2]) {
        case 'red':
          round.red = Number(dataSplit[1]);
          break;
        case 'blue':
          round.blue = Number(dataSplit[1]);
          break;
        case 'green':
          round.green = Number(dataSplit[1]);
          break;
      }
    });
    game.rounds.push(round);
  }
  return game;
}

function getEmptyGame(): Game {
  return {
    id: 0,
    rounds: [],
  };
}

function getEmptyRound(): Round {
  return {
    red: 0,
    blue: 0,
    green: 0,
  };
}

readLineStream.on('close', () => {
  console.log('End File sum = ', sum);
  console.log('End File power = ', power);
});
