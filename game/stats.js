'use strict';

function Stats(game) {
    this.game = game;
}

Stats.prototype = {
    init: function() {
        this.collectMoneyButton = this.game.add.button(this.game.world.centerX - 95, 400, 'button', this.collectMoney, this );
        this.collectMoneyButton.fixedToCamera = true;

        var style = { font: "24px Arial", fill: "#ff0044", align: "center" };
        this.oxygen = this.game.add.text(
            15,
            15,
            "Oxygen: " + this.game.Game.OXYGEN,
            style
        );
        this.oxygen.fixedToCamera = true;
        this.water = this.game.add.text(
            15,
            45,
            "Water: " + this.game.Game.WATER,
            style
        );
        this.water.fixedToCamera = true;
        this.food = this.game.add.text(
            15,
            75,
            "Food: " + this.game.Game.FOOD,
            style
        );
        this.food.fixedToCamera = true;
        this.electricity = this.game.add.text(
            15,
            105,
            "Electr: " + this.game.Game.ELECTRICITY,
            style
        );
        this.electricity.fixedToCamera = true;
        this.money = this.game.add.text(
            15,
            135,
            "$: " + this.game.Game.MONEY,
            style
        );
        this.money.fixedToCamera = true;
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
