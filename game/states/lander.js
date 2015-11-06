'use strict';

function Lander() {
}

Lander.prototype = {
    init: function () {
        this.groundVertices = [0,0,-1.128,5.08323,40.31426,0,
        50.6053,0,87.7897,0,148.755,0,200,0,251.899,4.99306,
        289.063,13.0285,335.267,18.0508,369.418,9.01079,383.48,14.033,410.6,3.9886,
        433.702,2.98414,467.853,10.0152,487.942,20.0596,512.048,23.073,545.195,8.00633,
        571.31,1.97973,591.399,-16.1001,623.541,-24.1356,647.647,-20.1179,678.785,-22.1268,
        695.86,-35.1845,743.069,-44.2244,776.215,-40.2067,820.41,-25.14,870.632,-22.1268,
        912.819,-37.1933,934.961,-44.1016,954.92,-38.8491,974.88,-45.152,996.94,-39.8996,
        1037.91,-49.354,1059.97,-63.0105,1086.23,-84.0204,1115.65,-85.0708,1153.46,-72.4649,
        1193.38,-77.7174,1227,-91.3739,1252.21,-110.283,1277.42,-108.182,1281.62,-127.091,
        1306.84,-141.103,1331,-144.255,1355.16,-155.81,1401.38,-175.77,1441.66,-173.359,
        1505.38,-153.709,1566.27,-143.124,1604.33,-141.244,1653.27,-154.234,1687.75,-141.272,
        1715.01,-112.084,1743.6,-57.5053,1764.91,-35.513,1783.52,-43.7838,1804.2,-96.8544,
        1805.57,-132.694,1812.47,-142.344,1873.12,-149.236,1931.01,-140.965,2023.37,-126.491,
        2066.1,-143.722,2088.85,-166.467,2102.63,-189.901,2130.89,-204.374,2168.8,-207.82,
        2234.96,-205.064,2261.58,-191.522,2286.18,-163.977,2316.62,-117.978,2340.88,-82.6962,
        2383.71,-55.007,2437.38,-41.609,2483.31,-37.5896,2507.01,-40.8224,2535.75,-46.8021,
        2553.06,-51.5425,2588.75,-80.737,2609.11,-94.0372,2626.65,-113.754,2646.7,-132.646,
        2671.69,-154.192,2686.72,-164.424,2714.27,-175.401,2758.47,-179.97,2952.34,-178.248,
        2952.34,-205.573,3064.31,-204.906,3099.63,-189.578,3177.37,-190.754,3184.57,-214.917,
        3274.26,-203.48,3324.75,-185.774,3421.53,-169.584,3484.18,-159.587,3559.48,-158.92,
        3613.47,-168.251,3646.79,-173.582,3681.45,-168.917,3695.73,-99.6964,3712.15,75.9802,
        3777.14,211.665,3829.27,115.972,3882.12,285.935,3908.54,203.096,3963.53,283.793,
        3989.95,55.2703,4049.94,183.814,4079.22,-4.00267,4092.79,-32.5679,4113.5,-41.1375,
        4167.77,-36.1386,4262.75,-9.0016,4372.57,29.6882,4504.22,43.4773,4649.69,49.6867,
        4674.48,29.5702,4713.99,14.847,4760.58,14.6627,4803.11,38.8688,4819.84,15.0291,
        4858.19,-1.45256,4896.91,5.9419,4925.06,31.9846,4960.49,17.0905,5006.14,15.8518,
        5050.86,24.3401,5078.48,41.8191,5498.61,41.7032];

        this.game.stats = new Stats(this.game);
        this.game.stats.init();
        setTimeout(this.game.Game.new.bind(this.game.Game), 0);

        this.game.LanderState = this;
    },
    preload: function () {
        this.game.load.tilemap('map', '../assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('ground_1x1', '../assets/tilemaps/tiles/ground_1x1.png');
        this.game.load.image('walls_1x2', '../assets/tilemaps/tiles/walls_1x2.png');
        this.game.load.image('tiles2', '../assets/tilemaps/tiles/tiles2.png');
        this.game.load.image('ship', '../assets/sprites/ship01.png');
        this.game.load.image('pattern', '../assets/patterns/pattern1.png');
        this.game.load.image('base', '../assets/sprites/base.png');
    },
    changeWind: function() {
        var wind_diff = [-1,1][Math.round(Math.random())] * Math.round(Math.random()*5),
            wind = this.game.physics.box2d.gravity.x + wind_diff;

        if (wind>30) wind = 30;
        if (wind<-30) wind = -30;
        this.game.physics.box2d.gravity.x = wind;
    },
    create: function () {
        this.game.world.setBounds(0, -500, 5500, 1000);
        this.game.stage.backgroundColor = '#FAFAE6';

        // Enable Box2D physics
        this.game.physics.startSystem(Phaser.Physics.BOX2D);

        // Set up wind calculation and change
        var wind = [-1,1][Math.round(Math.random())] * Math.round(Math.random()*5);
        this.game.physics.box2d.gravity.x = wind;
        this.game.time.events.loop(this.game.rnd.integerInRange(750, 5000), this.changeWind, this);

        // Set up gravity
        this.game.physics.box2d.gravity.y = 120;
        this.game.physics.box2d.friction = 0.8;

        // Make the ground body
        this.groundBody = new Phaser.Physics.Box2D.Body(this.game, null, 0, 200, 0);
        this.groundBody.setChain(this.groundVertices);
        this.groundBody.setCollisionCategory(2); // this is a bitmask, whatever that means

        // base
        this.base = this.game.add.sprite(100, 190, 'base');
        this.game.physics.box2d.enable(this.base);
        this.base.body.setRectangle(128,119,0,0);

    	this.cursors = this.game.input.keyboard.createCursorKeys();

        var graphics = this.game.add.graphics(0, 200);
        var mask = this.game.add.graphics(0, 200);

        // set a fill and line style
        // graphics.beginFill(0x000CFF);
        graphics.lineStyle(2, 0x000CFF, 1);

        // draw a shape
        graphics.moveTo(this.groundVertices[0],1000);
        mask.moveTo(this.groundVertices[0],1000);
        var i = 0;
        for (i = 0; i < this.groundVertices.length; i+=2) {
            graphics.lineTo(this.groundVertices[i], this.groundVertices[i+1]);
            mask.lineTo(this.groundVertices[i], this.groundVertices[i+1]);
        }
        graphics.lineTo(this.groundVertices[i-2],1000);
        mask.lineTo(this.groundVertices[i-2],1000);

        this.pattern = this.game.add.tileSprite(this.groundVertices[0], this.groundVertices[1], 1000, 1000, 'pattern');
        this.pattern.mask = mask;
        this.graphics = graphics;
        this.ship = null;
        this.facilities = [];
    },
    launch: function(id) {
        if (this.hasShip()) return;
        if (!this.game.Game.launchResearch(id)) return;

        var shipX = Math.round(Math.random()*(this.game.world.bounds.width-100))+50;
        this.ship = this.game.add.sprite(shipX, -450, 'ship');
        this.ship.originalID = id;
        this.game.physics.box2d.enable(this.ship);
        this.ship.body.setRectangle(81,84,0,0);
        this.ship.body.restitution = 0.2;
        this.ship.body.angularDampiong = 0.1;
        this.ship.body.angularVelocity = 1.2;
        this.ship.fuel = 500;
        this.game.camera.follow(this.ship);

        var shipVelocityDirection = (this.game.world.bounds.width/2 > shipX) ? 1 : -1;
        this.ship.body.velocity.x = shipVelocityDirection * Math.round(Math.random()*200);
        this.ship.body.velocity.y = Math.round(Math.random()*25);

        this.ship.body.setCategoryContactCallback(2, this.onDeployed, this);
        this.ship.body.setBodyContactCallback(this.base, this.onDestroyBase, this);
        for (var i=0; i<this.facilities.length; i++)
            this.ship.body.setBodyContactCallback(this.facilities[i], this.onDestroyFacility, this);
    },
    destroyObject: function(obj) {
        // TODO: Explosion
        obj.destroy();
    },
    onDeployed: function(body1, body2, fixture1, fixture2, begin) {
        if (!this.hasShip()) return;

        if (Math.abs(this.ship.angle) > 20) {
            console.log('Resource `' + this.ship.originalID + '` is destroyed because the angle was too high ('+Math.abs(this.ship.angle)+'>20).')
            this.destroyObject(this.ship);
            this.ship = null;
            return;
        }

        var v = this.ship.body.velocity.y;
        var m = this.ship.body.mass;
        var momentum = m*v;

        if (momentum > 250) {
            console.log('Resource `' + this.ship.originalID + '` is destroyed because the impact speed was too high ('+ momentum +'>250).')
            this.destroyObject(this.ship);
            this.ship = null;
            return;
        }

        // TODO: Make it unmoveable after stops. These solutions aren't working.
        this.ship.body.velocity.x = 0;
        this.ship.body.velocity.y = 0;
        this.ship.body.fixedRotation = true;
        this.ship.body.static = true;
        this.facilities.push(this.ship);
        this.game.Game.deployResearch(this.ship.originalID);
        this.ship = null;
    },
    onDestroyBase: function(body1, body2, fixture1, fixture2, begin) {
        this.game.state.start('gameover');
    },
    onDestroyFacility: function(body1, body2, fixture1, fixture2, begin) {
        if (!this.hasShip()) return;
        this.ship.destroy();
        this.ship = null;

        for (var i=0; i<this.facilities.length; i++) {
            var r = this.facilities[i];
            if (body2 == r.body) {
                this.game.Game.destroyResearch(r.originalID);
                r.destroy();
            }
        }
    },
    hasShip: function() {
        return (this.ship != null)
    },
    update: function () {
        if (!this.hasShip())
            return;

        if (this.cursors.left.isDown && this.ship.fuel > 0) {
            this.ship.fuel--;
            this.ship.body.rotateLeft(100);
        }
        else if (this.cursors.right.isDown && this.ship.fuel > 0) {
            this.ship.fuel--;
            this.ship.body.rotateRight(100);
        }
        else {
            this.ship.body.setZeroRotation();
        }

        if (this.cursors.up.isDown && this.ship.fuel > 0) {
            this.ship.fuel--;
            this.ship.body.thrust(300);
        }
    },
    render: function () {
        this.game.debug.box2dWorld();
    }
};
