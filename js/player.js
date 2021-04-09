class Player{
    constructor(){
        this.index=null;
        this.name=null;
        this.distance=0;
        this.rank=0;
    }

    getCount(){
        db.ref('playerCount').on("value",(data)=>{
            playerCount=data.val();
           
        })
    }
    updateCount(count){
        db.ref('/').update({
            playerCount: count
        })
    }
    update(){
        var playerIndex= "players/player"+this.index;
        db.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            rank: this.rank
        })
    }
    getFinishedPlayers(){
        db.ref('finishedPlayers').on("value",(data)=>{

            finishedPlayers= data.val();
        })
    }
    static  updateFinishedPlayers(){
    db.ref('/').update({
        finishedPlayers: finishedPlayers+1
    })
    this.rank= this.rank+1;
    }

    static getPlayerInfo(){
    db.ref('players').on("value",(data)=>{
        allPlayers= data.val();
    })
}
}