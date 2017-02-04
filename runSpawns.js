var runSpawns = {

    run: function(spawns) {


        if (typeof spawns !== 'undefined' && spawns.length) {

            // Memory objects
            var mem = Memory.rooms[spawns[0].room.name];
            var capacity = spawns[0].room.energyCapacityAvailable;
            var available = spawns[0].room.energyAvailable;


            // Select spawn ----------------------------------------------------

            // Sort spawns by energy
            var spawns = _.sortByOrder(spawns, ['energy']);

            // If two spawns in room and Spawn a is busy
            // Use Spawn b to spawn next creep on the queue
            if (spawns[0].spawning == null) {
                var spawn = spawns[0];
            }
            else if (spawns.length > 1 && spawns[0].spawning != null) {
                var spawn = spawns[1];
            }
            else if (spawns.length > 2 && spawns[0].spawning != null && spawns[1].spawning != null) {
                var spawn = spawns[2];
            }
            else {
                var spawn = spawns[0];
            }


            // Spawn creep -----------------------------------------------------

            var joblistSpawn = mem['joblistSpawn'];
            if (joblistSpawn.length) {
                var jobSpawn = joblistSpawn[0]
                eval('spawn.spawn' +
                    jobSpawn.charAt(0).toUpperCase() +
                    jobSpawn.slice(1) +
                    '(capacity)')


                /*var spawnJob = listJobSpawn[0]
                if (eval('spawn.canCreateCreep' +
                    spawnJob.charAt(0).toUpperCase() +
                    spawnJob.slice(1) +
                    '(capacity)') === OK) {
                    eval('spawn.spawn' +
                        spawnJob.charAt(0).toUpperCase() +
                        spawnJob.slice(1) +
                        '(available)')*/
            }
        }
    }
};

module.exports = runSpawns;
