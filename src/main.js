//const { showMenu } = require("./modules/menu");

const { generateMegaSenaValues } = require("./utils/generateMegaSenaValues");

(() => {
    //showMenu();

    const megaSenaValues = generateMegaSenaValues();

    console.log('values --> ', megaSenaValues);
})();