const inquirer = require('inquirer');

class scoring {
    questions = require('../questions');
    nbPlayer = Number;
    allPlayer = new Map();
    maxScore = 0;
    win = 20;

    constructor(number){
        this.nbPlayer = number;
    }

    endScoring(){
        let bool = true;

        if(this.maxScore == this.win){
            for(let player of this.allPlayer){
                if(player[1] == this.maxScore){
                    console.log(`Player : ${player[0]} win ! With ${this.maxScore} point(s).`);
                    bool = false;
                }
            }
        }

        return bool
    }

    score(player, sector){
        if(this.allPlayer.get(player)+1 == sector)
            this.allPlayer.set(player, sector);
        if(this.allPlayer.get(player) > this.maxScore)
            this.maxScore = this.allPlayer.get(player);
    }
    
    async start(){
        await this.init();
        
        while(this.endScoring()){
            for(let player of this.allPlayer){
                console.log(`Player : ${player}`);
                let result = await inquirer.prompt(this.questions.scoring);
                this.score(player[0], parseInt(result.sector,10));
            }
        }
    }

    async init(){
        let allQuestionsPlayerName = [];
        for(let i = 0 ; i<this.nbPlayer ; i++){
            allQuestionsPlayerName.push(this.questions.playerName(i));
        }
        let namePlayer = await inquirer.prompt(allQuestionsPlayerName);
        for(let i = 0 ; i<this.nbPlayer ; i++){
            console.log(namePlayer['p'+i]);
            this.allPlayer.set(namePlayer['p'+i], 0);
        }
        return Promise.all(this.allPlayer)
    }
}

exports.scoring = scoring;