module.exports = {

    run: function() {

        // Get username
        var player = Game.spawns[Object.keys(Game.spawns)[0]].owner.username;

        // Get operations and targets from creeps
        var workerTargets = [];
        var workerOperations = [];
        var haulerTargets = [];
        var haulerOperations = [];
        var conquerorTargets = [];
        var conquerorOperations = [];
        var defenderTargets = [];
        var defenderOperations = [];
        var generalistOperations = [];

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
            else if (creep.memory.role == 'generalist') {
                if (typeof creep.memory.operation != 'undefined') {
                    generalistOperations.push(creep.memory.operation);
                }
            }
        }


        for(var i in Game.flags) {

            var flag = null;
            var operation = null;
            var spawn = null;
            var thisDistance = null;
            var closestSpawn = null;
            var thisroom = null;
            var sources = null;
            var source = null;

            // Run mining flags ================================================
            if (i.substring(0, 6) == 'mining') {
                var flag = Game.flags[i];

                // Setup flag --------------------------------------------------
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
                        if (thisDistance < distanceToSpawn &&
                            spawn.room.controller.level > 0) {
                            var distanceToSpawn = thisDistance;
                            var closestSpawn = Game.spawns[j];
                        }
                    }
                    flag.memory.spawn = closestSpawn.id;
                }

                var operation = flag.memory.operation;
                var closestSpawn = Game.getObjectById(flag.memory.spawn);


                // Run remote mining -------------------------------------------
                if (closestSpawn.room.name != flag.pos.roomName) {

                    // If room is open
                    var thisroom = Game.rooms[flag.pos.roomName];
                    if (typeof thisroom != 'undefined') {

                        // Check for invaders
                        var invaders = thisroom.find(FIND_HOSTILE_CREEPS);
                        if (invaders.length &&
                            !_.includes(defenderOperations, operation)) {
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
                                if (!_.includes(conquerorOperations, operation)) {
                                    closestSpawn.spawnConqueror(
                                        closestSpawn.room.energyCapacityAvailable,
                                        operation,
                                        'reserve',
                                        flag.name);
                                }

                                // Assign workers
                                else if (!_.includes(workerTargets, source.id)) {
                                    closestSpawn.spawnWorker(
                                        closestSpawn.room.energyCapacityAvailable,
                                        operation,
                                        source.id);
                                }

                                // Assign haulers
                                else if (!_.includes(haulerOperations, operation)) {
                                    closestSpawn.spawnHauler(
                                        closestSpawn.room.energyCapacityAvailable,
                                        operation);
                                }
                            }
                        }
                    }

                    // If room is not open, send a single creep to reserve first
                    if (typeof thisroom == 'undefined' || thisroom == null) {
                        if(!_.includes(conquerorOperations, operation)) {
                            closestSpawn.spawnConqueror(
                                closestSpawn.room.energyCapacityAvailable,
                                operation,
                                'reserve',
                                flag.name);
                        }
                    }
                }
            }


            // Claim flag ======================================================
            else if (i.substring(0, 5) == 'claim') {
                console.log('claim flag')
                var flag = Game.flags[i];

                // Static variables --------------------------------------------
                // Operation name
                if (typeof flag.memory.operation == 'undefined' ||
                    flag.memory.operation !== Game.flags[i].pos.roomName) {
                    flag.memory.spawn = undefined;
                    flag.memory.operation = Game.flags[i].pos.roomName;
                }

                // Closest spawn
                if (typeof flag.memory.spawn == 'undefined') {
                    var distanceToSpawn = Infinity;
                    for(j in Game.spawns) {
                        var spawn = Game.spawns[j];
                        var thisDistance = Game.map.findRoute(
                            spawn.room.name,
                            flag.pos.roomName).length;
                        if (thisDistance < distanceToSpawn &&
                            spawn.room.controller != undefined &&
                            spawn.room.controller.owner != undefined &&
                            spawn.room.controller.owner.username === 'JanLauGe' &&
                            spawn.room.controller.level > 3) {
                            var distanceToSpawn = thisDistance;
                            var closestSpawn = Game.spawns[j];
                        }
                    }
                    flag.memory.spawn = closestSpawn.id;
                }


                // Run claim flag ----------------------------------------------
                var operation = Game.flags[i].memory.operation;
                var operationRoom = Game.rooms[operation];
                var closestSpawn = Game.getObjectById(flag.memory.spawn);

                // If room undiscovered
                if ((typeof operationRoom == 'undefined' ||
                // Or if room open and neutral
                    (operationRoom !== undefined &&
                    operationRoom.controller.owner === undefined)) &&
                    !_.includes(conquerorOperations, operation)) {

                        console.log('undiscovered')

                    // Spawn conqueror
                    closestSpawn.spawnConqueror(
                        closestSpawn.room.energyCapacityAvailable,
                        operation,
                        'claim',
                        flag.name);
                        console.log('spawning conqueror')
                }
                // If room is already claimed
                else if (typeof operationRoom !== 'undefined' &&
                    typeof Game.rooms[operation].controller.owner !== 'undefined' &&
                    Game.rooms[operation].controller.owner.username === player) {

                        console.log('already claimed')

                    if (typeof _.countBy(generalistOperations, _.identity)[operation] === 'undefined' ||
                        _.countBy(generalistOperations, _.identity)[operation] < 4) {

                        // Send pioneer
                        closestSpawn.spawnGeneralist(
                            closestSpawn.room.energyCapacityAvailable,
                            operation)
                            console.log('spawning pioneer')
                    }
                }
            }
        }
    }
};
