'use strict';

var Game = function (game) {
    this.game = game;
};

Game.prototype.reset = function() {
    // Available resources
    this.POPULATION = 1;
    this.OXYGEN = 90;
    this.WATER = 90;
    this.FOOD = 90;
    this.ELECTRICITY = 0;
    this.MONEY = 0;

    // Modifiers
    this.moneyAmount = 1;
    
    // Others
    this.researchControl = new ResearchMissionControl();
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

Game.prototype.launchResearch = function(id) {
    var obj = this.researchControl.getResearch(id);
    if (!obj.isLaunchable()) return;

    console.log('Launch `' + id + '` research, `, another research is available.')
    this.researchControl.launch(obj);
};

Game.prototype.deployResearch = function(id) {
    var obj = this.researchControl.getResearch(id);

    console.log('Deploy `' + id + '` research, `, gathering new resources.')
    this.researchControl.deploy(obj);
};

Game.prototype.destroyResearch = function(id) {
    var obj = this.researchControl.getResearch(id);

    console.log('Destroyed a `' + id + '` research, `, losing resources.')
    this.researchControl.destroy(obj);
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

    // Pay incompleted researches
    for (var i = 0; i<this.researchControl.researches.length; i++) {
        var r = this.researchControl.researches[i];
        
        if (r.status != IN_PROGRESS) continue;
        if (this.MONEY == 0) break;
        
        // Pay for the research
        r.paid++;
        this.MONEY--;

        // Make it launchable.
        if (r.paid == r.getPrice()) r.finish();
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
