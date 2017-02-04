module.exports = {

    run: function() {

        // Get operations and targets from creeps
        var workerTargets = [];
        var workerOperations = [];
        var haulerTargets = [];
        var haulerOperations = [];
        var conquerorTargets = [];
        var conquerorOperations = [];
        var defenderTargets = [];
        var defenderOperations = [];

        for(i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.role == 'worker') {
                if (typeof creep.memory.operation != 'undefined') {
                    workerOperations.push(creep.memory.operation);
                }
                if (typeof creep.memory.target != 'undefined') {
                    workerTargets.push(creep.memory.target);
                }
            }
            else if (creep.memory.role == 'hauler') {
                if (typeof creep.memory.operation != 'undefined') {
                    haulerOperations.push(creep.memory.operation);
                }
                if (typeof creep.memory.target != 'undefined') {
                    haulerTargets.push(creep.memory.target);
                }
            }
            else if (creep.memory.role == 'conqueror') {
                if (typeof creep.memory.operation != 'undefined') {
                    conquerorOperations.push(creep.memory.operation);
                }
                if (typeof creep.memory.target != 'undefined') {
                    conquerorTargets.push(creep.memory.target);
                }
            }
            else if (creep.memory.role == 'defender') {
                if (typeof creep.memory.operation != 'undefined') {
                    defenderOperations.push(creep.memory.operation);
                }
                if (typeof creep.memory.target != 'undefined') {
                    defenderTargets.push(creep.memory.target);
                }
            }
        }

        // Run remote mining
        for(var i in Game.flags) {

            var flag = null;
            var operation = null;
            var spawn = null;
            var thisDistance = null;
            var closestSpawn = null;
            var thisroom = null;
            var sources = null;
            var source = null;

            // Mining flags ====================================================
            if (i.substring(0, 6) == 'mining') {
                var flag = Game.flags[i];
                
                // Static variables --------------------------------------------
                // Operation name
                if (typeof flag.memory.operation == 'undefined') {
                    var operation = i.substring(7, 15);
                    flag.memory.operation = operation;
                }
                
                // Closest spawn
                if (typeof flag.memory.spawn == 'undefined') {
                    var distanceToSpawn = Infinity;
                    for(j in Game.spawns) {
                        var spawn = Game.spawns[j];
                        var thisDistance = Game.map.findRoute(
                            spawn.room.name,
                            flag.pos.roomName).length;
                        if (thisDistance < distanceToSpawn) {
                            var distanceToSpawn = thisDistance;
                            var closestSpawn = Game.spawns[j];
                        }
                    }
                    flag.memory.spawn = closestSpawn.id;
                }
                
                var operation = flag.memory.operation;
                var closestSpawn = Game.getObjectById(flag.memory.spawn);
                
                // Remote mining -----------------------------------------------
                if (closestSpawn.room.name != flag.pos.roomName) {
                    // If room is open
                    var thisroom = Game.rooms[flag.pos.roomName];
                    if (typeof thisroom != 'undefined') {
                        
                        // Check for invaders
                        var invaders = thisroom.find(FIND_HOSTILE_CREEPS);
                        if (invaders.length &&
                            !contains(defenderOperations, operation)) {
                            closestSpawn.spawnDefender(
                                closestSpawn.room.energyCapacityAvailable,
                                operation);
                        }
                        else {
                            
                            // Find and assign sources
                            var sources = thisroom.find(FIND_SOURCES);
                            for(s in sources) {
                                var source = sources[s];

                                // Assign conquerors
                                if (!contains(conquerorOperations, operation)) {
                                    closestSpawn.spawnConqueror(
                                        closestSpawn.room.energyCapacityAvailable,
                                        operation);
                                }

                                // Assign workers
                                else if (!contains(workerTargets, source.id)) {
                                    closestSpawn.spawnWorker(
                                        closestSpawn.room.energyCapacityAvailable,
                                        operation,
                                        source.id);
                                }

                                // Assign haulers
                                else if (!contains(haulerTargets, source.id)) {
                                    closestSpawn.spawnHauler(
                                        closestSpawn.room.energyCapacityAvailable,
                                        operation,
                                        source.id);
                                }
                            }
                        }
                    }

                    // If room is not open, send a single creep to reserve first
                    if (typeof thisroom == 'undefined' || thisroom == null) {
                        if(!contains(conquerorOperations, operation)) {
                            closestSpawn.spawnConqueror(
                                closestSpawn.room.energyCapacityAvailable,
                                operation,
                                'operationroom');
                        }
                    }
                }
            }
            
            // Conquer flags ===================================================
            else if (i.substring(0, 5) == 'claim') {
                
                var flag = Game.flags[i];
                
                // Static variables ----------------------------------------
                
                // Operation name
                if (typeof flag.memory.operation == 'undefined') {
                    var operation = Game.flags[i].pos.roomName;
                    flag.memory.operation = operation;
                }
                
                // Closest spawn
                if (typeof flag.memory.spawn == 'undefined') {
                    var distanceToSpawn = Infinity;
                    for(j in Game.spawns) {
                        var spawn = Game.spawns[j];
                        var thisDistance = Game.map.findRoute(
                            spawn.room.name,
                            flag.pos.roomName).length;
                        if (thisDistance < distanceToSpawn) {
                            var distanceToSpawn = thisDistance;
                            var closestSpawn = Game.spawns[j];
                        }
                    }
                    flag.memory.spawn = closestSpawn.id;
                }
                
                // If room not yet targeted by conqueror
                if (!contains(conquerorOperations, Game.flags[i].pos.roomName)) {
                    
                    // Run claim flag ------------------------------------------
                    var operation = Game.flags[i].memory.operation;
                    var closestSpawn = Game.getObjectById(flag.memory.spawn);
                
                    console.log(operation)
                    closestSpawn.spawnConqueror(
                        closestSpawn.room.energyCapacityAvailable,
                        operation,
                        'claim',
                        '');
                }
            }
        }
    }
};

