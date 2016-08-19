var roleConqueror = {

    run: function(creep) {

    // *** MODE DEFINITION ***
        var serial = creep.memory.serial
        if (typeof Game.flags['reserve'+serial] !== 'undefined') {
            var mode = 'reserve'
            var target = Game.flags['reserve'+serial]
        }
        else if (typeof Game.flags.conquer !== 'undefined') {
            var mode = 'conquer'
            var target = Game.flags.conquer
        }

        if (typeof target !== 'undefined') {
            // If in different room: move
            if (target.pos.roomName !== creep.room.name) {
                creep.moveTo(target)
            }
            // Else if in this room
            else if(target.pos.roomName === creep.room.name) {
                if (mode == 'reserve') {
                    if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
                else if (mode == 'conquer') {
                    if(creep.room.controller) {
                        if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                        }
                        else if (creep.claimController(creep.room.controller) == ERR_FULL) {
                            creep.moveTo(creep.room.controller);
                        }
                    }
                }
            }
            else {
                console.log('conqueror logic broken');
            }
        }
    }
}

module.exports = roleConqueror;
