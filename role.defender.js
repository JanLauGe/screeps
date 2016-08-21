var roleDefender = {


    run: function(creep) {

        // Mode definition ---------------------------------------------------------
        var operation = creep.memory.operation
        var target = creep.memory.target
        var destination = Game.flags['mining_' + operation]
        var attackrange = 50;
        var hostiles = destination.room.find(FIND_HOSTILE_CREEPS)
        if (hostiles.length > 0) {
            var mode = 'attack'
            creep.memory.mode = 'attack'
        }
        else {
            var mode = 'guard'
            creep.memory.mode = 'guard'
        }

        // Mode execution ---------------------------------------------------------
        if (creep.room.name !== destination.pos.roomName) {
            creep.moveTo(destination)
        }
        else if(creep.room.name === destination.pos.roomName) {
            if (hostiles.length > 0) {
                var hostile = creep.pos.findClosestByPath(hostiles)
                if (creep.attack(hostile) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(hostile)
                }
            }
        }
    }
};

module.exports = roleDefender;
