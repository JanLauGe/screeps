module.exports = {

    getTask: function(creep) {
        if (creep.memory.task !== 'harvest') {
            creep.memory.task = 'harvest';
        }
    },

    getTarget: function(creep) {

        // Variable definition -------------------------------------------------
        var mem = Memory.rooms[creep.room.name];
        // Find sources
        var sources = mem.sources;
        //var sources = _.filter(mem.sources, function(source) {
        //    return source.energy > 0 &&
        //    source.slots > 0 &&
        //    source.work > 0;});

        // Find target ---------------------------------------------------------
        if (typeof creep.memory.operation === 'undefined' ||
            creep.memory.operation === creep.room.name) {
            if (typeof creep.memory.target === 'undefined' ||
                creep.memory.target === '') {
                // Select sources
                if (sources.length) {
                    var source = _.sortByOrder(sources, 'work', 'desc')[0].id;
                    creep.memory.target = source;
                }
            }
        
            // Block target --------------------------------------------------------
            // Find target source
            var source = Game.getObjectById(creep.memory.target)
            // Substract from source budget
            var sourceIndex = _.findIndex(mem.sources, {'id': creep.memory.target});
            var parts = _.filter(creep.body, {'type': WORK}).length
            mem.sources[sourceIndex]['slots'] = mem.sources[sourceIndex]['slots'] - 1;
            mem.sources[sourceIndex]['work'] = mem.sources[sourceIndex]['work'] - parts;
        }
    },

    run: function(creep) {
        
        // If local worker or if creep is in operation room
        if (typeof creep.memory.operation == 'undefined' ||
            creep.room.name == creep.memory.operation) {
            var source = Game.getObjectById(creep.memory.target)
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        }
        // Not local or not in operation room
        else {
            // Find all exits to operation room
            var exits = Game.map.findExit(creep.room, creep.memory.operation);
            // Find closest room exit
            var exit = creep.pos.findClosestByRange(exits);
            // Move to closest exit
            creep.moveTo(exit);
        }
    }
};
