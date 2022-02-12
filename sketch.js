var bgimg,background2, logoimg, cd,logo, start, home1, restart, about, gameSound, retro, gif, png,abtbg,enemy,player,coin,v1,v2,v3
var gameState = "wait"
var boyRun
var points=0
var coinsGroup,enemiesGroup,boyRunleft




function preload() {
    bgimg = loadImage("background.png")
    logoimg = loadImage("kv.png")
    // startimg = loadImage("play.png")

    //gif = loadImage("background.gif")
    abtbg = loadImage("abtbg.jpg")
  //  l1bg = loadImage("https://static.wixstatic.com/media/5cfe14_30977ca5f4d04cc2a8977a980baf19a9~mv2.gif")
    l1bg = loadImage("bg.gif")

    v1 = loadImage("virus.png")
    v2 = loadImage("virus2.png")
    v3 = loadImage("virus 3.png")
    coinimg = loadImage("floppy.png")
    boyRun = loadAnimation( "1.png","2.png","3.png","4.png","5.png","6.png")
    boyRunleft=loadAnimation( "left/1.png","left/2.png","left/3.png","left/4.png","left/5.png","left/6.png")
    l2bg = loadImage("60c8a61a4f0f648a280c7dc8156baec1.gif")
    cd = loadImage("flying cd1.gif")
}


function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20)
    logo = createSprite(width / 2 - 20, height / 2 - 20)
    logo.addImage(logoimg)
    // logo.debug = true
    logo.setCollider("circle", 0, 0, 40)


    home1 = createImg("home.png")
    home1.position(width / 2-100, height-100)
    home1.size(200, 100)
    home1.hide()

    start = createImg("play.png")
    start.position(width / 3 + 200, height - 150)
    start.size(225, 195)

    about = createImg("about.png")
    about.position(width / 3, height - 161)
    about.size(225, 215)

    player = createSprite(width / 4, height - 200)
   // player.addImage()
    player.addAnimation("Runright",boyRun)
    player.addAnimation("Runleft",boyRunleft)

    player.scale=2
    player.debug=true
    player.setCollider("circle",0,0,25)
    
    
    

   // background2= createSprite(width / 2, height / 2)
    //background2.addImage(gif)
    //background2.scale = 2
    // background2.visible = false

    coinsGroup = new Group()
    enemiesGroup = new Group()

}
   

function draw() {

    

    if (gameState === "wait") {
        background(bgimg)
        home1.hide()
        start.show()
        about.show()
        logo.visible = true
        player.visible=false
    }





    about.mousePressed(() => {
        gameState = "about"
        about.hide()
        Swal.fire({
            title: 'About this game',
            text:'This is the placeholder text'
        }).then(() => { 
            gameState = "wait"
        })
    })


    start.mousePressed(() => {
        gameState = "level 1"
    })

    home1.mousePressed(() => {
        gameState = "wait"
    })

    

    if (gameState === "level 1") {
        background(l1bg)
        textSize(25)
        fill("red")
        text("Your Score : " + points, width-200,100)
        logo.visible = false
        player.visible = true
        about.hide()
        home1.show()
        start.hide()

        if (keyDown(RIGHT_ARROW)) {
            player.x=player.x+15
            player.changeAnimation("Runright",boyRun)

        }
    
        if (keyDown(LEFT_ARROW)) { 
            player.x=player.x - 15
            player.changeAnimation("Runleft",boyRunleft)

        }
        
        if (keyDown(UP_ARROW)) { 
            player.y = player.y - 15
        }
        if (keyDown(DOWN_ARROW)) { 
            player.y=player.y + 15
        }
        if (player.x < 0) { 
            player.x = 10
        }
        if (player.x > width) { 
            player.x = width-100
        }


        if (player.y > height) {
            player.y=height-10
        }
        if (player.y < 0) { 
            player.y=10
        }


for(i=0;i<coinsGroup.length;i++){
        if (player.isTouching(coinsGroup.get(i))) { 
            coinsGroup.get(i).destroy()
            points = points+2
            console.log(points)
            if (points > 10) {
                gameState = "level 2"
            }
        }}

        for(i=0;i<enemiesGroup.length;i++){
        if (player.isTouching(enemiesGroup.get(i))) { 
            enemiesGroup.get(i).destroy()
            points = points+2
            console.log(points)
            
            gameState = "end"
            
        }}
        

        
    
        spawnEnemies()
        spawnCoins()
    }
    if (gameState === "level 2") {
        background(l2bg)


        
        text("Your Score : " + points, width-100,100)


        if (points > 30) {

            gameState = "level 3"

    }
        logo.visible = false
        player.visible = true
        about.hide()
        home1.show()
        start.hide()

        if (keyDown(RIGHT_ARROW)) {
            player.x = player.x + 10
        }
    
        if (keyDown(LEFT_ARROW)) {
            player.x = player.x - 10
        }
        
        if (keyDown(UP_ARROW)) {
            player.y = player.y - 10
        }
        if (keyDown(DOWN_ARROW)) {
            player.y = player.y + 10
        }
        if (player.x < 0) {
            player.x = 10
        }
        if (player.x > width) {
            player.x = width - 100
        }

        if (player.y > height) {
            player.y=height-10
        }
        if (player.y < 0) { 
            player.y=10
        }




        if (player.isTouching(cdsG)) { 
            cdsG.destroyEach()
            points = points+2
            console.log(points)
            
        }
        if (player.isTouching(enemiesGroup)) { 
            enemiesGroup.destroyEach()
            points = points+2
            console.log(points)

            gameState = "end"



            points = 0
            
        }





        spawnCds()
        spawnEnemies()
    }

    if (gameState === "about") {
        background(abtbg)
        logo.visible = false
        home1.hide()
        start.hide()
        player.visible = false
        // about.hide()
       
    }

    
    if (gameState === "level 3") { 
        background(100)
        if (keyDown(RIGHT_ARROW)) {
            player.x=player.x+15
        }
    
        if (keyDown(LEFT_ARROW)) { 
            player.x=player.x - 15
        }
        
        if (keyDown(UP_ARROW)) { 
            player.y = player.y - 15
        }
        if (keyDown(DOWN_ARROW)) { 
            player.y=player.y + 15
        }
        if (player.x < 0) { 
            player.x = 10
        }
        if (player.x > width) { 
            player.x = width-100
        }


        if (player.y > height) {
            player.y=height-10
        }
        if (player.y < 0) { 
            player.y=10
        }

    }

    if (gameState == "end") { 
        background(200, 0, 0)
        player.visible = false
        cdsG.destroyEach()

    }
    drawSprites()
}




function spawnEnemies() {
    rand = Math.round(random(100,200))
    if (frameCount % rand === 0) {
        var randY = Math.round(random(20, height - 20))
        enemy = createSprite(width, randY)
        enemy.scale = 0.5
        enemiesGroup.add(enemy)
        enemy.debug=true
        enemy.setCollider("circle",0,0,40)

        enemy.velocityX = -10
        enemy.shapeColor = "lightgreen"
        var rand2 = Math.round(random(1, 3))
        switch (rand2) { 
            case 1: enemy.addImage(v1)
                break;
            case 2: enemy.addImage(v2)
                break;
            case 3: enemy.addImage(v3)
                break;
            default:
                break;
        }
        
        
    }
}

function spawnCoins() { 
    rand = Math.round(random(100, 250))
    if (frameCount % rand === 0) { 
            var randX = Math.round(random(10, width - 30))
            coin = createSprite(randX, 0)
            coin.velocityY = +5
            coin.addImage(coinimg)  
            coin.scale = 0.5
            coinsGroup.add(coin)
    }
}