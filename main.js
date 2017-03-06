// Issues:
// Make road life relative
// include transfer links in sources
// spawn builder if construction site found
// upgrade ramps and walls when storage full
// transfer energy to terminal when storage full
// Creep for mineral allocation to labs (and energy to terminal)
// Make miners deliver when mineral is down

// In screeps console, enter RawMemory.set("{}"). This will delete everything you have in your memory.


// On initialisting:
console.log('====== Purging memory ======')

// Clear memory
for(var i in Memory) {
    // Spare creeps memory
    if (i !== 'creeps') {
        delete Memory[i];
    }
}

// Remove dead creeps from memory
for(var i in Memory.creeps) {
    if(!Game.creeps[i]) {
        delete Memory.creeps[i];
    }
}


// Modules #####################################################################

// Functions and prototypes
var functions = require('functions');

// Set up memory
var memoryGlobal = require('memoryGlobal');
var memoryRoomAny = require('memoryRoomAny');
var memoryRoomMine = require('memoryRoomMine');

// Creep roles
var roleBuilder = require('roleBuilder');
var roleCarrier = require('roleCarrier');
var roleConqueror = require('roleConqueror');
var roleDefender = require('roleDefender');
var roleGeneralist = require('roleGeneralist');
var roleHauler = require('roleHauler');
var roleHealer = require('roleHealer');
var roleMiner = require('roleMiner');
var roleUpgrader = require('roleUpgrader');
var roleWarrior = require('roleWarrior');
var roleWorker = require('roleWorker');

// Structures
var runLabs = require('runLabs');
var runLinks = require('runLinks');
var runSpawns = require('runSpawns');
var runTerminal = require('runTerminal');
var runTowers = require('runTowers');
var runFlags = require('runFlags');


// Preloop setup ###############################################################

// Get username
var player = Game.spawns[Object.keys(Game.spawns)[0]].owner.username;

// Import shared functions
functions.import();

// Setup global memory
memoryGlobal.setup();


// Main game loop ##############################################################
module.exports.loop = function() {

    var CPUstart = Game.cpu.getUsed();
    memoryGlobal.run();
    runFlags.run()

    // Run rooms ===============================================================
    for(var roomName in Game.rooms) {
        var room = Game.rooms[roomName];
        memoryRoomAny.setup(room);
        
        // Not a central room (not without controller)
        if (room.controller != undefined) {
            // Not a neutral room (claimed)
            if (room.controller.owner != undefined) {
                // One of my rooms
                if (room.controller.owner.username === 'JanLauGe') {

                    // My rooms ------------------------------------------------
                    memoryRoomMine.setup(room);

                    // Alarm if enemy enters room
                    var hostiles = room.find(FIND_HOSTILE_CREEPS);
                    if (hostiles.length) {
                        var username = hostiles[0].owner.username;
                        Game.notify(`User ${hostiles[0].owner.username} spotted in room ${room.name}`);
                    }

                    // Get structures
                    var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                    var spawns = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}});
                    var links = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
                    var labs = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LAB}});
                    var terminal = room.terminal;

                    // Run structures
                    runTowers.run(towers);
                    runSpawns.run(spawns);
                    //runLinks.run(room);
                    //runLabs.run(labs);
                    runTerminal.run(terminal);

                }
                // Enemy rooms -------------------------------------------------
                // else if(thisroom.controller.owner.username != 'JanLauGe') {}
            }
        }
        // Neutral rooms -------------------------------------------------------
        //else if(thisroom.controller == undefined) {}
        //console.log('CPU spent on room', thisroom.name, Game.cpu.getUsed() - lastcpu)
        //var lastcpu = Game.cpu.getUsed()
    }


    // Run creeps ==============================================================
    // If there is at least one creep
    if (Object.keys(Game.creeps).length) {

        // Get task and target
        for(var creepname in Game.creeps) {
            var creep = Game.creeps[creepname];
            var role = creep.memory.role;
            
            // If role is missing, make into generalist
            if (typeof role === 'undefined') {
                var role = 'generalist';
            }
            
            // Run creep logic to get task based on role variable
            eval('role' +
                role.charAt(0).toUpperCase() + role.slice(1) +
                '.getTask(creep)');
            // Use tasks to assign targets
            eval('role' +
                role.charAt(0).toUpperCase() + role.slice(1) +
                '.getTarget(creep)');
        }

        // Then execute jobs
        for(var creepname in Game.creeps) {

            var creep = Game.creeps[creepname];
            var role = creep.memory.role;
            // Run creep logic based on role variable
            eval('role' +
                role.charAt(0).toUpperCase() +
                role.slice(1) +
                '.run(creep)');
        }
    }
}
