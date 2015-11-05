'use strict';

var Game = function (game) {
    this.game = game;
};

Game.prototype.reset = function() {
    // Available resources
    this.POPULATION = 1;
    this.OXYGEN = 10;
    this.WATER = 10;
    this.FOOD = 10;
    this.ELECTRICITY = 0;
    this.MONEY = 0;

    // Modifiers
    this.money_amount = 1;

    // Deployed facilities on the ground
    this.facilities = [];
}

Game.prototype.new = function () {
    // Reset the basic resources
    this.reset();

    // Set the timer to calculate resources
    this.timer = this.game.time.events.loop(1000, this.updateResources, this);
};

Game.prototype.collect = function() {
    this.MONEY += this.money_amount;
};

Game.prototype.updateResources = function() {
    // Basic resource consuption 
    this.OXYGEN -= this.POPULATION;
    this.WATER -= this.POPULATION;
    this.FOOD -= this.POPULATION;

    for (var i = 0; i++; this.FACILITIES.length) {}

    // Detect game over
    if (this.isGameOver()) this.leave();
};

Game.prototype.isGameOver = function() {
    return (this.OXYGEN < 0 || this.WATER < 0 || this.FOOD < 0);
};

Game.prototype.pause = function () {
    this.game.paused = true;
};

Game.prototype.resume = function () {
    this.game.paused = false;
};

Game.prototype.leave = function () {
    this.game.state.start('gameover');
};
