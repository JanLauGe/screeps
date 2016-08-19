var spawnCreeps = {

    run: function(spawn) {

        var EnergyCapacity = spawn.room.energyCapacityAvailable;
        var EnergyAvailable = spawn.room.energyAvailable;
        var Mempath = Memory.byroom[spawn.room.name]

        // Function to create creeps with names
        Spawn.prototype.getCreepName = function(role){
            var creepName = role + '_0';
            for(i = 0; i < 9999 ; i++) {
                creepName = role + '_' + i;
                if(Game.creeps[creepName] === undefined || Game.creeps[creepName] === null) break;
            }
            return creepName;
        }

        // Function to get serial number
        Spawn.prototype.getSerial = function(role) {
            var creepName = role + '_0';
            for(i = 0; i < 9999 ; i++) {
                creepName = role + '_' + i;
                if(Game.creeps[creepName] === undefined || Game.creeps[creepName] === null) break;
            }
            return i;
        }

        // Code to create dynamic creep bodies
        var bodyPropGeneralist = [WORK, MOVE, CARRY]
        var bodyPropWorker = [WORK, CARRY]
        var bodyPropCarrier = [MOVE, CARRY]
        var bodyPropBuilder = [WORK, MOVE, CARRY]
        var bodyPropUpgrader = [WORK, CARRY]

        // Function to generate bodies proportional to room tier
        // bodyProportions give the tier step, static gives the parts that do not scale
        bodySize = function(bodyProportions, static) {
            var numSections = EnergyAvailable / 200 // calculate segment costs?
            var parts = []
            for (var i = 0; i < numSections; i++) {
            	for (var part of bodyProportions) {
            		parts.push(part);
            	}
            }
            parts.push(static)
            return(parts)
        }

        // Custom spawning function to generate creeps
        StructureSpawn.prototype.spawnCreep = function(role, bodyProportions, static) {
            return this.createCreep(
                bodySize(bodyProportions, static),
                Spawn.prototype.getCreepName(role),
                {role: role, serial: Spawn.prototype.getSerial(role)}
            );
        };

        console.log('ROOM!!!!')
        console.log(spawn)
        console.log(EnergyAvailable === EnergyCapacity)
        console.log(Mempath.creeps.generalists.length < Mempath.settings['creeps_workers'])
        console.log(Mempath.creeps.generalists.length)
        console.log(Mempath.settings['creeps_workers'])

        // console.log(spawn.spawnCreep('generalist', bodyPropGeneralist, []))
        // ## SPAWN CREEPS
        if (EnergyAvailable === EnergyCapacity) {
            if (Mempath.creeps.generalists.length < Mempath.settings['creeps_generalists']) {
                spawn.spawnCreep('generalist', bodyPropGeneralist, [])
            }
            if (Mempath.creeps.workers.length < Mempath.settings['creeps_workers']) {
                spawn.spawnCreep('worker', bodyPropWorker, [])
            }
            if (Mempath.creeps.carriers.length < Mempath.settings['creeps_carriers']) {
                spawn.spawnCreep('carrier', bodyPropCarrier, [])
            }
            if (Mempath.creeps.builders.length < Mempath.settings['creeps_builders']) {
                spawn.spawnCreep('builder', bodyPropBuilder, [])
            }
            if (Mempath.creeps.upgraders.length < Mempath.settings['creeps_upgraders']) {
                spawn.spawnCreep('upgrader', bodyPropUpgrader, [])
            }

            if (Mempath.creeps.warriors.length < Mempath.settings['creeps_warriors']) {
                spawn.spawnCreep('warrior', bodyPropUpgrader, [])
            }
            if (Mempath.creeps.conquerors.length < Mempath.settings['creeps_conquerors']) {
                spawn.spawnCreep('conqueror', bodyPropUpgrader, [])
            }
            if (Mempath.creeps.pioneers.length < Mempath.settings['creeps_pioneers']) {
                spawn.spawnCreep('pioneer', bodyPropUpgrader, [])
            }
        }
    }
}

module.exports = spawnCreeps;
