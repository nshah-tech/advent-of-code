const fs = require('fs/promises')

const start = async () => {
    const fileData = (await fs.readFile(__dirname + '/input.txt')).toString().split("\n");
    let totalPriorities = 0
    fileData.forEach(rugsack => {
        const firstCompartment = rugsack.slice(0, rugsack.length / 2).split('');
        const secondCompartment = rugsack.slice(rugsack.length / 2, rugsack.length).split('');
        const duplicateValues = firstCompartment.filter(value => {
            return secondCompartment.indexOf(value) != -1;
        })
        let highestPriority = 0;
        duplicateValues.forEach(value => {
            let priority = calculatePriority(value)
            highestPriority = priority > highestPriority ? priority : highestPriority;
        })
        totalPriorities +=highestPriority
    })
    console.log('totalPriorities Part 1 = ', totalPriorities)
    let elfArray = [];
    let totalPrioritiesGroup = 0
    fileData.forEach(rugsack => {
        elfArray.push(rugsack)
        if(elfArray.length < 3) return;
        totalPrioritiesGroup += calculatePriority(getRepetedValue(elfArray[0], elfArray[1], elfArray[2]));
        elfArray = [];
    })
    console.log('totalPrioritiesGroup Part 2 = ', totalPrioritiesGroup)
}

// --------------- Utility Functions -----------------
/**
 * Compares 3 string and returns first repeted alphabet
 * @param  {String} stringA
 * @param  {String} stringB
 * @param  {String} stringC
 * @return {String}
 */
const getRepetedValue = (stringA, stringB, stringC) => {
    return stringA.split('').filter(value => {
        return stringB.split('').indexOf(value) != -1 && stringC.split('').indexOf(value) != -1;
    })[0]
}
/**
 * @param  {String} value Assuming value only has 1 character
 * @return {Number} Returns Priority Value
 */
const calculatePriority = (value) => {
    if(value.charCodeAt(0) - 96 > 0) {
        return value.charCodeAt(0) - 96
    } else {
        return value.charCodeAt(0) - 38
    }
}
start();