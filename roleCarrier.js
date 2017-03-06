module.exports = {

    getTask: function(creep) {
        if (creep.carry.energy === 0 &&
            creep.memory.task !== 'loading') {
            creep.memory.task = 'loading';
            creep.memory.target = '';
        }
        else if (creep.carry.energy === creep.carryCapacity &&
            creep.memory.task !== 'dropoff') {
            creep.memory.task = 'dropoff';
            creep.memory.target = '';
        }
    },

    getTarget: function(creep) {
        //console.log('not implemented yet');
    },

    run: function(creep) {

        // Variable definition -------------------------------------------------
        var serial = creep.memory.serial;
        var mem = Memory.rooms[creep.room.name];

        // Execute tasks =======================================================
        if (creep.memory.task === 'loading') {
            
            var allJobs = [];
            for (i = 0; i < mem.joblistPickup.length; i++){
                allJobs.push(Game.getObjectById(mem.joblistPickup[i]));
            }

            // If pickup locations: pickup
            if (allJobs.length > 0) {
                var myJob = creep.pos.findClosestByRange(allJobs)
                //var myJob = _.orderBy(allJobs, RESOURCE_ENERGY, 'desc');

                // Execute job
                if (myJob instanceof Creep) {
                    if (myJob.transfer(creep, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(myJob);
                    }
                }
                else if(myJob instanceof Resource) {
                    if (creep.pickup(myJob) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(myJob);
                    }
                }
                else if(myJob instanceof StructureContainer ||
                    myJob instanceof StructureStorage ||
                    myJob instanceof StructureLink) {
                    if (creep.withdraw(myJob, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(myJob);
                    }
                }
            }
            // else: load from storage
            else if (allJobs.length === 0) {
                if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
        }


        // Dropoff -------------------------------------------------------------
        else if (creep.memory.task === 'dropoff'){
            //var sinks = creep.room.find(FIND_STRUCTURES, {
            //    filter: (structure) => {
            //        return (structure.structureType == STRUCTURE_EXTENSION ||
            //            structure.structureType == STRUCTURE_SPAWN ||
            //            structure.structureType == STRUCTURE_TOWER) &&
            //            structure.energy < structure.energyCapacity;
            //    }
            //});
            var sinks = mem.objectsSinks
            
            //var towers = creep.room.find(FIND_STRUCTURES, {
            //    filter: (structure) => {
            //        return (structure.structureType == STRUCTURE_TOWER &&
            //            structure.energy < (structure.energyCapacity - creep.carry.energy));
            //    }
            //});
            //var links = creep.room.find(FIND_STRUCTURES, {
            //    filter: (structure) => {
            //        return (structure.structureType == STRUCTURE_LINK &&
            //            structure.energy < structure.energyCapacity / 2)
            //    }
            //});
            //var upgraders = creep.room.find(FIND_MY_CREEPS, {
            //    filter: (upgrader) => {
            //        return (upgrader.memory.role == 'upgrader' &&
            //            upgrader.carry.energy < upgrader.carryCapacity / 2)
            //    }
            //});


            // Deliver to sinks
            if (sinks.length > 0) {
                // Keep this for fast dropoff on the road
                //creep.transfer(creep.pos.findInRange(FIND_STRUCTURES, {
                //    filter: (structure) => {
                //        return (structure.structureType == STRUCTURE_EXTENSION ||
                //            structure.structureType == STRUCTURE_SPAWN) &&
                //            structure.energy < structure.energyCapacity;
                //    }
                //}, 1), RESOURCE_ENERGY);
                var sink = creep.pos.findClosestByRange(sinks)
                if (creep.transfer(sink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sink);
                    creep.transfer(sink, RESOURCE_ENERGY);
                }
            }

            // Deliver to links
            //else if(links.length > 1) {
            //    if (links.length == 2 &&
            //        links[0].energy < links[0].energyCapacity) {
            //        if (creep.transfer(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //            creep.moveTo(links[0])
            //        }
            //    }
            //    else if(links.length == 3) {
            //        if (links[2].energy == 0) {
            //            if (creep.transfer(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //                creep.moveTo(links[0])
            //            }
            //        }
            //    }
            //}

            // Deliver to upgraders
            //else if(upgraders.length > 0) {
            //    var upgrader = creep.pos.findClosestByRange(upgraders)
            //    if (creep.transfer(upgrader, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //        creep.moveTo(upgrader)
            //    }
            //}

            // Deliver to storage
            else if(typeof creep.room.storage !== 'undefined' &&
                _.sum(creep.room.storage.store) < creep.room.storage.storeCapacity &&
                _.sum(creep.room.storage.store.energy) < (creep.room.storage.storeCapacity / 2)) {
                if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }

            // Deliver to terminal
            else if(typeof creep.room.terminal !== 'undefined' &&
                _.sum(creep.room.terminal.store) < creep.room.terminal.storeCapacity &&
                creep.room.terminal.store.energy < 100000) {
                if (_.sum(creep.room.terminal.store.energy) < creep.room.terminal.storeCapacity) {
                    if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal);
                    }
                }
            }

            // Else, move to Spawn
            else {
                var spawn = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_SPAWN }})[0];
                creep.moveTo(spawn);
            }
        }
	}
};
