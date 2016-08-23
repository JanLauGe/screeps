var roleWarrior = {


    run: function(creep) {

        var attackrange = 50;

        // Mode definition ---------------------------------------------------------
        if (typeof Game.flags.assemble !== 'undefined') {
            var destination = Game.flags.assemble
        }
        else if (typeof Game.flags.attack !== 'undefined') {
            var destination = Game.flags.attack
        }

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


        // Mode execution ---------------------------------------------------------
        if(creep.memory.mode == 'move') {
            creep.moveTo(destination)
        }

        else if(creep.memory.mode == 'attack') {
            // If target is set via target1 flag
            if (typeof Game.flags.target1 !== 'undefined') {
                if (Game.flags.target1.pos.roomName == destination.pos.roomName) {
                    var targets = Game.flags.target1.pos.findInRange(FIND_HOSTILE_CREEPS, attackrange)
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
            }
            // If not target flag
            else {
                var enemyFighters = creep.room.find(FIND_HOSTILE_CREEPS)
                var enemyBuildings = creep.room.find(FIND_HOSTILE_STRUCTURES)
                if (typeof enemyFighters !== 'undefined') {
                    if (enemyFighters !== null) {
                        if (enemyFighters.length > 0){
                            var enemyFighter = creep.pos.findClosestByPath(enemyFighters)
                            if (creep.attack(enemyFighter) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(enemyFighter)
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
