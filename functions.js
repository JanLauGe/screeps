var functions = {

    import: function() {

        // Functions for identifiers -------------------------------------------
        
        // Custom function to check array for a value
        contains = function(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }
        
        // Function to create creeps with names
        Spawn.prototype.getCreepName = function(role){
            var creepName = role + '_0';
            for (i = 0; i < 9999 ; i++) {
                creepName = role + '_' + i;
                if (Game.creeps[creepName] === undefined
                  || Game.creeps[creepName] === null)
                  break;
            }
            return creepName;
        }

        // Function to get serial number
        Spawn.prototype.getSerial = function(role) {
            var creepName = role + '_0';
            for (i = 0; i < 9999 ; i++) {
                creepName = role + '_' + i;
                if (Game.creeps[creepName] === undefined
                  || Game.creeps[creepName] === null)
                  break;
            }
            return i;
        }


        // Functions for spawning creeps ---------------------------------------

        // Function for spawning a Builder
        StructureSpawn.prototype.spawnBuilder = function(energy, operation) {
            var body = [];
            var maxSegments = 10;
            var numberOfSegments = Math.min(maxSegments, Math.floor(energy / 200));
            for (i = 0; i < numberOfSegments; i++) {
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('builder'), {
                    role: 'builder',
                    serial: Spawn.prototype.getSerial('builder'),
                    origin: this.room.name,
                    operation: operation,
                    task: '',
                    target: ''
                }
            )
        }

        // Function for spawning a Carrier
        StructureSpawn.prototype.spawnCarrier = function(energy, operation) {
            var body = [];
            var maxSegments = 10;
            var numberOfSegments = Math.min(maxSegments, Math.floor(energy / 100));
            for (i = 0; i < numberOfSegments; i++) {
                body.push(CARRY);
                body.push(MOVE);
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('carrier'), {
                    role: 'carrier',
                    serial: Spawn.prototype.getSerial('carrier'),
                    origin: this.room.name,
                    operation: operation,
                    task: '',
                    target: ''
                }
            )
        }
        
        // Function for spawning a conqueror
        StructureSpawn.prototype.spawnConqueror = function(energy, operation, task, target) {
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
                    task: task, 
                    target: target}
            )
        }

        // Function for spawning a mining operations Defender
        StructureSpawn.prototype.spawnDefender = function(energy, operation) {
            var body = [];
            var maxSegments = 7;
            var numberOfSegments = Math.min(Math.floor(energy / 130), maxSegments);
            for (i = 0; i < numberOfSegments; i++) {
                body.push(ATTACK);
                body.push(MOVE);
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('defender'), {
                    role: 'defender',
                    serial: Spawn.prototype.getSerial('defender'),
                    origin: this.room.name,
                    operation: operation,
                    task: '',
                    target: ''
                }
            )
        }

        // Function for spawning a Generalist
        StructureSpawn.prototype.spawnGeneralist = function(energy, operation) {
            if (typeof operation == 'undefined') {
                var operation = this.room.name
            }
            var body = [];
            var maxSegments = 16;
            var numberOfSegments = Math.min(maxSegments,
                Math.floor(energy / 200));
            for (i = 0; i < numberOfSegments; i++) {
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('generalist'), {
                    role: 'generalist',
                    serial: Spawn.prototype.getSerial('generalist'),
                    origin: this.room.name,
                    operation: operation,
                    task: '',
                    target: ''
                }
            )
        }

        // Function for spawning a Hauler
        StructureSpawn.prototype.spawnHauler = function(energy, operation) {
            var body = [];
            var maxSegments = 20;
            var numberOfSegments = Math.min(maxSegments,
                Math.floor((energy - 150) / 100));
            for (i = 0; i < numberOfSegments; i++) {
                body.push(CARRY);
                body.push(MOVE);
            }
            body.push(WORK);
            body.push(MOVE);
            return this.createCreep(
                body, Spawn.prototype.getCreepName('hauler'), {
                    role: 'hauler',
                    serial: Spawn.prototype.getSerial('hauler'),
                    origin: this.room.name,
                    operation: operation,
                    task: '',
                    target: ''
                }
            )
        }

        // Function for spawning a Healer
        StructureSpawn.prototype.spawnHealer = function(energy, operation) {
            var body = []
            var maxSegments = 25;
            var numberOfSegments = Math.min(Math.floor(energy / 300), maxSegments);
            for (i = 0; i < numberOfSegments; i++) {
                body.push(MOVE);
            }
            for (i = 0; i < numberOfSegments; i++) {
                body.push(HEAL);
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('healer'), {
                    role: 'healer',
                    serial: Spawn.prototype.getSerial('healer'),
                    origin: this.room.name,
                    operation: operation,
                    task: '',
                    target: ''
                }
            )
        }

        // Function for spawning a Miner
        StructureSpawn.prototype.spawnMiner = function(energy, operation) {
            var body = [];
            var maxSegments = 16;
            var numberOfSegments = Math.min(maxSegments, Math.floor(energy / 200));
            for (i = 0; i < numberOfSegments; i++) {
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('miner'), {
                    role: 'miner',
                    serial: Spawn.prototype.getSerial('miner'),
                    origin: this.room.name,
                    operation: operation,
                    task: '',
                    target: ''
                }
            )
        }


        // Function for spawning an Upgrader
        StructureSpawn.prototype.spawnUpgrader = function(energy, operation) {
            var body = [];
            var maxSegments = 14;
            var numberOfSegments = Math.min(Math.floor((energy - 300) / 150), maxSegments);
            for (i = 0; i < numberOfSegments; i++) {
                body.push(WORK);
                body.push(CARRY);
            }
            body.push(WORK);
            body.push(CARRY);
            body.push(MOVE);
            body.push(MOVE);
            body.push(MOVE);
            return this.createCreep(
                body, Spawn.prototype.getCreepName('upgrader'), {
                    role: 'upgrader',
                    serial: Spawn.prototype.getSerial('upgrader'),
                    origin: this.room.name,
                    operation: operation,
                    task: '',
                    target: ''
                }
            )
        }

        // Function for spawning a Warrior
        StructureSpawn.prototype.spawnWarrior = function(energy, operation) {
            var body = []
            var maxSegments = 20;
            var numberOfSegments = Math.min(Math.floor((energy - 250) / 130), maxSegments);
            for (i = 0; i < numberOfSegments; i++) {
                body.push(ATTACK);
                body.push(MOVE);
            }
            body.push(MOVE)
            body.push(HEAL)
            return this.createCreep(
                body, Spawn.prototype.getCreepName('warrior'), {
                    role: 'warrior',
                    serial: Spawn.prototype.getSerial('warrior'),
                    origin: this.room.name,
                    operation: operation,
                    task: '',
                    target: ''
                }
            )
        }

        // Function for spawning a Worker
        StructureSpawn.prototype.spawnWorker = function(energy, operation, target) {
            var body = [];
            if (energy <= 500) {
                var body = [MOVE,WORK,CARRY]
            }
            else if (energy < 800) {
                var body = [MOVE,MOVE,WORK,WORK,CARRY,CARRY];
            }
            else if (energy >= 800 && energy < 900) {
                var body = [MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK];
            }
            else if (energy >= 900 && energy < 1000) {
                var body = [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK];
            }
            else if (energy >= 1000) {
                var body = [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK];
            }
            return this.createCreep(
                body, Spawn.prototype.getCreepName('worker'), {
                    role: 'worker',
                    serial: Spawn.prototype.getSerial('worker'),
                    origin: this.room.name,
                    operation: operation,
                    task: '',
                    target: target
                }
            )
        }
    }
};

module.exports = functions;
