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
                if ((typeof terminal.store[m] == 'undefined' || 
                    terminal.store[m] < 3000) &&
                    !_.includes(mem.mineralsDemand[m], terminal.id)) {
                    mem.mineralsDemand[m].push(terminal.id);
                }
                
                // Superfluous supply of mineral m
                else if (typeof terminal.store[m] != 'undefined' &&
                    terminal.store[m] > 5000 &&
                    !_.includes(mem.mineralsSupply[m], terminal.id)) {
                    mem.mineralsSupply[m].push(terminal.id);
                }
            }
        }
    },
    
    run: function(terminal) {
        
        if (typeof terminal !== 'undefined') {
            
            var mem = Memory.global;
            var minerals = Object.keys(mem.mineralsDemand)

            for(i in minerals) {
                var m = Object.keys(mem.mineralsDemand)[i]
                
                if (_.includes(mem.mineralsSupply[m], terminal.id) &&
                    terminal.store.energy > 0 &&
                    mem.mineralsDemand[m].length) {
                    console.log(terminal.send(m, 500, Game.getObjectById(mem.mineralsDemand[m][0]).room.name));

                }
            }
        }
    }
};