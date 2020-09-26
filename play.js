var char;
function startGame() {
  char = new makeCharacter(30, 30, "#000000", 510, 300, 1);
  game.start();
}
var game = {
  canvas: document.createElement("canvas"),
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
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  this.overlap = function (obj) {
    if (
      (this.x > obj.x && this.x < obj.x + obj.width) ||
      (this.y > obj.y && this.y < obj.y + obj.height)
    ) {
      alert("OVELAP");
    }
  };

  this.die = function () { };
}

function updateGame() {
  game.clear();
  char.update();
  char.overlap(box);
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
  switch (e.keyCode) {
    case 37: //left
      moveleft();
      break;
    case 38: //up
      moveup();
      break;
    case 39: //right
      moveright();
      break;
    case 40: //down
      movedown();
      break;
  }
};

