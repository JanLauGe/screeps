var functions = {

    run: function() {

        // Custom function for array duplicates
        contains = function(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        // Function to find odd or even numbers
        isOdd = function(num) { return num % 2;}

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

        //## CREEP SPAWNING FUNCTIONS ----------------------------------------------

        // Function for spawning a generalist
        StructureSpawn.prototype.spawnGeneralist = function(energy) {
            var body = [];
            var numberOfSegments = Math.floor(energy / 200);
            for (i = 0; i < numberOfSegments; i++) {
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('generalist'), {
                    role: 'generalist',
                    serial: Spawn.prototype.getSerial('generalist'),
                    operation: 'none',
                    target: 'none'}
            )
        }

        // Function for spawning a carrier
        StructureSpawn.prototype.spawnCarrier = function(energy) {
            var body = [];
            var maxSegments = 6;
            var numberOfSegments = Math.min(maxSegments, Math.floor(energy / 100));
            for (i = 0; i < numberOfSegments; i++) {
                body.push(CARRY);
                body.push(MOVE);
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('carrier'), {
                    role: 'carrier',
                    serial: Spawn.prototype.getSerial('carrier'),
                    operation: 'none',
                    target: 'none'}
            )
        }

        // Function for spawning a worker
        StructureSpawn.prototype.spawnWorker = function(energy, operation, target) {
            var body = [];
            if (energy < 550) {
                var body = [MOVE,WORK,WORK,CARRY]
            }
            else if (energy < 800) {
                var body = [MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY]
            }
            else if (energy >= 800) {
                var body = [MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY]
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('worker'), {
                    role: 'worker',
                    serial: Spawn.prototype.getSerial('worker'),
                    operation: operation,
                    target: target}
            )
        }

        // Function for spawning a builder
        StructureSpawn.prototype.spawnBuilder = function(energy) {
            var body = [];
            var numberOfSegments = Math.floor(energy / 200);
            for (i = 0; i < numberOfSegments; i++) {
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('builder'), {
                    role: 'builder',
                    serial: Spawn.prototype.getSerial('builder'),
                    operation: 'none',
                    target: 'none'}
            )
        }

        // Function for spawning an upgrader
        StructureSpawn.prototype.spawnUpgrader = function(energy) {
            var body = [];
            var numberOfSegments = Math.floor((energy - 200) / 150);
            for (i = 0; i < numberOfSegments; i++) {
                body.push(WORK);
                body.push(CARRY);
            }
            body.push(WORK);
            body.push(CARRY);
            body.push(MOVE);
            return this.createCreep(
                body, Spawn.prototype.getCreepName('upgrader'), {
                    role: 'upgrader',
                    serial: Spawn.prototype.getSerial('upgrader'),
                    operation: 'none',
                    target: 'none'}
            )
        }

        // Function for spawning a trucker
        StructureSpawn.prototype.spawnTrucker = function(energy, operation, target) {
            var body = [];
            var maxSegments = 10;
            var numberOfSegments = Math.min(maxSegments, Math.floor((energy - 150) / 100));
            for (i = 0; i < numberOfSegments; i++) {
                body.push(MOVE);
                body.push(CARRY);
            }
            body.push(MOVE)
            body.push(WORK)
            return this.createCreep(
                body, Spawn.prototype.getCreepName('trucker'), {
                    role: 'trucker',
                    serial: Spawn.prototype.getSerial('trucker'),
                    operation: operation,
                    target: target}
            )
        }

        // Function for spawning a conqueror
        StructureSpawn.prototype.spawnConqueror = function(energy, operation, target) {
            var body = [];
            var maxSegments = 2;
            var numberOfSegments = Math.min(maxSegments, Math.floor(energy / 650));
            for (i = 0; i < numberOfSegments; i++) {
                body.push(MOVE);
                body.push(CLAIM);
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('conqueror'), {
                    role: 'conqueror',
                    serial: Spawn.prototype.getSerial('conqueror'),
                    operation: operation,
                    target: target}
            )
        }

        // Function for spawning a mining operations defender
        StructureSpawn.prototype.spawnDefender = function(energy, operation, target) {
            var body = [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            return this.createCreep(
                body, Spawn.prototype.getCreepName('defender'), {
                    role: 'defender',
                    serial: Spawn.prototype.getSerial('defender'),
                    operation: operation,
                    target: 'none'}
            )
        }

        // Function for spawning a warrior
        StructureSpawn.prototype.spawnWarrior = function(energy) {
            var body = []
            var numberOfSegments = Math.floor((energy - 250) / 130);
            for (i = 0; i < numberOfSegments; i++) {
                body.push(ATTACK);
                body.push(MOVE);
            }
            body.push(HEAL)
            return this.createCreep(
                body, Spawn.prototype.getCreepName('warrior'), {
                    role: 'warrior',
                    serial: Spawn.prototype.getSerial('warrior'),
                    operation: 'none',
                    target: 'none'}
            )
        }

        // Function for spawning a healer
        StructureSpawn.prototype.spawnHealer = function(energy) {
            var body = []
            var numberOfSegments = Math.floor(energy / 300);
            for (i = 0; i < numberOfSegments; i++) {
                body.push(HEAL);
                body.push(MOVE);
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('healer'), {
                    role: 'healer',
                    serial: Spawn.prototype.getSerial('healer'),
                    operation: 'none',
                    target: 'none'}
            )
        }
    }
};

module.exports = functions;
