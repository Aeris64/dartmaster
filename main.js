'use strict'
// Import module
const inquirer = require('inquirer');

const World = require('./class/world').world;
const Scoring = require('./class/scoring').scoring;
const questions = require('./questions').intro;

console.log('Welcome to Dart Master.');

function gameplay(res){
    console.log('Your gameplay :', res)
    switch(res.type){
        case 'n1':
            console.log('**N*1 - le tour du Monde**', res.nbPlayer);
            let world = new World(res.nbPlayer);
            world.start();
            break;
        case 'n2':
            console.log('**N*2 - le 301**');
            let scoring = new scoring(res.nbPlayer);
            scoring.start();
            break;
        case 'n3':
            console.log('**N*3 - le Cricket**');
            break;
        default:
            console.log('error', res.type);
            break;
    }
}

async function start() {
    let answers = await inquirer.prompt(questions)
    gameplay(answers);
}

start()