var runLabs = {

    run: function(labs) {

        if (typeof labs !== 'undefined' && labs.length) {

            for(var i = 0; i < labs.length; i++) {
                var flag = labs[i].pos.lookFor(LOOK_FLAGS);
                var mineral = flag[0].name.substring(8,10);
                Memory.byroom.E46N42.labs[mineral] = labs[i].id;
            }


            // Run labs --------------------------------------------------------------

            // Helper function
            getlab = function(mineral) {
                return Game.getObjectById(Object(Memory.byroom.E46N42.labs)[mineral]);
            }

            // Reactions
            getlab('OH').runReaction(getlab('O'), getlab('H'));
            getlab('ZK').runReaction(getlab('Z'), getlab('K'));
            getlab('UL').runReaction(getlab('U'), getlab('L'));
            getlab('G').runReaction(getlab('ZK'), getlab('UL'));
        }
    }
};

module.exports = runLabs;
