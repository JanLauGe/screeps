var runTowers = {

    // add: scale range dynamically depending on energy left in tower
    run: function(towers) {

        if (towers.length){

            var roomname = towers[0].room.name;
            var mem = Memory.rooms[roomname]
            // Define minimum range at which to start firing
            var towerRange =  40
            // Put players on this list to avoid friendly fire
            var excludedPlayers = ['JanLauGe', 'linucc', 'MyFriends']
            // Add exeptions with different tower behaviour here
            if (towers[0].room.name == '') {
                var towerMode = 'holdfire'
            }
            else {
                var towerMode = 'fireatwill'
            }


            // Each tower
            for(i in towers) {
                var tower = towers[i]

                // Find hostile creeps
                var hostiles = towers[0].room.find(FIND_HOSTILE_CREEPS, {
                    filter: (hostile) => {return (
                    // Closer than defined range
                    tower.pos.getRangeTo(hostile) <= towerRange
                    && !excludedPlayers.includes(hostile.owner.username))}});

                // Attack closest creep
                if (hostiles.length) {
                    tower.attack(tower.pos.findClosestByRange(hostiles));
                }
                // Conduct upkeep
                else if (mem.joblistRepairRoads.length) {
                    tower.repair(Game.getObjectById(mem.joblistRepairRoads[0]));
                }
                else if (mem.joblistRepairRamps.length) {
                    tower.repair(Game.getObjectById(mem.joblistRepairRamps[0]));
                }
                else if (mem.joblistRepairWalls.length) {
                    tower.repair(Game.getObjectById(mem.joblistRepairWalls[0]));
                }
            }
        }
    }
};

module.exports = runTowers;
