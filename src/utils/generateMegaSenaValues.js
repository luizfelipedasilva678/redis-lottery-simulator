const { getRandomLotteryResult } = require('./getRandomLotteryResults');
const { getRandomWinners } = require('./getRandomWinners');

function generateMegaSenaValues() {
    const values = [];
    const initialDate = new Date('10-10-1999');
    const today = new Date();
    let drawNumber = 1;

    let finishDateTimeStamp = initialDate.valueOf();

    while(finishDateTimeStamp <= today) {
        const finishDateInDate = new Date(finishDateTimeStamp);
        const isWednesdayOrSaturday = finishDateInDate.getDay() === 3 || finishDateInDate.getDay() === 6;  

        const value = {
            numero_sorteio: drawNumber,
            data: finishDateInDate.toISOString(),
            numeros: getRandomLotteryResult(),
            ganhadores: getRandomWinners()
        };
 
        if(isWednesdayOrSaturday) {
            values.push(value);
            drawNumber += 1;
        }

        finishDateTimeStamp = finishDateInDate.setDate(finishDateInDate.getDate() + 1).valueOf();  
    }

    return values;
}

module.exports = {
    generateMegaSenaValues
}