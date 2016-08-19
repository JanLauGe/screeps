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

        //     var allJobs = []
        //     for(j = 0; j < Memory.byroom.E46N42.jobs.pickups.length; j++){
        //         allJobs.push(Game.getObjectById(Memory.byroom.E46N42.jobs.pickups[j]))
        //     }
        //     var myJob = creep.pos.findClosestByRange(allJobs)

        //     // Execute job
        //     if (myJob instanceof Creep) {
        //         if (myJob.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(myJob)
        //         }
        //     }
        //     else if(myJob instanceof Resource) {
        //         if (creep.pickup(myJob) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(myJob)
        //         }
        //     }
        //     else if(myJob instanceof StructureContainer) {
        //         if (creep.withdraw(myJob, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(myJob)
        //         }
        //     }
        // }


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

                // if (jobRamps.length > 0){
                //     for(var r in jobRamps){
                //         var target = Game.getObjectById(jobRamps[r])
                //         creep.say('ramping');
                //         if( creep.repair(target) == ERR_NOT_IN_RANGE){
                //             creep.moveTo(target);
                //         }
                //     }
                // }

                // //# Build roads
                // else if(jobRoads.length > 0){
                //     for(var r in jobRoads){
                //         var target = Game.getObjectById(jobRoads[r])
                //         creep.say('roading');
                //         if( creep.repair(target) == ERR_NOT_IN_RANGE){
                //             creep.moveTo(target);
                //         }
                //     }
                // }

                // //# Build containers
                // else if(jobConts.length){
                //     for(var r in jobConts){
                //         var target = Game.getObjectById(jobConts[r])
                //         creep.say('conting');
                //         if( creep.repair(target) == ERR_NOT_IN_RANGE){
                //             creep.moveTo(target);
                //         }
                //     }
                // }

                //# Build walls
                //else if( jobsWalls.length > 0){
                //    for(var r in jobsWalls){
                //        var target = Game.getObjectById(jobsWalls[r])
                //        creep.say('walling');
                //        if( creep.repair(target) == ERR_NOT_IN_RANGE){
                //            creep.moveTo(target);
                //        }
                //    }
                //}

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
}

    //     console.log(targets)
    //     var serial = creep.memory.serial
    //     console.log(serial)

    //     if(creep.memory.building && creep.carry.energy == 0) {
    //         creep.memory.building = false;
	   // }
	   // if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	   //     creep.memory.building = true;
	   // }

	   // if(creep.memory.building && targets.length > 0) {
	   //     if(targets.length > 1){
    //             if(creep.build(targets[serial]) == ERR_NOT_IN_RANGE) {
    //                 creep.moveTo(targets[serial]);
    //             }
	   //     }
    //         else {
    //             if(creep.build(targets[serial]) == ERR_NOT_IN_RANGE) {
    //                 creep.moveTo(targets[serial]);
    //             }
    //         }
	   // }
	   // else if(creep.carry.energy == 0) {
	   //     if(creep.room.find(FIND_DROPPED_RESOURCES).length){
    //             if (creep.pickup(creep.room.find(FIND_DROPPED_RESOURCES)[0]) == ERR_NOT_IN_RANGE){
    //                 creep.moveTo(creep.room.find(FIND_DROPPED_RESOURCES)[0])
    //             }
    //         }
    //         else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    //             var sources = creep.room.find(FIND_SOURCES);
    //             creep.moveTo(sources[0]);
    //         }
	   // }
	   // else {
    //         if(creep.carry.energy == creep.carryCapacity) {
    //             if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    //                 creep.moveTo(creep.room.controller);
    //             }
    //         }
    //         else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    //             var sources = creep.room.find(FIND_SOURCES);
    //             if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    //                 creep.moveTo(sources[0]);
    //             }
    //         }
    // 	}

            // if(creep.memory.mode == 'loading') {
        //     if(creep.room.find(FIND_DROPPED_RESOURCES).length > 0){
        //         if (creep.pickup(creep.room.find(FIND_DROPPED_RESOURCES)[0]) == ERR_NOT_IN_RANGE){
        //             creep.moveTo(creep.room.find(FIND_DROPPED_RESOURCES)[0])
        //         }
        //     }else{
        //         var fullStorage = creep.room.find(FIND_STRUCTURES, {
        //             filter: (structure) => {
        //                 return (structure.structureType == STRUCTURE_SPAWN ||
        //                         structure.structureType == STRUCTURE_EXTENSION ||
        //                         structure.structureType == STRUCTURE_TOWER) &&
        //                         structure.energy > 0;
        //             }
        //         })
        //         // If sturctures with energy
        //         if (fullStorage.length > 0){
        //             // If enough harvesters or energy to build harvesters
        //             if(creep.room.energyAvailable >= Memory.byroom.settings.minimum_Energy){
        //                 if(creep.withdraw(fullStorage[0], RESOURCE_ENERGY, creep.carryCapacity - creep.carry) == ERR_NOT_IN_RANGE){
        //                     creep.moveTo(fullStorage[0])
        //                 }else if(creep.withdraw(fullStorage[0], RESOURCE_ENERGY, creep.carryCapacity - creep.carry) == ERR_NOT_ENOUGH_RESOURCES){
        //                     creep.withdraw(fullStorage[0], RESOURCE_ENERGY, fullStorage[0].energy)
        //                 }
        //             }
        //             else{
        //                 creep.say('waiting')
        //             }
        //         }
        //     }
        // }


                //# Build Ramps
                // var jobRamps = creep.room.find(FIND_MY_STRUCTURES, {
                //     filter: (structure) => {
                //         return (structure.structureType == 'rampart' &&
                //         structure.hits < Memory.byroom.settings.structural_lifeRamps)}});
                // var jobConts = creep.room.find(FIND_STRUCTURES, {
                //     filter: (structure) => {
                //         return (structure.structureType == 'container' &&
                //         structure.hits < Memory.byroom.settings.structural_lifeConts)}});
                // var jobRoads = creep.room.find(FIND_STRUCTURES, {
                //     filter: (structure) => {
                //         return (structure.structureType == 'road' &&
                //         structure.hits < Memory.byroom.settings.structural_lifeRoads)}});
                // var jobsWalls = creep.room.find(FIND_STRUCTURES, {
                //     filter: (structure) => {
                //         return (structure.structureType == 'constructedWall' &&
                //                 structure.hits < Memory.byroom.settings.structural_lifeWalls)}});

module.exports = roleBuilder;
