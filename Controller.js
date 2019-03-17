//                  CONTROLLER


//c
//add object to render array, sorted by priority
function addObject(object) {
    if(game_obj_Array.length === 0){
        game_obj_Array[0] = object;
        return;
    }
    for (var i = game_obj_Array.length - 1; i >= 0; i--){
        if(game_obj_Array[i].priority <= object.priority || i === 0){
            game_obj_Array.splice(i, 0, object);
            return;
        }
    }
}

//c
// remove object at specified index from the render array
function removeObject(index){
    game_obj_Array.splice(index, 1);
}


/*******************
* Physics //c
********************/
var garbage = [];
//do one physics iteration, and delete out of bounds objects
function updateAllObject2d() {
    garbage = [];

    for (var i = 0; i < game_obj_Array.length; i++) {
            var object = game_obj_Array[i];
            updateObject2d(object);
            if(typeof object.onFrame === 'function'){
                object.onFrame(i);
            }
            if(outOfBounds(object)){
                //console.log("garbage Object "+ garbage.push(i));
                garbage.push(i);
            }
    }
    for (var j = garbage.length-1; j >= 0; j--) {
        removeObject(garbage[j]);
    }
}

function updateObject2d(object) {
    object.velocityX += object.accelX;
    object.velocityY += object.accelY;
    object.co_ords.x_cord += object.velocityX;
    object.co_ords.y_cord += object.velocityY;
    object.angular2d.angle += object.angular2d.velocityA;
}

function outOfBounds(object){
    if(object.co_ords.x_cord + object.radius < 0 || object.co_ords.x_cord - object.radius > canvasBounds.width
    ||object.co_ords.y_cord + object.radius < 0 || object.co_ords.y_cord - object.radius > canvasBounds.height) {
        return true;
    }
    return false;
}





function explosion(e_type, e_x, e_y){
    var obj = obj_factory(e_type + "explosion", 100, e_x, e_y, 0, 0, 0, 0);
    obj.angular2d.angle = Math.random * 2 * Math.PI;
    obj.priority = 2;
    obj.onFrame = function(i) {
        console.log("explodeframe");
        this.alpha -= .01;
        if(this.alpha <=0){
            garbage.push(i);
        }
    };
    return obj;
}

/** randomize b/w min/max (Utility method)
*/
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

/**
* randObj(a,b) : Generates random fruits based on the random numbers.
*/
function randObj(a_point,b_point){

    obj = obj_factory_base("fruit", 0, 0, 4 + Math.random() * 5, -5);
    //if it's at pos B then reverse the vel.
    if(Math.random()<.5){
        obj.co_ords.x_cord = b_point.x_cord;
        obj.co_ords.y_cord = b_point.y_cord;
        oppVel(obj);
    }
    else{
        obj.co_ords.x_cord = a_point.x_cord;
        obj.co_ords.y_cord = a_point.y_cord;
    }

    if(Math.random() > .8){
        obj.type  = "bomb";
    }
    else{
        obj.type  = randFruitType(fruit_types); //
    }
    var avelocity = Math.PI/120 + Math.random() * Math.PI / 60;
    
    if(Math.random() > .5) {
      avelocity *= -1;
    }
    
    obj.angular2d = angular2d(Math.random() * 2 * Math.PI, avelocity);
    
    return obj;
}

function oppVel(obj){
    obj.velocityX= -obj.velocityX;
}

//controller
/**
* randFruitType(array)
*
*/
function randFruitType(fruitArr){

    if (Math.random() <.2){
        return fruitArr[0];
    }
    else if(Math.random() <.4){
        return fruitArr[1];
    }
    else if(Math.random() <.6){
        return fruitArr[2];
    }
    else if(Math.random() <.8){
        return fruitArr[3];
    }
    else{
        return fruitArr[4];
    }
}




/** function that checks all the elem in array to check whether they got clicked or not and change the score likewise.

//controller
*/
function clickCheck(event){
    
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    //getting the x and y point of user click
    var px = event.x - canvasBounds.left;
    var py = event.y - canvasBounds.top + 35;
    
    

    
    //checking the array elem on these px py points and changing the score accordingly.
    arrayCheck(px, py, game_obj_Array); //returns a boolean
}

// return true if the rectangle and circle are colliding
function RectCircleColliding(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
//    alert('T: ' + dx*dx+dy*dy<=(circle.r*circle.r) );
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}
        
//controller
/** function that check passed values on all elements in array1
 */
function arrayCheck(x_value, y_value, elem_arr){

    for (var i=elem_arr.length-1; i>=0; i--){
        var elem = elem_arr[i];
        //check if it is a circle or a rectangle..
        //if circle
        var cen_x = elem.co_ords.x_cord;
        var cen_y = elem.co_ords.y_cord;
        
        var radii = elem.radius;
        var len = length(cen_x, cen_y, x_value, y_value);
        
        
//        alert( "X, Y, R, Len -> " + cen_x + ", " + cen_y + ", " + radii + ", " + len);
        
        
        
        var circle={x:x_value,y:y_value,r:20};
//        
//        ctx.beginPath();
//        ctx.arc(circle.x, circle.y, 20, 0, 2 * Math.PI);
//        ctx.stroke();
//


//        alert("cX, cY = " + x_value + ", " + y_value);
        
        
        var rect={x:cen_x-radii,y:cen_y-radii,w:radii*2,h:radii*2};
        
//        ctx.beginPath();
//        ctx.rect(rect.x, rect.y, rect.w, rect.h);
//        ctx.stroke();
//        

//        clearInterval(animation);
        
        
        if(RectCircleColliding(circle, rect)){
//            alert('touched!');
            elem.is_touched = true;

            if (elem.type===fruit_types[0] || elem.type===fruit_types[1] || elem.type === fruit_types[2] ||
                elem.type===fruit_types[3] || elem.type===fruit_types[4] ){
                //Increment the score
                userScore+=10;
                document.getElementById("Score").innerHTML ="Score: " + userScore;
                removeObject(i);
                addObject(explosion("fruit", cen_x, cen_y));
                break;
            }
            else if(elem.type==="bomb"){//decrement the score and change the image
                userScore-=10;
                document.getElementById("Score").innerHTML ="Score: " + userScore;
                removeObject(i);
                addObject(explosion("bomb", cen_x, cen_y));
                break;
            }
        }
        
//        if(len<radii) {
//            elem.is_touched = true;
//
//            if (elem.type===fruit_types[0] || elem.type===fruit_types[1] || elem.type === fruit_types[2] ||
//                elem.type===fruit_types[3] || elem.type===fruit_types[4] ){
//                //Increment the score
//                userScore+=10;
//                document.getElementById("Score").innerHTML ="Score: " + userScore;
//                removeObject(i);
//                addObject(explosion("fruit", cen_x, cen_y));
//                break;
//            }
//            else if(elem.type==="bomb"){//decrement the score and change the image
//                userScore-=10;
//                document.getElementById("Score").innerHTML ="Score: " + userScore;
//                removeObject(i);
//                addObject(explosion("bomb", cen_x, cen_y));
//                break;
//            }
//        }
    }
}

function length(x1, y1, x2, y2){

    var a = (x2-x1);
    var b = (y2-y1);
    return( Math.sqrt( Math.pow(a,2) + Math.pow(b,2) ) );
}
