const fs = require('fs/promises')

const start = async () => {
    try {
        const fileData = (await fs.readFile(__dirname + '/input.txt')).toString().split("\n");
        let subsetCount = 0, intersectingCount = 0
        fileData.forEach((pairOfElf) => {
            const [firstElf, secondElf] = pairOfElf.split(',').map(num => num.split('-').map(num => Number(num)));
            if (isSubset(firstElf, secondElf)) subsetCount++;
            if (isIntersecting(firstElf, secondElf)) intersectingCount++;
        })
        console.log('subsetCount = ', subsetCount);
        console.log('intersectingCount = ', intersectingCount);
    } catch (error) {
        console.log('Error = ', error);
    }
};

const isSubset = (firstElf, secondElf) => {
    if ((firstElf[0] <= secondElf[0] && firstElf[1] >= secondElf[1]) || (secondElf[0] <= firstElf[0] && secondElf[1] >= firstElf[1]))
        return true
    return false
}
const isIntersecting = (firstElf, secondElf) => {
    //* Check for Not intersecting is easier than check for intersecting 
    if((firstElf[1] < secondElf[0]) || (secondElf[1] < firstElf[0]))
        return false
    return true
}

start();