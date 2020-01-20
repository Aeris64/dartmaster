const inquirer = require('inquirer');

class scoring {
    questions = require('../questions');
    nbPlayer = Number;
    allPlayer = new Map();
    goalScore = 301;

    constructor(number){
        this.nbPlayer = number;
    }

    endScoring(){
        let bool = true;

        for(let player of this.allPlayer){
            if(player[1] == 0){
                console.log(`Player : ${player[0]} win this game !`);
                bool = false;
            }
        }

        return bool
    }

    score(player, scoring){
        if(this.allPlayer.get(player)-scoring >= 0)
            this.allPlayer.set(player, this.allPlayer.get(player)-scoring);   
    }
    
    async start(){
        await this.init();
        
        while(this.endScoring()){
            for(let player of this.allPlayer){
                console.log(`Player : ${player}`);
                let finalRes = [];
                for(let i = 0 ; i<3 ; i++){
                    finalRes[i] = await inquirer.prompt(this.questions.scoring);
                }
                Promise.all(finalRes)
                    .then((res) => {
                        let scoringF = 0;
                        for(let someRes of res){
                            if(someRes.scoring <= 60)
                                scoringF+=someRes.scoring;
                        }
                        this.score(player[0], parseInt(scoringF));
                    })
                    .catch((err) => {
                        throw new Error(err);
                    })
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
            this.allPlayer.set(namePlayer['p'+i], this.goalScore);
        }
        return Promise.all(this.allPlayer)
    }
}

exports.scoring = scoring;