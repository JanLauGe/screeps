var roleWorker = {

    run: function(creep) {

        var operation = creep.memory.operation
        var target = creep.memory.target

        if (operation == creep.room.name) {
            // Go to source and harvest
            if (target instanceof Source) {
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                else {
                  console.log('Error, can not harvest source')
                }
            }
            else {
                console.log('Error, target is not a source')
            }
        }
        else {
            if(!creep.memory.path) {
                creep.memory.path = creep.pos.findPathTo(target);
            }
            creep.moveByPath(creep.memory.path);
            //var destination = findRoute(creep.pos, Game.flags['mining' + operation].pos.roomName)
        }
  	}
};

module.exports = roleWorker;
