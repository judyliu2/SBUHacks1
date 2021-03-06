var char;
function startGame() {
  char = new makeCharacter(100, 180, "gray", 0, 0, 1);
  char.initializeCharacter();
  game.start();
}

var game = {
  canvas: document.getElementById("canvas"),
  //canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1440;
    this.canvas.height = 1080;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGame, 50);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};
function withinBounds(aList, num) {
  if (aList[0] < num && num < aList[1]) {
    return true;
  }
  return false;
}

function printMousePos(event) {
  xOffset = 50;
  yOffset = 50;
  alert([event.x, event.y] + "\n char dude x:" + [char.x + xOffset, char.x + xOffset + char.width]
    + "  y:" + [char.y + yOffset, char.y + yOffset + char.height]);
  if (withinBounds([char.x + xOffset, char.x + xOffset + char.width], event.x)
    && withinBounds([char.y + yOffset, char.y + yOffset + char.height], event.y)) {
    alert("got");
  }
}

function withinBounds(aList, num) {
  if (aList[0] < num && num < aList[1]) {
    return true;
  }
  return false;
}

document.addEventListener("click", printMousePos);



/*         Character Creation        */

function makeCharacter(width, height, color, x, y, size) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.health = 100;
  this.frame = 4;
  this.hasCollided = false;
  this.images = [];

  this.initializeCharacter = function () {
    for (var i = 0; i < 5; i++) {
      this.images[i] = new Image();
      this.images[i].src = "00" + i + ".png";
    }
  };

  this.update = function () {
<<<<<<< HEAD
    objects.forEach((ele) => this.overlap(ele));
=======
    objects.forEach(ele => this.overlap(ele));
>>>>>>> noble
    ctx = game.context;
    ctx.drawImage(this.images[this.frame], this.x, this.y);
  };

  this.overlap = function (obj) {
    //console.log(obj.x);
    xOffset = 50;
    yOffset = 50;
    charXRange = [char.x + xOffset, char.x + xOffset + char.width];
    charYRange = [char.y + yOffset, char.y + yOffset + char.height];
    topLeft =
      withinBounds(charXRange, obj.x) && withinBounds(charYRange, obj.y);
    topRight =
      withinBounds(charXRange, obj.x + 50) && withinBounds(charYRange, obj.y);
    bottomLeft =
      withinBounds(charXRange, obj.x) && withinBounds(charYRange, obj.y + 50);
    bottomRight =
      withinBounds(charXRange, obj.x + 50) &&
      withinBounds(charYRange, obj.y + 50);
    if (
      (topLeft || topRight || bottomLeft || bottomRight) &&
      !this.hasCollided
    ) {
      alert("collided");
      this.hasCollided = true;
    }
  };

  this.die = function () {
    if (this.health === 0 || this.health < 0) {
      alert("dead");
    }
  };
}

function updateGame() {
  game.clear();
  char.update();
  char.die();
}

function moveup() {
  if (char.y > 0) {
    char.y -= 5;
    char.frame = (char.frame + 1) % 5;
  }
}

function movedown() {
  if (char.y < canvas.height - 240) {
    char.y += 5;
    char.frame = (char.frame + 1) % 5;
  }
}

function moveleft() {
  if (char.x > 0) {
    char.x -= 5;
    char.frame = (char.frame + 1) % 5;
  }
}

function moveright() {
  if (char.x < canvas.width - 200) {
    char.x += 5;
    char.frame = (char.frame + 1) % 5;
  }
}

document.onkeydown = function (e) {
  switch (e.key) {
    case "ArrowLeft": //left
      moveleft();
      break;
    case "ArrowUp": //up
      moveup();
      break;
    case "ArrowRight": //right
      moveright();
      break;
    case "ArrowDown": //down
      movedown();
      break;
    case "w":
      moveup();
      break;
    case "a":
      moveleft();
      break;
    case "s":
      movedown();
      break;
    case "d":
      moveright();
      break;
  }
  //console.log(e);
};

function homepage() {
  location.href = "index.html";
}



/*         Object Creation        */

// newly spawned objects start at Y=25
var spawnLineY = 1500;

// spawn a new object every 1500ms
var spawnRate = 1500;

// set how fast the objects will fall
var spawnRateOfDescent = 0.5;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var objects = [];

// save the starting time (used to calc elapsed time)
var startTime = Date.now();

var mask = new Image();
mask.src = "SBH_mask.png";

var rona = new Image();
rona.src = "SBH_covid3.png";

// start animating
animate();

function spawnRandomObject() {
  // select a random type for this new object
  var t;

  if (Math.random() < 0.5) {
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
  };

  // add the new object to the objects[] array
  objects.push(object);
}

function animate() {
  // get the elapsed time
  var time = Date.now();

  // see if its time to spawn a new object
  if (time > lastSpawn + spawnRate) {
    lastSpawn = time;
    spawnRandomObject();
  }

  //char.update();
  // request another animation frame
  requestAnimationFrame(animate);

  // clear the canvas so all objects can be
  // redrawn in new positions
  ctx = game.context;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  char.update();
  // move each object down the canvas
  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    object.x -= spawnRateOfDescent;
    ctx.beginPath();
    //ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
    ctx.closePath();
    if (object.type === "blue") {
      ctx.drawImage(mask, object.x, object.y, 100, 100);
    } else {
      ctx.drawImage(rona, object.x, object.y, 100, 100);
    }
    //ctx.fillStyle = object.type;
    ctx.fill();
  }
}