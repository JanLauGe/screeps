var buildCreeps = {

    // make upgraders and carriers carry the same?

    run: function(spawn) {

        var Mempath = Memory.byroom[spawn.room.name]
        var EnergyCapacity = spawn.room.energyCapacityAvailable;
        var EnergyAvailable = spawn.room.energyAvailable;

        // Function to create creeps with names
        Spawn.prototype.getCreepName = function(role){
            var creepName = role + '_0';
            for(i = 0; i < 9999 ; i++) {
                creepName = role + '_' + i;
                if (Game.creeps[creepName] === undefined || Game.creeps[creepName] === 'none') break;
            }
            return creepName;
        }

        // Function to get serial number
        Spawn.prototype.getSerial = function(role) {
            var creepName = role + '_0';
            for(i = 0; i < 9999 ; i++) {
                creepName = role + '_' + i;
                if (Mempath.creeps[role + 's'][i] === undefined) break;
            }
            return i;
        }

        // Code to create dynamic creep bodies
        var bodyPropGeneralist = [WORK,MOVE,CARRY]
        var bodyPropWorker = [WORK,CARRY]
        var bodyPropCarrier = [MOVE,CARRY]
        var bodyPropBuilder = [WORK,MOVE,CARRY]
        var bodyPropUpgrader = [WORK,CARRY]

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


        StructureSpawn.prototype.createTest = function() {
            return this.createCreep(bodySize([MOVE,WORK,CARRY]), Spawn.prototype.getCreepName('dolly'),
            {role: 'test', serial: Spawn.prototype.getSerial('test')});};


        // // To recover from zero harvester low energy scenario:
        // if (EnergyAvailable <= 200 &&
        //     Mempath.creeps.harvesters.length == 0 &&
        //     Mempath.creeps.workers.length == 0){
        //     spawn.createCreep([MOVE,WORK,CARRY], Spawn.prototype.getCreepName('harvester'), {role: 'harvester'});
        //         console.log('Emergency: Spawning new harvester');
        // }

        // Set up tiers of creeps to use


        // New tiers:


        //EnergyCapacity / 50
        //Mempath.settings.minimum_Energy

        StructureSpawn.prototype.createConqueror = function() {
            return this.createCreep([MOVE,CLAIM], Spawn.prototype.getCreepName('conqueror'),
            {role: 'conqueror', serial: Spawn.prototype.getSerial('conqueror')});};
        StructureSpawn.prototype.createPioneer = function() {
            return this.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('pioneer'),
            {role: 'pioneer', serial: Spawn.prototype.getSerial('pioneer')});};
        // StructureSpawn.prototype.createWarrior = function() {
        //     return this.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
        //     Spawn.prototype.getCreepName('warrior'), {role: 'warrior', serial: Spawn.prototype.getSerial('warrior')});};
        StructureSpawn.prototype.createWarrior = function() {
            return this.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL],
            Spawn.prototype.getCreepName('warrior'), {role: 'warrior', serial: Spawn.prototype.getSerial('warrior')});};
        StructureSpawn.prototype.createArcher = function() {
            return this.createCreep([MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK],
            Spawn.prototype.getCreepName('archer'), {role: 'archer', serial: Spawn.prototype.getSerial('archer')});};
        StructureSpawn.prototype.createHealer = function() {
            return this.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
            Spawn.prototype.getCreepName('healer'), {role: 'healer', serial: Spawn.prototype.getSerial('healer')});};
        StructureSpawn.prototype.createFarmer = function() {
            return this.createCreep([WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],
            Spawn.prototype.getCreepName('farmer'), {role: 'farmer', serial: Spawn.prototype.getSerial('farmer')});};
        StructureSpawn.prototype.createFarmroader = function() {
            return this.createCreep([WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],
            Spawn.prototype.getCreepName('farmroader'), {role: 'farmroader', serial: Spawn.prototype.getSerial('farmroader')});};
        StructureSpawn.prototype.createFarmcarrier = function() {
            return this.createCreep([WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            Spawn.prototype.getCreepName('farmcarrier'), {role: 'farmcarrier', serial: Spawn.prototype.getSerial('farmcarrier')});};
            //



        // Decide which tier of creeps to use
        if (EnergyCapacity < 400) {
            StructureSpawn.prototype.createGeneralist = function() {
                return this.createCreep([MOVE,MOVE,WORK,WORK,CARRY,CARRY], Spawn.prototype.getCreepName('generalist'),
                {role: 'generalist', serial: Spawn.prototype.getSerial('generalist')});};
            StructureSpawn.prototype.createBuilder = function() {
                return this.createCreep([MOVE,WORK,CARRY,CARRY], Spawn.prototype.getCreepName('builder'),
                {role: 'builder', serial: Spawn.prototype.getSerial('builder')});};
        }
        else if (EnergyCapacity < 800) {
            StructureSpawn.prototype.createGeneralist = function() {
                return this.createCreep([MOVE,MOVE,WORK,WORK,CARRY,CARRY], Spawn.prototype.getCreepName('generalist'),
                {role: 'generalist', serial: Spawn.prototype.getSerial('generalist')});};
            StructureSpawn.prototype.createBuilder = function() {
                return this.createCreep([MOVE,MOVE,WORK,WORK,CARRY,CARRY], Spawn.prototype.getCreepName('builder'),
                {role: 'builder', serial: Spawn.prototype.getSerial('builder')});};

            StructureSpawn.prototype.createWorker = function() {
                return this.createCreep([MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY], Spawn.prototype.getCreepName('worker'),
                {role: 'worker', operation: 'none', target: 'none', serial: Spawn.prototype.getSerial('worker')});};
            StructureSpawn.prototype.createCarrier = function() {
                return this.createCreep([MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('carrier'),
                {role: 'carrier', serial: Spawn.prototype.getSerial('carrier')});};
            StructureSpawn.prototype.createUpgrader = function() {
                return this.createCreep([MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY], Spawn.prototype.getCreepName('upgrader'),
                {role: 'upgrader', serial: Spawn.prototype.getSerial('upgrader')});};
        }
        else if(EnergyCapacity >= 800 && EnergyCapacity < 1300) {
            StructureSpawn.prototype.createHarvester = function() {
                return this.createCreep([MOVE,WORK,CARRY], Spawn.prototype.getCreepName('harvester'), {role: 'harvester'});};
            StructureSpawn.prototype.createBuilder = function() {
                return this.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('builder'), {role: 'builder'});};
            StructureSpawn.prototype.createGeneralist = function() {
                return this.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('pioneer'),
                {role: 'pioneer', serial: Spawn.prototype.getSerial('pioneer')});};
            StructureSpawn.prototype.createWorker = function() {
                return this.createCreep([MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('worker'),
                {role: 'worker', operation: 'none', target: 'none', serial: Spawn.prototype.getSerial('worker')});};
            StructureSpawn.prototype.createCarrier = function() {
                return this.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('carrier'),
                {role: 'carrier', serial: Spawn.prototype.getSerial('carrier')});};
            StructureSpawn.prototype.createUpgrader = function() {
                return this.createCreep([MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('upgrader'),
                {role: 'upgrader', serial: Spawn.prototype.getSerial('upgrader')});};
        }
        else if(EnergyCapacity >= 1300 && EnergyCapacity < 1800) {
            StructureSpawn.prototype.createHarvester = function() {
                return this.createCreep([MOVE,WORK,CARRY], Spawn.prototype.getCreepName('harvester'), {role: 'harvester'});};
            StructureSpawn.prototype.createBuilder = function() {
                return this.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('builder'), {role: 'builder'});};
            StructureSpawn.prototype.createWorker = function() {
                return this.createCreep([MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('worker'),
                {role: 'worker', operation: 'none', target: 'none', serial: Spawn.prototype.getSerial('worker')});};
            StructureSpawn.prototype.createCarrier = function() {
                return this.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('carrier'),
                {role: 'carrier', serial: Spawn.prototype.getSerial('carrier')});};
            StructureSpawn.prototype.createUpgrader = function() {
                return this.createCreep([MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('upgrader'),
                {role: 'upgrader', serial: Spawn.prototype.getSerial('upgrader')});};
        }
        else if(EnergyCapacity >= 1800) {
            StructureSpawn.prototype.createHarvester = function() {
                return this.createCreep([MOVE,WORK,CARRY], Spawn.prototype.getCreepName('harvester'), {role: 'harvester'});};
            StructureSpawn.prototype.createBuilder = function() {
                return this.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('builder'), {role: 'builder'});};
            StructureSpawn.prototype.createWorker = function() {
                return this.createCreep([MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('worker'),
                {role: 'worker', operation: 'none', target: 'none', serial: Spawn.prototype.getSerial('worker')});};
            StructureSpawn.prototype.createCarrier = function() {
                return this.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('carrier'),
                {role: 'carrier', serial: Spawn.prototype.getSerial('carrier')});};
            StructureSpawn.prototype.createUpgrader = function() {
                return this.createCreep([MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], Spawn.prototype.getCreepName('upgrader'),
                {role: 'upgrader', serial: Spawn.prototype.getSerial('upgrader')});};
        }
        else if(EnergyCapacity >= 2300) {
            StructureSpawn.prototype.createHealer = function() {
                return this.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], Spawn.prototype.getCreepName('healer'),
                {role: 'healer', serial: Spawn.prototype.getSerial('healer')});};
            StructureSpawn.prototype.createTank = function() {
                return this.createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
                Spawn.prototype.getCreepName('tank'), {role: 'tank', serial: Spawn.prototype.getSerial('tank')});};
        }

        // Economy
        if (Mempath.creeps.generalists.length < Mempath.settings['creeps_generalists']) {
            spawn.createGeneralist()
            console.log('Spawning new generalist');
        }
        else if(Mempath.creeps.carriers.length < Mempath.settings['creeps_carriers']) {
            spawn.createCarrier()
            console.log('Spawning new carrier');
        }
        else if(Mempath.creeps.workers.length < Mempath.settings['creeps_workers']) {
            spawn.createWorker()
            console.log('Spawning new worker');
        }
        else if(Mempath.creeps.builders.length < Mempath.settings['creeps_builders']) {
            spawn.createBuilder()
            console.log('Spawning new builder');
        }
        else if(Mempath.creeps.upgraders.length < Mempath.settings['creeps_upgraders']) {
            spawn.createUpgrader()
            console.log('Spawning new upgrader');
        }
        else if(Memory.global.creeps.farmers.length < Mempath.settings['creeps_farmers']) {
            spawn.createFarmer()
            console.log('Spawning new farmer');
        }
        else if(Memory.global.creeps.farmroaders.length < Mempath.settings['creeps_farmroaders']) {
            spawn.createFarmroader()
            console.log('Spawning new farmroader');
        }
        else if(Memory.global.creeps.farmcarriers.length < Mempath.settings['creeps_farmcarriers']) {
            spawn.createFarmcarrier()
            console.log('Spawning new farmcarrier');
        }

        // Aggression
        else if(Memory.global.creeps.warriors.length < Mempath.settings['creeps_warriors']) {
            spawn.createWarrior()
            console.log('Spawning new warrior');
        }
        else if(Memory.global.creeps.healers.length < Mempath.settings['creeps_healers']) {
            spawn.createHealer()
            console.log('Spawning new healer');
        }
        else if(Memory.global.creeps.tanks.length < Mempath.settings['creeps_tanks']) {
            spawn.createTank()
            console.log('Spawning new tank');
        }
        else if(Memory.global.creeps.conquerors.length < Mempath.settings['creeps_conquerors']) {
            spawn.createConqueror()
            console.log('Spawning new conqueror');
        }
        else if(Memory.global.creeps.pioneers.length < Mempath.settings['creeps_pioneers']) {
            spawn.createPioneer()
            console.log('Spawning new pioneer');
        }
        else if(Memory.global.creeps.archers.length < Mempath.settings['creeps_archers']) {
            spawn.createArcher()
            console.log('Spawning new archer');
        }
    }
}

module.exports = buildCreeps;
