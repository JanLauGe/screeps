var roleFarmcarrier = {

    run: function(creep) {

        function isOdd(num) { return num % 2;}
        var serial = creep.memory.serial;
        if (typeof Game.flags['farm' + serial] !== 'undefined') {
            var zone = Game.flags['farm' + serial]
            var mode = 'farm'
        }
        if (typeof Game.flags['home' + serial] !== 'undefined') {
            var home = Game.flags['home' + serial]
        }

        // *** MODE DEFINITION ***
        // If empty, load, if full, build
        if (creep.carry.energy == 0) {
            creep.memory.mode = 'loading'
        }
        else if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.mode = 'dropoff'
        }

        if (creep.memory.mode == 'loading') {
            if (typeof zone !== 'undefined') {
                // If in different room: move
                if (zone.pos.roomName !== creep.room.name) {
                    creep.moveTo(zone)
                }
                // Else if in this room
                else if(zone.pos.roomName === creep.room.name) {
                    var dropped = creep.room.find(FIND_DROPPED_RESOURCES, {
                        filter: (ressource) => {return (
                            ressource.amount > 200)}});
                    var containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {return (
                            structure.structureType == STRUCTURE_CONTAINER &&
                            structure.store[RESOURCE_ENERGY] > 200)}});
                    if (dropped.length > 0) {
                        var target = creep.pos.findClosestByRange(dropped)
                        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target)
                        }
                    }
                    else if(containers.length > 0) {
                        var target = creep.pos.findClosestByRange(containers)
                        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target)
                        }
                    }
                }
            }
        }
        else if (creep.memory.mode == 'dropoff') {
            if (typeof zone !== 'undefined') {
                // If in farming room: move
                if (home.pos.roomName !== creep.room.name) {

                    // Maintain road network in foreign room
                    var jobs = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {return (
                            (structure.structureType == 'road' && structure.hits < 4000) ||
                            (structure.structureType == 'container' && structure.hits < 200000))}});
                    for(j in jobs){
                        creep.repair(jobs[j])
                    }
                    creep.moveTo(home)
                }
                // Else if in this room
                else if(home.pos.roomName === creep.room.name) {

                    var storage = creep.room.storage;
                    var links = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LINK)
                        }
                    });

                    // Deliver to links
                    if (links.length > 2 &&
                        links[2].energy < links[2].energyCapacity) {
                        if (creep.transfer(links[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(links[2])
                        }
                    }

                    // Deliver to storage
                    else if(creep.room.storage &&
                        _.sum(creep.room.storage.store) < storage.storeCapacity) {
                        if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage);
                        }
                    }
                }
            }
        }
	}
};

module.exports = roleFarmcarrier;
