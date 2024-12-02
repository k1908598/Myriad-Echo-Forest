//so the thing is, some tutorials set their obstacle course in setup, which only runs once. I could do that too, but I need to hide them first then call them in draw. Would it result in errors?


//VARIABLES
//backgrounds
let titleScreenAnimation;
let r;
let backgroundLevelOne;

//blocks and tiles
//let brickImg;
//let brick;
//let tileSize=16;
//let ground;// don't know if it is going to be the same thing as brick, we will see

//obstacles and maps
//let map;

//player
//let player;

//dynamics
//let floor;

//movement animation
//let idleAnimation, walkAnimation, jumpAnimation;

//buttons
let button0, button1;

let buttonZero;
let buttonOne;

//screen variable
let screen = 0;

//countdowns
let countdownStartTime;
let countdownDuration = 3000;
let currentScreen = 0;
let elapsedTime=0;

//game - win or lose
let ifWon;


/////////SETUP
function setup() {
    //create canvas
    createCanvas(windowWidth, windowHeight); //should be the title screen - I will ask about this 

    //world dynamics
    world.gravity.y=10;

   


    //Illydia
    player = createSprite(width / 2, height / 2); // doesnt seem to appear at the center of the screen tho?
    player.addAnimation('idle', idleAnimation);
    player.addAnimation('walk', walkAnimation);
    player.addAnimation('jump', jumpAnimation);

    //animation setup
    idleAnimation.frameDelay = 5;
    walkAnimation.frameDelay = 7;
    jumpAnimation.frameDelay = 10;
    
    //might change this one according to how high player jumps


    //buttons

    //"learnt" this in coding lesson 11/26/24, so apparently this is a html code that exists outside of my game's logic? 
    buttonZero = document.createElement('button');
    buttonZero.textContent = 'enter';
    buttonZero.style = `position: fixed; top: 90%; left: 50%; transform: translate(-25%,0); padding: 20px; z-index: 1000; color: white; background: rgb(${(Math.floor(random() * 255))},${(Math.floor(random() * 255))},${(Math.floor(random() * 255))})`;
    document.body.append(buttonZero);

    buttonZero.onclick = () => { // this is a function where if buttonZero is clicked, it will jump to the next screen
        screen = 1;
        console.log("buttonZero");
    }


    //same thing as buttoneZero. Could copy and modify this code for future buttons in case they don't work
    buttonOne = document.createElement('button');
    buttonOne.textContent = 'confirm';
    buttonOne.style = `position: fixed; top: 90%; left: 50%; transform: translate(-25%,0); padding: 20px; z-index: 1000; color: white; background: rgb(${(Math.floor(random() * 255))},${(Math.floor(random() * 255))},${(Math.floor(random() * 255))})`;
    buttonOne.style.display = 'none'; //hide display
    document.body.append(buttonOne);

    buttonOne.onclick = () => {
        screen = 2;
        console.log("buttonOne");
    }


    //countdowns
    countdownStartTime = millis();

    //r is the title screen sprite
    r = createSprite(width / 2, height / 2);
    r.addAnimation('screen', titleScreenAnimation);
    r.collider = 'static';

    //this is ai code but I can learn this
    let spriteWidth = r.width; // Original width of the sprite
    let spriteHeight = r.height; // Original height of the sprite
    r.scale = max(width / spriteWidth, height / spriteHeight);
    r.animation.frameDelay = 18;

   // setUpPlatformer();

    //setUpPlatformer
    

}



/////////DRAW
function draw() {//DRAW RUNS ON LOOPS
    //clear(); // i don't know if this works
   //console.log('hello');

    if (screen == 0) {
        screen0();
    }

    if (screen == 1) {
        screen1();
        buttonZero.remove();
        buttonOne.style.display = 'block'; //maybe html is much better than p5
    }

    if (screen == 2) {
        buttonOne.remove();
        screen2(); //screen go doesn't work(bc i forgot to add the location, and I put the text before the background)
        //player.draw();
    }

    if (screen == 3) {
        
        screen3();
    }

    if (screen == 4) {
        screen4();
    }

    if (screen == 5) {
        screen5();
    }

    if (screen == 6) {
        screen6();
    }

    if (screen == 7) {
        screen7();
    }

    if (screen == 8) {
        screen8();
    }

// this is ai code, and i don't quite understand yet
    if (currentScreen ==1){
        nextScreenGo();
        currentScreen = 0; //reset to avoid infinite "GO!"
    }
}







/////////SCREEN ZERO
function screen0() {

    //
    
    //this is the title screen. "Myriad"

    r.draw();

    //console.log("screen 0");//this is debug, check if screen0 runs
}





/////////SCREEN ONE
function screen1() {
    //this is the screen where it introduces the rules of the game

    background("plum");
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(0);
    text("welcome to my home: here are the rules, blah blah blah", width / 2, height / 2 - 40);
    //console.log("screen 1");


}


/////////SCREEN TWO
function screen2() {
    //this is the screen where it called "three, two, one, enter game! "
    background('orange');
    //console.log("screen 2");


    if (currentScreen == 0) {
        displayCountdown();
    } else if (currentScreen==1){
        //currentScreen = 0;
        nextScreenGo(); //overal works but doesnt print "go", which is the biggest problem
       screen = 3;

    }

}


/////////SCREEN THREE
function screen3() {
    
    // starts recording sounds
    //this is the screen where it reaches level 1 of the game. might have multiple parts(depends on the obstacles and route design)

 //   drawPlatformer();
    //console.log("screen 3");

    clear();// clear the screens to avoid overlapping frames
    let baL1 = backgroundLevelOneAni[0];
    let pHeight = baL1.height;
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


/////////SCREEN FOUR
function screen4() {
    //this is the screen where it shows success and congradulation for completing level one. might have two parts- success and failure
    console.log("screen 4");

}



/////////SCREEN FIVE
function screen5() {
    //this is the screen where it shows the instruction for level 2 (not all)
}



/////////SCREEN SIX
function screen6() {
    //this is the screen where it says "3, 2, 1, go!"
}



////////SCREEN SEVEN
function screen7() {
    //this is the screen that shows level 2. might have multiple parts, depends on the route design
}



////////SCREEN EIGHT
function screen8() {
    //this is the screen that shows "success or failure" after completing level 2!
    //will have storyline after this
}

///////DISPLAY COUNTDOWN
function displayCountdown() {
    console.log('display count down');
    elapsedTime += 16; //each second is 60 frames
    let remainingTime = countdownDuration - elapsedTime;

    if (remainingTime > 0) {
        let countdownValue = ceil(remainingTime / 1000);
        textSize(64);
        textAlign(CENTER, CENTER);
        fill(0);
        text(countdownValue, width / 2, height / 2);
        console.log(countdownValue);
    }
    else {
        currentScreen = 1;
        console.log('currentScreen is 1 now');
    }
}

///////NEXTSCREENGO
function nextScreenGo() {
    
    
    background('blue');//the background doesnt even work anymore?
    textSize(64);
    textAlign(CENTER, CENTER);
    fill(0);
    text("GO!",width/2,height/2);//didn't actually show up on screen :(
    console.log('go!');//order matters ;>

    setTimeout(()=>{
        screen =3; //move to the next screen
        console.log('set time out to 1 second');}, 1100); //1000ms = 1 second
    //now let me test it out!
    //yay it worked!!
    

}


////////PRELOAD
function preload() {
    //title screen    //title screen
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
    //preloadPlatformer();
}

// window.preload = preload;
// window.setup = setup;
// window.draw = draw;
