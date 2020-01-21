class Player {
    score = undefined

    constructor(name){
        this.name = name;
    }

    setScore(score){
        this.score = score;
    }

    getScore(){
        return this.score;
    }
}

exports.player = Player;