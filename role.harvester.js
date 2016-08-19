var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //var serial = creep.name.charAt(creep.name.length - 1);
        var serial = creep.memory.serial
        var sources = creep.room.find(FIND_SOURCES);
        if (serial == 0) {
            var source = sources[0]
        }
        if (serial > 0) {
            var source = sources[1]
        }
        // var source = Game.getObjectById(Memory.byroom.E46N42.sources[serial]);


        // *** MODE DEFINITION ***
        // If empty, load, if full, build
        if (creep.carry.energy == 0) {
            creep.memory.mode = 'harvesting'
        }
        else if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.mode = 'delivering'
        }


        // *** EXECUTION harvesting ***
        // If loading, get sources
        if (creep.memory.mode == 'harvesting') {

            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
                creep.harvest(source);
            }
        }


        // *** EXECUTION delivering ***
        // If delivering, get tasks
        if (creep.memory.mode == 'delivering'){
            var sinks = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            var links = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK)
                }
            });

            // Deliver to sinks
            if(sinks.length > 0) {
                for(var s in sinks){
                    if(creep.transfer(sinks[s], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sinks[s]);
                    }
                }
            }

            // Deliver to links
            else if (typeof links === 'undefined' || links === null) {
                if (links[1].energy < links[1].energyCapacity) {
                    if (creep.transfer(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(links[1])
                    }
                }
            }

            // Deliver to storage
            else {
                var EnergyStorage = creep.room.storage;
                if (creep.transfer(EnergyStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(EnergyStorage);
                }
            }
        }
	}
};

module.exports = roleHarvester;
