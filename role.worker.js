var roleWorker = {

    run: function(creep) {

        // Mode definition ----------------------------------
        var operation = creep.memory.operation
        var target = creep.memory.target
        var flag = Game.flags['mining_' + operation]
        var remote = (flag.pos.roomName !== Game.getObjectById(flag.memory.spawn).room.name)
        var constructionsites = creep.room.find(FIND_CONSTRUCTION_SITES)

        // If remote and if in room and if energy full, build!
        if (remote &&
            creep.room.name === flag.pos.roomName &&
            _.sum(creep.carry) === creep.carryCapacity &&
            constructionsites.length > 0) {
            creep.memory.mode = 'building'
        }
        else if (_.sum(creep.carry) == 0 ||
            constructionsites.length < 1) {
            creep.memory.mode = 'working'
        }

        // Mode execution ----------------------------------
        if (creep.memory.mode === 'building') {
            var jobs = creep.room.find(FIND_CONSTRUCTION_SITES)
            var job = creep.pos.findClosestByRange(jobs)

            var droppedenergy = creep.pos.lookFor(LOOK_ENERGY)
            if (droppedenergy.length) {
                creep.pickup(droppedenergy)
            }
            if (creep.build(job) == ERR_NOT_IN_RANGE) {
                creep.moveTo(job)
            }
        }

        else if (creep.memory.mode === 'working') {
            if (typeof target === 'undefined') {
                console.log('Error: no target assigned to ' + creep.name)
            }
            else if(target === 'none') {
                if (typeof operation !== 'undefined' &&
                    operation !== 'none') {
                    if (creep.room.name !== operation) {
                        // open room
                        creep.moveTo(Game.flags['mining_'+operation])
                    }
                    else if (creep.room.name === operation) {
                        creep.memory.target = Game.rooms[operation].find(FIND_SOURCES)[0].id
                    }
                }
            }

            if (typeof target !== 'undefined' &&
                target !== 'none') {

                var thistarget = Game.getObjectById(target)

                if (operation === creep.room.name) {
                    // Go to source and harvest
                    if (thistarget instanceof Source) {
                        if (creep.harvest(thistarget) === ERR_NOT_IN_RANGE ||
                            creep.harvest(thistarget) === ERR_NOT_ENOUGH_RESOURCES) {
                            creep.moveTo(thistarget);
                        }
                        else if(creep.harvest(thistarget) === OK) {
                            // do nothing
                        }
                        else {
                          console.log('Error, cannot harvest source for '+ creep.name)
                        }
                    }
                    else {
                        console.log('Error, target is not a source for ' + creep.name)
                    }
                }
                else if (operation !== creep.room.name &&
                typeof operation !== 'undefined' &&
                operation !== 'none') {
                    creep.moveTo(Game.flags['mining_'+ operation])
                }
                else {
                    console.log('Error: no operation assigned to ' + creep.name)
                }
          	}
          	else {
          	    console.log('Error: no target assigned to ' + creep.name)
          	}
        }
    }
};

module.exports = roleWorker;
