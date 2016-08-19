var roleUpgrader = {

    run: function(creep) {

        var links = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK)
            }
        });

        if (links.length > 1) {
            if (links[1].energy > 0) {
                if (creep.withdraw(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(links[1])
                }
            }
        }
        else if (creep.upgradeController(creep.room.controller) == ERR_NOT_ENOUGH_ENERGY) {
            creep.moveTo(creep.room.controller)
        }

        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller)
        }
    }
};

module.exports = roleUpgrader;
