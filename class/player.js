class Player {
    score = undefined

    constructor(name){
        this.name = name;
    }

    setScore(score){
        this.score = score;
    }

    getScore(){ return this.score; }

    getName(){ return this.name; }
}

exports.player = Player;