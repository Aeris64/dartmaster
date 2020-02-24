class Game {
    status = false;
    listPlayer = [];
    listWinner = new Map();

    constructor() {
        if(this.constructor == Game){
            throw new Error(" Object of Abstract Class cannot be created");
        }
    }

    setListPlayer(listPlayer){
        this.listPlayer = listPlayer;
    }

    getListPlayer(){
        return this.listPlayer;
    }

    addListWinner(player){
        this.listWinner.set(player.name, player)
    }

    getListWinner(){ return this.listWinner; }

    setScore(score){
        for(let player of this.listPlayer){
            player.setScore(score);
        }
    }

    getStatus(){ return this.status; }

    setStatus(status){
        this.status = status;
    }

    getHandleShoot(){ throw new Error(); }
}

exports.game = Game;