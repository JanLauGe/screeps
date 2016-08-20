var runFlags = {

    run: function() {

        // Get all worker operations and targets
        var targets = []
        var operations = []
        for(i in Game.creeps) {
            var creep = Game.creeps[i]
            if (creep.memory.role == 'worker') {
                if (typeof creep.memory.operation !== 'undefined') {
                    operations.push(creep.memory.operation)
                }
                if (typeof creep.memory.target !== 'undefined') {
                    targets.push(creep.memory.target)
                }
            }
        }

        // Run remote mining
        for(var i in Game.flags) {
            if (i.substring(0, 6) == 'mining') {
                var flag = Game.flags[i];
                var operation = i.substring(7, 15);
                flag.memory.operation = operation;

                // Find closest spawn
                var distanceToSpawn = Infinity
                for(j in Game.spawns) {
                    var spawn = Game.spawns[j]
                    var thisDistance = Game.map.findRoute(
                        spawn.room.name,
                        flag.pos.roomName).length
                    if (thisDistance < distanceToSpawn) {
                        var distanceToSpawn = thisDistance
                        var closestSpawn = Game.spawns[j]
                    }
                }
                flag.memory.spawn = closestSpawn.id;

                var thisroom = Game.rooms[operation]
                // If room is open
                if (typeof thisroom == 'object') {
                    // Find and assign sources
                    var sources = thisroom.find(FIND_SOURCES)
                    // Check if sources are assigned
                    for(s in sources) {
                        var source = sources[s]
                        if (contains(targets, source.id)) {
                            // do nothing
                        }
                        else if(!contains(targets, source.id)) {
                            // spawn worker for this source
                            console.log('spawning worker')
                            closestSpawn.spawnWorker(
                                closestSpawn.room.energyCapacityAvailable,
                                operation,
                                source.id)
                        }
                    }
                }
                // If room is not open, send a single worker
                else if(typeof thisroom == 'undefined') {
                    if (contains(operations, operation)) {
                        // do nothing
                    }
                    else if(!contains(operations, operation)) {
                        // spawn worker for this source
                        closestSpawn.spawnWorker(
                            closestSpawn.room.energyCapacityAvailable,
                            operation,
                            source.id)
                    }
                }
            }
        }
    }
};

module.exports = runFlags;
