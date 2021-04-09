class Game{
constructor(){

}
getState(){
    var gameStateRef=  db.ref('gameState');
   gameStateRef.on("value",(data)=>{
        gameState= data.val();
    })
}
update(state){
    
    db.ref('/').update({
        gameState: state
    })
}
async start(){
    if(gameState===0){
        player= new Player();
        var playerCountRef= await db.ref('playerCount').once("value")
        if(playerCountRef.exists()){
            playerCount= playerCountRef.val();
            player.getCount();
        }
        form= new Form();
        form.display();
    }
    car1= createSprite(100,200);
    car1.addImage(car1Img);
    car2= createSprite(300,200);
    car2.addImage(car2Img);
    car3= createSprite(500,200);
    car3.addImage(car3Img);
    car4= createSprite(700,200);
    car4.addImage(car4Img);
    cars=[car1,car2,car3,car4];
    passed= false;
}
play(){
    form.hide();
    Player.getPlayerInfo();
    player.getFinishedPlayers();

    if(allPlayers != undefined){
        background(groundImg);

        image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
        var index=0;
        var x=200;
        var y;

        for(var plr in allPlayers){
            index= index+1;
            x= x+200;
            y= displayHeight-allPlayers[plr].distance;
            cars[index-1].x=x;
            cars[index-1].y=y;


            if(index===player.index){
                camera.position.x= displayWidth/2;
                camera.position.y= cars[index-1].y;
            }
            textAlign(CENTER);
            fill("black");
            stroke("white");
            textSize(20);
            text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+75);
        }
    }
    if(keyIsDown(UP_ARROW) && player.index != null && passed!= true){
        player.distance= player.distance+15;
        player.update();
        console.log(player.distance);
    }

    if(player.distance>3650 && passed===false){
        Player.updateFinishedPlayers();
        player.rank= finishedPlayers;
        player.update();
        passed= true;
    }
 drawSprites();    
}
displayRank(){
 
    camera.position.x=0;
    camera.position.y=0;

    Player.getPlayerInfo();
    textAlign(CENTER);
    textSize(40);
    fill("red");
    strokeWeight(4);
    stroke("black");
    for(var plr in allPlayers){
        if(allPlayers[plr].rank===1){
            text("1st Rank " +allPlayers[plr].name,0,40);
            
        }
        else if(allPlayers[plr].rank===2){
            text("2nd Rank "+allPlayers[plr].name,0,80);
        }
        else if(allPlayers[plr].rank===3){
            text("3rd Rank "+allPlayers[plr].name,0,120);
        }
        else{
            text("Honorable Mention "+allPlayers[plr].name,0,160)
        }

    }
}



}