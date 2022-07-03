const { getRandomIntInclusive } = require('./getRandomNumbers');

function getRandomLotteryResult(resultsQuantity = 6) {
    const results = [];

    for(let i = 0; i < resultsQuantity; i += 1) {
        const result = getRandomIntInclusive(1, 60);
        results.push(result);
    }

    return results;
}

module.exports = {
    getRandomLotteryResult    
}