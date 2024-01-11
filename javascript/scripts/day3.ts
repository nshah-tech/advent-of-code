import { readFileSync } from 'fs';

const FilePath = 'utils/day3';
// const FilePath = 'utils/day3-example';

const contents = readFileSync(FilePath, "utf8").split("\n").map(x => x.split("")).filter(x => x.length > 0);

function isValidNuber(number: string): boolean {
  return !isNaN(parseInt(number))
}

function isDot(char: string): boolean {
  return char === "."
}

const possibleDirections: number[][] = [
  [1, -1], [1, 0], [1, 1],
  [0, -1], [0, 1],
  [-1, -1], [-1, 0], [-1, 1]
]

function getChar(i: number, j: number, y: number = 0, x: number = 0) {
  const chars = contents[i + y]
  if (chars === undefined) {
    return undefined;
  }
  return chars[j + x];
}

// function sumOfPartNumbers(): number {
  let sum = 0;
  for (let y = 0; y < contents.length; ++y) {
    const row = contents[y];
    let isNumber = false;
    let currentNumber = "";
    let check = true

    for (let x = 0; x < row.length; ++x) {
      isNumber = isValidNuber(getChar(y, x)!);

      if (!isNumber && !check) {
        console.log(currentNumber);
        sum += parseInt(currentNumber);
      }
      if (!isNumber) {
        currentNumber = "";
        check = true;
      }

      if (isNumber && check) {
        const is = possibleDirections.reduce((acc, [dy, dx]) => {
          const char = getChar(y, x, dy, dx);
          return acc || char !== undefined && !isDot(char) && !isValidNuber(char);
        }, false);

        if (is) {
          console.log('is', is)
          check = false;
        }
      }

      if (isNumber) currentNumber += getChar(y, x);
    }
    if (isNumber && !check) {
      sum += parseInt(currentNumber);
      console.log('End of line', currentNumber)
    }
  }
  console.log(sum);
// }

// console.log("Sum =", sumOfPartNumbers());
