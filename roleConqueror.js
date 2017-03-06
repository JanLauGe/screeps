module.exports = {

    getTask: function(creep) {
    },
    
    getTarget: function(creep) {
        if (creep.room.name == creep.memory.operation) {
            creep.memory.target = creep.room.controller.id
        }
    },
    
    run: function(creep) {

        var operation = creep.memory.operation;
        var task = creep.memory.task;

        if (typeof creep.memory.target != 'undefined' &&
            (creep.memory.target.substring(0, 6) == 'mining' ||
            creep.memory.target.substring(0, 5) == 'claim')) {
            var target = Game.flags[creep.memory.target];
        }
        else {
            var target = Game.getObjectById(creep.memory.target);
        }
        
        if (creep.room.name != operation) {
            creep.moveTo(target);
        }
        else {
            // Go to controller and execute task
            if (task == 'claim') {
                if (creep.claimController(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else if(task == 'reserve') {
                if (creep.reserveController(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
      	}
    }
};
