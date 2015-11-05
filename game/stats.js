'use strict';

function Stats(game) {
    this.game = game;
}

Stats.prototype = {
    init: function() {

        this.collectMoneyButton = document.querySelector('.collectMoneyButton');

        this.startBtn = document.querySelector('.startResearchButton');
        this.startBtn.addEventListener('click', this.startResearchButton);

        this.stopBtn = document.querySelector('.stopResearchButton');
        this.stopBtn.addEventListener('click', this.stopResearchButton);

        var style = { font: "24px Arial", fill: "#ff0044", align: "center" };
        this.oxygen = document.querySelector('.oxygenAmount');
        this.water = document.querySelector('.waterAmount');
        this.food = document.querySelector('.foodAmount');
        this.electricity = document.querySelector('.electricityAmount');
        this.money = document.querySelector('.moneyAmount');
    },
    startResearchButton: function() {
        this.game.Game.startResearch('W1');
    },
    stopResearchButton: function() {
        this.game.Game.stopResearch('W1');
    },
    collectMoney: function() {
        this.game.Game.collect();
        this.money.textContent = "Money: " + this.game.Game.MONEY;
    },
    update: function() {
        this.oxygen.textContent = "Oxygen: " + this.game.Game.OXYGEN;
        this.water.textContent = "Water: " + this.game.Game.WATER;
        this.food.textContent = "Food: " + this.game.Game.FOOD;
        this.electricity.textContent = "Electricity: " + this.game.Game.ELECTRICITY;
        this.money.textContent = "Money: " + this.game.Game.MONEY;
    },
    render: function() {
    }
};
