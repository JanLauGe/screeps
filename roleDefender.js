module.exports = {

    getTask: function(creep) {
    },

    getTarget: function(creep) {
    },

    run: function(creep) {
        // Mode definition ---------------------------------------------------------
        var operation = creep.memory.operation
        var target = creep.memory.target
        var attackrange = 50;
        var destination = Game.flags['mining_' + operation]

        // Mode execution ---------------------------------------------------------
        if (destination != undefined) {
            if (creep.room.name !== destination.pos.roomName) {
                creep.moveTo(destination)
            }
            else if(creep.room.name === operation) {
                var hostiles = creep.room.find(FIND_HOSTILE_CREEPS)
                if (hostiles.length > 0) {
                    var hostile = creep.pos.findClosestByPath(hostiles)
                    if (creep.attack(hostile) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostile)
                    }
                }
            }
        }
    }
};
