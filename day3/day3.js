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
    console.log('totalPriorities = ', totalPriorities)
}

const calculatePriority = (value) => {
    if(value.charCodeAt(0) - 96 > 0) {
        return value.charCodeAt(0) - 96
    } else {
        return value.charCodeAt(0) - 38
    }
}
start();