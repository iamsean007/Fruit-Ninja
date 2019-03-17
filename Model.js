//        MODEL

//contains all different fruit and bombs, will get used to render each fruit
var game_obj_Array = [];

// array listing all the object(Fruits, Bombs, effects and gameover) types used by the game
var fruit_types = ["apple", "orange", "pear", "watermellon", "strawberry",
                "bomb","fruitexplosion", "bombexplosion", "gameover"];

// object mapping type name strings to corresponding image objects
var fruit_images = {
    getImage : function(type) { return this[type]} };
for(var i = 0; i < fruit_types.length; i++) {
    fruit_images[fruit_types[i]] = new Image();
    fruit_images[fruit_types[i]].src = "images/Fruits_Bombs/".concat(fruit_types[i]).concat(".png");
}

/****************************
* Object Management

* baseFruit: Creates a fruit obj with 
    Radius (default val - 50),
    acceleration in X co-ords direction, (default - 0), and 
    accelaration in Y co-ords direction, (default - 0.07).
*****************************/
var baseFruit = {
    radius: 50,
    accelX: 0,
    accelY: 0.07,

}

/***************************
* Constructors
****************************/

/**
* co_ords : Make a 2d coordinate object
  Input : X and Y direction co-ordinates
  Output: Object with the passed X, Y co-ords
**/
function co_ords(xCoord, yCoord){
    return {
        x_cord : xCoord,
        y_cord : yCoord
    };
};

/* Simpler Object Constructor for fruit
 * Input: 
    * type (string) : fruit type
    * x (number) : x position
    * y (number) : y position
    * velocityX (number) : change in x every frame
    * velocityY (number) : change in y every frame
 * Output: Object of passed type with the passed values
*/
function obj_factory_base(e_type, e_x, e_y, e_velocityX, e_velocityY) {
    return obj_factory(e_type, baseFruit.radius, e_x, e_y, e_velocityX, e_velocityY,
        baseFruit.accelX, baseFruit.accelY);
}


/* Object Constructor for fruit
 * Input: 
    * type (string) : fruit type
    * radius (number) : fruit radius
    * x (number) : x position
    * y (number) : y position
    * velocityX (number) : change in x every frame
    * velocityY (number) : change in y every frame
    * accelX (number) : change in velocityX every frame
    * accelY (number) : change in velocityY every frame
*/
function obj_factory(e_type, e_radius, e_x, e_y, e_velocityX, e_velocityY, e_accelX, e_accelY){
    return {
        co_ords : co_ords(e_x, e_y),
        angular2d : angular2d(0,0),
        type: e_type,
        alpha : 1,
        radius: e_radius,
        priority: 3, 
        velocityX: e_velocityX,
        velocityY:e_velocityY,
        accelX:e_accelX,
        accelY:e_accelY

    };
}

/**
 * angular2d: Helper method to set angle and velocity of an object
 
*/
function angular2d(e_angle, e_velocityA){
    return {
        angle : e_angle,
        velocityA : e_velocityA
    };
}

//______________________________________

