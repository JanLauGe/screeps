var setupMemory = {

    run: function() {

        Memory.global.sources = [];

        for(var i in Memory.global.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.global.creeps[i];
            }
        }
    }
};

module.exports = setupMemory;
