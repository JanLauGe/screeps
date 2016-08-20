var runLinks = {

    run: function(links) {

        // Run the energy links
        if (links.length > 2) {
            if (links[2].energy == 0) {
                links[0].transferEnergy(links[1])
            }
            else if(links[2].energy > 0) {
                if ((links[1].energy - links[1].energyCapacity) < 0) {
                    links[2].transferEnergy(links[0])
                }
                else if((links[1].energyCapacity - links[1].energy) < links[2].energy) {
                    links[2].transferEnergy(links[1])
                }
            }
        }
        else if(links.length > 1) {
            if (links[0].energy > 0) {
                links[0].transferEnergy(links[1])
            }
        }
    }
};

module.exports = runLinks;
