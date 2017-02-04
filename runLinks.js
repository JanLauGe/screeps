module.exports = {
    
    assign: function(links) {
        
        mem = Memory.rooms[links[0].room.name]
        for (i = 0; i < links.length; i++) {
            
            var link = links[i]
            var flag = link.pos.lookFor(LOOK_FLAGS)
            
            // Find flag to distinguish sources and flags
            if (flag.length) {
                if (_.startsWith(flag[0].name, 'sink')) {
                    mem.links_sinks.push(link.id)
                }
                else if (_.startsWith(flag[0].name, 'source') &&
                    link.energy < link.energyCapacity) {
                    mem.links_sources.push(link.id)
                }
            }
            // For unflagged links, decide based on energy
            else if (flag === '') {
                if (link.energy == 0) {
                    mem.links_sinks.push(link.id)
                }
                else if(link.energy == link.energyCapacity) {
                    mem.links_sources.push(link.id)
                }
                else {
                    mem.links_trans.push(link.id)
                }
            }
        }
    },

    run: function(room) {
        
        var mem = Memory.rooms[room.name]
        
        for (i = 0; i < mem.links_sinks.length; i++) {
            var link = Game.getObjectById(mem.links_sinks[i]);
            
            // Push link_sinks to sinks list
            if (link.energy < link.energyCapacity) {
                mem.objectsSinks.push(link)
            }
            
            // Conduct transfer
            link.transferEnergy(Game.getObjectById(mem.links_sources[0]))
        }
    }
};
