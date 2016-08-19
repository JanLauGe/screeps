// // // On initialisting:
// // // Clear memory completely
// // for(var i in Memory) {
// //     delete Memory[i];
// // }

// // Build memory tree

// // Diplomacy
// Memory.global = {}
// Memory.global.diplomacy = {
//     'war' : false,
//     'peace' : true,
//     'enemies' : ['AndrolGenhald','Tardigrade','cazantyl'],
//     'allies' : undefined,
//     'neutral' : undefined};
// Memory.global.creeps = {};

// // Room settings
// Memory.byroom = {};
// Memory.byroom.E46N42 = {};
// Memory.byroom.E46N42.settings = {
//     'creeps_harvesters' : 0,
//     'creeps_builders' : 2,
//     'creeps_upgraders' : 1,
//     'creeps_workers' : 2,
//     'creeps_carriers' : 3,
//     'creeps_pioneers' : 1,
//     'structural_lifeConts' : 2000,
//     'structural_lifeRoads' : 3000,
//     'structural_lifeRamps' : 50000,
//     'structural_lifeWalls' : 50000
// };

// Memory.byroom.E46N42.jobs = {};
// Memory.byroom.E46N42.jobs.pickups = [];

// Memory.byroom.E46N42.jobs.upkeep = {
//     'ramps' : [],
//     'roads' : [],
//     'conts' : [],
//     'walls' : []};
// // Memory.byroom.E46N42.jobs.upkeep.ramps = [];
// // Memory.byroom.E46N42.jobs.upkeep.roads = [];
// // Memory.byroom.E46N42.jobs.upkeep.conts = [];
// // Memory.byroom.E46N42.jobs.upkeep.walls = [];

// var setupMemory = {

//     run: function(){

//         // // Remove dead creeps from memory
//         // for(var i in Memory.creeps) {
//         //     if(!Game.creeps[i]) {
//         //         delete Memory.creeps[i];
//         //     }
//         // }
//         var roleGeneralist = require('role.generalist')
// var roleHarvester = require('role.harvester');
// var roleWorker = require('role.worker');
// var roleCarrier = require('role.carrier');
// var roleBuilder = require('role.builder');
// var roleUpgrader = require('role.upgrader');

// var roleWarrior = require('role.warrior');
// var roleConqueror = require('role.conqueror');
// var rolePioneer =  require('role.pioneer');
//         // Get number of active creeps per role
//         Memory.byroom.E46N42.creeps = {}
//         Memory.byroom.E46N42.creeps.harvesters = [];
//         Memory.byroom.E46N42.creeps.harvesters = [];
//         Memory.byroom.E46N42.creeps.builders = [];
//         Memory.byroom.E46N42.creeps.upgraders = [];
//         Memory.byroom.E46N42.creeps.workers = [];
//         Memory.byroom.E46N42.creeps.carriers = [];
//         Memory.byroom.E46N42.creeps.pioneers = [];
//         for (var creepname in Game.creeps){
//             if (Game.creeps[creepname].memory.role == 'harvester'){
//                 Memory.byroom.E46N42.creeps.harvesters.push(Game.creeps[creepname].id); }
//             else if(Game.creeps[creepname].memory.role == 'builder'){
//                 Memory.byroom.E46N42.creeps.builders.push(Game.creeps[creepname].id); }
//             else if(Game.creeps[creepname].memory.role == 'upgrader'){
//                 Memory.byroom.E46N42.creeps.upgraders.push(Game.creeps[creepname].id); }
//             else if(Game.creeps[creepname].memory.role == 'worker'){
//                 Memory.byroom.E46N42.creeps.workers.push(Game.creeps[creepname].id); }
//             else if(Game.creeps[creepname].memory.role == 'carrier'){
//                 Memory.byroom.E46N42.creeps.carriers.push(Game.creeps[creepname].id); }
//             else if(Game.creeps[creepname].memory.role == 'pioneer'){
//                 Memory.byroom.E46N42.creeps.pioneers.push(Game.creeps[creepname].id); }
//         }

//         // Get number of active creeps per role
//         Memory.global.creeps.harvesters = [];
//         Memory.global.creeps.builders = [];
//         Memory.global.creeps.upgraders = [];
//         Memory.global.creeps.workers = [];
//         Memory.global.creeps.carriers = [];
//         Memory.global.creeps.pioneers = [];
//         for (var creepname in Game.creeps){
//             if (Game.creeps[creepname].memory.role == 'harvester'){
//                 Memory.global.creeps.harvesters.push(Game.creeps[creepname].id); }
//             else if(Game.creeps[creepname].memory.role == 'builder'){
//                 Memory.global.creeps.builders.push(Game.creeps[creepname].id); }
//             else if(Game.creeps[creepname].memory.role == 'upgrader'){
//                 Memory.global.creeps.upgraders.push(Game.creeps[creepname].id); }
//             else if(Game.creeps[creepname].memory.role == 'worker'){
//                 Memory.global.creeps.workers.push(Game.creeps[creepname].id); }
//             else if(Game.creeps[creepname].memory.role == 'carrier'){
//                 Memory.global.creeps.carriers.push(Game.creeps[creepname].id); }
//             else if(Game.creeps[creepname].memory.role == 'pioneer'){
//                 Memory.global.creeps.pioneers.push(Game.creeps[creepname].id); }
//         }
//     }
// };

// module.exports = setupMemory;
