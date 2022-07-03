const { getRandomIntInclusive } = require('./getRandomNumbers');

function getRandomWinners(min = 0, max = 20) {
    return getRandomIntInclusive(min, max);
}

module.exports = {
    getRandomWinners
}