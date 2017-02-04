module.exports = {

    getTask: function(creep) {
    },
    
    getTarget: function(creep) {
        
        var operation = creep.memory.operation
        
        if (creep.room.name != operation) {
            // open room
            creep.memory.target = Game.flags['claim'];
        }
        else {
            // assign target
            creep.memory.target = creep.room.controller.id;
        }
    },
    
    run: function(creep) {

        var operation = creep.memory.operation;
        var target = Game.getObjectById(creep.memory.target);
        
        if (creep.room.name != operation) {
            creep.moveTo(creep.memory.target);
        }
        else {
            // Go to controller and reserve
            if (creep.reserveController(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
      	}
    }
};
