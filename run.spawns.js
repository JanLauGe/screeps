var runSpawns = {

    run: function(spawns) {

      var EnergyCapacity = spawns[0].room.energyCapacityAvailable;
      var EnergyAvailable = spawns[0].room.energyAvailable;
      var Mempath = Memory.byroom[spawns[0].room.name]
      var spawningQueue = Mempath.spawningQueue

      var spawn = spawns[0]
      if (spawningQueue[0] == 'worker') {
        if (spawn.spawnWorker(EnergyCapacity) == ERR_NOT_ENOUGH_RESOURCES) {
            console.log('Waiting for resources to spawn creep')
        }
      }


      // Code to create dynamic creep bodies
      var bodyPropGeneralist = [WORK, MOVE, CARRY]
      var bodyPropWorker = [WORK, CARRY]
      var bodyPropCarrier = [MOVE, CARRY]
      var bodyPropBuilder = [WORK, MOVE, CARRY]
      var bodyPropUpgrader = [WORK, CARRY]
    }
};

module.exports = runSpawns;
