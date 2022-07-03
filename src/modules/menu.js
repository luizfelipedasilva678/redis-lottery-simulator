const readline = require('readline');
const { redisClient } = require('../server/redis-client');
const { generateMegaSenaValues } = require('../utils/generateMegaSenaValues');

async function showMenu() {
    await redisClient.connect(); 

    const userAnswerReadline = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    userAnswerReadline.setPrompt("\nO que deseja fazer ?\n\ndigite '1' para gerar resultados de mega-sena aleatórios\ndigite '2' para consultar um concurso de mega-sena\ndigite '3' para sair do programa\n");
    userAnswerReadline.prompt();

    userAnswerReadline
        .on('line', async (userOption) => {
            switch (userOption) {
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
                    break;
                case '2':
                    console.log('oi 2...');
                    break;
                case '3':
                    userAnswerReadline.close();
                    break;
                default:
                    break;
            }

            userAnswerReadline.prompt();
        })
        .on('close', () => {
            console.log('saindo do programa...');
            process.exit(0);
        })
}

module.exports = { showMenu };
