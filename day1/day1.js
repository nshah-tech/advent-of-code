
const fs = require('fs/promises')

const start = async () => {
    const fileData = (await fs.readFile(__dirname + '/input.txt')).toString().split("\n");
    let calorieArray = [];
    let currentValue = 0;
    fileData.forEach((element) => {
        if(element === '') {
            calorieArray.push(Number(currentValue))
            currentValue = 0;
        } else {
            currentValue += Number(element);
        }
    })
    calorieArray = calorieArray.sort((a,b)=>b-a);
    console.log('Elf with highest calorie = ', calorieArray[0])
    console.log('Sum of top 3 Elf backpack = ', calorieArray[0] + calorieArray[1] + calorieArray[2] )
}
start();