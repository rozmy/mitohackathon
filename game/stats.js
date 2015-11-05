'use strict';

function Stats(game) {
    this.game = game;
}

Stats.prototype = {
    init: function() {

        this.collectMoneyButton = document.querySelector('.collectMoneyButton');

        this.oxygen = document.querySelector('.oxygenAmount');
        this.water = document.querySelector('.waterAmount');
        this.food = document.querySelector('.foodAmount');
        this.electricity = document.querySelector('.electricityAmount');
        this.money = document.querySelector('.moneyAmount');
        this.stuff = document.querySelector('.stuffAmount');

        // TODO move to resource sg
        this.startBtn = document.querySelector('.startResearchButton');
        this.startBtn.addEventListener('click', this.startResearchButton.bind(this));

        this.stopBtn = document.querySelector('.stopResearchButton');
        this.stopBtn.addEventListener('click', this.stopResearchButton.bind(this));


        // TODO move to sg
        this.deployBtn = document.querySelector('.deployButton');
        this.deployBtn.addEventListener('click', this.deployButton.bind(this));

        this.launchBtn = document.querySelector('.launchButton');
        this.launchBtn.addEventListener('click', this.launchButton.bind(this));


    },
    // TODO move to resource sg
    startResearchButton: function(event) {
        this.game.Game.startResearch(event.target.dataset.resId);
    },
    stopResearchButton: function() {
        this.game.Game.stopResearch('W1');
    },
    // TODO move to something
    deployButton: function() {
        this.game.Game.deployResearch('W1');
    },
    launchButton: function() {
        this.game.Game.launchResearch('W1');
    },
    collectMoney: function() {
        this.game.Game.collect();
        this.money.textContent = "Money: " + this.game.Game.MONEY;
    },
    update: function() {
        this.oxygen.textContent = this.game.Game.OXYGEN;
        this.water.textContent = this.game.Game.WATER;
        this.food.textContent = this.game.Game.FOOD;
        this.electricity.textContent = this.game.Game.ELECTRICITY;
        this.money.textContent = this.game.Game.MONEY;
        this.stuff.textContent = JSON.stringify(this.game.Game.researchControl.researches);
    },
    render: function() {
    }
};
