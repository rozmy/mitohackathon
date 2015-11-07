'use strict';

var ResearchTree = function() {
    this.electricity = [
        {
            id: 'P1',
            name: 'Solar powerplant',
            desc: 'Basic solar cells provide some power, but they’re offline during night.',
            resource: {o: -1.0, e: 1.0},
            img: '08',
            price: 3
        },
        {
            id: 'P2',
            name: 'Advanced solar cells',
            desc: 'Advanced, flexible solar cells have improved production value: increased efficiency, yield, and throughput.',
            resource: {o: -1.0, e: 3.0},
            price: 40,
            img: '08',
        },
        {
            id: 'P3',
            name: 'Wind turbines',
            desc: 'Wind power is extracted from air flow using wind turbines or sails to produce mechanical or electrical power.',
            resource: {e: 4.0},
            price: 80,
            img: '12',
        },
        {
            id: 'P4',
            name: 'Fusion powerplant',
            desc: 'Produce electric power by use of inertial confinement fusion techniques on an industrial scale.',
            resource: {e: 6.0},
            price: 160,
            img: '11',
        },
        {
            id: 'P5',
            name: 'Power silo',
            desc: 'Gives +30 power storage capacity.',
            resource: {e: -2, mE: 30},
            price: 30,
            img: '01' // TODO: New image
        }
    ]

    this.oxygen = [
        {
            id: 'O1',
            name: 'Oxygen generator',
            desc: 'Pressure Swing Adsorption technology isolates oxygen molecules from other molecules in compressed air.',
            resource: {o: 1.0},
            img: '01',
            price: 3
        },
        {
            id: 'O2',
            name: 'Cyanobacteria',
            desc: 'With cyanobacteria, oxygen is produced by the light-driven splitting of water during oxygenic photosynthesis.',
            resource: {o: 2.0, w: -1.0},
            price: 16,
            img: '04',
        },
        {
            id: 'O3',
            name: 'Stromatolite',
            desc: 'The organisms which construct stromatolites are photosynthetic. They take carbon dioxide and water to produce carbohydrates, and in doing this they liberate oxygen into the atmosphere.',
            resource: {o: 3.0, w: -1.0, e: -1.0},
            price: 32,
            img: '07',
        },
        {
            id: 'O4',
            name: 'Cryogenic oxygen plant',
            desc: 'A cryogenic oxygen plant is an industrial facility that creates molecular oxygen at relatively high purity.',
            resource: {o: 5.0, w: -2.0, e: -1.0},
            price: 64,
            img: '09',
        },
        {
            id: 'O5',
            name: 'Oxygen silo',
            desc: 'Gives +30 oxygen storage capacity.',
            resource: {e: -2, mO: 30},
            price: 30,
            img: '01' // TODO: New image
        }
    ];

    this.water = [
        {
            id: 'W1',
            name: 'Water treatment',
            desc: 'Water treatment is the process of removing undesirable chemicals, biological contaminants, suspended solids and gases from contaminated water.',
            resource: {w: 1.0, e: -1.0},
            price: 3,
            img: '10',
        },
        {
            id: 'W2',
            name: 'Disinfection plant',
            desc: 'UV is a proven and safe alternative for primary disinfection as it is free of the harmful by-products associated with chemical disinfection.',
            resource: {w: 2.0, e: -1.0},
            price: 24,
            img: '02',
        },
        {
            id: 'W3',
            name: 'hydrogen & oxygen = water',
            desc: 'To combine hydrogen and oxygen to make water, you basically have to mix the gases together and light them with a match.',
            resource: {o: -2.0, w: 2.0},
            price: 8,
            img: '13',
        },
        {
            id: 'W4',
            name: 'Water silo',
            desc: 'Gives +30 water storage capacity.',
            resource: {e: -2, mW: 30},
            price: 30,
            img: '01' // TODO: New image
        }
    ];

    this.food = [
        {
            id: 'F1',
            name: 'Farm',
            desc: 'A farm is an area of land that is devoted primarily to agricultural processes.',
            resource: {f: 1.0, o: -1.0, w: -1.0},
            img: '03',
            price: 3
        },
        {
            id: 'F2',
            name: 'Rice',
            desc: 'Level fields allow rice farmers to conserve water. Fertilizer is then added, and shallow furrows are rolled into the field.',
            resource: {f: 2.0, w: -2.0},
            price: 16,
            img: '06',
        },
        {
            id: 'F3',
            name: 'Potato',
            desc: 'When farmed, potatoes will take 8 stages to grow. Fully grown potato crops drop 1 to 4 potatoes.',
            resource: {f: 2.0, w: -1.0, o: -1.0},
            price: 16,
            img: '06',
        },
        {
            id: 'F4',
            name: 'Cereal',
            desc: 'A cereal is any true grass cultivated for the edible components of its grain (botanically, a type of fruit called a caryopsis), composed of the endosperm, germ, and bran.',
            resource: {f: 3.0, w: -1.0, o: -1.0},
            price: 40,
            img: '06',
        },
        {
            id: 'F5',
            name: 'Fish tank',
            desc: 'Fish farming or pisciculture is the principal form of aquaculture, while other methods may fall under mariculture.',
            resource: {f: 5.0, w: -3.0, o: -1.0},
            price: 80,
            img: '09',
        },
        {
            id: 'F7',
            name: 'Bunny farm',
            desc: 'Cuniculture is the agricultural practice of breeding and raising domestic rabbits, usually for their meat, fur, or wool.',
            resource: {f: 6.0, w: -1.0, o: -1.0, e: -2.0},
            price: 80,
            img: '03',
        },
        {
            id: 'F8',
            name: 'Food silo',
            desc: 'Gives +30 food storage capacity.',
            resource: {e: -2, mF: 30},
            price: 30,
            img: '01' // TODO: New image
        }
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
    this.disabled = false;
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
