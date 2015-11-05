'use strict';

//global variables
window.onload = function () {
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phasertest');

    // Game States
    game.state.add('play', Play);
    game.state.add('gameover', GameOver);

    game.Game = new Game(game);
    game.audioManager = AudioManager(game);
    var resizeGame = function() {
        game.scale.setShowAll();
        game.scale.refresh();
    }
    window.addEventListener('resize', function(event){
        resizeGame();
    });
    game.state.start('play');
};