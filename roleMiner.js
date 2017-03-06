module.exports = {

    getTask: function(creep) {
        if (_.sum(creep.carry) === 0 &&
            creep.memory.task !== 'working') {
            creep.memory.task = 'working';
            creep.memory.target = '';
        }
        else if (_.sum(creep.carry) === creep.carryCapacity &&
            creep.memory.task !== 'dropoff') {
            creep.memory.task = 'dropoff';
            creep.memory.target = '';
        }
    },

    getTarget: function(creep) {
        if (creep.memory.target === '') {
            
            // Get mineralSource of this room
            var mineralSource = Game.rooms[creep.room.name].find(FIND_MINERALS)[0];
            // Get mineralType for miner
            var mineralType = mineralSource.mineralType;
            // Store mineralType in memory
            creep.memory.mineralType = mineralType;
            
            if (creep.memory.task === 'working') {
                creep.memory.target = mineralSource.id;
            }
            else if (creep.memory.task === 'dropoff') {

                if (typeof creep.room.terminal !== 'undefined' &&
                    // If terminal is not full
                    _.sum(creep.room.terminal.store) < creep.room.terminal.storeCapacity &&
                    (typeof creep.room.terminal.store[mineralType] === 'undefined' ||
                    creep.room.terminal.store[mineralType] < 100000)) {
                        
                    creep.memory.target = creep.room.terminal.id;
                }
                else if (typeof creep.room.storage !== 'undefined' &&
                    // If storage is not full
                    _.sum(creep.room.storage.store) < creep.room.storage.storeCapacity &&
                    (typeof creep.room.storage.store[mineralType] === 'undefined' ||
                    creep.room.storage.store[mineralType] < 100000)) {
                        
                    creep.memory.target = creep.room.storage.id;
                }
            }
        }
    },

    run: function(creep) {
        
        if (creep.memory.task === 'dropoff') {
            var target = Game.getObjectById(creep.memory.target);
            var mineralType = creep.memory.mineralType;
            
            if (creep.transfer(target, mineralType) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
            else {
                for(var resourceType in creep.carry) {
                    creep.transfer(target, resourceType);
                }
            }
        }
        else if (creep.memory.task === 'working') {
            var mineralSource = Game.getObjectById(creep.memory.target);
            var mineralType = mineralSource.mineralType;
            creep.memory.mineralType = mineralType
            
            if (creep.harvest(mineralSource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(mineralSource);
            }
        }
    }
};
