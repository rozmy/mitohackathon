'use strict';

function Stats(game) {
    this.game = game;
}

Stats.prototype = {
    init: function() {

        this.collectMoneyButton = document.querySelector('.moneyClicker');
        this.collectMoneyButton.addEventListener('click', this.collectMoney.bind(this));
        this.restartButton = document.querySelector('.restartButton');
        this.restartButton.addEventListener('click', this.onRestartClicked.bind(this));
        this.switchToPlanetButton = document.querySelector('.viewSwitchToPlanet');
        this.switchToPlanetButton.addEventListener('click', this.onSwitchToPlanet.bind(this));
        this.switchToTechButton = document.querySelector('.viewSwitchToTech');
        this.switchToTechButton.addEventListener('click', this.onSwitchToTech.bind(this));
        this.techTechView = document.querySelector('.techTree');
        this.techItem = document.querySelectorAll('.techItem');
        this.pauseBtn = document.querySelector('.pauseButton');
        this.pauseBtn.addEventListener('click', this.pauseButton.bind(this));

        this.oxygen = document.querySelector('.oxygenAmount');
        this.water = document.querySelector('.waterAmount');
        this.food = document.querySelector('.foodAmount');
        this.electricity = document.querySelector('.electricityAmount');
        this.money = document.querySelector('.moneyAmount');

        this.startBtns = document.querySelectorAll('.startResearchButton');
        for (var i = 0; i < this.startBtns.length; ++i) {
            this.startBtns[i].addEventListener('click', this.startResearchButton.bind(this));
        }
        this.launchBtns = document.querySelectorAll('.launchButton');
        for (var i = 0; i < this.launchBtns.length; ++i) {
            this.launchBtns[i].addEventListener('click', this.launchButton.bind(this));
        }

    },
    pauseButton: function(event) {
        this.pauseBtn.classList.toggle('paused');
        if (!this.game.Game.isPaused()) {
            this.game.Game.pause();
        } else {
            this.game.Game.resume();
        }
    },
    // TODO move to resource sg
    startResearchButton: function(event) {
        this.game.Game.startResearch(event.currentTarget.parentNode.id);
        event.currentTarget.parentNode.classList.add('building');
    },
    launchButton: function(event) {
        this.onSwitchToPlanet();
        this.game.LanderState.launch(event.currentTarget.parentNode.id);
        event.currentTarget.parentNode.classList.remove('launchable');
    },
    onSwitchToPlanet: function() {
        this.switchToPlanetButton.classList.add('active');
        this.switchToTechButton.classList.remove('active');
        this.techTechView.classList.remove('active');
    },
    onSwitchToTech: function() {
        this.switchToPlanetButton.classList.remove('active');
        this.switchToTechButton.classList.add('active');
        this.techTechView.classList.add('active');
    },
    onRestartClicked: function() {
        location.reload();
        this.game.state.start('lander');
        document.querySelector('.gameOver').classList.remove('active');
    },
    collectMoney: function() {
        this.game.Game.collect();
        this.money.textContent = ('00000'+this.game.Game.MONEY).slice(-5);
    },
    refreshTechItem: function() {
        for (var i=0; i<this.techItem.length; i++) {
            var techItem = this.techItem[i],
                price = techItem.querySelector('.price'),
                progress = techItem.querySelector('.buildingButton'),
                res = this.game.Game.researchControl.getResearch(techItem.id),
                resources = res.base.resource,
                resourcesHeader = techItem.querySelectorAll('table th'),
                resourcesBlock = techItem.querySelectorAll('table td');

            price.innerHTML = '$'+res.getPrice();
            progress.innerHTML = 'Building '+Math.round(res.paid/res.getPrice() * 100) + '%';
            this.updateResource('o', resources, resourcesHeader[0], resourcesBlock[0]);
            this.updateResource('w', resources, resourcesHeader[1], resourcesBlock[1]);
            this.updateResource('f', resources, resourcesHeader[2], resourcesBlock[2]);
            this.updateResource('e', resources, resourcesHeader[3], resourcesBlock[3]);
        }
    },
    updateResource: function(key, resources, header, block) {
        if (!(key in resources)) {
            header.className = 'disabled';
        };
        if (key in resources && resources[key] < 0.0) {
            block.innerHTML = resources[key].toFixed(1);
            block.className = 'decrease';
        } else if (key in resources && resources[key] > 0.0 ) {
            block.innerHTML = '+'+resources[key].toFixed(1);
            block.className = 'increase';
        }
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
        this.money.textContent = ('00000'+this.game.Game.MONEY).slice(-5);

        this.refreshTechItem();
    }
};
