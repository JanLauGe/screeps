var runFlags = {

    run: function() {

        // Get operations and targets from creeps
        var workerTargets = [];
        var workerOperations = [];
        var truckerTargets = [];
        var truckerOperations = [];
        var conquerorTargets = [];
        var conquerorOperations = [];
        for(i in Game.creeps) {
            var creep = Game.creeps[i]
            if (creep.memory.role == 'worker') {
                if (typeof creep.memory.operation !== 'undefined') {
                    workerOperations.push(creep.memory.operation)
                }
                if (typeof creep.memory.target !== 'undefined') {
                    workerTargets.push(creep.memory.target)
                }
            }
            else if (creep.memory.role == 'trucker') {
                if (typeof creep.memory.operation !== 'undefined') {
                    truckerOperations.push(creep.memory.operation)
                }
                if (typeof creep.memory.target !== 'undefined') {
                    truckerTargets.push(creep.memory.target)
                }
            }
            else if (creep.memory.role == 'conqueror') {
                if (typeof creep.memory.operation !== 'undefined') {
                    conquerorOperations.push(creep.memory.operation)
                }
                if (typeof creep.memory.target !== 'undefined') {
                    conquerorTargets.push(creep.memory.target)
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
                if (closestSpawn.room.name === flag.pos.roomName)
                // If closest spawn is in the same room

                //## Domestic economy ------------------------------------------
                // Find and assign sources
                var sources = thisroom.find(FIND_SOURCES)
                for(s in sources) {
                    //## Assign workers ------------------------------------
                    var source = sources[s]
                    if (contains(workerTargets, source.id)) {
                        // do nothing
                    }
                    else if (!contains(workerTargets, source.id)) {
                        // spawn worker for this source
                        console.log('spawning worker for source' + source.id)
                        closestSpawn.spawnWorker(
                            closestSpawn.room.energyCapacityAvailable,
                            operation,
                            source.id)
                    }
                }

                //## Remote mining ---------------------------------------------
                else if (closestSpawn.room.name !== flag.pos.roomName) {
                    var thisroom = Game.rooms[flag.pos.roomName]
                    // If room is open
                    if (typeof thisroom == 'object') {
                        // Find and assign sources
                        var sources = thisroom.find(FIND_SOURCES)
                        for(s in sources) {

                            //## Assign workers
                            var source = sources[s]
                            if (contains(workerTargets, source.id)) {
                                // do nothing
                            }
                            else if (!contains(workerTargets, source.id)) {
                                // spawn worker for this source
                                console.log('spawning worker for source' + source.id)
                                closestSpawn.spawnWorker(
                                    closestSpawn.room.energyCapacityAvailable,
                                    operation,
                                    source.id)
                            }

                            //## Assign truckers
                            if (contains(truckerTargets, source.id)) {
                                // do nothing
                            }
                            else if (!contains(truckerTargets, source.id)) {
                                // spawn trucker for this source
                                console.log('spawning trucker for source' + source.id)
                                closestSpawn.spawnTrucker(
                                    closestSpawn.room.energyCapacityAvailable,
                                    operation,
                                    source.id)
                            }

                            //## Assign conquerors
                            if (contains(conquerorOperations, operation)) {
                                // do nothing
                            }
                            else if (!contains(conquerorOperations, operation)) {
                                // spawn conqueror for this operation
                                console.log('spawning conqueror for operation' + operation)
                                closestSpawn.spawnConqueror(
                                    closestSpawn.room.energyCapacityAvailable,
                                    operation,
                                    'none')
                            }
                        }
                    }
                }

                // If room is not open, send a single creep to reserve first
                if(typeof thisroom == 'undefined') {
                    if (contains(operations, operation)) {
                        // do nothing
                    }
                    else if(!contains(operations, operation)) {
                        // spawn worker for this source
                        console.log('spawning worker for operation' + operation)
                        closestSpawn.spawnWorker(
                            closestSpawn.room.energyCapacityAvailable,
                            operation,
                            'none')
                    }
                }


            }
        }
    }
};

module.exports = runFlags;
