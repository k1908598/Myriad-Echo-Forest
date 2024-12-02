
// let mic, recordder, soundFile, amplitude, volume;

// let screen=0;//for switching between screens
// let state =0;
// let idyllia;
// let isGameActive1=false;
// let isGameActive2=false;
// let block;

// let sprite;
// let volumeArray =[];
// let recordInterval=500;//record every half second
// idleAnimation,walkAnimation,jumpAnimation;
// function preload(){
//   /// wait for dune to upload the images
//   idleAnimation = loadAnimation('/assets/idle/idle-1.png.png','/assets/idle/idle-2.png.png','/assets/idle/idle-3.png.png','/assets/idle/idle-4.png.png','/assets/idle/idle-5.png.png');
//   walkAnimation = loadAnimation('/assets/walk/walk-1.png.png','/assets/walk/walk-2.png.png','/assets/walk/walk-3.png.png','/assets/walk/walk-4.png.png');//how do you set this animation faster than idle?
//   jumpAnimation = loadAnimation('/assets/jump/jump1.png', '/assets/jump/jump2.png', '/assets/jump/jump3.png', '/assets/jump/jump4.png', '/assets/jump/jump5.png','/assets/jump/jump6.png');
  
// }

// function setup(){
//   createCanvas(1200,800);
//   background(200);
//   fill(0);
//   block = createButton('Enter Game');
//  // text('Enable mic and click the mouse to bbegin recording',20,20);
//   idyllia = createSprite(400,300,50,50);
//   idyllia.addAnimation('idle',idleAnimation);
//   idyllia.addAnimtion('walk',walkAnimation);
//   idyllia.addAnimation('jump',jumpAnimation);

//   //set animation speed
//   idleAnimation.frameDelay=10;
//   jumpAnimation.frameDelay=5;
//   walkAnimation.frameDelay=7;

//   //now is the audio
//   mic = new p5.AudioIn();
//   mic.start();
//   amplitude = new p5.Amplitude();
//   amplitude.setInput(mic);
  
//   recorder = new p5.SoundRecorder();
//   recorder.setInput(mic);
//   soundFile = new p5.SoundFile();
//   recorder.record(soundFile);

//   //now I have two volumes settings, might need to change the one in the method in the first level
//   setInterval(()=>{
//     volumeArray.push(amplitude.getLevel());
//     console.log('volume:',volumeArray[volumeArray.length-1]);//for debugging
    
//   }, recordInterval);
// }

// function draw(){
//   if(screen==0){
//     background(200);
    
//     block.position(width/2,height/2);
//     fill(0);
//     text('Welcome to the music obstacle game! If you want to play the game, you have to enable the mic and allowed us to record your voice. After game ends, we are going to delete your data. Please click the block in the middle to begin!',20,20);
//     if (block.mousePressed()){
//       screen=1;
//     }
//   }
//   if (screen==1){
//     clear();
//     background(100);
//     text('ready? 3, 2, 1, go!',20,20);
//     setTimeout(()=>{
//       screen=2;},2000);
//     isGameActive1=true;
//   }
//   if (isGameActive1){
//     background(220);//import game background here
//     //
//     getAudioContext.resume();
//     volume = amplitude.getLevel();
//     let size = map(volume, 0, 1, 0, 200);
//     fill(0,255,0);
//     ellipse(width/2, height/2, size, size);// what does ellipse do?

//     fill(0);
//     textSize(16);
//     text('volume: ' + volume.toFixed(2), 10, 20);
    
//     recorder.record(soundFile);
//     //those are all jumps
//     if (volume>0.1&&volume<0.3){
//       idyllia.velocity.y=-2;//it is moving up somehow
//       idyllia.changeAnimation('jump');
//     }
//     if (volume>0.3&&volume<0.5){
//       idyllia.velocity.y=-5;//it is moving up somehow
//       idyllia.changeAnimation('jump');
//     }
//     if (volume>0.5&&volume<0.7){
//       idyllia.velocity.y=-8;
//       idyllia.changeAnimation(jump);
//     }

//     // now are
//     if (keyIsDown(LEFT_ARROW)||keyIsDown(RIGHT_ARROW)){
//       idyllia.changeAnimation('walk');
//       idyllia.velocity.x=keyIsDown(LEFT_ARROW)?-5:5;
//     }
   
//     else{
//       idyllia.velocity.y=0;
//       idyllia.changeAnimation('idle');
//     }
//     //blah blah blan,game ends,first level passed successfully
//     isGameActive1=false;
//     screen=3;
//   }
//   if (screen==3){
//     recorder.stop();//recording stopped
//     //soundFile is saved
//     saveSound(soundFile,'mySound.wav');
    
//     background(200);
//     //level one finished. this is the screen to enter level 2!
//     text('level 1 finished! Now you are going to level 2. Please click the block in the middle to begin!',20,20);
//     block.position(width/2,height/2);
//     if (block.mousePressed()){
//       screen=4;
//     }
//     setTimeout(function(){
//       isGameActive2=true;
//     })
//     text('ready? 3, 2, 1, go!',20,20);
//     setTimeout(()=>{
//       screen=5;},2000);
//   }
//   if (isGameActive2){
//     background(220);
//     //level 2 starts here
//     soundFile.play();
//     //call to level two method--> might need to change the code here
    
    
    
//   }
// }
// let level2speed=[];
// function levelTwoGame(){
//   for (let i=0;i<volumeArray.length;i++){
//     level2speed.push(volumeArray[i]*10);//might adjust it
//   }
//   return level2speed;
// }
// console.log(levelTwoGame());

// function mousePressed(){
//   if (state===0&&mic.enabled){
//     recorder.record(soundFile);
//     text('Recording now!Click to stop.',20,20);
//     state++;
//   }else if (state===1){
//     recorder.stop();
//     background (0,255,0);
//     text('recording stopped. Click to play & save', 20,20);
//     state++;
//   }
//   else if(state===2){
//     soundFile.play();
//     saveSound(soundFile,'mySound.wav');
//     state++;
//   }
// }
// /*TODO: design obstacles for level one
// - figure out how to place the obstacles,collider, blah blah blah
// //TODO: design obstacles for level two
// //TODO: functions for level two:
// //1. speed left or right: based on the recording/volumes on the previous level, how fast the speed is
// --- > an idea: make a list of numbers associated with the volume at each seconds and when using the speed, consult the number that is currently running on.
//     - if (go left){
//     check 
//     }
//     - show the speed volume
//     - morph the recording into "monster sounds," if we have the time.  or is possible
//     - put the recording on loop
// */
