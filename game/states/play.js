'use strict';

function Play() {
}

Play.prototype = {
    init: function() {
        this.game.Game.new();

        this.collectMoneyButton = this.game.add.button(this.game.world.centerX - 95, 400, 'button', this.collectMoney, this );

        var style = { font: "24px Arial", fill: "#ff0044", align: "center" };
        this.oxygen = this.game.add.text(
            15, 
            15, 
            "Oxygen: " + this.game.Game.OXYGEN, 
            style
        );
        this.water = this.game.add.text(
            15, 
            45, 
            "Water: " + this.game.Game.WATER, 
            style
        );
        this.food = this.game.add.text(
            15, 
            75, 
            "Food: " + this.game.Game.FOOD, 
            style
        );
        this.electricity = this.game.add.text(
            15, 
            105, 
            "Electr: " + this.game.Game.ELECTRICITY, 
            style
        );
        this.money = this.game.add.text(
            15, 
            135, 
            "$: " + this.game.Game.MONEY, 
            style
        );
    },
    
    collectMoney: function() {
        this.game.Game.collect();
        this.money.text = "Money: " + this.game.Game.MONEY;
    },
    
    update: function() {
        this.oxygen.text = "Oxygen: " + this.game.Game.OXYGEN;
        this.water.text = "Water: " + this.game.Game.WATER;
        this.food.text = "Food: " + this.game.Game.FOOD;
        this.electricity.text = "Electricity: " + this.game.Game.ELECTRICITY;
        this.money.text = "Money: " + this.game.Game.MONEY;
    },
    
    render: function() {
    }
};