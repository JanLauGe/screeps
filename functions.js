var functions = {

    // Custom function for array duplicates
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }

    // Function to find odd or even numbers
    function isOdd(num) { return num % 2;}

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
        var numberOfSegments = Math.floor(energy / 100);
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
    StructureSpawn.prototype.spawnWorker = function(energy) {
        var body = [];
        var maxWork = 5;
        var numberofWork = Math.min(Math.floor((energy - 200) / 100), maxWork);
        for (i = 0; i < numberofWork; i++) {
            body.push(WORK);
        }
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
        return this.createCreep(
            body, Spawn.prototype.getCreepName('worker'), {
                role: 'worker',
                serial: Spawn.prototype.getSerial('worker'),
                operation: 'none',
                target: 'none'}
        )
    }

    // Function for spawning a generalist
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

    // Function for spawning a upgrader
    StructureSpawn.prototype.spawnUpgrader = function(energy) {
        var body = [];
        var numberofWork = Math.min(Math.floor(energy - 200) / 150);
        for (i = 0; i < numberofWork; i++) {
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
};
