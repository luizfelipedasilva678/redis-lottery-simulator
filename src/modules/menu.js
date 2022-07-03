const readline = require('readline');

function showMenu() {
    const userAnswerReadline = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    userAnswerReadline.setPrompt("\nO que deseja fazer ?\n\ndigite '1' para gerar resultados de mega-sena aleatórios\ndigite '2' para consultar um concurso de mega-sena\ndigite '3' para sair do programa\n");
    userAnswerReadline.prompt();

    userAnswerReadline
        .on('line', (userOption) => {
            switch (userOption) {
                case '1':
                    console.log('oi...');
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
