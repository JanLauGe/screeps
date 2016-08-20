var globalMemory = require('1.global.memory');
var roomMemory = require('2.room.memory');
var spawnCreeps = require('3.spawn.creeps');

var setupMemory = require('aa.setup.memory');
var buildCreeps = require('bb.build.creeps');
var listSpawning = require('list.spawning');
var listMining = require('list.minig');
var listJobs = require('list.jobs');
var timedAttack = require('timed.attack')
var roleTower2 = require('role.tower2')

var roleGeneralist = require('role.generalist')
var roleHarvester = require('role.harvester');
var roleWorker = require('role.worker');
var roleCarrier = require('role.carrier');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleFarmer = require('role.farmer');
var roleFarmroader = require('role.farmroader');
var roleFarmcarrier = require('role.farmcarrier');

var roleWarrior = require('role.warrior');
var roleConqueror = require('role.conqueror');
var rolePioneer =  require('role.pioneer');
var roleArcher = require('role.archer');
var roleHealer = require('role.healer');
var roleTank = require('role.tank');

// JSON.stringify
// Game.spawns.Spawn1.createWarrior()
// Test msg

module.exports.loop = function () {

    globalMemory.run()
    timedAttack.run()
    listMining.run()
    listSpawning.run()

    // Run rooms
    for(r in Game.rooms) {
        var thisroom = Game.rooms[r];
        //Memory.byroom[thisroom.name] = {};

        //## MY ROOMS
        if (typeof thisroom.controller.owner !== 'undefined') {

            if (thisroom.controller.owner.username === 'JanLauGe'){

                var thisroom = Game.rooms[r];
                Memory.byroom[thisroom.name] == {};
                // Set up room memory
                roomMemory.run(thisroom)
                // List of jobs
                listJobs.run(thisroom)
                // Spawn creeps
                var mainspawn = thisroom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}})[0];
                if (mainspawn) {
                    buildCreeps.run(mainspawn)
                    //spawnCreeps.run(mainspawn)
                }

                var Mempath = Memory.byroom[thisroom.name]
                var towers = thisroom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                var links = thisroom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
                var hostiles = thisroom.find(FIND_HOSTILE_CREEPS);
                var jobRamps = Mempath.jobs.upkeep.ramps;
                var jobRoads = Mempath.jobs.upkeep.roads;
                var jobConts = Mempath.jobs.upkeep.conts;

                // Alarm if enemy enters room
                if (hostiles.length > 0) {
                    var username = hostiles[0].owner.username;
                    Game.notify(`User ${hostiles[0].owner.username} spotted in room ${thisroom.name}`);
                }

                // Run the towers
                if (towers.length > 0) {

                    for(tower in towers) {
                        roleTower2.run(towers[tower])
                    }
                }

                    // if (hostiles.length > 0) {
                    //     towers.forEach(
                    //     tower => tower.attack(tower.pos.findClosestByRange(hostiles)))
                    // }
                    // else if(jobRamps.length > 0){
                    //     for(var j in jobRamps) {
                    //         var target = Game.getObjectById(jobRamps[j])
                    //         towers.forEach(
                    //         tower => tower.repair(target));
                    //     }
                    // }
                    // else if(jobRoads.length > 0) {
                    //     for(var j in jobRoads) {
                    //         var target = Game.getObjectById(jobRoads[j])
                    //         towers.forEach(
                    //         tower => tower.repair(target));
                    //     }
                    // }
                    // else if(jobConts.length > 0) {
                    //     for(var k in jobConts) {
                    //         var target = Game.getObjectById(jobConts[k])
                    //         towers.forEach(
                    //         tower => tower.repair(target));
                    //     }
                    // }
                    // else{
                    //     towers.forEach(
                    //     tower => tower.repair(tower.pos.findClosestByRange(
                    //         FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax &&
                    //         structure.structureType == STRUCTURE_RAMPART
                    //     })))
                    // }

                // Run the energy links
                if (links.length > 2) {
                    if (links[2].energy == 0) {
                        links[0].transferEnergy(links[1])
                    }
                    else if(links[2].energy > 0) {
                        if ((links[1].energy - links[1].energyCapacity) < 0) {
                            links[2].transferEnergy(links[0])
                        }
                        else if((links[1].energyCapacity - links[1].energy) < links[2].energy) {
                            links[2].transferEnergy(links[1])
                        }
                    }
                }
                else if(links.length > 1) {
                    if (links[0].energy > 0) {
                        links[0].transferEnergy(links[1])
                    }
                }
            }
            //## ENEMY ROOM
            else if(thisroom.controller.owner.username !== 'JanLauGe') {

            }
        }
        //## NEUTRAL ROOM
        else if(typeof thisroom.controller.owner !== 'undefined') {

        }
    }

    // Build creeps
    var spawn = Game.spawns['Spawn1'];
    buildCreeps.run(spawn);


    // Run creep roles
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        // Economy
        if(creep.memory.role == 'generalist') {
            roleGeneralist.run(creep);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
        if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'farmer') {
            roleFarmer.run(creep);
        }
        if(creep.memory.role == 'farmroader') {
            roleFarmroader.run(creep);
        }
        if(creep.memory.role == 'farmcarrier') {
            roleFarmcarrier.run(creep);
        }

        // Aggression
        if(creep.memory.role == 'warrior') {
            roleWarrior.run(creep);
        }
        if(creep.memory.role == 'conqueror') {
            roleConqueror.run(creep);
        }
        if(creep.memory.role == 'pioneer') {
            rolePioneer.run(creep);
        }
        if(creep.memory.role == 'archer') {
            roleArcher.run(creep);
        }
        if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        if(creep.memory.role == 'tank') {
            roleTank.run(creep);
        }
    }
}
