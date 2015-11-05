'use strict';

var Game = function (game) {
    this.game = game;
    this.researchControl = new ResearchMissionControl();
};

Game.prototype.reset = function() {
    // Available resources
    this.POPULATION = 1;
    this.OXYGEN = 25;
    this.WATER = 25;
    this.FOOD = 25;
    this.ELECTRICITY = 0;
    this.MONEY = 0;

    // Modifiers
    this.moneyAmount = 1;

    // Deployed facilities and researches
    this.researched = [];
}

Game.prototype.new = function () {
    // Reset the basic resources
    this.reset();

    // Set the timer to calculate resources
    this.timer = this.game.time.events.loop(1000, this.updateResources, this);
};

Game.prototype.startResearch = function(id) {
    // Get the Research object
    var obj = this.researchControl.getResearch(id);
    if (!obj.isBuildable()) return;

    console.log('Start `' + id + '` research.')
    this.researchControl.start(obj);
};

Game.prototype.stopResearch = function(id) {
    var obj = this.researchControl.getResearch(id);
    if (!obj.isInProgress()) return;

    console.log('Stop `' + id + '` research, `' + obj.paid +'` was paid back.')
    this.MONEY += obj.paid;
    this.researchControl.stop(obj);
};

Game.prototype.collect = function() {
    this.MONEY += this.moneyAmount;
};

Game.prototype.updateResources = function() {
    // Basic resource consuption 
    this.OXYGEN -= this.POPULATION;
    this.WATER -= this.POPULATION;
    this.FOOD -= this.POPULATION;
    
    // Other resource consuption
    this.MONEY += this.moneyAmount;

    // Add extras of finished researches
    for (var i = 0; i<this.researchControl.researches.length; i++) {
        var r = this.researchControl.researches[i],
            rb = r.base.resource,
            nb = r.number;

        if (nb==0) continue;
        if ('o' in rb) { this.OXYGEN += nb*rb.o }
        if ('w' in rb) { this.WATER += nb*rb.w }
        if ('f' in rb) { this.FOOD += nb*rb.f }
        if ('e' in rb) { this.ELECTRICITY += nb*rb.e }
    }

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
