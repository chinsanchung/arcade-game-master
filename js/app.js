// Enemies our player must avoid
let Enemy = function (x, y, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function (dt) {
  if (this.x > 500) {
    this.x = -50;
  }
  this.x += dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let enemyY = [60, 140, 220, 60]
let enemySpeed = [200, 300, 250, 350]
let allEnemies = [];

for (let i = 0; i < enemyY.length; i++) {
  let enemy = new Enemy(-50, enemyY[i], enemySpeed[i]);
  allEnemies.push(enemy);
}

let Player = function () {
  this.sprite = 'images/char-boy.png'
  this.x = 200;
  this.y = 380;
};


Player.prototype.handleInput = function (Keys) {
  if ((Keys === 'left') && (this.x > 0)) {
    this.x = this.x - 100;
  } else if ((Keys === 'down') && (this.y < 380)) {
    /* If this.y + 100 and this.y - 100, function win() doesn't work perfectly.
      it doesn't executed at water. */
    this.y = this.y + 80;
  } else if ((Keys === 'right') && (this.x < 380)) {
    this.x = this.x + 100;
  } else if ((Keys === 'up') && (this.y > 0)) {
    this.y = this.y - 80;
  }
}

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/* It is used to get failed result. */
let num = 0;

function result() {
  if (player.y <= 0) {
    swal({
      title: 'Success!',
      text: `You win!`,
      type: 'success',
    });
    //reset arcade game.
    player.x = 200;
    player.y = 380;
    num = 0;
  } else if (num > 4) {
    swal({
      title: 'Failed!',
      text: `You failed. Press button to try again.`,
      type: 'error',
    });
    //reset arcade game.
    player.x = 200;
    player.y = 380;
    num = 0;
  }
}
/* This function has problem. It works sometimes well, and sometimes doesn't work.
  And it excutes even if player and enemy haven't met. */
function checkCollision() {
  if ((player.y === allEnemies[0].y) && (player.x === allEnemies[0].x)) {
    player.x = 200;
    player.y = 380;
    num += 1;
    console.log(`num : ${num} , enemy : ${allEnemies[0].y}`);
  }
  if ((player.y === allEnemies[1].y) && (player.x === allEnemies[1].x)) {
    player.x = 200;
    player.y = 380;
    num += 1;
    console.log(`num : ${num} , enemy : ${allEnemies[1].y}`);
  }
  if ((player.y === allEnemies[2].y) && (player.x === allEnemies[2].x)) {
    player.x = 200;
    player.y = 380;
    num += 1;
    console.log(`num : ${num} , enemy : ${allEnemies[2].y}`);
  }
  if ((player.y === allEnemies[3].y) && (player.x === allEnemies[3].x)) {
    player.x = 200;
    player.y = 380;
    num += 1;
    console.log(`num : ${num} , enemy : ${allEnemies[3].y}`);
  }
};

Player.prototype.update= function () {
  checkCollision();
  result();
};

// Place the player object in a variable called player
const player = new Player();

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
