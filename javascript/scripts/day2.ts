/*
Part 1
A Report is a line. Levels are numbers in that report
The reports are safe if they meet the following criteria:
- The levels are either all increasing or all decreasing.
- Any two adjacent levels differ by at least one and at most three.
Count number of safe reports.
// 246 is too high

Part 2
The Problem Dampener is a reactor-mounted module that lets the reactor safety systems tolerate a single bad level in what would otherwise be a safe report. It's like the bad level never happened!
Now, the same rules apply as before, except if removing a single level from an unsafe report would make it safe, the report instead counts as safe.
More of the above example's reports are now safe:
*/

import fs = require('fs');
import readline = require('readline');

function readInput(): Promise<number[][]> {
  return new Promise((resolve) => {
    const input: number[][] = [];
    const lineReader = readline.createInterface({
      input: fs.createReadStream('utils/day2'),
    });
    lineReader.on('line', function (line: string) {
      input.push(line.split(' ').map((value) => parseInt(value)));
    });

    lineReader.on('close', function () {
      resolve(input);
    });
  });
}
const dummyInput = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9],
  [1, 3, 4, 5, 8, 10, 7],
];

async function main() {
  const input = await readInput();
  // const input = dummyInput;
  let sumOfSafeReports = 0;
  input.forEach((report: number[]) => {
    const isCraiteria1 = craiteria1(report);
    const isCraiteria2 = craiteria2(report);

    if (isCraiteria1 && isCraiteria2) {
      sumOfSafeReports++;
    }
    console.log(report, isCraiteria1, isCraiteria2, sumOfSafeReports);
  });
  console.log('Part 1 : ', sumOfSafeReports);
}

function craiteria1(report: number[]) {
  // The levels are either all increasing or all decreasing.
  let isPositive = false;
  let isNegative = false;
  for (let i = 1; i < report.length; i++) {
    if (report[i] > report[i - 1] && !isPositive) isPositive = true;
    if (report[i] < report[i - 1] && !isNegative) isNegative = true;
  }
  if (isPositive && isNegative) return false;
  return true;
}

function craiteria2(report: number[]) {
  // Any two adjacent levels differ by at least one and at most three.
  for (let i = 1; i < report.length; i++) {
    let diff = Math.abs(report[i] - report[i - 1]);
    if (diff < 1 || diff > 3) return false;
  }
  return true;
}

main();
