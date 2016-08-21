var roleTrucker = {

    run: function(creep) {

        // ## Mode definition --------------------------------------------------
        // If empty, load, if full, build
        if (creep.carry.energy == 0) {
            creep.memory.mode = 'loading'
        }
        else if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.mode = 'dropoff'
        }

        // ## Execude modes ----------------------------------------------------
        var thisflag = Game.flags['mining_' + operation]
        var closestSpawn = Game.getObjectById(thisflag.memory.closestSpawn)
        if (creep.memory.mode == 'loading') {

            if (typeof operation !== 'undefined') {
                // If in different room: move
                if (creep.room.name !== thisflag.pos.roomName) {
                    creep.moveTo(Game.flags['mining_' + operation])
                }
                // Else if in this room
                else if (creep.room.name === thisflag.pos.roomName) {
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
            if (typeof operation !== 'undefined') {
                // If in farming room: move
                if (creep.room.name === thisflag.pos.roomName) {

                    // Maintain road network in foreign room
                    var jobs = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {return (
                            (structure.structureType == 'road' && structure.hits < 4000) ||
                            (structure.structureType == 'container' && structure.hits < 200000))}});
                    for(j in jobs){
                        creep.repair(jobs[j])
                    }
                    creep.moveTo(closestSpawn)
                }
                // Else if in this room
                else if(creep.room.name === closestSpawn.room.name) {

                    var storage = creep.room.storage;
                    var links = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LINK &&
                            structure.energy < structure.energyCapacity)
                        }
                    });

                    // Deliver to links
                    if (links.length > 0) {
                        var link = creep.pos.findClosestByRange(links)
                        if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(link)
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

module.exports = roleTrucker;
