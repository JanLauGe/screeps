// Todo:
// Add terminal to sink list when energy is low
// Switch to using room names instead of terminal IDs

module.exports = {

    list: function(terminal) {

        if (typeof terminal !== 'undefined') {

            var mem = Memory.global;
            var minerals = Object.keys(mem.mineralsDemand)

            for(i in minerals) {
                var m = Object.keys(mem.mineralsDemand)[i]

                // Short on mineral m
                if ((typeof terminal.store[m] === 'undefined' ||
                    terminal.store[m] < 3000) &&
                    !_.includes(mem.mineralsDemand[m], terminal)) {
                    mem.mineralsDemand[m].push(terminal);
                }

                // Superfluous supply of mineral m
                else if (typeof terminal.store[m] !== 'undefined' &&
                    terminal.store[m] > 5000 &&
                    !_.includes(mem.mineralsSupply[m], terminal)) {
                    mem.mineralsSupply[m].push(terminal);
                }
            }
        }
    },

    run: function(terminal) {

        if (typeof terminal !== 'undefined') {

            var mem = Memory.global;
            var minerals = Object.keys(mem.mineralsSupply)

            for(i in minerals) {
                var m = minerals[i]

                if (_.includes(mem.mineralsSupply[m], terminal) &&
                    terminal.store.energy > 0) {

                    for (j = 0; j < mem.mineralsDemand[m].length; j++) {
                        var targetTerminal = mem.mineralsDemand[m][j];

                        if (terminal.room.name !== targetTerminal.room.name &&
                            _.sum(targetTerminal.storage) < targetTerminal.storeCapacity) {
                            if (terminal.send(m, 500, targetTerminal.room.name) == 0) {
                                console.log('sending 500 ' + m +
                                    ' from room ' + terminal.room.name +
                                    ' to room ' +  targetTerminal.room.name);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
};
