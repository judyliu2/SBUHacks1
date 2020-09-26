// get a refrence to the canvas and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

// newly spawned objects start at Y=25
var spawnLineY = 1000;

// spawn a new object every 1500ms
var spawnRate = 1500;

// set how fast the objects will fall
var spawnRateOfDescent = 0.50;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var objects = [];

// save the starting time (used to calc elapsed time)
var startTime = Date.now();

// start animating
animate();


function spawnRandomObject() {

  // select a random type for this new object
  var t;

  if (Math.random() < 0.50) {
    t = "red";
  } else {
    t = "blue";
  }

  // create the new object
  var object = {
    // set this objects type
    type: t,
    // set x randomly but at least 15px off the canvas edges
    y: Math.random() * (canvas.width - 30) + 15,
    // set y to start on the line where objects are spawned
    x: spawnLineY,
  }

  // add the new object to the objects[] array
  objects.push(object);
}



function animate() {

  // get the elapsed time
  var time = Date.now();

  // see if its time to spawn a new object
  if (time > (lastSpawn + spawnRate)) {
    lastSpawn = time;
    spawnRandomObject();
  }

  // request another animation frame
  requestAnimationFrame(animate);

  // clear the canvas so all objects can be 
  // redrawn in new positions
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  // move each object down the canvas
  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    object.x -= spawnRateOfDescent;
    ctx.beginPath();
    ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = object.type;
    ctx.fill();
  }

}