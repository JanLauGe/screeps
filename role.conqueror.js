var roleConqueror = {

    run: function(creep) {

        var operation = creep.memory.operation
        var target = creep.memory.target

        if (typeof target === 'undefined') {
            console.log('Error: no target assigned to creep ' + creep.name)
        }
        else if(target === 'operationroom') {
            if (creep.room.name !== operation) {
                // open room
                creep.moveTo(Game.rooms[operation])
            }
            else if (creep.room.name === operation) {
                // assign target
                creep.memory.target = creep.room.controller.id
                var target = creep.room.controller.id
            }
        }

        // If final target is assigned
        if (typeof target !== 'undefined' &&
            target !== 'operationroom') {
            var controller = Game.getObjectById(target)

            if (creep.room.name === operation) {
                // Go to controller and reserve
                if (creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller)
                }
            }
            else if (creep.room.name !== operation)
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
