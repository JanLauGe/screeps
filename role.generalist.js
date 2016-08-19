var roleGeneralist = {

    run: function(creep) {

        // console.log(creep.body.indexOf('WORK'))

        // ## Variable definition:
        // Find the spawn in this room
        var spawn = creep.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }})[0];
        // Find construction sites
        var buildingSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        // Find dropped energy
        var dropped = creep.room.find(FIND_DROPPED_RESOURCES)
        // Find energy sources
        var sources = creep.room.find(FIND_SOURCES, {
            filter: (source) => { return (source.energy > 0)}
        });
        // Find energy sinks
        var sinks = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {return (
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER) &&
                structure.energy < structure.energyCapacity;}});
        // How much to spawn another generalist?
        var creepcost = 0
        for(var i in creep.body) {
            if (creep.body[i].type == 'move') {
                var creepcost = creepcost + 100
            }
            else{
                var creepcost = creepcost + 50
            }
        }

        // ## Creep actions:
        // Task logic switch
        if (creep.carry.energy == 0) {
            creep.memory.mode = 'harvest'
            creep.memory.task = 'harvesting'
        }
        if (creep.carry.energy == creep.carryCapacity) {
            // Mode logic switch
            // If low on energy: deliver to sinks
            if (creep.room.energyAvailable < creep.room.energyCapacityAvailable &&
                creep.carry.energy == creep.carryCapacity) {
                creep.memory.mode = 'harvest'
                creep.memory.task = 'delivering'
            }
            // If enough energy: do other jobs
            if (creep.room.energyAvailable == creep.room.energyCapacityAvailable &&
                creep.carry.energy == creep.carryCapacity) {
                creep.memory.mode = 'build'
                creep.memory.task = 'building'
            }
        }

        // Execute task
        if (creep.memory.mode == 'harvest') {
            if (creep.memory.task == 'harvesting') {
                creep.say('harvesting')

                var thisdrop = creep.pos.findClosestByRange(dropped)
                if (thisdrop) {
                    if (creep.pickup(thisdrop) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(thisdrop)
                    }
                }
                else if (sources.length == 1) {
                    // Harvest from only source
                    var source = sources[0];
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                        creep.harvest(source);
                    }
                }
                else if (sources.length >= 0) {
                    // Harvest from only source
                    var source = creep.pos.findClosestByPath(sources);
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                        creep.harvest(source);
                    }
                }
            }
            else if(creep.memory.task == 'delivering' &&
            creep.room.energyAvailable !== creep.room.energyCapacityAvailable) {
                creep.say('dropoff')
                // Deliver to sinks
                if (sinks.length > 0) {
                    // Keep this for fast dropoff on the road
                    for(var s in sinks) {
                        creep.transfer(sinks[s], RESOURCE_ENERGY)
                    }
                    var sink = creep.pos.findClosestByRange(sinks)
                    if (creep.transfer(sink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sink);
                    }
                    // Harvesting, but no place to dropoff, so build
                    else{
                        if (buildingSites.length > 0) {
                            creep.say('build')
                            if (creep.build(buildingSites[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(buildingSites[0])
                            }
                        }
                        else{
                            creep.say('upgrade')
                            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.controller)
                            }
                            creep.moveTo(creep.room.controller)
                        }
                    }
                }
            }
        }
        else if(creep.memory.mode == 'build') {
            var Mempath = Memory.byroom[creep.room.name]
            var jobRamps = Mempath.jobs.upkeep.ramps;
            var jobRoads = Mempath.jobs.upkeep.roads;
            var jobConts = Mempath.jobs.upkeep.conts;
            var jobWalls = Mempath.jobs.upkeep.walls;

            if (buildingSites.length > 0) {
                creep.say('build')
                if (creep.build(buildingSites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildingSites[0])
                }
            }
            else if (jobRamps.length > 0) {
                if (creep.repair(Game.getObjectById(jobRamps[0])) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(jobRamps[0]))
                }
            }
            else if (jobRoads.length > 0) {
                if (creep.repair(Game.getObjectById(jobRoads[0])) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(jobRoads[0]))
                }
            }
            else if (jobConts.length > 0) {
                if (creep.repair(Game.getObjectById(jobConts[0])) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(jobConts[0]))
                }
            }
            else if (jobWalls.length > 0) {
                if (creep.repair(Game.getObjectById(jobWalls[0])) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(jobWalls[0]))
                }
            }
            else{
                creep.say('upgrade')
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller)
                }
                creep.moveTo(creep.room.controller)
            }
        }
    }
}

module.exports = roleGeneralist;
