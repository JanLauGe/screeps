module.exports = {

    run: function(links) {

        // Find sinks and sources
        var links_sinks = []
        var links_trans = []
        var links_sources = []
        //Memory.rooms[links[0].room.name].links_sinks = [];
        //Memory.rooms[links[0].room.name].links_trans = [];

        if (links.length) {
            for (i = 0; i < links.length; i++) {

                var link = links[i]
                var flag = link.pos.lookFor(LOOK_FLAGS)
                // Find flag to distinguish sources and flags
                if (flag.length) {
                    if (_.startsWith(flag[0].name, 'sink')) {
                        links_sinks.push(link)
                        Memory.rooms[links[0].room.name].links_sinks.push(link.id)
                    }
                    else if (_.startsWith(flag[0].name, 'source') &&
                        link.energy < link.energyCapacity) {
                        links_sources.push(link)
                    }
                }
                // For unflagged links, decide based on energy
                else if (flag == '') {
                    if (link.energy == 0) {
                        links_sinks.push(link)
                    }
                    else if(link.energy == link.energyCapacity) {
                        links_sources.push(link)
                    }
                    else {
                        links_trans.push(link)
                    }
                }
            }
            Memory.rooms[links[0].room.name].links_trans = links_trans

            // Conduct transfer
            for (i = 0; i < links_sinks.length; i++) {
                links_sinks[i].transferEnergy(links_sources[0])
            }
        }
    }
};
