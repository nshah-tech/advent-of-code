import { createReadStream } from 'fs'
import readline from 'readline';

// const FilePath = 'utils/day1-part2-example'
const FilePath = 'utils/day1'
// const FilePath = 'utils/day1-example'

const fileStream = createReadStream(FilePath)

const readLineStream = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let sum = 0;
const findNumber = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9'
]
const stringNumber = [
  { str: 'one', num: '1' },
  { str: 'two', num: '2' },
  { str: 'three', num: '3' },
  { str: 'four', num: '4' },
  { str: 'five', num: '5' },
  { str: 'six', num: '6' },
  { str: 'seven', num: '7' },
  { str: 'eight', num: '8' },
  { str: 'nine', num: '9' },
]

function addNumber(stringLine, index, number) {
	return stringLine.substring(0,index) + number + stringLine.substring(index)
}
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function convertStringToNumber(stringLineOriginal) {
  let stringLine = stringLineOriginal;
  let firstNumber = {}; 
  let lastNumber = {};
  for (let index = 0; index < stringNumber.length; index++) {
	let startIndex = 0;
	let searchIndex = stringLine.indexOf(stringNumber[index].str)
	while (searchIndex > - 1) {
		if(isObjectEmpty(firstNumber) && isObjectEmpty(lastNumber)) {
			firstNumber = {index: searchIndex, num: stringNumber[index].num}
			lastNumber = {index: searchIndex, num: stringNumber[index].num}
		}
		if(firstNumber.index > searchIndex) firstNumber = {index: searchIndex, num: stringNumber[index].num}
		if(lastNumber.index < searchIndex) lastNumber = {index: searchIndex, num: stringNumber[index].num}
		startIndex = searchIndex + 1;
		searchIndex = stringLine.indexOf(stringNumber[index].str, startIndex)
	}
  }
  stringLine = addNumber(stringLine, firstNumber.index, firstNumber.num) 
  stringLine = addNumber(stringLine, lastNumber.index + 1, lastNumber.num)
  return stringLine
}

readLineStream.on('line', (line) => {
  const lineArray = convertStringToNumber(line).split('');
  let firstNumber;
  let lastNumber;
  for (let index = 0; index < lineArray.length; index++) {
    if (findNumber.includes(lineArray[index])) {
      lastNumber = lineArray[index]
      if (!firstNumber) firstNumber = lineArray[index];
    }
  }
  sum += Number(firstNumber + lastNumber)
})

readLineStream.on('close', () => { console.log('End File sum = ', sum) })
