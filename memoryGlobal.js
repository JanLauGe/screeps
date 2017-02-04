var memoryGlobal = {

    setup: function() {

        console.log('------ Setting up memory ------')

        Memory.rooms = {};
        /*for(roomname in Game.rooms) {
            Memory.rooms[roomname] = {'roomname': roomname};
        }*/

        // Diplomacy
        Memory.global = {}
        Memory.global.diplomacy = {
            'enemies' : ['AndrolGenhald','Tardigrade','cazantyl'],
            'allies' : ['linucc'],
            'neutral' : null,
            'callToArms' : false,
        };
    }
}

module.exports = memoryGlobal;
