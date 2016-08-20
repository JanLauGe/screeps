var listSpawning = {

    run: function(thisroom) {

        var Mempath = Memory.byroom[thisroom.name]
        Mempath.spawningQueue = []

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
            if (Mempath.creeps[creeprole + 's'].length < Mempath.settings['creeps_' + creeprole + 's']) {
                Mempath.spawningQueue.push(creeprole)
            }
        }


        needsSpawning(thisroom, 'generalist')
        needsSpawning(thisroom, 'carrier')
        needsSpawning(thisroom, 'worker')
        needsSpawning(thisroom, 'builder')
        needsSpawning(thisroom, 'upgrader')

        console.log(Mempath.spawningQueue)
    }
};

module.exports = listSpawning;
