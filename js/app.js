// Enemies our player must avoid
var intro = alert(
    'Hello Hero...You have been chosen for a task in which many have failed.' +
    'The princess is being held captive by the evil enemy bugs.' +
    'You must cross the lines of enemy bugs to save the princess.' +
    'Good Luck on your journey brave hero.'
);

var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 171;
    this.speed = Math.floor(100 + (Math.random() * 425));
    this.sprite = 'images/enemy-bug.png';

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = Math.random() * -600;
    }
};
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var allEnemies = [
    new Enemy(30, 150),
    new Enemy(150, 100),
    new Enemy(300, 200),
    new Enemy(400, 200),
    new Enemy(75, 100)
];

var Princess = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';
};

Princess.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Princess.prototype.update = function(dt) {
    // no op
};

var princess = new Princess(400, 0);


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 171;
    this.sprite = 'images/char-boy.png';

};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 75 &&
            this.x + 75 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 75 &&
            this.y + 75 > allEnemies[i].y) {
            alert('You Died trying to save the Princess...Try Again');
            this.reset();
        }
    }
};

Player.prototype.update = function(dt) {
    this.checkCollisions();
};

var player = new Player(200, 400);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.handleInput = function(keys) {
    //Allows user to use arrow keys to move player.
    switch (keys) {
        case 'left':
            (this.x -= 101);
            console.log('left');
            break;
        case 'right':
            (this.x += 101);
            console.log('right');
            break;
        case 'up':
            (this.y -= 83);
            console.log('up');
            break;
        case 'down':
            (this.y += 83);
            console.log('down');
            break;
    }

    //if statement that creates player boundries and alerts them they have won.

    if (this.x > 400) { //right
        this.x = 400;
    } else if (this.y > 400) { //down
        this.y = 400;
    } else if (this.x < 0) { //left
        this.x = 0;
    } else if (this.y < 0) { //up
        this.y = 0;
    }
    if (this.y === 0 && this.x === 400) {
        alert('Princess: "My Hero!!!  You are so brave!  Those evil bugs have kept me prisoner here for decades!  How can I ever repay you?"');
        this.reset();
    }
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
