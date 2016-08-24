var roleHealer = {

    run: function(creep) {

    // *** MODE DEFINITION ***
        if (typeof Game.flags.heal !== 'undefined') {
            var destination = Game.flags.heal
        }
        else if (typeof Game.flags.assemble !== 'undefined') {
            var destination = Game.flags.assemble
        }


        if (typeof destination !== 'undefined') {
            // If in other room: move
            if (destination.pos.roomName !== creep.room.name) {
                creep.memory.mode = 'move';
                creep.say('move out')
            }
            else if(destination.pos.roomName === creep.room.name) {
                creep.memory.mode = 'heal'
            }
        }


        // *** MODE EXECUTION ***
        var patients = creep.room.find(FIND_MY_CREEPS, {
            filter: (patient) => {
            return (patient.hits < patient.hitsMax)}});
        var patient = creep.pos.findClosestByPath(patients)
        console.log(patient == null)

        if (creep.hits < creep.hitsMax) {
            creep.heal(creep)
        }
        if (creep.memory.mode === 'move') {
            creep.moveTo(destination)
            //if (typeof patient !== null) {
            //    if (creep.heal(patient) == ERR_NOT_IN_RANGE) {
            //        creep.rangedHeal(patient)
            //    }
            //}
        }
        else if (creep.memory.mode === 'heal') {
            if (patient !== null) {
                if (creep.heal(patient) == ERR_NOT_IN_RANGE) {
                    creep.rangedHeal(patient)
                    creep.moveTo(patient)
                }
            }
            else {
                creep.moveTo(destination)
            }
        }
        else {
            creep.moveTo(destination)
        }
    }
};

module.exports = roleHealer;
