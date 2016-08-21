var setupRoom = {

    run: function(thisroom){

        // Room settings
        var roomSettings1 = {
            'creeps_generalists' : 0,
            'creeps_workers' : 2,
            'creeps_carriers' : 2,
            'creeps_builders' : 1,
            'creeps_upgraders' : 1,
        };
        var roomSettings2 = {
            'creeps_generalists' : 0,
            'creeps_workers' : 2,
            'creeps_carriers' : 2,
            'creeps_builders' : 1,
            'creeps_upgraders' : 1,
        };
        var roomSettings3 = {
            'creeps_generalists' : 0,
            'creeps_workers' : 2,
            'creeps_carriers' : 2,
            'creeps_builders' : 1,
            'creeps_upgraders' : 1,
        };
        var roomSettings4 = {
            'creeps_generalists' : 0,
            'creeps_workers' : 2,
            'creeps_carriers' : 2,
            'creeps_builders' : 1,
            'creeps_upgraders' : 1,
        };
        var roomSettings5 = {
            'creeps_generalists' : 0,
            'creeps_workers' : 2,
            'creeps_carriers' : 2,
            'creeps_builders' : 1,
            'creeps_upgraders' : 1,
        };

        Memory.byroom[thisroom.name] = {};
        var Mempath = Memory.byroom[thisroom.name];

        // Apply room settings
        if (thisroom.name == 'E46N42') {
            Mempath.settings = roomSettings1;
        }
        else if(thisroom.name == 'E47N43') {
            Mempath.settings = roomSettings2;
        }
        else if(thisroom.name == 'E47N45') {
            Mempath.settings = roomSettings3;
        }
        else if(thisroom.name == 'E49N47'){
            Mempath.settings = roomSettings4;
        }
        else if(thisroom.name == 'E47N47'){
            Mempath.settings = roomSettings5;
        }

        // Set up memory structure
        Mempath.jobs = {};
        Mempath.jobs.pickups = [];
        Mempath.jobs.upkeep = {
            'ramps' : [],
            'roads' : [],
            'conts' : [],
            'walls' : []
        };

        // Remove dead creeps from memory
        for(var i in Mempath.creeps) {
            if(!Game.creeps[i]) {
                delete Mempath.creeps[i];
            }
        }
        // Get number of active creeps per role
        Mempath.creeps = {}
        Mempath.creeps.generalists = [];
        Mempath.creeps.workers = [];
        Mempath.creeps.carriers = [];
        Mempath.creeps.builders = [];
        Mempath.creeps.upgraders = [];

        var creeps = thisroom.find(FIND_MY_CREEPS)
        for (var creepname in creeps){
            if (creeps[creepname].memory.role) {

                // Economy
                if (creeps[creepname].memory.role == 'generalist') {
                    Mempath.creeps.generalists.push(creeps[creepname].id);
                }
                else if(creeps[creepname].memory.role == 'worker') {
                    Mempath.creeps.workers.push(creeps[creepname].id);
                }
                else if(creeps[creepname].memory.role == 'carrier') {
                    Mempath.creeps.carriers.push(creeps[creepname].id);
                }
                else if(creeps[creepname].memory.role == 'builder') {
                    Mempath.creeps.builders.push(creeps[creepname].id);
                }
                else if(creeps[creepname].memory.role == 'upgrader') {
                    Mempath.creeps.upgraders.push(creeps[creepname].id);
                }
            }
        }
    }
};

module.exports = setupRoom;
