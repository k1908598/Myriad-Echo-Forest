/////////this is a platformer game


//background
let pHeight; //background animation level one height
let baL1; //background animation frame 1 image

//blocks and tiles
let brickImg;
let brick;
let tileSize = 16;
let ground;// don't know if it is going to be the same thing as brick, we will see

//obstacles and maps
let map;
let mayArray;

//player
let player;

//dynamics
let floor;

//movement animation
let idleAnimation, walkAnimation, jumpAnimation;

//movement attribute
let xSpeed;
let ySpeed;

// function setup() {

// }

function setUpPlatformer() {
    //create canvas
    createCanvas(windowWidth, windowHeight); //should be the title screen - I will ask about this 


    //maybe i need to resize the background animation as well?
    backgroundLevelOneAni.scale = width / 1900;
    pHeight = baL1.height;



    let nPHeight = pHeight * windowWidth / baL1.width;
    console.log('this is the picture\'s height: ', nPHeight);

    //world dynamics
    let h = nPHeight / 15;
    world.gravity.y = h;
    console.log('this is the world\'s gravity', h);

    //check window width
    console.log('this is the canvas/windown\s width: ', width);


    //set x.speed corresponds to window width
    xSpeed = width / 467;


    //Illydia
    player = createSprite(width / 2, height / 2); // doesnt seem to appear at the center of the screen tho?
    player.addAnimation('idle', idleAnimation);
    player.addAnimation('walk', walkAnimation);
    player.addAnimation('jump', jumpAnimation);
    player.collider = 'd';
    player.layer = 2;



    //set y.speed corresponds to player height
    ySpeed = nPHeight / 60;
    console.log('this is player\'s upward speed ', ySpeed);



    //adjust size according to the canvas
    player.scale = width / 5150;
    //console.log(width);
    //console.log(player.width);

    //if that's the case, then i need to adjust the player movement speed according to the windowsize

    //animation setup
    idleAnimation.frameDelay = 17;
    walkAnimation.frameDelay = 9;
    jumpAnimation.frameDelay = 5;//might change this one according to how high player jumps


    //log heights to calcualte y velocity
    console.log('this is the picture\' height since the window/canvas\' height doesnt really matter here: ', pHeight);
    console.log('this is player\'s height ', player.height);

    //floor and blocks and tiles
    ground = new Group();
    ground.collider = 's';

    ground.image = brickImg;
    ground.tile = '=';
    ground.w = tileSize;
    ground.h = tileSize;//from here there is no problem, possibly because I didn't draw or do anything with it.


    //ai code
    //create map
    let mapVerticalOffset = height - tileSize;


    //NEW TILE - i don't know what is it or how it works, i am just following the tutorial
    map = new Tiles(

        createBottomRowMap(),
        0,
        height - (player.height * 3.5),
        tileSize,
        Math.max(player.height * 1.2, 62)
    );

    console.log("is the tiles working");



}

function drawPlatformer() {
    clear();// clear the screens to avoid overlapping frames

    //time to give up on making the animated background a sprite and try to set the animation as the background in draw!
    //relocate the background animation
    let y = height - (pHeight * width / 1900) / 2;
    animation(backgroundLevelOneAni, width / 2, y);//not plus or minus what number
    backgroundLevelOneAni.frameDelay = 50;//animation play speed



    player.debug = mouse.pressing();//what does it do? i copied it from the library

    player.rotation = 0;//reset rotation. make her stand straight
    //player.rotateToDirection = false;

    //implement the functions. (move right, left, ect)
    if (kb.pressing('left')) {

        //cahnge animation
        player.changeAni('walk');
        player.mirror.x = true;//walk the opposite way

        console.log('left');
        player.velocity.x = -1 * xSpeed;//velocity is set here, might change in the future
    }


    else if (kb.pressing('right')) {
        player.changeAni('walk');
        player.mirror.x = false;//walk the opposite way

        console.log('right');
        player.velocity.x = xSpeed;//velocity is set here, might change in the future
    }


    //let me set it this way first. after done, will change it
    else if (kb.pressing('up')) {
        player.changeAni('jump');

        //player.mirror.x=false;//walk the opposite way

        console.log('up');
        player.velocity.y = -1 * ySpeed;//velocity is set here, might change in the future
        console.log(ySpeed);
    }

    else {
        player.changeAni('idle');
        player.velocity.x = 0;
    }

    //is this function needed now even? I dont know I mgiht delete it later
    // //if I use overlap, player will fall straight through the floor :()
    // update, works now. just dont use overlap or collide
    if (player.velocity.y == 0) { // wait actually im not sure what the floor is called. or what floor even is lol
        //stop falling when on the ground

        //check if idle
        if (player.velocity.x == 0) {
            player.changeAni('idle');
        }
    }
    //no squatting for now

}




////////game function for level 1
/* left arrow key is left
right arrow key is right
press up and volume is how high you can jump. you can go left and right with this
down is squat and slow down speed with going left or right
*/



//CREATE BOTTOM ROW MAP
// returns an array
function createBottomRowMap() {
    let numberOfTiles = Math.ceil(width / tileSize);
    let bottomRow = '='.repeat(numberOfTiles);

    //floating rows
    let floatingRows = [];
    let numberOfFloatingRows = 2; //limit to 3 floating rows

    for (let i = 0; i < numberOfFloatingRows; i++) {
        let floatingRowLength = Math.ceil(numberOfTiles * (0.3 + Math.random() * 0.4));// length 30% - 70% of the width
        let startPadding = Math.floor(Math.random() * (numberOfTiles - floatingRowLength)); //random start position
        let floatingRow = " ".repeat(startPadding) + '='.repeat(floatingRowLength) + " ".repeat(numberOfTiles - floatingRowLength - startPadding);
        floatingRows.push(floatingRow);
        floatingRows.push()

    }

    //combine floating rows with the bottom row
    mapArray = [...floatingRows.reverse(), bottomRow];
    console.log(mapArray);//keep only the last 4 rows
    return mapArray; //ensure only 4 are returned

}



//update canvas size when the window size changed
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    let mapVerticalOffset = height - tileSize * mapArray.length;
    map = new Tiles(
        createBottomRowMap(),
        0,
        height - (player.height * 3.5),
        tileSize,
        Math.max(player.height * 1.2, 62)
    );
}


////////PRELOAD
// function preload() {
    
// }

function preloadPlatformer(){
    //title screen
    titleScreenAnimation = loadAnimation('/assets/screen v2/done-1.png.png', '/assets/screen v2/done-2.png.png', '/assets/screen v2/done-3.png.png', '/assets/screen v2/done-4.png.png', '/assets/screen v2/done-5.png.png', '/assets/screen v2/done-6.png.png', '/assets/screen v2/done-7.png.png', '/assets/screen v2/done-8.png.png', '/assets/screen v2/done-9.png.png', '/assets/screen v2/done-10.png.png', '/assets/screen v2/done-11.png.png', '/assets/screen v2/done-12.png.png', '/assets/screen v2/done-13.png.png', '/assets/screen v2/done-14.png.png', '/assets/screen v2/done-15.png.png', '/assets/screen v2/done-16.png.png', '/assets/screen v2/done-17.png.png', '/assets/screen v2/done-18.png.png', '/assets/screen v2/done-19.png.png', '/assets/screen v2/done-20.png.png', '/assets/screen v2/done-21.png.png', '/assets/screen v2/done-22.png.png', '/assets/screen v2/done-23.png.png');

    //MOVEMENT ANIMATIONS
    //idle animation
    idleAnimation = loadAnimation('/assets/idle/idle-1.png.png', '/assets/idle/idle-2.png.png', '/assets/idle/idle-3.png.png', '/assets/idle/idle-4.png.png', '/assets/idle/idle-5.png.png');

    //walk animation
    walkAnimation = loadAnimation('/assets/walk/walk-1.png.png', '/assets/walk/walk-2.png.png', '/assets/walk/walk-3.png.png', '/assets/walk/walk-4.png.png');

    //jump animation
    jumpAnimation = loadAnimation('/assets/jump/jump1.png', '/assets/jump/jump2.png', '/assets/jump/jump3.png', '/assets/jump/jump4.png', '/assets/jump/jump5.png', '/assets/jump/jump6.png')

    //backgrounds 
    backgroundLevelOneAni = loadAnimation('/assets/background/frame 1.png', '/assets/background/frame 2.png', '/assets/background/frame 3.png', '/assets/background/frame 4.png');
    baL1 = loadImage('/assets/background/frame 1.png');
    //game blocks and tiles
    brickImg = loadImage('/assets/blocksAndTiles/brick.png');
    console.log("brick image",brickImg);
}

// window.setUpPlatformer= setUpPlatformer;
// window.drawPlatformer = drawPlatformer;
// window.preloadPlatformer = preloadPlatformer;
function setup(){
    setUpPlatformer();
}
function draw(){
    drawPlatformer();
}

function preload(){
    preloadPlatformer();
}