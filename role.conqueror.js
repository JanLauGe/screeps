var roleConqueror = {

    run: function(creep) {

        var operation = creep.memory.operation
        var target = creep.memory.target

        if (typeof target === 'undefined') {
            console.log('Error: no target assigned to creep ' + creep.name)
        }
        else if(target === 'none') {
            if (typeof operation !== 'undefined' &&
                operation !== 'none') {
                if (creep.room.name !== operation) {
                    // open room
                    creep.moveTo(Game.rooms[operation])
                }
                else if (creep.room.name === operation) {
                    // assign target
                    creep.memory.target = creep.room.controller.id
                }
            }
        }

        // If target is assigned
        if (typeof target !== 'undefined' &&
            target !== 'none') {
            var thistarget = Game.getObjectById(target)

            if (operation === creep.room.name) {
                // Go to controller and reserve
                creep.moveTo(thistarget)
                if (creep.reserveController(thistarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(thistarget)
                }
                else if (creep.reserveController(thistarget) == ERR_INVALID_TARGET ||
                    creep.reserveController(thistarget) == ERR_NOT_OWNER) {
                    console.log('Error: cannot reserve room ' + operation)
                }
            }
            else if (operation !== creep.room.name &&
                typeof operation !== 'undefined' &&
                operation !== 'none') {
                creep.moveTo(Game.rooms[operation])
            }
            else {
                console.log('Error: no operation assigned to creep ' + creep.name)
            }
      	}
      	else {
      	    console.log('Error: no valid target assigned to creep ' + creep.name)
      	}
    }
};

module.exports = roleConqueror;
