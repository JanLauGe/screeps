var roleBuilder = {

    run: function(creep) {

    // *** MODE DEFINITION ***
    // If empty, load, if full, build

        if (creep.carry.energy == 0) {
            creep.memory.mode = 'loading'
            creep.say(creep.memory.mode)
        }
        else if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.mode = 'building'
            creep.say(creep.memory.mode)
        }


    // *** MODE EXECUTION ***
    // If loading, get sources

    // New loading from list
        if (creep.memory.mode == 'loading') {

            // Load from storage
            if (typeof creep.room.storage !== 'undefined' &&
                creep.room.storage > 1000) {
                if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
            else {
                var spawn = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_SPAWN }
                });
                if (creep.withdraw(spawn[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn[0]);
                }
            }
        }


    // If building, get tasks

        else if(creep.memory.mode == 'building') {

            var buildingSites = creep.room.find(FIND_CONSTRUCTION_SITES);
            //var buildingSites = []

            if(buildingSites.length > 0) {
                creep.say('building')
                if(creep.build(buildingSites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildingSites[0])
                }
            }
            else{

                var Mempath = Memory.byroom.E46N42;
                var jobRamps = Mempath.jobs.upkeep.ramps;
                var jobRoads = Mempath.jobs.upkeep.roads;
                var jobConts = Mempath.jobs.upkeep.conts;
                var jobWalls = Mempath.jobs.upkeep.walls;

                //# Upgrade Controller
                //else {
                    creep.say('upgrading')
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller)
                    }
                //}
            }
        }
    }
};

module.exports = roleBuilder;
