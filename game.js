// need to rescale the title screen animation
// need to make the brick static and make the player stands on the brick
// need to rescale the background level one animation


let chapter = 0;



let chapterZero = function (p) {
    //so the thing is, some tutorials set their obstacle course in setup, which only runs once. I could do that too, but I need to hide them first then call them in draw. Would it result in errors?


    //VARIABLES
    //backgrounds
    let titleScreenAnimation;
    let r;

    let scale;


    let buttonZero;
    let buttonOne;

    //screen variable
    let screen = 0;

    //countdowns
    let countdownStartTime;
    let countdownDuration = 3000;
    let currentScreen = 0;
    let elapsedTime = 0;



    /////////SETUP
    p.setup = function setup() {
        //create canvas
        p.createCanvas(1000, 600); //should be the title screen - I will ask about this 

        //world dynamics
        p.world.gravity.y = 10;
        scale = p.windowWidth;
        console.log(scale);


        //"learnt" this in coding lesson 11/26/24, so apparently this is a html code that exists outside of my game's logic? 
        buttonZero = document.createElement('button');
        buttonZero.textContent = 'enter';
        buttonZero.style = `position: fixed; top: 90%; left: 50%; transform: translate(-25%,0); padding: 20px; z-index: 1000; color: white; background: rgb(${(Math.floor(p.random() * 255))},${(Math.floor(p.random() * 255))},${(Math.floor(p.random() * 255))})`;
        document.body.append(buttonZero);

        buttonZero.onclick = () => { // this is a function where if buttonZero is clicked, it will jump to the next screen
            screen = 1;
            console.log("buttonZero");
        }


        //same thing as buttoneZero. Could copy and modify this code for future buttons in case they don't work
        buttonOne = document.createElement('button');
        buttonOne.textContent = 'confirm';
        buttonOne.style = `position: fixed; top: 90%; left: 50%; transform: translate(-25%,0); padding: 20px; z-index: 1000; color: white; background: rgb(${(Math.floor(p.random() * 255))},${(Math.floor(p.random() * 255))},${(Math.floor(p.random() * 255))})`;
        buttonOne.style.display = 'none'; //hide display
        document.body.append(buttonOne);

        buttonOne.onclick = () => {
            screen = 2;
            console.log("buttonOne");
        }


        //countdowns
        countdownStartTime = p.millis();

        //this is ai code but I can learn this
        let desiredWidth = p.width * 0.8;//80% of canvas width
        let desiredHeight = p.height * 0.8;



    }



    /////////DRAW
    p.draw = function draw() {//DRAW RUNS ON LOOPS
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

        if (currentScreen == 1) {
            nextScreenGo();
            currentScreen = 0; //reset to avoid infinite "GO!"
        }
    }






    /////////SCREEN ZERO
    function screen0() {

        //r.draw();


        //check window width
        console.log('this is the canvas/windown\s width: ', p.width);
        let screenTitle = p.loadImage('/assets/screen v2/done-1.png.png');
        let pHeight = screenTitle.height;
        //they say pheight is 1??
        let y = p.height - (pHeight * p.width / 2000) / 2;
        let picWidth = screenTitle.width * (p.windowWidth / 2048);
        //titleScreenAnimation.sX(p.windowWidth/2000);
        p.scale(p.windowWidth / 2000); //scaled all of p
        let imageW = titleScreenAnimation[0].width;
        let imageH = titleScreenAnimation[0].height;




        // let titleScreenAnimation = p.loadAnimation('/assets/screen v2/done-1.png.png', '/assets/screen v2/done-2.png.png', '/assets/screen v2/done-3.png.png', '/assets/screen v2/done-4.png.png', '/assets/screen v2/done-5.png.png', '/assets/screen v2/done-6.png.png', '/assets/screen v2/done-7.png.png', '/assets/screen v2/done-8.png.png', '/assets/screen v2/done-9.png.png', '/assets/screen v2/done-10.png.png', '/assets/screen v2/done-11.png.png', '/assets/screen v2/done-12.png.png', '/assets/screen v2/done-13.png.png', '/assets/screen v2/done-14.png.png', '/assets/screen v2/done-15.png.png', '/assets/screen v2/done-16.png.png', '/assets/screen v2/done-17.png.png', '/assets/screen v2/done-18.png.png', '/assets/screen v2/done-19.png.png', '/assets/screen v2/done-20.png.png', '/assets/screen v2/done-21.png.png', '/assets/screen v2/done-22.png.png', '/assets/screen v2/done-23.png.png');
        titleScreenAnimation.frameDelay = 12;//animation play speed
        p.animation(titleScreenAnimation, imageW / 2, imageH / 2);//not plus or minus what number
        //console.log("this is p.width",p.width);
        //console.log("windowwidth",p.windowWidth);
        //console.log(titleScreenAnimation[0].width);
        //console.log(p.windowWidth/2000);

        //console.log("screen 0");//this is debug, check if screen0 runs
    }





    /////////SCREEN ONE
    function screen1() {
        //this is the screen where it introduces the rules of the game
        //p.clear();
        p.background("plum");
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(20);
        p.fill(0);
        let textWidth = p.width * 0.8; 
        p.text("Welcome to The Forest of Echoes:\nStep into the shoes of Idyllia, a young musician who has lost faith in her voice. Take a journey through a mystical forest where every step forward depends on your song.\n\n\nWe have three modes, walking to the left, to the right, or jump.\n\nYou can step on the orange bricks. \n\nBe careful! The green bricks are poisonous and you will die stepping on it!\n\nIn order to win, you have to keep walking right, until you can't see yourself.", p.width / 2-400, p.height / 2 - 250,textWidth,p.height*0.8);
        //console.log("screen 1");


    }


    /////////SCREEN TWO
    function screen2() {
        //this is the screen where it called "three, two, one, enter game! "
        p.background('orange');
        //console.log("screen 2");


        if (currentScreen == 0) {
            displayCountdown();
        } else if (currentScreen == 1) {
            //currentScreen = 0;
            nextScreenGo(); //overal works but doesnt print "go", which is the biggest problem
            //screen = 3;
            chapter = 1;
        }

    }


    /////////SCREEN THREE



    ///////DISPLAY COUNTDOWN
    function displayCountdown() {
        console.log('display count down');
        elapsedTime += 16; //each second is 60 frames
        let remainingTime = countdownDuration - elapsedTime;

        if (remainingTime > 0) {
            let countdownValue = p.ceil(remainingTime / 1000);
            p.textSize(64);
            p.textAlign(p.CENTER, p.CENTER);
            p.fill(0);
            p.text(countdownValue, p.width / 2, p.height / 2);
            console.log(countdownValue);
        }
        else {
            currentScreen = 1;
            console.log('currentScreen is 1 now');
        }
    }

    ///////NEXTSCREENGO
    function nextScreenGo() {


        p.background('orange');//the background doesnt even work anymore?
        p.textSize(64);
        p.textAlign(p.CENTER, p.CENTER);
        p.fill(0);
        p.text("GO!", p.width / 2, p.height / 2);//didn't actually show up on screen :(
        console.log('go!');//order matters ;>

        setTimeout(() => {
            //screen = 3; //move to the next screen
            //chapter=1;
            console.log('set time out to 1 second');
            if (chapter == 0) {
                p.remove();
                new p5(chapterOne);
                chapter = 1;
            }



        }, 1000); //1000ms = 1 second
        //now let me test it out!
        //yay it worked!!


    }


    ////////PRELOAD
    p.preload = function preload() {
        //title screen    //title screen
        titleScreenAnimation = p.loadAnimation('/assets/screen v2/done-1.png.png', '/assets/screen v2/done-2.png.png', '/assets/screen v2/done-3.png.png', '/assets/screen v2/done-4.png.png', '/assets/screen v2/done-5.png.png', '/assets/screen v2/done-6.png.png', '/assets/screen v2/done-7.png.png', '/assets/screen v2/done-8.png.png', '/assets/screen v2/done-9.png.png', '/assets/screen v2/done-10.png.png', '/assets/screen v2/done-11.png.png', '/assets/screen v2/done-12.png.png', '/assets/screen v2/done-13.png.png', '/assets/screen v2/done-14.png.png', '/assets/screen v2/done-15.png.png', '/assets/screen v2/done-16.png.png', '/assets/screen v2/done-17.png.png', '/assets/screen v2/done-18.png.png', '/assets/screen v2/done-19.png.png', '/assets/screen v2/done-20.png.png', '/assets/screen v2/done-21.png.png', '/assets/screen v2/done-22.png.png', '/assets/screen v2/done-23.png.png');

        //MOVEMENT ANIMATIONS
        //idle animation
        idleAnimation = p.loadAnimation('/assets/idle/idle-1.png.png', '/assets/idle/idle-2.png.png', '/assets/idle/idle-3.png.png', '/assets/idle/idle-4.png.png', '/assets/idle/idle-5.png.png');

        //walk animation
        walkAnimation = p.loadAnimation('/assets/walk/walk-1.png.png', '/assets/walk/walk-2.png.png', '/assets/walk/walk-3.png.png', '/assets/walk/walk-4.png.png');

        //jump animation
        jumpAnimation = p.loadAnimation('/assets/jump/jump1.png', '/assets/jump/jump2.png', '/assets/jump/jump3.png', '/assets/jump/jump4.png', '/assets/jump/jump5.png', '/assets/jump/jump6.png')

        //backgrounds 
        backgroundLevelOneAni = p.loadAnimation('/assets/background/frame 1.png', '/assets/background/frame 2.png', '/assets/background/frame 3.png', '/assets/background/frame 4.png');
        baL1 = p.loadImage('/assets/background/frame 1.png');
        //game blocks and tiles
        brickImg = p.loadImage('/assets/blocksAndTiles/brick.png');
        //preloadPlatformer();
    }


}

let chapterOne = function (p) {
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
    let orangeBricks;
    let greenBricks;

    //player
    let player;
    let plX = 400;
    let plY = 375;
    let plW = 30;
    let plH = 70;

    //dynamics
    let floor;

    //movement animation
    let idleAnimation, walkAnimation, jumpAnimation;

    //movement attribute
    let xSpeed;
    let ySpeed;

    let backgroundLevelOneAni;

    //game control
    let ifWon = false;
    let ifLose = false;


    function setUpPlatformer() {
        //create canvas
        p.createCanvas(800, 600); //should be the title screen - I will ask about this 



        //maybe i need to resize the background animation as well?
        backgroundLevelOneAni = p.loadAnimation('/assets/background/frame 1.png', '/assets/background/frame 2.png', '/assets/background/frame 3.png', '/assets/background/frame 4.png');
        backgroundLevelOneAni.scale = p.width / 1900;
        let baL1 = p.loadImage('/assets/background/frame 1.png');
        pHeight = baL1.height;



        let nPHeight = pHeight * p.windowWidth / baL1.width;
        console.log('this is the picture\'s height: ', nPHeight);

        //world dynamics
        let h = nPHeight / 15;
        p.world.gravity.y = h;
        console.log('this is the world\'s gravity', h);

        //check window width
        console.log('this is the canvas/windown\s width: ', p.width);


        //set x.speed corresponds to window width
        xSpeed = p.width / 467;


        //Illydia
        player = p.createSprite(0, 0); // doesnt seem to appear at the center of the screen tho?
        idleAnimation = player.addAnimation('idle', '/assets/idle/idle-1.png.png', '/assets/idle/idle-2.png.png', '/assets/idle/idle-3.png.png', '/assets/idle/idle-4.png.png', '/assets/idle/idle-5.png.png');
        walkAnimation = player.addAnimation('walk', '/assets/walk/walk-1.png.png', '/assets/walk/walk-2.png.png', '/assets/walk/walk-3.png.png', '/assets/walk/walk-4.png.png');
        jumpAnimation = player.addAnimation('jump', '/assets/jump/jump1.png', '/assets/jump/jump2.png', '/assets/jump/jump3.png', '/assets/jump/jump4.png', '/assets/jump/jump5.png', '/assets/jump/jump6.png');
        player.collider = 'd';
        //set player width and height
        player.w = 200;
        player.h = 380;
        player.layer = 2;




        //set y.speed corresponds to player height
        ySpeed = nPHeight / 80;
        console.log('this is player\'s upward speed ', ySpeed);



        //adjust size according to the canvas
        player.scale = p.width / 5150;
        console.log(p.width);
        console.log(player.width);

        //if that's the case, then i need to adjust the player movement speed according to the windowsize

        //animation setup
        idleAnimation.frameDelay = 17;
        walkAnimation.frameDelay = 9;
        jumpAnimation.frameDelay = 5;//might change this one according to how high player jumps


        //log heights to calcualte y velocity
        console.log('this is the picture\' height since the window/canvas\' height doesnt really matter here: ', pHeight);
        console.log('this is player\'s height ', player.height);

        //floor and blocks and tiles


        brickImg = p.loadImage('/assets/blocksAndTiles/brick.png');

        //let brick = p.createSprite(x, y, tileSize, tileSize);
        //brick.addImage(brickImg);


        orangeBricks = new p.Group();
        greenBricks = new p.Group();



        //ground.add(brick);

        //ground.image = brickImg;
        //ground.tile = '<';
        //from here there is no problem, possibly because I didn't draw or do anything with it.



        //let greenBrick = p.createSprite(x, y, tileSize, tileSize,'s');
        //brick.addImage(brickImg);
        let greenBrickI = p.loadImage('assets/blocksAndTiles/greenBrick.png');

        //ai code
        //create map
        let mapVerticalOffset = p.height - tileSize;


        let mapArray = [
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..............<<<<<<.......",
            ".........................=====.",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "........<<<<<..................",
            "..................======......",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..........................",
            "..............======............",
            "..........................",
            "..........................",
            ".........................",
            "..........................",
            ".............<<<.............",
            "..........................",
            '=====...=====.....=====.................====================================================================================='
        ];

        //ai code
        mapArray.forEach((row, rowIndex) => {
            row.split("").forEach((char, colIndex) => {
                if (char === "=") { // Only create bricks for "="
                    let x = colIndex * tileSize;
                    let y = rowIndex * tileSize;
                    let brick = p.createSprite(x, y, tileSize, tileSize, 's');
                    brick.addImage(brickImg); // Assign the brick image
                    orangeBricks.add(brick); // Add the brick to the ground group
                }
                if (char === "<") { // Only create bricks for "="
                    let x = colIndex * tileSize;
                    let y = rowIndex * tileSize;

                    let brick = p.createSprite(x, y, tileSize, tileSize, 's');
                    brick.addImage(greenBrickI); // Assign the brick image
                    greenBricks.add(brick);//Add the brick to the ground group
                }
            });
        });


        // //NEW TILE - it works
        // map = new p.Tiles(

        //     mayp,
        //     0,
        //     p.height - (player.height * 3.5),
        //     tileSize,
        //     Math.max(player.height * 1.2, 62)
        // );

        // console.log("is the tiles working");



    }

    // function restartGame(){
    //     p.clear();
    //     new p5(chapterOne);
    //     console.log("game started!");
    // }
    function drawPlatformer() {
        p.clear();// clear the screens to avoid overlapping frames

        //time to give up on making the animated background a sprite and try to set the animation as the background in draw!
        //relocate the background animation
        let y = p.height - (pHeight * p.width / 1900) / 2;
        //p.animation(backgroundLevelOneAni, p.width / 2-100, y);//not plus or minus what number
        let imageH = backgroundLevelOneAni[0].height;
        let imageW = backgroundLevelOneAni[0].width;
        //let scaleFactor = p.width / backgroundLevelOneAni[0].width;
        backgroundLevelOneAni.scale = 1;
        p.scale(800 / 2000);
        p.animation(backgroundLevelOneAni, 600, 200);//not plus or minus what number
        backgroundLevelOneAni.frameDelay = 50;//animation play speed


        console.log("this is player y", player.y);

        player.debug = p.mouse.pressing();//what does it do? i copied it from the library

        player.rotation = 0;//reset rotation. make her stand straight
        //player.rotateToDirection = false;
        console.log(player.x);

        //if won
        if (ifWon) {
            p.remove();
            new p5(chapterTwo);
        }

        //if lose

        if (ifLose) {
            console.log('You lose! please try again!');
            //clear bricks
            orangeBricks.removeAll();
            greenBricks.removeAll();
            player.remove();

            p.clear();
            p.background('black');
            p.fill('white');
            p.textSize(32);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("Game over! ", 400, 300);

            // if (p.kb.pressing('r')){
            //     restartGame();
            // }



        }

        if (player.y > 610) {
            ifLose = true;
            console.log("Oopsies! You fall!");
        }
        if (player.collide(greenBricks) || player.overlap(greenBricks)) {//how to lose
            ifLose = true;
            console.log("player hit a green brick! game over!");
        }
        if (player.x > 950) {//how to win
            console.log('Player is out of bounds: Right edge');
            console.log('player won!')
            ifWon = true;
            player.position.x = p.width; // Reset to the right edge
        }

        //implement the functions. (move right, left, ect)
        if (p.kb.pressing('up') && p.kb.pressing('right')) {
            player.changeAni('jump');
            player.mirror.x = false;//walk the opposite way
            player.velocity.x = xSpeed;

            //player.mirror.x=false;//walk the opposite way

            console.log('up');
            player.velocity.y = -1 * ySpeed;//velocity is set here, might change in the future
            console.log(ySpeed);
        }
        else if (p.kb.pressing('up') && p.kb.pressing('left')) {
            player.changeAni('jump');
            player.mirror.x = true;//walk the opposite way
            player.velocity.x = -1 * xSpeed;

            //player.mirror.x=false;//walk the opposite way

            console.log('up');
            player.velocity.y = -1 * ySpeed;//velocity is set here, might change in the future
            console.log(ySpeed);
        }
        if (p.kb.pressing('left')) {

            //cahnge animation
            player.changeAni('walk');
            player.mirror.x = true;//walk the opposite way

            console.log('left');
            player.velocity.x = -1 * xSpeed;//velocity is set here, might change in the future
        }


        else if (p.kb.pressing('right')) {
            player.changeAni('walk');
            player.mirror.x = false;//walk the opposite way

            console.log('right');
            player.velocity.x = xSpeed;//velocity is set here, might change in the future
        }


        //let me set it this way first. after done, will change it
        else if (p.kb.pressing('up')) {
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

        if (player.velocity.y == 0) { // wait actually im not sure what the floor is called. or what floor even is lol
            //stop falling when on the ground

            //check if idle
            if (player.velocity.x == 0) {
                player.changeAni('idle');
            }
        }

    }


    //CREATE BOTTOM ROW MAP
    // returns an array
    // function createBottomRowMap() {
    //     // let numberOfTiles = Math.ceil(p.width / tileSize);
    //     // let bottomRow = '='.repeat(numberOfTiles);

    //     // //floating rows
    //     // let floatingRows = [];
    //     // let numberOfFloatingRows = 2; //limit to 3 floating rows

    //     // for (let i = 0; i < numberOfFloatingRows; i++) {
    //     //     let floatingRowLength = Math.ceil(numberOfTiles * (0.3 + Math.random() * 0.4));// length 30% - 70% of the width
    //     //     let startPadding = Math.floor(Math.random() * (numberOfTiles - floatingRowLength)); //random start position
    //     //     let floatingRow = " ".repeat(startPadding) + '='.repeat(floatingRowLength) + " ".repeat(numberOfTiles - floatingRowLength - startPadding);
    //     //     floatingRows.push(floatingRow);
    //     //     floatingRows.push()

    //     // }

    //     // //combine floating rows with the bottom row
    //     // mapArray = [...floatingRows.reverse(), bottomRow];
    //     // console.log(mapArray);//keep only the last 4 rows

    //     mapArray = ["...................",
    //         "...................",
    //         "...................",
    //         "...................",
    //         "...................",
    //         "...................",
    //         "...................",
    //         "...................",
    //         "...................",
    //         "...................",

    //     ]
    //     return mapArray; //ensure only 4 are returned
    //     //return ['', '', '', bottomRow];
    // }



    //update canvas size when the window size changed
    function windowResized() {
        resizeCanvas(p.windowWidth, p.windowHeight);
        let mapVerticalOffset = p.height - tileSize * mapArray.length;
        map = new Tiles(
            createBottomRowMap(),
            0,
            p.height - (player.height * 3.5),
            tileSize,
            Math.max(player.height * 1.2, 62)
        );
    }



    function preloadPlatformer() {
        //title screen
        titleScreenAnimation = p.loadAnimation('/assets/screen v2/done-1.png.png', '/assets/screen v2/done-2.png.png', '/assets/screen v2/done-3.png.png', '/assets/screen v2/done-4.png.png', '/assets/screen v2/done-5.png.png', '/assets/screen v2/done-6.png.png', '/assets/screen v2/done-7.png.png', '/assets/screen v2/done-8.png.png', '/assets/screen v2/done-9.png.png', '/assets/screen v2/done-10.png.png', '/assets/screen v2/done-11.png.png', '/assets/screen v2/done-12.png.png', '/assets/screen v2/done-13.png.png', '/assets/screen v2/done-14.png.png', '/assets/screen v2/done-15.png.png', '/assets/screen v2/done-16.png.png', '/assets/screen v2/done-17.png.png', '/assets/screen v2/done-18.png.png', '/assets/screen v2/done-19.png.png', '/assets/screen v2/done-20.png.png', '/assets/screen v2/done-21.png.png', '/assets/screen v2/done-22.png.png', '/assets/screen v2/done-23.png.png');

        //MOVEMENT ANIMATIONS
        //idle animation
        idleAnimation = p.loadAnimation('/assets/idle/idle-1.png.png', '/assets/idle/idle-2.png.png', '/assets/idle/idle-3.png.png', '/assets/idle/idle-4.png.png', '/assets/idle/idle-5.png.png');

        //walk animation
        walkAnimation = p.loadAnimation('/assets/walk/walk-1.png.png', '/assets/walk/walk-2.png.png', '/assets/walk/walk-3.png.png', '/assets/walk/walk-4.png.png');

        //jump animation
        jumpAnimation = p.loadAnimation('/assets/jump/jump1.png', '/assets/jump/jump2.png', '/assets/jump/jump3.png', '/assets/jump/jump4.png', '/assets/jump/jump5.png', '/assets/jump/jump6.png')

        //backgrounds 
        backgroundLevelOneAni = p.loadAnimation('/assets/background/frame 1.png', '/assets/background/frame 2.png', '/assets/background/frame 3.png', '/assets/background/frame 4.png');
        baL1 = p.loadImage('/assets/background/frame 1.png');
        //game blocks and tiles
        brickImg = p.loadImage('/assets/blocksAndTiles/brick.png');
        console.log("brick image", brickImg);
    }


    // window.setUpPlatformer= setUpPlatformer;
    // window.drawPlatformer = drawPlatformer;
    // window.preloadPlatformer = preloadPlatformer;
    p.setup = function setup() {
        setUpPlatformer();
    }
    p.draw = function draw() {
        drawPlatformer();
    }

    p.preload = function preload() {
        preloadPlatformer();
    }
}

let chapterTwo = function (p) {
    let buttonZero;
    let screen=0;

    p.setup = function setup() {
        p.createCanvas(1000, 600);
        p.background('plum');
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(32);

        let storyText = "As Idyllia steps out of the forest, the morning sun bathes her in golden light. Her heart feels lighter, her voice steadier. The echoes of doubt that once haunted her now seem like distant memories. She pauses, takes a deep breath, and sings—softly at first, then louder, freer. For the first time, it’s not about perfection or fear. It’s simply about being herself.";
        let textWidth = p.width * 0.8; // Limit text width to 80% of the canvas width

        p.text(storyText, p.width / 2-400, p.height / 2-250, textWidth, p.height * 0.8);
        buttonZero = document.createElement('button');
        buttonZero.textContent = 'continue';
        buttonZero.style = `position: fixed; top: 90%; left: 50%; transform: translate(-25%,0); padding: 20px; z-index: 1000; color: white; background: rgb(${(Math.floor(p.random() * 255))},${(Math.floor(p.random() * 255))},${(Math.floor(p.random() * 255))})`;
        document.body.append(buttonZero);

        buttonZero.onclick = () => { // this is a function where if buttonZero is clicked, it will jump to the next screen
            screen = 1;
            console.log("buttonZero");
        }
    }
    p.draw = function draw(){
        if (screen==1){
            p.clear();
            p.background("plum");
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(32);
        p.fill(0);
        let textWidth = p.width * 0.8; //
        p.text("Congratulations! You’ve helped Idyllia discover her true voice and overcome her greatest challenge: herself. Remember, the journey wasn’t about finding perfection—it was about embracing imperfection and singing with courage. Thank you for being a part of her story.", p.width / 2-400, p.height / 2 - 250,textWidth, p.height * 0.8);

        }
    }
}




//new p5(chapterZero);
new p5(chapterZero);