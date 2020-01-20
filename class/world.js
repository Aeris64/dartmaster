const inquirer = require('inquirer');

class world {
    questions = require('../questions');
    nbPlayer = Number;
    allPlayer = new Map();
    goalScore = 0;
    win = 20;

    constructor(number){
        this.nbPlayer = number;
    }

    endWorld(){
        let bool = true;

        if(this.goalScore == this.win){ // Performance
            for(let player of this.allPlayer){
                if(player[1] == this.goalScore){
                    console.log(`Player : ${player[0]} win ! With ${this.goalScore} point(s).`);
                    bool = false;
                }
            }
        }

        return bool
    }

    score(player, sectors){
        for(let sector of sectors){
            if(this.allPlayer.get(player)+1 == sector)
                this.allPlayer.set(player, sector);
            if(this.allPlayer.get(player) > this.goalScore)
                this.goalScore = this.allPlayer.get(player);
        }
    }
    
    async start(){
        await this.init();
        
        while(this.endWorld()){
            for(let player of this.allPlayer){
                console.log(`Player : ${player}`);
                let finalRes = [];
                for(let i = 0 ; i<3 ; i++){
                    finalRes[i] = await inquirer.prompt(this.questions.world);
                }
                Promise.all(finalRes)
                    .then((res) => {
                        let scoringF = [];
                        for(let i = 0 ; i<3 ; i++){
                            if(res[i].sector <= 60)
                                scoringF[i]=parseInt(res[i].sector, 10);
                        }
                        this.score(player[0], scoringF);
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
            this.allPlayer.set(namePlayer['p'+i], 0);
        }
        return Promise.all(this.allPlayer)
    }
}

exports.world = world;