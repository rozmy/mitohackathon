'use strict';

function Stats(game) {
    this.game = game;
}

Stats.prototype = {
    init: function() {

        this.collectMoneyButton = document.querySelector('.collectMoneyButton');
        this.collectMoneyButton.addEventListener('click', this.collectMoney.bind(this));
        this.switchToPlanetButton = document.querySelector('.viewSwitchToPlanet');
        this.switchToPlanetButton.addEventListener('click', this.onSwitchToPlanet.bind(this));
        this.switchToTechButton = document.querySelector('.viewSwitchToTech');
        this.switchToTechButton.addEventListener('click', this.onSwitchToTech.bind(this));
        this.techTechView = document.querySelector('.techTree');

        this.oxygen = document.querySelector('.oxygenAmount');
        this.water = document.querySelector('.waterAmount');
        this.food = document.querySelector('.foodAmount');
        this.electricity = document.querySelector('.electricityAmount');
        this.money = document.querySelector('.moneyAmount');
        this.stuff = document.querySelector('.stuffAmount');

        // TODO move to resource sg
        // this.startBtn = document.querySelector('.startResearchButton');
        // this.startBtn.addEventListener('click', this.startResearchButton.bind(this));
        //
        // this.stopBtn = document.querySelector('.stopResearchButton');
        // this.stopBtn.addEventListener('click', this.stopResearchButton.bind(this));
        //
        // this.launchBtn = document.querySelector('.launchButton');
        // this.launchBtn.addEventListener('click', this.launchButton.bind(this));
        //
        // this.pauseBtn = document.querySelector('.pauseButton');
        // this.pauseBtn.addEventListener('click', this.pauseButton.bind(this));
    },
    pauseButton: function(event) {
        if (!this.game.Game.isPaused()) {
            this.game.Game.pause();
        } else {
            this.game.Game.resume();
        }
    },
    // TODO move to resource sg
    startResearchButton: function(event) {
        this.game.Game.startResearch(event.target.dataset.resId);
    },
    stopResearchButton: function() {
        this.game.Game.stopResearch('W1');
    },
    launchButton: function() {
        this.game.LanderState.launch('P1');
    },
    onSwitchToPlanet: function(event) {
        this.switchToPlanetButton.classList.add('active');
        this.switchToTechButton.classList.remove('active');
        this.techTechView.classList.remove('active');
    },
    onSwitchToTech: function(event) {
        this.switchToPlanetButton.classList.remove('active');
        this.switchToTechButton.classList.add('active');
        this.techTechView.classList.add('active');
    },
    collectMoney: function() {
        this.game.Game.collect();
        this.money.textContent = this.game.Game.MONEY;
    },
    update: function() {
        var maxAmount = 150;

        // this.oxygen.textContent = this.game.Game.OXYGEN;
        this.oxygen.style.width = Math.min(this.game.Game.OXYGEN * 100/maxAmount, 100) + '%';
        // this.water.textContent = this.game.Game.WATER;
        this.water.style.width = Math.min(this.game.Game.WATER * 100/maxAmount, 100) + '%';
        // this.food.textContent = this.game.Game.FOOD;
        this.food.style.width = Math.min(this.game.Game.FOOD * 100/maxAmount, 100) + '%';
        // this.electricity.textContent = this.game.Game.ELECTRICITY;
        this.electricity.style.width = Math.min(this.game.Game.ELECTRICITY * 100/maxAmount, 100) + '%';
        this.money.textContent = this.game.Game.MONEY;
        this.stuff.textContent = JSON.stringify(this.game.Game.researchControl.researches);
    }
};
