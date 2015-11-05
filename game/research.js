'use strict';

var ResearchTree = function() {
    var tech = [];

    var electricity = [
        {
            id: 'P1',
            name: 'Solar powerplant',
            resource: {o: -1, e: 1},
            price: 3
        },
        {
            id: 'P2',
            name: 'Advanced solar cells',
            resource: {o: -1, e: 3},
            price: 40,
            required: ['P1']
        },
        {
            id: 'P3',
            name: 'Wind turbines',
            resource: {e: 4},
            price: 80,
            required: ['P2']
        },
        {
            id: 'P4',
            name: 'Fusion powerplant',
            resource: {e: 6},
            price: 160,
            required: ['P3']
        },
    ]

    var oxygen = [
        {
            id: 'O1',
            name: 'Oxygen generator',
            resource: {o: 1},
            price: 3
        },
        {
            id: 'O2',
            name: 'Cyanobacteria',
            resource: {o: 2, w: -1},
            price: 16,
            required: ['O1']
        },
        {
            id: 'O3',
            name: 'Stromatolite',
            resource: {o: 3, w: -1},
            price: 32,
            required: ['O2']
        },
        {
            id: 'O4',
            name: 'Cryogenic oxygen plant',
            resource: {o: 5, w: -2},
            price: 64,
            required: ['O3']
        },
    ];

    var water = [
        {
            id: 'W1',
            name: 'Water treatment',
            resource: {w: 1},
            price: 3,
            required: ['O1']
        },
        {
            id: 'W2',
            name: 'Disinfection plant',
            resource: {w: 2},
            price: 24,
            required: ['W1']
        },
        {
            id: 'W3',
            name: 'hydrogen&oxygen=water',
            resource: {o: -2, w: 3},
            price: 40,
            required: ['W2']
        },
    ];

    var food = [
        {
            id: 'F1',
            name: 'Farm',
            resource: {f: 1, o: -1, w: -1},
            price: 3
        },
        {
            id: 'F2',
            name: 'Rice',
            resource: {f: 2, w: -2},
            price: 16,
            required: ['F1']
        },
        {
            id: 'F3',
            name: 'Spice',
            resource: {f: 2, e: -1, o: -1},
            price: 16,
            required: ['F1']
        },
        {
            id: 'F4',
            name: 'Potato',
            resource: {f: 2, w: -1, o: -1},
            price: 16,
            required: ['F1']
        },
        {
            id: 'F5',
            name: 'Cereal',
            resource: {f: 3, w: -1, o: -1},
            price: 40,
            // required: ['F1']
        },
        {
            id: 'F6',
            name: 'Fish tank',
            resource: {f: 5, w: -3, o: -1},
            price: 80,
            // required: ['F1']
        },
        {
            id: 'F7',
            name: 'Bunny farm',
            resource: {f: 5, w: -1, o: -1, e: -2},
            price: 80,
            required: ['F5']
        },
    ];

    var groups = [electricity, food, water, oxygen, tech];
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

var Research = function(base) {
    this.LAUNCHABLE = 1;
    this.IN_PROGRESS = 2;
    this.READY_TO_BUILD = 3;

    this.number = 0;
    this.priceRatio = 1.0;
    this.status = this.READY_TO_BUILD;
    this.paid = 0;
    this.base = base;
};
Research.prototype = {
    isBuildable: function() {
        // TODO: Return false when only one object is buildable (e.g.: techs)
        return (this.status == this.READY_TO_BUILD);
    },
    
    isInProgress: function() {
        return (this.status == this.IN_PROGRESS);
    },

    getPrice: function() {
        return Math.round(this.base.price * this.priceRatio);
    },

    start: function() {
        this.status = this.IN_PROGRESS;
        this.paid = 0;
    },
    
    stop: function() {
        this.status = this.READY_TO_BUILD;
        this.paid = 0;
    },
    
    finished: function() {
        // TODO: Execute `this.number++` after deploy.
        this.priceRatio *= 1.1;
        this.status = this.LAUNCHABLE;
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
    
    getResearch: function(id) {
        var research = this.getAlreadyResearched(id);
        if (!research) {
            research = new Research(this.tree.getResearch(id));
        }
        return research;
    },
    
    start: function(obj) {
        obj.start();
        this.researches.push(obj)
    },
    
    stop: function(obj) {
        obj.stop();
        if (obj.number == 0) {
            // TODO: Remove from list.
        }
    }
};
