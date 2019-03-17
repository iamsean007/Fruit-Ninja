//            VIEW


/*******************
* Animation 
********************/
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvasBounds = canvas.getBoundingClientRect();

// clear all drawn objects from canvas
function clearCanvas(){
    ctx.clearRect(0, 0, canvasBounds.width, canvasBounds.height);
}

// draw an object
function drawObject(object){
    var offset = object.radius * 2;
    ctx.save();
    ctx.globalAlpha = object.alpha;
    ctx.translate(object.co_ords.x_cord, object.co_ords.y_cord);
    ctx.rotate(object.angular2d.angle);
    ctx.drawImage(fruit_images.getImage(object.type), -object.radius, -object.radius, offset, offset);
    ctx.restore();
}

//do one frame iteration
function doFrame() {
    updateAllObject2d();
     drawAllObject();
}

//draw all objects in array
function drawAllObject(){
    clearCanvas();
    for(var i = 0; i < game_obj_Array.length; i++){
        drawObject(game_obj_Array[i]);
    }
}

//@@@@@@@@@@@ EVENTS
//adding Event Listener on the canvas to fire clickCheck function on user click
document.getElementById("myCanvas").addEventListener('mousedown', clickCheck);

/** User Scores.
*/
var userScore = document.getElementById("Score");
userScore = 00; // default - 00


var FRAMERATE = 1000/60;
var animation;
var timer;
var timeInSec;


//New game Button 
var newGameBtn = document.getElementById("newGameButton");
var cancelGameBtn = document.getElementById("cancelGameButton");

//New Game Button click will fire timer and animation
newGameBtn.addEventListener("click", startNewGame);

//Cancel Button click will fire timer and animation
cancelGameBtn.addEventListener("click", endGame);

//hiding cancel game button at the beginning 
$('#cancelGameButton').hide();


function endGame(){ 
    $('#cancelGameButton').hide();
    $('#newGameButton').show();
    initialize();  
    addObject(obj_factory("gameover", 200, canvasBounds.width / 2 ,canvasBounds.height / 2,
                            0, 0, 0, 0)); 
    
    $.stopSound();
    //play the sound
    $.playSound('audio/Game-over.wav');
    
    doFrame(); //do one frame. 
    
}


function startNewGame(){ 
    
    $('#newGameButton').hide();
    $('#cancelGameButton').show();
    
    initialize(); 
    
    
    //play the sound
    $.playSound('audio/Game-start.wav');
    
    //***** animation code 
    animation = setInterval(gameAnimation, FRAMERATE); 
    //* SetInterval: calls a function or evaluates an expression at specified intervals (in milliseconds) 
    //    & will continue calling the function until clearInterval() is called, or the window is closed
    
    //***** timer code
    timer = setInterval(myTimer ,1000); 
}

//Initialize the default value for variable, timer and score, empties game obj array
function initialize() {
    
    counter = 0;
    stopLoops(); //to reset back the score and time. to 0 
    
    //set timer to 60 Seconds
    timeInSec = 15;
    document.getElementById("Time").innerHTML = "Time: " + timeInSec;
    
    //set score to zero
    userScore = 0;
    document.getElementById("Score").innerHTML = "Score: " + userScore;
    
    //empty the object array.
    game_obj_Array = [];
    
}

//Stops the time and animation loop
function stopLoops(){
    //stop the execution
    clearInterval(timer);
    clearInterval(animation);
}


//Starts the timer for 60 seconds
function myTimer() {
    document.getElementById("Time").innerHTML ="Time: " + timeInSec;
    if (timeInSec<=0){ //clear the game when timer is up
        clearInterval(timer);
        clearInterval(animation);
        game_obj_Array.splice(0,game_obj_Array.length);
        addObject(obj_factory("gameover", 200, canvasBounds.width / 2 ,canvasBounds.height / 2,
                            0, 0, 0, 0));
        $('#cancelGameButton').hide();
        $('#newGameButton').show();
        doFrame();
    }
    if(timeInSec == 10){
        //play the sound
        $.playSound('audio/10Seconds.mp3');
        
    }
    if(timeInSec<10 && timeInSec>=0){
        
        document.getElementById("Time").innerHTML ="Time: " + "0"+timeInSec;
    }

    timeInSec--;
}

//view
// set a var to be equal to id of canvas
var elem = document.getElementById("myCanvas");


var counter = 0;

//view
// Animation part 
function gameAnimation( ){
    counter++;
    if (counter>=60){
        counter= randomIntFromInterval(0,40);
        //1. Set x,y to be either a or b position.
        /**
         * A pos be a rand pos b/w -10 to 0 & c.height/2 to c.height.
         * B pos be a rand pos b/w c.width to +10 & c.height/2 to c.height.
        */
        var a = co_ords(randomIntFromInterval(-10,0),
                randomIntFromInterval(canvasBounds.height/2, canvasBounds.height));
        var b = co_ords(randomIntFromInterval(canvasBounds.width,canvasBounds.width+10),
                  randomIntFromInterval(canvasBounds.height/2, canvasBounds.height));

        //2. Construct random object and add it to array
        game_obj_Array.push(randObj(a,b)); //model

    }
    //call a method to draw these objects.
    doFrame(); //view
}

document.getElementById("Score").innerHTML ="Score: " + userScore;

//not getting used right now 
function addSample() {
var thing1 = obj_factory("hammer", 50, -50, 500, 5, -20, 0, 1);
var thing2 = obj_factory("jackhammer", 40, 500, 0, 0, 0, 10, 0);
var thing3 = obj_factory("sledgehammer", 50, 50, 100, 0, 0, 10, -2);
var thing4 = obj_factory("mjolnir", 50, 50, 250, 5, 5, 0, 0);

addObject(thing1);
addObject(thing2);
addObject(thing3);
addObject(thing4);
}


//fired when a touch point is placed on the touch surface.
//For the Mobile Screen

//Sound Effects for the POP.

