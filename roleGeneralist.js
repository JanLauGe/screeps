module.exports = {


    getTask: function(creep) {

        // Variable definition -------------------------------------------------
        var mem = Memory.rooms[creep.room.name];

        // Task switch  --------------------------------------------------------
        if (creep.room.name === creep.memory.operation) {
            
            if (creep.carry.energy === 0 &&
                creep.memory.task !== 'harvest') {
                creep.memory.task = 'harvest';
                creep.memory.target = '';
            }
            else if (creep.carry.energy === creep.carryCapacity) {
                // If low on energy: deliver to sinks
                if (creep.room.energyAvailable < creep.room.energyCapacityAvailable &&
                    creep.memory.task !== 'deliver') {
                    creep.memory.task = 'deliver';
                    creep.memory.target = '';
                }
                // If enough energy: do other jobs
                if (creep.room.energyAvailable === creep.room.energyCapacityAvailable &&
                    creep.memory.task !== 'build') {
                    creep.memory.task = 'build';
                    creep.memory.target = '';
                }
            }
            // If no condition is met but no task defined, harvest
            else if (typeof creep.memory.task === 'undefined') {
                creep.memory.task = 'harvest';
                creep.memory.target = '';
            }
        }
        // If in different room, migrate to operation room
        else if (creep.room.name !== creep.memory.operation) {
            creep.memory.task = 'migrate';
        }
    },


    getTarget: function(creep) {

        // Variable definition -------------------------------------------------
        var mem = Memory.rooms[creep.room.name];

        // Find target ---------------------------------------------------------
        if (creep.memory.task === 'migrate') {
            creep.memory.target = Game.rooms[creep.memory.operation].controller.id
        }
        else {
            if (creep.memory.target === '' &&
                creep.memory.task === 'harvest') {
                // Select sources
                var sources = mem.sources
                if (sources.length) {
                    var source = _.sortBy(sources, 'work', 'desc')[0].id;
                    creep.memory.target = source;
                }
            }
            
            else if (creep.memory.target === '' &&
                creep.memory.task === 'deliver') {
                //take task from memory
            }
    
            else if (creep.memory.target === '' &&
                creep.memory.task === 'build') {
                //take task from memory
            }
    
            // Block target --------------------------------------------------------
            if (creep.memory.task === 'harvest') {
                // Find target source
                var source = Game.getObjectById(creep.memory.target)
                // Substract from source budget
                var sourceIndex = _.findIndex(mem.sources, {'id': creep.memory.target});
                var slots = mem.sources[sourceIndex]['slots'];
                var work = mem.sources[sourceIndex]['work'];
                var parts = _.filter(creep.body, {'type': WORK}).length
                mem.sources[sourceIndex]['slots'] = slots - 1;
                // Only count half the work parts for Generalists
                // Because the mining will be interrupted by delivering
                mem.sources[sourceIndex]['work'] = work - parts / 2;
            }
            else if (creep.memory.task === 'deliver') {
                //remove target from delivery list
            }
            else if (creep.memory.task === 'build') {
                //remove target from building list
            }
        }
    },


    run: function(creep) {

        // Variable definition -------------------------------------------------
        var mem = Memory.rooms[creep.room.name];

        // Execute tasks =======================================================
        
        if (creep.memory.task === 'migrate') {
            creep.moveTo(Game.getObjectById(creep.memory.target));
        }
        
        // Harvesting ----------------------------------------------------------
        if (creep.memory.task === 'harvest') {

            // Find target
            var source = Game.getObjectById(creep.memory.target);
            
            var pickups = mem.joblistPickup
            if (pickups.length) {
                // Temporary workaround... should be
                //var myJob = creep.pos.findClosestByRange(pickups)
                var myJob = Game.getObjectById(pickups[0])

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
            
            // Do the work
            else if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
                creep.harvest(source);
            }
        }

        // Delivering ----------------------------------------------------------
        if (creep.memory.task === 'deliver') {

            var sinks = mem.objectsSinks;

            // Deliver to sinks
            if (sinks.length) {

                // // Keep this for fast dropoff on the road
                //for (var i in sinks) {
                //    creep.transfer(sinks[i], RESOURCE_ENERGY);
                //}
                var sink = creep.pos.findClosestByRange(sinks)
                if (creep.transfer(sink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sink);
                }
            }
            // If delivering, but no sinks
            else {
                // build instead
                creep.memory.task = 'build';
            }
        }

        // Building ------------------------------------------------------------
        if (creep.memory.task === 'build') {

            // Find construction sites
            var sites = mem.objectsSites;
            var jobRamps = mem.joblistRepairRamps;
            var jobRoads = mem.joblistRepairRoads;
            var jobConts = mem.joblistRepairConts;
            var jobWalls = mem.joblistRepairWalls;

            if (typeof sites !== 'undefined' &&
                sites.length) {
                if (creep.build(sites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sites[0]);
                }
                // If building site can't be finished due to GCL
                else if (creep.build(sites[0]) == ERR_RCL_NOT_ENOUGH) {
                   if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                       creep.moveTo(creep.room.controller);
                   }
               }
            }
            else if (typeof jobRamps !== 'undefined' && jobRamps.length > 0) {
                if (creep.repair(Game.getObjectById(jobRamps[0])) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(jobRamps[0]));
                }
            }
            else if (typeof jobRoads !== 'undefined' && jobRoads.length > 0) {
                if (creep.repair(Game.getObjectById(jobRoads[0])) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(jobRoads[0]));
                }
            }
            else if (typeof jobConts !== 'undefined' && jobConts.length > 0) {
                if (creep.repair(Game.getObjectById(jobConts[0])) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(jobConts[0]));
                }
            }
            else if (typeof jobWalls !== 'undefined' && jobWalls.length > 0) {
                if (creep.repair(Game.getObjectById(jobWalls[0])) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(jobWalls[0]));
                }
            }
            else{
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};
