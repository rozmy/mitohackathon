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

        this.oxygen = document.querySelector('.oxygenAmount');
        this.water = document.querySelector('.waterAmount');
        this.food = document.querySelector('.foodAmount');
        this.electricity = document.querySelector('.electricityAmount');
        this.money = document.querySelector('.moneyAmount');

        this.pauseBtn = document.querySelector('.pauseButton');
        this.pauseBtn.addEventListener('click', this.pauseButton.bind(this));
    },
    initEvents: function(event) {
        this.techItem = document.querySelectorAll('.techItem');

        this.startBtns = document.querySelectorAll('.startResearchButton');
        for (var i = 0; i < this.startBtns.length; ++i)
            this.startBtns[i].addEventListener('click', this.startResearchButton.bind(this));
        this.launchBtns = document.querySelectorAll('.launchButton');
        for (var i = 0; i < this.launchBtns.length; ++i)
            this.launchBtns[i].addEventListener('click', this.launchButton.bind(this));
    },
    pauseButton: function(event) {
        this.pauseBtn.classList.toggle('paused');
        if (!this.game.Game.isPaused()) {
            this.game.Game.pause();
        } else {
            this.game.Game.resume();
        }
    },
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
        this.game.Game.restart();
    },
    collectMoney: function() {
        this.game.Game.collect();
        this.money.textContent = ('00000'+this.game.Game.MONEY).slice(-5);
    },
    getTechItemResourceHTML: function(resource) {
        if (!resource) return '<td></td>';
        var direction = ((resource < 0) ? 'decrease' : 'increase'),
            amount = ((resource > 0) ? '+'+resource.toFixed(1) : resource.toFixed(1));
        return '<td class="'+ direction +'">'+ amount +'</td>';
    },
    addTechItemDetails: function(category, research) {
        var html='<div class="techItem" id="'+ research.id +'">' +
                    '<img src="" alt="" class="ship">' +
                    '<h1>'+ research.name +'</h1>' +
                    '<table>' +
                        '<tr>' +
                            '<th class="'+ ((!research.resource.o) ? ' disabled' : '') +'"><span class="icon icon-oxygen"></span></th>' +
                            '<th class="'+ ((!research.resource.w) ? ' disabled' : '') +'"><span class="icon icon-water"></span></th>' +
                            '<th class="'+ ((!research.resource.f) ? ' disabled' : '') +'"><span class="icon icon-food"></span></th>' +
                            '<th class="'+ ((!research.resource.e) ? ' disabled' : '') +'"><span class="icon icon-power"></span></th>' +
                        '</tr>' +
                        '<tr>' +
                            this.getTechItemResourceHTML(research.resource.o) +
                            this.getTechItemResourceHTML(research.resource.w) +
                            this.getTechItemResourceHTML(research.resource.f) +
                            this.getTechItemResourceHTML(research.resource.e) +
                        '</tr>' +
                    '</table>' +
                    '<p class="description">'+ research.desc +'</p>' +
                    '<button class="startResearchButton">Build <span class="price"></span></button>' +
                    '<button class="buildingButton" disabled></button>' +
                    '<button class="launchButton">Launch</button>' +
                '</div>';
        category.innerHTML += html;
    },
    generateTechItemCategory: function(categoryName, categoryItem) {
        var category = document.querySelector(categoryName);
        for (var i=0; i<this.game.Game.researchControl.tree[categoryItem].length; i++)
            this.addTechItemDetails(category, this.game.Game.researchControl.tree[categoryItem][i]);
    },
    generateTechItems: function() {
        this.generateTechItemCategory('.cat-food', 'food');
        this.generateTechItemCategory('.cat-oxygen', 'oxygen');
        this.generateTechItemCategory('.cat-water', 'water');
        this.generateTechItemCategory('.cat-electricity', 'electricity');
    },
    refreshTechItemsDetails: function() {
        for (var i=0; i<this.techItem.length; i++) {
            var techItem = this.techItem[i];
            techItem.classList.remove('building');
            techItem.classList.remove('launchable');
        }
    },
    refreshTechItemsStatusAndPrice: function() {
        for (var i=0; i<this.techItem.length; i++) {
            var techItem = this.techItem[i],
                price = techItem.querySelector('.price'),
                progress = techItem.querySelector('.buildingButton'),
            res = this.game.Game.researchControl.getResearch(techItem.id);

            price.innerHTML = '$'+res.getPrice();
            progress.innerHTML = 'Building '+Math.round(res.paid/res.getPrice() * 100) + '%';
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
    showGameOver: function() {
        document.querySelector('.gameOver').classList.add('active');
    },
    hideGameOver: function() {
        document.querySelector('.gameOver').classList.remove('active');
    },
    changeTechItemLaunchable: function(id) {
        document.getElementById(id).classList.remove('building');
        document.getElementById(id).classList.add('launchable');
    },
    update: function() {
        // Update resource bars.
        this.oxygen.style.width = Math.min(this.game.Game.OXYGEN * 100/this.game.Game.MAXIMUM.o, 100) + '%';
        this.water.style.width = Math.min(this.game.Game.WATER * 100/this.game.Game.MAXIMUM.w, 100) + '%';
        this.food.style.width = Math.min(this.game.Game.FOOD * 100/this.game.Game.MAXIMUM.f, 100) + '%';
        this.electricity.style.width = Math.min(this.game.Game.ELECTRICITY * 100/this.game.Game.MAXIMUM.e, 100) + '%';
        this.money.textContent = ('00000'+this.game.Game.MONEY).slice(-5);

        // Update Status and Prices.
        this.refreshTechItemsStatusAndPrice();
    }
};
