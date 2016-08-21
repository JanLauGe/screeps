var roleWarrior = {


    run: function(creep) {

        var attackrange = 50;

    // *** MODE DEFINITION ***
        if (typeof Game.flags.attack !== 'undefined') {
            var destination = Game.flags.attack
        }
        //else if (typeof Game.flags.conquer !== 'undefined') {
        //    var destination = Game.flags.conquer
        //}

        if (typeof destination !== 'undefined') {
            // If in other room: move
            if (destination.pos.roomName !== creep.room.name) {
                creep.memory.mode = 'move';
                //creep.say('move out')
            }
            else if(destination.pos.roomName === creep.room.name) {
                creep.memory.mode = 'attack'
            }
        }


        // *** MODE EXECUTION ***
        if(creep.memory.mode == 'move') {
            creep.moveTo(destination)
        }
        else if(creep.memory.mode == 'attack') {

            if (typeof Game.flags.target1 !== 'undefined') {
                if (Game.flags.target1.pos.roomName == destination.pos.roomName) {
                    var targets = Game.flags.target1.pos.findInRange(FIND_HOSTILE_CREEPS, 5)
                    var target = creep.pos.findClosestByPath(targets)
                    //console.log(target[0])
                    //console.log(creep.moveTo(target[0]))
                    //console.log(creep.attack(target[0]))
                    //creep.moveTo(target)
                    //console.log(target)
                    //console.log(target == null)
                    if (target !== null) {
                        creep.attack(target)
                        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target)
                        }
                    }
                    else {
                        creep.moveTo(Game.flags.target1)
                    }
                }
            }

            else {
                var enemyFighters = creep.room.find(FIND_HOSTILE_CREEPS)
                var enemyBuildings = creep.room.find(FIND_HOSTILE_STRUCTURES)
                if (typeof enemyFighters != 'undefined') {
                    if (enemyFighters != null) {
                        if (enemyFighters.length > 0){
                            var enemyFighter = creep.pos.findClosestByPath(enemyFighters)
                            if (creep.attack(enemyFighter) == ERR_NOT_IN_RANGE) {
                                if (target.pos.inRangeTo(target, attackrange)) {
                                    creep.moveTo(enemyFighter)
                                }
                            }
                        }
                    }
                }
                else if (typeof enemyBuildings != 'undefined') {
                    if (enemyBuildings != null) {
                        if (enemyBuilding.length > 0){
                            var enemyBuilding = creep.pos.findClosestByPath(enemyBuildings)
                            if (creep.attack(enemyBuilding) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(enemyBuilding)
                            }
                        }
                    }
                }
                else {
                    creep.moveTo(destination)
                }
            }
        }
    }
};

module.exports = roleWarrior;
