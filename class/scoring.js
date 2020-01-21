// Import module
const inquirer = require('inquirer');

// Import class
const Game = require('./game').game;

class scoring extends Game {
    questions = require('../questions');
    scoreBegin = 301;

    constructor(){
        super();
    }

    scoring(player, shoots){
        for(let shoot of shoots){
            shoot = shoot.shoot;
            if(shoot <= 60){
                if(player.getScore()-shoot > 1){
                    player.setScore(player.getScore()-shoot);
                } else if(shoot%2 == 0 && player.getScore()-shoot == 0){
                    player.setScore(0);
                }
                if(player.getScore() == 0){
                    super.setStatus(true);
                    super.addListWinner(player);
                }
            }
        }
    }

    getHandleShoot(){
        return inquirer.prompt(this.questions.scoring);
    }

    setListPlayer(listPlayer){
        super.setListPlayer(listPlayer);
        this.setScore();
    }

    setScore(){
        super.setScore(this.scoreBegin);
    }
}

exports.scoring = scoring;