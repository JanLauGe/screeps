// // On initialisting:
// // Clear memory completely
// for(var i in Memory) {
//     delete Memory[i];
// }

// Remove dead creeps from memory
for(var i in Memory.global.creeps) {
    if(!Game.creeps[i]) {
        delete Memory.global.creeps[i];
    }
}

// ## Build memory tree
// Diplomacy
Memory.global = {}
Memory.global.diplomacy = {
    'war' : false,
    'calltoarms' : true;
    'enemies' : ['AndrolGenhald','Tardigrade','cazantyl'],
    'allies' : ['linucc'],
    'neutral' : undefined};
Memory.global.creeps = {};
Memory.byroom = {};
Memory.stats = {};

module.exports = setupStatic;
