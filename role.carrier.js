var roleCarrier = {

    // suggestion: if half empty put no dropoffs, switch mode and start loading already

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
            for(j = 0; j < Memory.byroom[creep.room.name].jobs.pickups.length; j++){
                allJobs.push(Game.getObjectById(Memory.byroom[creep.room.name].jobs.pickups[j]))
            }
            var myJob = creep.pos.findClosestByRange(allJobs)

            // If pickup locations: pickup
            if (allJobs.length > 0) {

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

    // // If loading: get sources
    //     if (creep.memory.mode == 'loading') {

    //         //for(var i in Memory.global.creeps_workers) {
    //         //    var worker = Game.getObjectById(Memory.global.creeps_workers[i])
    //         //    if( worker.carry.energy >= creep.carryCapacity / 2)
    //         //    var target = worker
    //         //}


    //     // Load from worker
    //         if (Memory.global.creeps_workers.length) {
    //             for(var i in Memory.global.creeps_workers) {
    //                 var worker = Game.getObjectById(Memory.global.creeps_workers[i])
    //                 if (worker.carry > worker.carryCapacity / 2){
    //                     console.log(worker.transfer(creep, RESOURCE_ENERGY))
    //                     if (worker.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                         creep.moveTo(Game.getObjectById(Memory.global.creeps_workers[i]))
    //                     }
    //                 }
    //             }
    //         }

    //     // Load dropped ressources
    //         if(dropped.length){
    //             for(d in dropped){
    //                 if (creep.pickup(dropped[d]) == ERR_NOT_IN_RANGE){
    //                     creep.moveTo(dropped[d])
    //                 }
    //             }
    //         }

    //     // Load from storage
    //         else if(typeof creep.room.storage !== 'undefined') {
    //             if (creep.room.storage.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                 creep.moveTo(creep.room.storage);
    //             }
    //         }
    //     }

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
                for(var s in sinks) {
                    creep.transfer(sinks[s], RESOURCE_ENERGY)
                }
                var sink = creep.pos.findClosestByRange(sinks)
                if (creep.transfer(sink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sink);
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


//         var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
//         if(target) {
//             if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(target);
//             }
//         }

//         //var number =
//         var sources = creep.room.find(FIND_SOURCES);
//         var sinks = creep.room.find(FIND_STRUCTURES, {
//             filter: (structure) => {
//                 return (structure.structureType == STRUCTURE_EXTENSION ||
//                         structure.structureType == STRUCTURE_SPAWN ||
//                         structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
//             }
//         });
// 	    if(creep.carry.energy < creep.carryCapacity) {
//             if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(sources[0]);
//             }
//         }
//         else {

//             if(sinks.length > 0) {
//                 if(creep.transfer(sinks[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                     creep.moveTo(sinks[0]);
//                 }
//             }else {
//                 var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
//                 if(sinks.length) {
//                     if(creep.build(sinks[0]) == ERR_NOT_IN_RANGE) {
//                         creep.moveTo(sinks[0]);
//                     }
//                 }
//             }
//         }
// 	}
// };

module.exports = roleCarrier;
