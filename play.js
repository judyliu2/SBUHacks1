var char;
function startGame() {
  char = new makeCharacter(200, 200, "gray", 510, 300, 1);
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

function makeCharacter(width, height, color, x, y, size) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = game.context;
    //ctx.fillStyle = color;
    var img = new Image();
    img.src = "SBH_RUN_RIGHT.gif";
    //var gif = new GIF();
    //gif.load("SBH_RUN.gif");
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
    //ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  this.overlap = function (obj) {
    if (
      (this.x > obj.x && this.x < obj.x + obj.width) ||
      (this.y > obj.y && this.y < obj.y + obj.height)
    ) {
      alert("OVELAP");
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

//cant move backwards
function moveup() {
  if (char.y > 0) {
    char.y -= 10;
  }
}

function movedown() {
  char.y += 10;
}

function moveleft() {
  char.x -= 10;
}

function moveright() {
  char.x += 10;
}

document.onkeydown = function (e) {
  switch (e.code) {
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
  }
  console.log(e);
};

function homepage() {
  location.href = "index.html";
}

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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  char.update();
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
