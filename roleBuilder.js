module.exports = {

    getTask: function(creep) {
        if (creep.carry.energy === 0 &&
            creep.memory.mode !== 'loading') {
            creep.memory.mode = 'loading';
            creep.memory.target = '';
        }
        else if (creep.carry.energy === creep.carryCapacity &&
            creep.memory.mode !== 'building') {
            creep.memory.mode = 'building';
            creep.memory.target = '';
        }
    },

    getTarget: function(creep) {

        // Variable definition -------------------------------------------------
        var mem = Memory.rooms[creep.room.name];

        if (creep.memory.mode === 'loading') {
            if (creep.memory.target === '' ||
                typeof creep.memory.target === 'undefined') {
                if (mem.objectsSites.length) {
                    creep.memory.target = mem.objectsSites[0].id;
                    _.pull(mem.objectsSites, Game.getObjectById(creep.memory.target));
                }
            }
            else {
                _.pull(mem.objectsSites, Game.getObjectById(creep.memory.target));
            }
        }
        else if (creep.memory.mode === 'building') {
            if ((creep.memory.target === '' ||
                typeof creep.memory.target === 'undefined') &&
                mem.objectsSites.length) {
                creep.memory.target = mem.objectsSites[0].id;
                _.pull(mem.objectsSites, Game.getObjectById(creep.memory.target));
            }
            else {
                _.pull(mem.objectsSites, Game.getObjectById(creep.memory.target));
            }
        }
    },

    run: function(creep) {

        // Variable definition -------------------------------------------------
        var mem = Memory.rooms[creep.room.name];
        var jobsPickup = mem.joblistPickup;

        // Execute tasks =======================================================
        if (creep.memory.mode === 'loading') {
            if (creep.room.storage !== undefined &&
                creep.room.storage.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
            else {
                // If pickup locations: pickup
                if (jobsPickup.length > 0) {
                    var myJob = creep.pos.findClosestByRange(jobsPickup)
                    //var myJob = _.orderBy(allJobs, RESOURCE_ENERGY, 'desc');

                    // Execute job
                    if (myJob instanceof Creep) {
                        if (myJob.transfer(creep, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
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
                        if (creep.withdraw(myJob, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(myJob)
                        }
                    }
                }
            }
        }

        // If building, get tasks
        else if(creep.memory.mode === 'building') {

            // Build
            var buildingSites = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (buildingSites.length) {
                var buildingSite = creep.pos.findClosestByRange(buildingSites)
                if (creep.build(buildingSite) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildingSite)
                }
            }
            // Upgrade Controller
            else{
                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller)
                }
            }
        }
    }
};
