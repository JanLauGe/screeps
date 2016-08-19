var rolePioneer = {

    run: function(creep) {

        if (typeof Game.flags.conquer !== 'undefined') {
            var target = Game.flags.conquer;
        }
        else if (typeof Game.flags.reserve !== 'undefined') {
            var target = Game.flags.reserve;
        }

        if (typeof target !== 'undefined') {
            // If in different room: move
            if (!creep.pos.inRangeTo(target, 5)) {
                creep.memory.mode = 'move';
                creep.say('onwards!');
                creep.moveTo(target);
            }
            // Else if arrive at flag
            if (creep.pos.inRangeTo(target, 5)) {
                console.log('converting pioneer to generalist');
                creep.memory.role = 'generalist';
            }
        }
    }
}

module.exports = rolePioneer;
