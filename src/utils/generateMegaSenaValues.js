const { getRandomLotteryResult } = require('./getRandomLotteryResults');
const { getRandomIntInclusive } = require('./getRandomNumbers');
const { getRandomWinners } = require('./getRandomWinners');

function generateMegaSenaValues() {
    const values = [];
    const initialDate = new Date('11-03-1996');
    const today = new Date();
    let drawNumber = 0;

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
 
        if(isWednesdayOrSaturday) 
            values.push(value);

        finishDateTimeStamp = finishDateInDate.setDate(finishDateInDate.getDate() + 1).valueOf();  
        drawNumber += 1;
    }

    return values;
}

module.exports = {
    generateMegaSenaValues
}