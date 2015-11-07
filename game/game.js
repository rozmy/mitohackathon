'use strict';

var Game = function (game) {
    this.game = game;
    this.techTreeIsGenerated = false;
};

Game.prototype.reset = function() {
    // Max ammount of resource
    this.MAXIMUM = {
        w: 150,
        o: 150,
        f: 150,
        e: 150
    }

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

    // Update the resource bars in the stat
    if (!this.techTreeIsGenerated) {
        this.game.stats.generateTechItems();
        this.techTreeIsGenerated = true;
    }
    this.game.stats.initEvents();
    this.game.stats.refreshTechItemsDetails();
    this.game.stats.refreshTechItemsStatusAndPrice();

    // Set the timer to calculate resources
    this.timer = this.game.time.events.loop(1000, this.updateResources, this);
};

Game.prototype.startResearch = function(id) {
    // Get the Research object
    var obj = this.researchControl.getResearch(id);
    if (!obj.isBuildable()) return false;

    console.log('Start `' + id + '` research.')
    this.researchControl.start(obj);
    return true;
};

Game.prototype.stopResearch = function(id) {
    var obj = this.researchControl.getResearch(id);
    if (!obj.isInProgress()) return false;

    console.log('Stop `' + id + '` research, `' + obj.paid +'` was paid back.')
    this.MONEY += obj.paid;
    this.researchControl.stop(obj);
    return true;
};

Game.prototype.launchResearch = function(id) {
    var obj = this.researchControl.getResearch(id);
    if (!obj.isLaunchable()) return false;

    console.log('Launch `' + id + '` research, `, another research is available.')
    this.researchControl.launch(obj);
    return true;
};

Game.prototype.deployResearch = function(id) {
    var obj = this.researchControl.getResearch(id);

    console.log('Deploy `' + id + '` research, `, gathering new resources.')
    this.researchControl.deploy(obj);
    
    // Deploy silos
    if ('mF' in obj.base.resource) this.MAXIMUM.f += obj.base.resource.mF;
    if ('mO' in obj.base.resource) this.MAXIMUM.o += obj.base.resource.mO;
    if ('mE' in obj.base.resource) this.MAXIMUM.e += obj.base.resource.mE;
    if ('mW' in obj.base.resource) this.MAXIMUM.w += obj.base.resource.mW;
};

Game.prototype.destroyResearch = function(id) {
    var obj = this.researchControl.getResearch(id);

    console.log('Destroyed a `' + id + '` research, `, losing resources.')
    this.researchControl.destroy(obj);
};

Game.prototype.collect = function() {
    this.MONEY += this.moneyAmount;
};

Game.prototype.getEnergyConsuption = function() {
    var energyConsuption = 0;
    for (var i = 0; i<this.researchControl.researches.length; i++) {
        var r = this.researchControl.researches[i],
            rb = r.base.resource,
            nb = r.number;
        
            if (nb==0) continue;
            if ('e' in rb) energyConsuption += nb*rb.e;
    }
    return energyConsuption;
};

Game.prototype.updateResources = function() {
    // Basic resource consuption
    this.OXYGEN -= this.POPULATION;
    this.WATER -= this.POPULATION;
    this.FOOD -= this.POPULATION;

    // Other resource gathering
    this.MONEY += this.moneyAmount;

    // Calculate electricity.
    var energyConsuption = this.getEnergyConsuption();
    this.ELECTRICITY += energyConsuption;
    this.ELECTRICITY = Math.min(this.ELECTRICITY, this.MAXIMUM.e);
    this.ELECTRICITY = Math.max(0, this.ELECTRICITY);

    // Add extras of finished researches
    for (var i = 0; i<this.researchControl.researches.length; i++) {
        var r = this.researchControl.researches[i],
            rb = r.base.resource,
            nb = r.number;

        r.disabled = ('e' in rb && this.ELECTRICITY == 0 && energyConsuption < 0);

        if (nb==0) continue;
        if (r.disabled) continue;

        if ('o' in rb) { this.OXYGEN += nb*rb.o }
        if ('w' in rb) { this.WATER += nb*rb.w }
        if ('f' in rb) { this.FOOD += nb*rb.f }
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
        if (r.paid == r.getPrice()) {
            console.log('Finished `' + r.base.id + '` research.');
            this.game.stats.changeTechItemLaunchable(r.base.id);
            r.finish();
        }
    }

    // Apply maximum resource filter
    this.OXYGEN = Math.min(this.OXYGEN, this.MAXIMUM.o);
    this.WATER = Math.min(this.WATER, this.MAXIMUM.w);
    this.FOOD = Math.min(this.FOOD, this.MAXIMUM.f);

    // Update stat interface
    this.game.stats.update();

    // Detect game over
    if (this.isGameOver()) this.leave();
};

Game.prototype.isGameOver = function() {
    return (this.OXYGEN < 0 || this.WATER < 0 || this.FOOD < 0);
};

Game.prototype.isPaused = function() {
    return this.game.paused;
}
Game.prototype.pause = function () {
    this.game.paused = true;
};

Game.prototype.resume = function () {
    this.game.paused = false;
};

Game.prototype.leave = function () {
    this.game.stats.showGameOver();
};

Game.prototype.restart = function () {
    this.game.stats.hideGameOver();
    this.game.state.start('lander');
};

