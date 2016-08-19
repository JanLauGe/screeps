var roleArcher = {

    run: function(creep) {

    // *** MODE DEFINITION ***
        if (typeof Game.flags.defend !== 'undefined') {
            var target = Game.flags.defend
            creep.memory.task = 'defend'
        }
        else if (typeof Game.flags.attack !== 'undefined') {
            var target = Game.flags.attack
            creep.memory.task = 'attack'
        }
        else if (typeof Game.flags.conquer !== 'undefined') {
            var target = Game.flags.conquer
            creep.memory.task = 'conquer'
        }

        if (target) {
            // If in other room: move
            if (target.pos.roomName !== creep.room.name) {
                creep.memory.mode = 'move';
                creep.say('move out')
            }
            else if(target.pos.roomName === creep.room.name) {
                creep.memory.mode = 'attack'
            }
        }


        // *** MODE EXECUTION ***

        if(creep.memory.mode === 'move') {
            creep.moveTo(target)
        }
        else if(creep.memory.mode === 'attack') {
            creep.say('attack')

            var enemyFighters = creep.room.find(FIND_HOSTILE_CREEPS)
            var enemyFighter = creep.pos.findClosestByPath(enemyFighters)

            if (enemyFighter) {
                if (creep.rangedAttack(enemyFighter) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                }
            }
            else{
                var patients = creep.room.find(FIND_MY_CREEPS, {
                    filter: (patient) => {
                    return (patient.hits < patient.hitsMax)}});
                var patient = creep.pos.findClosestByPath(patients)
                if (patient) {
                    creep.say('heal')
                    if (creep.heal(patient) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(patient)
                    }
                }
                else{
                    creep.moveTo(target)
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

module.exports = roleArcher;
