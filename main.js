var functions = require('functions')
functions.run()

//var setupStatic = require('setup.static')
var setupMemory = require('setup.memory')
var setupRoom = require('setup.room')
var stats = require('stats')

var listSpawning = require('list.spawning');
var listJobs = require('list.jobs');

var runFlags = require('run.flags')
var runSpawns = require('run.spawns')
var runLinks = require('run.links')
var runTowers = require('run.towers')

var roleGeneralist = require('role.generalist')
var roleWorker = require('role.worker');
var roleCarrier = require('role.carrier');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleConqueror = require('role.conqueror');
var roleTrucker = require('role.trucker');
var roleDefender = require('role.defender');
var roleWarrior = require('role.warrior');
var roleHealer = require('role.healer');


module.exports.loop = function () {

    setupMemory.run()

    //## RUN CREEPS ------------------------------------------------------------
    for(creepname in Game.creeps) {
        var creep = Game.creeps[creepname];

        if(creep.memory.role == 'generalist') {
            roleGeneralist.run(creep);
        }
        else if(creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
        else if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'conqueror') {
            roleConqueror.run(creep);
        }
        else if(creep.memory.role == 'trucker') {
            roleTrucker.run(creep);
        }
        else if(creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
        else if(creep.memory.role == 'warrior') {
            roleWarrior.run(creep);
        }
        else if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
    }

    //## RUN FLAGS -------------------------------------------------------------
    //for(i in Game.flags) {
    //    console.log(JSON.stringify(Game.flags[i]))
    //}
    runFlags.run()

    //## RUN ROOMS -------------------------------------------------------------
    for(r in Game.rooms) {
        var thisroom = Game.rooms[r];

        //## MY ROOMS
        if (typeof thisroom.controller.owner !== 'undefined') {
            if (thisroom.controller.owner.username === 'JanLauGe') {

                Memory.byroom[thisroom.name] = {};
                setupRoom.run(thisroom);
                stats.run(thisroom)

                // Get lists
                listSpawning.run(thisroom);
                listJobs.run(thisroom);

                // Run structures
                var towers = thisroom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                var spawns = thisroom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}});
                var links = thisroom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
                runTowers.run(towers)
                runSpawns.run(spawns)
                runLinks.run(links)

                // Alarm if enemy enters room
                var hostiles = thisroom.find(FIND_HOSTILE_CREEPS)
                if (hostiles.length > 0) {
                    var username = hostiles[0].owner.username;
                    Game.notify(`User ${hostiles[0].owner.username} spotted in room ${thisroom.name}`);
                }
            }
            //## ENEMY ROOMS
            else if(thisroom.controller.owner.username !== 'JanLauGe') {

            }
        }
        //## NEUTRAL ROOMS
        else if(typeof thisroom.controller.owner == 'undefined') {

        }
    }
};
