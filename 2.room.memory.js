// Room settings
var roomSettings1 = {
    'creeps_generalists' : 0,
    'creeps_workers' : 2,
    'creeps_carriers' : 2,
    'creeps_builders' : 0,
    'creeps_upgraders' : 1,
    'creeps_farmers' : 0,
    'creeps_farmroaders' : 0,
    'creeps_farmcarriers' : 0,

    'creeps_conquerors' : 0,
    'creeps_warriors' : 0,
    'creeps_archers' : 0,
    'creeps_pioneers' : 0,
    'creeps_healers' : 0,

    'structural_lifeConts' : 200000,
    'structural_lifeRoads' : 3000,
    'structural_lifeRamps' : 1000000,
    'structural_lifeWalls' : 1000000
};

var roomSettings2 = {
    'creeps_generalists' : 0,
    'creeps_workers' : 2,
    'creeps_carriers' : 2,
    'creeps_builders' : 0,
    'creeps_upgraders' : 1,

    'creeps_warriors' : 0,
    'creeps_archers' : 0,
    'creeps_conquerors' : 0,
    'creeps_pioneers' : 0,

    'structural_lifeConts' : 200000,
    'structural_lifeRoads' : 3000,
    'structural_lifeRamps' : 200000,
    'structural_lifeWalls' : 200000,

    'work_on_source_1' : 4,
    'work_on_source_2' : 4
};
var roomSettings3 = {
    'creeps_generalists' : 0,
    'creeps_workers' : 2,
    'creeps_carriers' : 2,
    'creeps_builders' : 1,
    'creeps_upgraders' : 1,

    'creeps_warriors' : 0,
    'creeps_archers' : 0,
    'creeps_conquerors' : 0,
    'creeps_pioneers' : 0,
    'creeps_healers' : 0,
    'creeps_tanks' : 0,

    'structural_lifeConts' : 200000,
    'structural_lifeRoads' : 3000,
    'structural_lifeRamps' : 150000,
    'structural_lifeWalls' : 150000,

    'work_on_source_1' : 4,
    'work_on_source_2' : 4
};
var roomSettings4 = {
    'creeps_generalists' : 0,
    'creeps_workers' : 2,
    'creeps_carriers' : 2,
    'creeps_builders' : 0,
    'creeps_upgraders' : 1,

    'creeps_warriors' : 0,
    'creeps_archers' : 0,
    'creeps_conquerors' : 0,
    'creeps_pioneers' : 0,

    'structural_lifeConts' : 200000,
    'structural_lifeRoads' : 3000,
    'structural_lifeRamps' : 40000,
    'structural_lifeWalls' : 3000,

    'work_on_source_1' : 4,
    'work_on_source_2' : 4
};
var roomSettings5 = {
    'creeps_generalists' : 0,
    'creeps_workers' : 2,
    'creeps_carriers' : 2,
    'creeps_builders' : 0,
    'creeps_upgraders' : 1,

    'creeps_warriors' : 0,
    'creeps_archers' : 0,
    'creeps_conquerors' : 0,
    'creeps_pioneers' : 0,

    'structural_lifeConts' : 200000,
    'structural_lifeRoads' : 3000,
    'structural_lifeRamps' : 10000,
    'structural_lifeWalls' : 10000,

    'work_on_source_1' : 4,
    'work_on_source_2' : 4
};
var roomMemory = {

    run: function(thisroom){

        // Room specifics
        //console.log(thisroom)

        // Recreate memory tree for this room
        Memory.byroom[thisroom.name] = {};
        var Mempath = Memory.byroom[thisroom.name];

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
        Mempath.jobs = {};
        Mempath.jobs.pickups = [];
        Mempath.jobs.upkeep = {
            'ramps' : [],
            'roads' : [],
            'conts' : [],
            'walls' : []};

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
        Mempath.creeps.farmers = [];
        Mempath.creeps.farmroaders = [];
        Mempath.creeps.farmcarriers = [];

        Mempath.creeps.warriors = [];
        Mempath.creeps.conquerors = [];
        Mempath.creeps.pioneers = [];
        Mempath.creeps.healers = [];
        Mempath.creeps.tanks = [];
        var creeps = thisroom.find(FIND_MY_CREEPS)
        for (var creepname in creeps){
            if (creeps[creepname].memory.role) {

                // Economy
                if (creeps[creepname].memory.role == 'generalist'){
                    Mempath.creeps.generalists.push(creeps[creepname].id); }
                else if(creeps[creepname].memory.role == 'worker'){
                    Mempath.creeps.workers.push(creeps[creepname].id); }
                else if(creeps[creepname].memory.role == 'carrier'){
                    Mempath.creeps.carriers.push(creeps[creepname].id); }
                else if(creeps[creepname].memory.role == 'builder'){
                    Mempath.creeps.builders.push(creeps[creepname].id); }
                else if(creeps[creepname].memory.role == 'upgrader'){
                    Mempath.creeps.upgraders.push(creeps[creepname].id); }
                else if(creeps[creepname].memory.role == 'farmer'){
                    Mempath.creeps.farmers.push(creeps[creepname].id); }
                else if(creeps[creepname].memory.role == 'farmroader'){
                    Mempath.creeps.farmroaders.push(creeps[creepname].id); }
                else if(creeps[creepname].memory.role == 'farmcarrier'){
                    Mempath.creeps.farmcarriers.push(creeps[creepname].id); }

                // Aggression
                else if(creeps[creepname].memory.role == 'warrior'){
                    Memory.global.creeps.warriors.push(creeps[creepname].id); }
                else if(creeps[creepname].memory.role == 'conqueror'){
                    Memory.global.creeps.conquerors.push(creeps[creepname].id); }
                else if(creeps[creepname].memory.role == 'pioneer'){
                    Memory.global.creeps.pioneers.push(creeps[creepname].id);
                }
            }
        }

        // Get number of work per source
        var sources = Game.rooms[thisroom.name].find(FIND_SOURCES);
        Mempath.jobs.sources = [];
        // for(i in sources) {
        //     Mempath.jobs.sources.push(`sources[i].id` : 0);
        // }

        // Get serial numbers for worker and carrier assignment
        var workers = thisroom.find(FIND_MY_CREEPS, {
            filter: (worker) => {
                return (worker.memory.role == 'worker')}});
        for(i = 0; i < workers.length ; i++) {
            workers[i].memory.serial = i
        }
        var carriers = thisroom.find(FIND_MY_CREEPS, {
            filter: (carrier) => {
                return (carrier.memory.role == 'carrier')}});
        for(i = 0; i < carriers.length ; i++) {
            carriers[i].memory.serial = i
        }
        var upgraders = thisroom.find(FIND_MY_CREEPS, {
            filter: (upgraders) => {
                return (upgraders.memory.role == 'carrier')}});
        for(i = 0; i < upgraders.length ; i++) {
            upgraders[i].memory.serial = i
        }
    }
}

module.exports = roomMemory;
