'use strict';

var ResearchTree = function() {
    this.electricity = [
        {
            id: 'P1',
            name: 'Solar powerplant',
            resource: {o: -1.0, e: 1.0},
            img: '08',
            price: 3
        },
        {
            id: 'P2',
            name: 'Advanced solar cells',
            resource: {o: -1.0, e: 3.0},
            price: 40,
            img: '08',
        },
        {
            id: 'P3',
            name: 'Wind turbines',
            resource: {e: 4.0},
            price: 80,
            img: '12',
        },
        {
            id: 'P4',
            name: 'Fusion powerplant',
            resource: {e: 6.0},
            price: 160,
            img: '11',
        },
    ]

    this.oxygen = [
        {
            id: 'O1',
            name: 'Oxygen generator',
            resource: {o: 1.0},
            img: '01',
            price: 3
        },
        {
            id: 'O2',
            name: 'Cyanobacteria',
            resource: {o: 2.0, w: -1.0},
            price: 16,
            img: '04',
        },
        {
            id: 'O3',
            name: 'Stromatolite',
            resource: {o: 3.0, w: -1.0, e: -1.0},
            price: 32,
            img: '07',
        },
        {
            id: 'O4',
            name: 'Cryogenic oxygen plant',
            resource: {o: 5.0, w: -2.0, e: -1.0},
            price: 64,
            img: '09',
        },
    ];

    this.water = [
        {
            id: 'W1',
            name: 'Water treatment',
            resource: {w: 1.0},
            price: 3,
            img: '10',
        },
        {
            id: 'W2',
            name: 'Disinfection plant',
            resource: {w: 2.0},
            price: 24,
            img: '02',
        },
        {
            id: 'W3',
            name: 'hydrogen&oxygen=water',
            resource: {o: -2.0, w: 2.0},
            price: 8,
            img: '13',
        },
    ];

    this.food = [
        {
            id: 'F1',
            name: 'Farm',
            resource: {f: 1.0, o: -1.0, w: -1.0},
            img: '03',
            price: 3
        },
        {
            id: 'F2',
            name: 'Rice',
            resource: {f: 2.0, w: -2.0},
            price: 16,
            img: '06',
        },
        {
            id: 'F3',
            name: 'Spice',
            resource: {f: 2.0, e: -1.0, o: -1.0},
            price: 16,
            img: '06',
        },
        {
            id: 'F4',
            name: 'Potato',
            resource: {f: 2.0, w: -1.0, o: -1.0},
            price: 16,
            img: '06',
        },
        {
            id: 'F5',
            name: 'Cereal',
            resource: {f: 3.0, w: -1.0, o: -1.0},
            price: 40,
            img: '06',
        },
        {
            id: 'F6',
            name: 'Fish tank',
            resource: {f: 5.0, w: -3.0, o: -1.0},
            price: 80,
            img: '09',
        },
        {
            id: 'F7',
            name: 'Bunny farm',
            resource: {f: 6.0, w: -1.0, o: -1.0, e: -2.0},
            price: 80,
            img: '03',
        },
    ];

    var groups = [this.electricity, this.food, this.water, this.oxygen];
    this.researches = [];
    for (var i=0; i<groups.length; i++)
        this.researches = this.researches.concat(groups[i]);
}
ResearchTree.prototype = {
    getResearch: function(id) {
        for (var i=0; i<this.researches.length; i++)
            if (this.researches[i].id == id)
                return this.researches[i];
    }
};

var LAUNCHABLE = 3;
var IN_PROGRESS = 2;
var READY_TO_BUILD = 1;

var Research = function(base) {
    this.number = 0;
    this.priceRatio = 1.0;
    this.status = READY_TO_BUILD;
    this.paid = 0;
    this.base = base;
};
Research.prototype = {
    isBuildable: function() {
        // TODO: Return false when only one object is buildable (e.g.: techs)
        return (this.status == READY_TO_BUILD);
    },
    
    isInProgress: function() {
        return (this.status == IN_PROGRESS);
    },
    
    isLaunchable: function() {
        return (this.status == LAUNCHABLE);
    },

    getPrice: function() {
        return Math.round(this.base.price * this.priceRatio);
    },

    start: function() {
        this.status = IN_PROGRESS;
        this.paid = 0;
    },
    
    stop: function() {
        this.status = READY_TO_BUILD;
        this.paid = 0;
    },
    
    finish: function() {
        this.priceRatio *= 1.25;
        this.status = LAUNCHABLE;
    },
    
    launch: function() {
        this.stop();
    },

    deploy: function() {
        this.number++;
    },
    
    destroy: function() {
        if (this.number > 0)
            this.number--;
    }
};

var ResearchMissionControl = function() {
    this.tree = new ResearchTree();
    this.researches = [];
};
ResearchMissionControl.prototype = {
    getAlreadyResearched: function(id) {
        for (var i=0; i<this.researches.length; i++)
            if (this.researches[i].base.id == id)
                return this.researches[i];
            return null;
    },
    
    isAlreadyResearched: function(obj) {
        for (var i=0; i<this.researches.length; i++)
            if (this.researches[i].base.id == obj.base.id)
                return true;
        return false;
    },
    
    getResearch: function(id) {
        var research = this.getAlreadyResearched(id);
        if (!research) {
            research = new Research(this.tree.getResearch(id));
        }
        return research;
    },
    
    start: function(obj) {
        obj.start();
        if (!this.isAlreadyResearched(obj))
            this.researches.push(obj)
    },
    
    stop: function(obj) {
        obj.stop();
    },
    
    launch: function(obj) {
        obj.launch();
    },
    
    deploy: function(obj) {
        obj.deploy();
    },
    
    destroy: function(obj) {
        obj.destroy();
    }
};
