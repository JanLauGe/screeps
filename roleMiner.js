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
            var mineralType = 'H';
            
            if (creep.memory.task === 'working') {
                creep.memory.target = mineralSource.id;
            }
            else if (creep.memory.task === 'dropoff') {
                if (
                    // If terminal is not full
                    _sum(creep.room.terminal.store) < creep.room.terminal.storeCapacity &&
                    creep.room.terminal.store[mineralType] < 1000) {
                    creep.memory.target = creep.room.terminal;
                }
                else if (
                    // If storage is not full
                    _.sum(creep.room.storage.store) < creep.room.storage.storeCapacity &&
                    creep.room.storage.store[mineralType] < 1000) {
                    creep.memory.target = creep.room.storage;
                }
            }
        }
    },

    run: function(creep) {
        console.log('not implemented yet')
    }
};
