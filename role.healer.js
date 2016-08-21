var roleHealer = {

    run: function(creep) {

    // *** MODE DEFINITION ***
        if (typeof Game.flags.heal !== 'undefined') {
            var target = Game.flags.heal
        }
        else if (typeof Game.flags.attack !== 'undefined') {
            var target = Game.flags.attack
        }
        else if (typeof Game.flags.conquer !== 'undefined') {
            var target = Game.flags.conquer
        }


        if (target) {
            // If in other room: move
            if (target.pos.roomName !== creep.room.name) {
                creep.memory.mode = 'move';
                creep.say('move out')
            }
            else if(target.pos.roomName === creep.room.name) {
                creep.memory.mode = 'heal'
            }
        }


        // *** MODE EXECUTION ***
        if(creep.memory.mode === 'move') {
            creep.moveTo(target)
        }
        else if(creep.memory.mode === 'heal') {
            var patients = creep.room.find(FIND_MY_CREEPS, {
                filter: (patient) => {
                return (patient.hits < patient.hitsMax)}});
            var patient = creep.pos.findClosestByPath(patients)

            if (patient) {
                if (creep.heal(patient) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(patient)
                }
            }
            else{
                creep.moveTo(target)
            }
        }
    }
};

module.exports = roleHealer;
