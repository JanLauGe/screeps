module.exports = {

    getTask: function(creep) {
        creep.memory.task = 'upgrade';
    },

    getTarget: function(creep) {
        creep.memory.target = 'controller';
    },

    run: function(creep) {
        var links = creep.room.controller.pos.findInRange(FIND_STRUCTURES, 4, {
            filter: (structure) => { return (
                structure.structureType == STRUCTURE_LINK &&
                structure.energy > 0)
            }
        });

        if (creep.carry.energy == 0) {
            if (links.length &&
                creep.withdraw(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(links[0], {range: 1})
                }
            else {
                var spawns = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => { return (
                    structure.structureType == STRUCTURE_SPAWN &&
                    structure.energy > 0)}});
                if (creep.withdraw(spawns[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawns[0])
                }
            }
        }
        else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller)
        }
    }
};
