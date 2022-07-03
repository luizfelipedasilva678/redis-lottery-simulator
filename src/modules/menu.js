const readline = require('readline');
const { redisClient } = require('../server/redis-client');
const { generateMegaSenaValues } = require('../utils/generateMegaSenaValues');

function showInitialMenu(rl) {
    const initialMenuMessage = 
        "\nO que deseja fazer ?" + "\n\n" +
        "digite '1' para gerar resultados de mega-sena aleatórios" + "\n" +
        "digite '2' para consultar um concurso de mega-sena pelo número" + "\n" +
        "digite '3' para consultar um concurso de mega-sena pela data" + "\n" +
        "digite '4' para sair do programa" + "\n";

    return new Promise((resolve) => {
        rl.question(initialMenuMessage, (answer) => resolve(answer));    
    });
}

function getNumeroDoSorteioFromUser(rl) {
    const getDateFromUserMessage = "\nDigite o numero do sorteio: ";

    return new Promise((resolve) => {
        rl.question(getDateFromUserMessage, (answer) => resolve(answer));    
    });
}

function getDateFromUser(rl) {
    const getDateFromUserMessage = "\nDigite a data do sorteio: ";

    return new Promise((resolve) => {
        rl.question(getDateFromUserMessage, (answer) => resolve(answer));    
    });
}

async function redisControl(userAnswer, rl) {
    switch (userAnswer) {
        case '1':
            await redisClient.flushAll();

            const inserts = [];
            const megaSenaValues = generateMegaSenaValues();

            for(const value of megaSenaValues) {
                for(const key in value) {
                    inserts.push(redisClient.hSet(`${value.numero_sorteio}`, `${key}`, typeof value[key] === 'object' ? JSON.stringify(value[key]) : value[key]));
                }
            }

            await Promise.all(inserts);

            console.log('\nConcursos aleatórios gerados e inseridos no redis!!\n');

            const answerOne = await showInitialMenu(rl);
            redisControl(answerOne, rl);
            break;
        case '2':
            const answerTwo = await getNumeroDoSorteioFromUser(rl);
            console.log('consultando pelo numero -> ', answerTwo);

            const answerOnePassTwo = await showInitialMenu(rl);
            redisControl(answerOnePassTwo, rl);
            break;
        case '3':
            const answerThree = await getDateFromUser(rl);
            console.log('consultando pela data -> ', answerThree);

            const answerOnePassThree = await showInitialMenu(rl);
            redisControl(answerOnePassThree, rl);
        case '4':
            console.log('saindo...');
            process.exit(0);
        default:
            break;
    }
}

async function showMenu() {
    await redisClient.connect(); 

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const answerOne = await showInitialMenu(rl);
    redisControl(answerOne, rl);
}

module.exports = { showMenu };
