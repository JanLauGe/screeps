var roleFarmer = {

    run: function(creep) {

        function isOdd(num) { return num % 2;}
        var serial = creep.memory.serial;
        if (typeof Game.flags['farm' + serial] !== 'undefined') {
            var zone = Game.flags['farm' + serial]
            var mode = 'farm'
        }

        if (typeof zone !== 'undefined') {
            // If in different room: move
            if (zone.pos.roomName !== creep.room.name) {
                creep.moveTo(zone)
            }
            // Else if in this room
            else if(zone.pos.roomName === creep.room.name) {
                // If farming, finde source and start work
                if (mode === 'farm') {
                    var targets = creep.room.find(FIND_SOURCES)
                    if (targets.length > 1) {
                        if (isOdd(serial) == 0) {
                            var target = targets[0]
                        }
                        else if (isOdd(serial) == 1) {
                            var target = targets[1]
                        }
                    }
                    else if (targets.length < 2) {
                        var target = targets[0]
                    }
                }
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
};

module.exports = roleFarmer;
