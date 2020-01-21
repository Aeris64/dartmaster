// Import module
const inquirer = require('inquirer');

// Import class
const Game = require('./game').game;

class Cricket extends Game {
    questions = require('../questions');
    scoreBegin = 0;
    scoreWin = 20;

    constructor(){
        super();
    }

    scoring(player, shoots){
        for(let shoot of shoots){
            shoot = shoot.shoot;
            if(player.getScore()+1 == parseInt(shoot))
                player.setScore(parseInt(shoot));
            if(player.getScore() == this.scoreWin){
                super.setStatus(true);
                super.addListWinner(player);
            }
        }
    }

    getHandleShoot(){
        return inquirer.prompt(this.questions.cricket);
    }

    setListPlayer(listPlayer){
        super.setListPlayer(listPlayer);
        this.setScore();
    }

    setScore(){
        super.setScore(this.scoreBegin);
    }
}

exports.cricket = Cricket;