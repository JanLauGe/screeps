var roleWarrior = {


    run: function(creep) {

        var attackrange = 20;

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

                            // , {
                //     filter: (creeps) => {
                //         return (creeps.body.indexOf('attack') !== -1)
                //     }
                // })


            // else if(creep.memory.mode === 'attack') {

            //     // If tower: attack tower
            //     var tower = creep.room.find(FIND_HOSTILE_STRUCTURES, {
            //         filter: (structure) => {
            //             return (structure.structureType == STRUCTURE_TOWER)
            //         }
            //     })
            //     // Find all enemy creeps with attack parts
            //     var enemyFighters = creep.room.find(FIND_HOSTILE_CREEPS, {
            //         filter: (creeps) => {
            //             return (creeps.body.indexOf('attack') !== -1)
            //         }
            //     })
            //     var spawn = creep.room.find(FIND_HOSTILE_STRUCTURES, {
            //         filter: (structure) => {
            //             return (structure.structureType == STRUCTURE_SPAWN)
            //         }
            //     })

            //     // If tower, attack tower
            //     if (tower.length) {
            //         creep.attack(tower)
            //     }
            //     // Else if: attack enemy creeps



            //     // If no tower and no creeps: attack spawn
            //     else if(spawn){
            //         if (spawn.length) {
            //             creep.attack(spawn)
            //         }
            //     }
            //     // If no target, gather at flag
            //     else{
            //         creep.moveTo(target)
            //     }

//         if( FromMemory['AllMyEnemies'].length){
//             for(var x in FromMemory['AllMyEnemies']){
//                 if( FromMemory['AllMyEnemies'][x].owner.username !== 'Source Keeper'){
//                     if( creep.attack(FromMemory['AllMyEnemies'][x]) == ERR_NOT_IN_RANGE){
//                         creep.moveTo(FromMemory['AllMyEnemies'][x]);
//                     }
//                     else{
//                         creep.attack(FromMemory['AllMyEnemies'][x])
//                     }
//                  	creep.say('Attack')
//                 }
//             }
//         }
//     }
// };

module.exports = roleWarrior;
