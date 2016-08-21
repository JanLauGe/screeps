var roleConqueror = {

    run: function(creep) {

        var operation = creep.memory.operation
        var target = creep.memory.target

        if (typeof target == 'undefined') {
            console.log('Error:', creep.name, 'has no target')
        }
        else if(target == 'none') {
            if (operation !== 'undefined' &&
            operation !== 'none') {
                if (creep.room.name !== operation) {
                    // open room
                    creep.moveTo(Game.flags['mining_'+operation])
                }
                else if (creep.room.name !== operation) {
                    creep.memory.target = creep.room.controller.id
                }
            }
        }

        if (typeof target !== 'undefined' &&
            target !== 'none') {
            var thistarget = Game.getObjectById(target)

            if (operation == creep.room.name) {
                // Go to controller and reserve
                if (thistarget instanceof Controller) {
                    if (creep.reserve(thistarget) == ERR_NOT_IN_RANGE ||
                        creep.reserve(thistarget) == ERR_INVALID_TARGET ||
                        creep.reserve(thistarget) == ERR_NOT_OWNER) {
                        creep.moveTo(thistarget);
                    }
                    else if (creep.reserve(thistarget) == OK) {
                        // do nothing
                    }
                    else {
                      console.log('Error, conqueror ' + creep.name + ' can not reserve controller')
                    }
                }
                else {
                    console.log('Error, target is not a room controller')
                }
            }
            else if (operation !== creep.room.name &&
            typeof operation !== 'undefined' &&
            operation !== 'none') {
                creep.moveTo(Game.flags['mining_' + operation])
            }
            else {
                console.log('Error: no operation assigned to creep ' + creep.name)
            }
      	}
      	else {
      	    console.log('Error: no target assigned to creep ' + creep.name)
      	}
    }
};

module.exports = roleConqueror;
