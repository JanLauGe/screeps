var runSpawns = {

    run: function(spawns) {

        var EnergyCapacity = spawns[0].room.energyCapacityAvailable;
        var EnergyAvailable = spawns[0].room.energyAvailable;
        var Mempath = Memory.byroom[spawns[0].room.name]
        var spawningQueue = Mempath.spawningQueue

        var spawn = spawns[0]
        // Workers are spawned via run.flags
        if (spawningQueue[0] == 'carrier') {
            if (spawn.spawnCarrier(EnergyCapacity) == ERR_NOT_ENOUGH_RESOURCES) {
                console.log(spawn.room.name + ' is waiting for resources to spawn carrier')
            }
        }
        else if (spawningQueue[0] == 'generalist') {
            if (spawn.spawnGeneralist(EnergyCapacity) == ERR_NOT_ENOUGH_RESOURCES) {
                console.log(spawn.room.name + ' is waiting for resources to spawn generalist')
            }
        }
        else if (spawningQueue[0] == 'builder') {
            if (spawn.spawnBuilder(EnergyCapacity) == ERR_NOT_ENOUGH_RESOURCES) {
                console.log(spawn.room.name + ' is waiting for resources to spawn builder')
            }
        }
        else if (spawningQueue[0] == 'upgrader') {
            if (spawn.spawnUpgrader(EnergyCapacity) == ERR_NOT_ENOUGH_RESOURCES) {
                console.log(spawn.room.name + ' is waiting for resources to spawn upgrader')
            }
        }
    }
};

module.exports = runSpawns;
