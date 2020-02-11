'use strict'
// Import module
require('events').EventEmitter.defaultMaxListeners = 999;
const inquirer = require('inquirer');

// Import class
const Player = require('./engine/player').player;
const World = require('./engine/gamemode/world').world;
const Scoring = require('./engine/gamemode/scoring').scoring;
const Cricket = require('./engine/gamemode/cricket').cricket;

const questions = require('./questions');

console.log('Welcome to Dart Master.');

async function start() {
    window.location.replace("../views/nbUsers.html");
    let nbPlayer = (await inquirer.prompt(questions.nbPlayer)).nbPlayer;
    console.log(nbPlayer);
    let allPlayer = [];
    for(let i = 0 ; i<nbPlayer ; i++){
        let newPlayer = await inquirer.prompt(questions.createPlayer);
        newPlayer = new Player(newPlayer.name);
        allPlayer.push(newPlayer);
    }
    let gameplay = await inquirer.prompt(questions.gameplay);
    switch(gameplay.type){
        case 'n1':
            gameplay = new World();
            break;
        case 'n2':
            gameplay = new Scoring();
            break;
        case 'n3':
            gameplay = new Cricket();
            break;
        default:
            return new Error('Games not found');
    }
    gameplay.setListPlayer(allPlayer);
    while(!gameplay.getStatus()){
        for(let player of gameplay.getListPlayer()){
            console.log(`Player : ${player.getName()} | Score : ${player.getScore()}`);
            let allShoots = [];
            for(let i = 0 ; i<3 ; i++){
                let handleShoot = await gameplay.getHandleShoot();
                allShoots.push(handleShoot);
            }
            gameplay.scoring(player, allShoots);
            console.log(player.score)
        }
    }
    console.log('Winners..! ', gameplay.getListWinner().keys())
}

// start()