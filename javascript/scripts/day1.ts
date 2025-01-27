/*
Part 1
Pair up the smallest number in the left list with the smallest number in the right list, 
then the second-smallest left number with the second-smallest right number, and so on.
Within each pair, figure out how far apart the two numbers are add all the pair's distances.

Part 2
How often each number from the left list appears in the right list. 
Calculate a total similarity score by adding up each number in the left list after multiplying 
it by the number of times that number appears in the right list.
*/

import fs = require('fs');
import readline = require('readline');

function readInput(): Promise<{ left: number[]; right: number[] }> {
  return new Promise((resolve) => {
    const left: number[] = [];
    const right: number[] = [];

    const lineReader = readline.createInterface({
      input: fs.createReadStream('utils/day1'),
    });
    lineReader.on('line', function (line: string) {
      const splitArray = line.split(' ');
      left.push(parseInt(splitArray[0]));
      right.push(parseInt(splitArray[splitArray.length - 1]));
    });

    lineReader.on('close', function () {
      resolve({ left, right });
    });
  });
}

async function main() {
  const { left, right } = await readInput();

  const leftSorted = left.sort((a, b) => a - b);
  const rightSorted = right.sort((a, b) => a - b);
  let diff = 0;

  for (let i = 0; i < leftSorted.length; i++) {
    diff += Math.abs(leftSorted[i] - rightSorted[i]);
  }

  const leftMap = new Map<number, number>();
  left.forEach((value) => leftMap.set(value, 0));
  right.forEach((value) => {
    if (leftMap.has(value)) {
      leftMap.set(value, leftMap.get(value)! + 1);
    }
  });
  let sum = 0;
  left.forEach((value) => (sum += leftMap.get(value)! * value));

  console.log('Part 1 : ', diff);
  console.log('Part 2 : ', sum);
}

main();
