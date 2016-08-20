var roleWorker = {

    run: function(creep) {

        var operation = creep.memory.operation
        var target = creep.memory.target

        if (typeof target !== 'undefined' &&
            target !== 'none') {
            var thistarget = Game.getObjectById(target)

            if (operation == creep.room.name) {
                // Go to source and harvest
                if (thistarget instanceof Source) {
                    if (creep.harvest(thistarget) == ERR_NOT_IN_RANGE &&
                        creep.harvest(thistarget) == ERR_NOT_ENOUGH_RESOURCES) {
                        creep.moveTo(thistarget);
                    }
                    else {
                      console.log('Error, can not harvest source')
                    }
                }
                else {
                    console.log('Error, target is not a source')
                }
            }
            else if (operation !== creep.room.name &&
            typeof operation !== 'undefined' &&
            operation !== 'none') {
                if (!creep.memory.path) {
                    if (typeof target !== 'undefined' &&
                    target !== 'none') {
                        creep.memory.path = creep.pos.findPathTo(target);
                    }
                }
                creep.moveByPath(creep.memory.path);
                //var destination = findRoute(creep.pos, Game.flags['mining' + operation].pos.roomName)
            }
            else {
                console.log('Worker error: no operation assigned')
            }
      	}
        else {
            function isOdd(num) { return num % 2;}
            var serial = creep.memory.serial;
            var targets = creep.room.find(FIND_SOURCES)
            if (isOdd(serial) == 0) {
                var target = targets[0]
            }
            else if (isOdd(serial) == 1) {
                var target = targets[1]
            }
            var allSpawns = creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_SPAWN }});
            var closestSpawn = creep.pos.findClosestByRange(allSpawns)

            // Go to source and harvest
            if (creep.harvest(target) == ERR_NOT_IN_RANGE &&
                creep.harvest(target) == ERR_NOT_ENOUGH_RESOURCES) {
                creep.moveTo(target);
            }
            // In case creep is next to spawn: drop off
            if (creep.carry.energy == creep.carryCapacity) {
                creep.transfer(closestSpawn, RESOURCE_ENERGY)
            }
        }
    }
};

module.exports = roleWorker;
