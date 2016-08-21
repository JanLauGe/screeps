var roleCarrier = {

    // suggestion: if half empty but no dropoffs, switch mode and start loading already

    run: function(creep) {

        var serial = creep.memory.serial
        var Mempath = Memory.byroom[creep.room.name]

    // Always pick up dropped resources if in range
        var dropped = (creep.room.find(FIND_DROPPED_RESOURCES))
        for(d in dropped) {
            creep.pickup(dropped[d])
        }

    // *** MODE DEFINITION ***
    // If empty, load, if full, build
        if (creep.carry.energy == 0) {
            creep.memory.mode = 'loading'
        }
        else if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.mode = 'dropoff'
        }

    // *** EXECUTION loading ***

    // New loading from list
        if (creep.memory.mode == 'loading') {

            var allJobs = []
            for(j = 0; j < Mempath.jobs.pickups.length; j++){
                allJobs.push(Game.getObjectById(Mempath.jobs.pickups[j]))
            }

            // If pickup locations: pickup
            if (allJobs.length > 0) {
                var myJob = creep.pos.findClosestByRange(allJobs)

                // Execute job
                if (myJob instanceof Creep) {
                    if (myJob.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(myJob)
                    }
                }
                else if(myJob instanceof Resource) {
                    if (creep.pickup(myJob) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(myJob)
                    }
                }
                else if(myJob instanceof StructureContainer ||
                    myJob instanceof StructureStorage ||
                    myJob instanceof StructureLink) {
                    if (creep.withdraw(myJob, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(myJob)
                    }
                }
            }
            // else: load from storage
            else if (allJobs.length == 0) {
                if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage)
                }
            }
        }


    // *** EXECUTION dropoff ***
    // If delivering, get tasks
        if (creep.memory.mode == 'dropoff'){
            //creep.say('dropoff')
            var sinks = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            var towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER &&
                        structure.energy < (structure.energyCapacity - creep.carry.energy));
                }
            });
            var links = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK &&
                        structure.energy < structure.energyCapacity / 2)
                }
            });
            var upgraders = creep.room.find(FIND_MY_CREEPS, {
                filter: (upgrader) => {
                    return (upgrader.memory.role == 'upgrader' &&
                        upgrader.carry.energy < upgrader.carryCapacity / 2)
                }
            });
            var storage = creep.room.storage;

            //Deliver to towers
            if (towers.length > 0) {
                var tower = creep.pos.findClosestByRange(towers)
                if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower);
                }
            }

            // Deliver to sinks
            else if(sinks.length > 0) {
                // Keep this for fast dropoff on the road
                creep.transfer(creep.pos.findInRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
                }, 1), RESOURCE_ENERGY);
                var sink = creep.pos.findClosestByRange(sinks)
                if (creep.transfer(sink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sink);
                    creep.transfer(sink, RESOURCE_ENERGY)
                }
            }

            // Deliver to links
            else if(links.length > 1) {
                if (links.length == 2 &&
                    links[0].energy < links[0].energyCapacity) {
                    if (creep.transfer(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(links[0])
                    }
                }
                else if(links.length == 3) {
                    if (links[2].energy == 0) {
                        if (creep.transfer(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(links[0])
                        }
                    }
                }
            }

            // Deliver to upgraders
            else if(upgraders.length > 0) {
                var upgrader = creep.pos.findClosestByRange(upgraders)
                if (creep.transfer(upgrader, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(upgrader)
                }
            }

            // Deliver to storage
            else if(typeof Game.spawns.Spawn1.room.storage === 'object' &&
                _.sum(creep.room.storage.store) < creep.room.storage.storeCapacity) {
                if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }

            // Else, move to DropoffFlag
            else if(Game.flags.DropoffFlag) {
                if (Game.flags.DropoffFlag.length > 0) {
                    creep.say('waf')
                    creep.moveTo(Game.flags.DropoffFlag)
                }
            }
        }
	  }
}

module.exports = roleCarrier;
