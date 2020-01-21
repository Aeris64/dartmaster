'use strict'
// Import module
require('events').EventEmitter.defaultMaxListeners = 999;
const inquirer = require('inquirer');

// Import class
const Player = require('./class/player').player;
const World = require('./class/world').world;
const Scoring = require('./class/scoring').scoring;
const questions = require('./questions');

console.log('Welcome to Dart Master.');

// function gameplay(res){
//     console.log('Your gameplay :', res)
//     switch(res.type){
//         case 'n1':
//             console.log('**N*1 - le tour du Monde**', res.nbPlayer);
//             let world = new World(res.nbPlayer);
//             world.start();
//             break;
//         case 'n2':
//             console.log('**N*2 - le 301**');
//             let scoring = new Scoring(res.nbPlayer);
//             scoring.start();
//             break;
//         case 'n3':
//             console.log('**N*3 - le Cricket**');
//             break;
//         default:
//             console.log('error', res.type);
//             break;
//     }
// }

async function start() {
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
            break;
        default:
            return new Error();
    }
    gameplay.setListPlayer(allPlayer);
    while(!gameplay.getStatus()){
        for(let player of gameplay.getListPlayer()){
            console.log(`Player : ${player}`);
            let allShoots = [];
            for(let i = 0 ; i<3 ; i++){
                let handleShoot = await gameplay.getHandleShoot();
                allShoots.push(handleShoot);
            }
            gameplay.scoring(player, allShoots);
            console.log(player.score)
        }
    }
    // let answers = await inquirer.prompt(questions.intro);
    // gameplay(answers);
}

start()