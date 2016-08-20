var listSpawning = {

    run: function(thisspawn) {

        //var Mempath = Memory.byroom[thisroom.name]
        var Mempath = Memory.byroom[thisspawn.room.name]

        // Custom function for array duplicates
        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        // Compare number of creeps to settings
        function needsSpawning(thisroom, creeprole) {
            var Mempath = Memory.byroom[thisroom]
            if (Mempath.creeps[creeprole + 's'].length < Mempath.settings['creeps_' + creeprole + 's']) {
                return(creeprole)
            }
            else {
                return
            }
        }

        // Create spawning queue
        var spawningQueue = []
        spawningQueue.push(thisroom, 'generalist')
        spawningQueue.push(thisroom, 'carrier')
        spawningQueue.push(thisroom, 'worker')
        spawningQueue.push(thisroom, 'builder')
        spawningQueue.push(thisroom, 'upgrader')

        console.log(spawningQueue)
    }
};

module.exports = listSpawning;
