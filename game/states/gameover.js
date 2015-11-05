'use strict';

function GameOver() {
}

GameOver.prototype = {
    init: function() {
        this.gameOverText = this.game.add.text(10, 10, "Game Over", 
            { font: "54px Arial", fill: "black", align: "center" });
        this.restartButton = this.game.add.button(10, 90, 'button', this.restartGame, this);
    },
    update: function() {},
    render: function() {},
    restartGame: function () {
        this.game.state.start('lander');
    }
};