'use strict';

//global variables
window.onload = function () {
    var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phasertest');

    // Game States
    game.state.add('gameover', GameOver);
    game.state.add('lander', Lander);
    game.state.add('stats', Stats);

    game.Game = new Game(game);
    game.audioManager = AudioManager(game);
    var resizeGame = function() {
        game.scale.setShowAll();
        game.scale.refresh();
    }
    window.addEventListener('resize', function(event){
        resizeGame();
    });

    game.stats = new Stats(game);
    game.stats.init();
    game.state.start('lander');
    setTimeout(game.Game.new.bind(game.Game), 0);
};
