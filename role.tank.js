var roleTank = {


    run: function(creep) {

        var attackrange = 6;

    // *** MODE DEFINITION ***
        if (typeof Game.flags.tank !== 'undefined') {
            var destination = Game.flags.tank
        }
        else if (typeof Game.flags.attack !== 'undefined') {
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
                creep.memory.mode = 'tank'
            }
        }


        // *** MODE EXECUTION ***
        if(creep.memory.mode == 'move') {
            creep.moveTo(destination)
        }
        else if(creep.memory.mode == 'tank') {
            if (typeof Game.flags.tank !== 'undefined') {
                if (Game.flags.tank.pos.roomName == destination.pos.roomName) {
                    if (typeof Game.flags.target1 !== 'undefined') {
                        var targets = Game.flags.target1.pos.findInRange(FIND_HOSTILE_CREEPS, attackrange)
                        var target = creep.pos.findClosestByPath(targets)
                        if (target !== null) {
                            creep.attack(target)
                            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target)
                            }
                        }
                        else if (targets.length == 0) {
                            var targets = Game.flags.target1.pos.findInRange(FIND_STRUCTURES, attackrange)
                            //var targets = Game.flags.target1.pos.findInRange(FIND_HOSTILE_STRUCTURES, attackrange)
                            //var targets = Game.flags.target1.pos.findInRange(FIND_HOSTILE_SPAWNS, attackrange)
                            var target = creep.pos.findClosestByPath(targets)
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
                        else {
                            creep.moveTo(Game.flags.target1)
                        }
                    }
                    else {
                        creep.moveTo(Game.flags.tank)
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

module.exports = roleTank;
