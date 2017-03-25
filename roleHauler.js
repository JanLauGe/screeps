module.exports = {

    getTask: function(creep) {

        var operation = creep.memory.operation

        // If empty, load, if full, build
        if (creep.carry.energy == 0) {
            creep.memory.mode = 'loading'
        }
        else if(creep.carry.energy >= creep.carryCapacity * 0.66) {
            creep.memory.mode = 'dropoff'
        }
    },

    getTarget: function(creep) {

    },

    run: function(creep) {

        var operation = creep.memory.operation
        var target = creep.memory.target
        var thisflag = Game.flags['mining_' + operation]

        if (thisflag != undefined) {
            var closestSpawn = Game.getObjectById(thisflag.memory.spawn);
        }

        if (creep.memory.mode == 'loading') {

            if (operation != undefined &&
                thisflag != undefined) {
                // If in different room: move
                if (creep.room.name != thisflag.pos.roomName) {
                    creep.moveTo(thisflag.pos, {reusePath: 50});
                }

                // Else if in this room
                else if (creep.room.name == thisflag.pos.roomName) {

                    var dropped = creep.room.find(FIND_DROPPED_RESOURCES, {
                        filter: (ressource) => {return (
                            ressource.amount > 200)}});
                    var containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {return (
                            structure.structureType == STRUCTURE_CONTAINER &&
                            structure.store[RESOURCE_ENERGY] > 200)}});

                    if (dropped.length > 0) {
                        var job = creep.pos.findClosestByRange(dropped)
                        if (creep.pickup(job) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(job)
                        }
                    }
                    else if (containers.length > 0) {
                        var job = creep.pos.findClosestByRange(containers)
                        if (creep.pickup(job) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(job)
                        }
                    }
                    else {
                        creep.moveTo(thisflag)
                    }
                }
            }
        }

        else if (creep.memory.mode == 'dropoff') {
            if (operation != undefined) {
                if (thisflag != undefined) {

                    // If in farming room: move
                    if (creep.room.name != closestSpawn.room.name) {
                        // Maintain road network in foreign room
                        var jobs = creep.pos.findInRange(FIND_STRUCTURES, 4, {
                            filter: (structure) => {return (
                                (structure.structureType == 'road' && structure.hits < (structure.hitsMax - 1000) ) ||
                                (structure.structureType == 'container' && structure.hits < 200000))}});
                        for(j in jobs){
                            creep.repair(jobs[j])
                        }
                        creep.moveTo(closestSpawn, {reusePath: 50})
                    }
                    // Else if in this room
                    else if(creep.room.name == closestSpawn.room.name) {
                        var sinks = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (
                                    structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_TOWER ||
                                    structure.structureType == STRUCTURE_LINK) &&
                                    structure.energy < (structure.energyCapacity / 2);
                            }
                        });
                        var storage = creep.room.storage;
                        var links = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_LINK &&
                                structure.energy < structure.energyCapacity)
                            }
                        });

                        // All of this is a bit over-complicated!?
                        var links_sinks = []
                        var links_sources = []
                        for (i = 0; i < links.length; i++) {

                            var link = links[i]
                            var flag = link.pos.lookFor(LOOK_FLAGS)
                            // Find flag to distinguish sources and flags
                            if (flag.length) {
                                if (_.startsWith(flag[0].name, 'sink')) {
                                    links_sinks.push(link)
                                    Memory.rooms[link.room.name].links_sinks.push(link.id)
                                }
                                else if (_.startsWith(flag[0].name, 'source') &&
                                    link.energy < link.energyCapacity) {
                                    links_sources.push(link)
                                }
                            }
                            // For unflagged links, decide based on energy
                            else if (flag == '') {
                                if (link.energy < link.energyCapacity) {
                                    links_sinks.push(link)
                                }
                                else {
                                    links_sources.push(link)
                                }
                            }
                        }


                        // Deliver to links
                        //if (links_sinks.length) {
                        //    //var linkIds = Memory.byroom[creep.room.name].links_sinks
                        //    //var thislink = _.min(linkIds.map(id => Game.getObjectById(id)), obj => obj.pos.getRangeTo(creep))
                        //    var thislink = creep.pos.findClosestByRange(links_sinks)
                        //    if (creep.transfer(thislink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        //        creep.moveTo(thislink)
                        //    }
                        //}
                        // Deliver to sinks
                        if (sinks.length) {
                            // Keep this for fast dropoff on the road
                            for(var s in sinks) {
                                var sink = creep.pos.findClosestByRange(sinks)
                                if (creep.transfer(sink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(sink);
                                }
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
	}
};
