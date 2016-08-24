var roleWarrior = {


    run: function(creep) {

        var attackrange = 5;

        // Mode definition ---------------------------------------------------------
        if (typeof Game.flags.attack !== 'undefined') {
            var destination = Game.flags.attack
        }
        else if (typeof Game.flags.assemble !== 'undefined') {
            var destination = Game.flags.assemble
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
                    var targets = Game.flags.target1.pos.findInRange(
                      FIND_HOSTILE_CREEPS, attackrange,
                      { filter: (hostile) => {
                        return (!contains(Memory.global.diplomacy.allies, hostile.owner.username))}})
                    var target = creep.pos.findClosestByPath(targets)

                    if (target !== null) {
                        creep.attack(target)
                        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target)
                        }
                    }
                    else if(creep.hits < creep.hitsMax) {
                        creep.heal(creep)
                    }
                    else {
                        creep.moveTo(Game.flags.target1)
                    }
                }
            }
            // If not target flag
            else {
                var enemyFighters = creep.room.find(FIND_HOSTILE_CREEPS,
                  { filter: (hostile) => {
                  return (!contains(Memory.global.diplomacy.allies, hostile.owner.username))}}))
                var enemyBuildings = creep.room.find(FIND_HOSTILE_STRUCTURES,
                  { filter: (hostile) => {
                    return (!contains(Memory.global.diplomacy.allies, hostile.owner.username))}}))

                if (enemyFighters.length > 0) {
                    var enemyFighter = creep.pos.findClosestByPath(enemyFighters)
                    if (creep.attack(enemyFighter) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(enemyFighter)
                    }
                }
                else if (enemyBuildings.length > 0) {
                    var enemyBuilding = creep.pos.findClosestByPath(enemyBuildings)
                    if (creep.attack(enemyBuilding) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(enemyBuilding)
                    }
                }
                else if(creep.hits < creep.hitsMax) {
                    creep.heal(creep)
                }
                else {
                    creep.moveTo(destination)
                }
            }
        }
    }
};

module.exports = roleWarrior;
