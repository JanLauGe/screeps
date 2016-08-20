// // On initialisting:
// // Clear memory completely
// for(var i in Memory) {
//     delete Memory[i];
// }

// ## Build memory tree
// Diplomacy
Memory.global = {}
Memory.global.diplomacy = {
    'war' : false,
    'peace' : true,
    'enemies' : ['AndrolGenhald','Tardigrade','cazantyl'],
    'allies' : undefined,
    'neutral' : undefined};
Memory.global.creeps = {};
Memory.byroom = {};

var globalMemory = {

    run: function(){

        // Remove dead creeps from memory
        for(var i in Memory.global.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.global.creeps[i];
            }
        }

        // Set up memory for remote mining
        Memory.global.remotemining = [];
        Memory.global.remotemining.openrooms = [];
        Memory.global.remotemining.sources = [];
        Memory.global.remotemining.hostiles = [];
        Memory.global.remotemining.closedrooms = [];

        // Get number of active creeps per role
        Memory.global.creeps.generalists = [];
        Memory.global.creeps.workers = [];
        Memory.global.creeps.carriers = [];
        Memory.global.creeps.builders = [];
        Memory.global.creeps.upgraders = [];
        Memory.global.creeps.farmers = [];
        Memory.global.creeps.farmroaders = [];
        Memory.global.creeps.farmcarriers = [];

        Memory.global.creeps.warriors = [];
        Memory.global.creeps.conquerors = [];
        Memory.global.creeps.pioneers = [];
        Memory.global.creeps.archers = [];
        Memory.global.creeps.healers = [];
        Memory.global.creeps.tanks = [];
        for (var creepname in Game.creeps){

            // Economy
            if (Game.creeps[creepname].memory.role == 'generalist'){
                Memory.global.creeps.generalists.push(Game.creeps[creepname].id); }
            else if(Game.creeps[creepname].memory.role == 'worker'){
                Memory.global.creeps.workers.push(Game.creeps[creepname].id); }
            else if(Game.creeps[creepname].memory.role == 'carrier'){
                Memory.global.creeps.carriers.push(Game.creeps[creepname].id); }
            else if(Game.creeps[creepname].memory.role == 'builder'){
                Memory.global.creeps.builders.push(Game.creeps[creepname].id); }
            else if(Game.creeps[creepname].memory.role == 'upgrader'){
                Memory.global.creeps.upgraders.push(Game.creeps[creepname].id); }
            else if(Game.creeps[creepname].memory.role == 'farmer'){
                Memory.global.creeps.farmers.push(Game.creeps[creepname].id); }
            else if(Game.creeps[creepname].memory.role == 'farmroader'){
                Memory.global.creeps.farmroaders.push(Game.creeps[creepname].id); }
            else if(Game.creeps[creepname].memory.role == 'farmcarrier'){
                Memory.global.creeps.farmcarriers.push(Game.creeps[creepname].id); }

            // Aggression
            else if(Game.creeps[creepname].memory.role == 'warrior'){
                Memory.global.creeps.warriors.push(Game.creeps[creepname].id); }
            else if(Game.creeps[creepname].memory.role == 'conqueror'){
                Memory.global.creeps.conquerors.push(Game.creeps[creepname].id); }
            else if(Game.creeps[creepname].memory.role == 'pioneer'){
                Memory.global.creeps.pioneers.push(Game.creeps[creepname].id); }
            else if(Game.creeps[creepname].memory.role == 'archer'){
                Memory.global.creeps.archers.push(Game.creeps[creepname].id); }
            else if(Game.creeps[creepname].memory.role == 'healer'){
                Memory.global.creeps.healers.push(Game.creeps[creepname].id); }
            else if(Game.creeps[creepname].memory.role == 'tank'){
                Memory.global.creeps.tanks.push(Game.creeps[creepname].id); }
        }
    }
};

module.exports = globalMemory;
