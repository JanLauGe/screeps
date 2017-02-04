var memoryRoomMine = {

    setup: function(room){
        
        var runLinks = require('runLinks');
        // Memory objects
        var mem = Memory.rooms[room.name];
        for (i in mem.sources) {
            mem.sources[i]['slots'] = mem.sources[i].plain;
            mem.sources[i]['work'] = 5;
            mem.sources[i]['energy'] = Game.getObjectById(mem.sources[i].id).energy;
        }

        // Uniquely initialised room properties ================================

        // Get position of spawn
        if (typeof mem.posSpawn === 'undefined') {
            var spawn = room.find(FIND_STRUCTURES, {
                filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN)}});
            var spawn = spawn[0];
            mem.posSpawn = {x: spawn.pos.x, y:spawn.pos.y};
        }


        // Dynamic room properties =============================================

        // Find construction sites
        var sites = room.find(FIND_CONSTRUCTION_SITES);
        // Find dropped energy
        var piles = room.find(FIND_DROPPED_RESOURCES,
            {filter: (dropped) => {return (dropped.energy > (room.carryCapacity / 3))}});
        // Find energy sinks
        var sinks = room.find(FIND_STRUCTURES, {
            filter: (structure) => {return (
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER) &&
                structure.energy < structure.energyCapacity;}});
        // Find links
        var links = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
        
        mem.links_sinks = [];
        mem.links_sources = [];
        //runLinks.assign(links);
        
        mem.objectsSites = sites;
        mem.objectsPiles = piles;
        mem.objectsSinks = sinks;


        // List jobs ===========================================================

        mem.joblistPickup = [];
        mem.joblistRepairRoads = [];
        mem.joblistRepairContainers = [];
        mem.joblistRepairWalls = [];
        mem.joblistRepairRamps = [];
        var defense = 100000;

        // List of pickup jobs -----------------------------------------------

        // Currently, list of pickups is generated afresh every single tick

        // Any worker thats full
        //for(var i in mem.creeps.workers) {
        //    var worker = Game.getObjectById(mem.creeps.workers[i])
        //    if (worker.carry.energy == worker.carryCapacity &&
        //        !_.some(worker.id, mem.jobs.pickups)) {
        //        mem.jobs.pickups.push(worker.id)
        //    }
        //}
        // Any dropped ressources 100+
        var drops = (room.find(FIND_DROPPED_RESOURCES, {
            filter: {resourceType: RESOURCE_ENERGY}}))
        if (drops.length) {
            for(var i = 0; i < drops.length; i++) {
                var drop = drops[i]
                if (!_.some( mem.joblistPickup, drop.id) &&
                    drop.amount >= 100) {
                    mem.joblistPickup.push(drop.id)
                }
            }
        }
        // Any container with 500+
        var containers = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
        if (containers.length) {
            for(var c = 0; c < containers.length; c++) {
                var cont = containers[c]
                if (!_.some(cont.id, mem.joblistPickup) &&
                    cont.store[RESOURCE_ENERGY] >= 200) {
                    mem.joblistPickup.push(cont.id)
                }
            }
        }
        
        // Run Links -----------------------------------------------------------
        
        
        
        //Links given my run.links
        //var links = mem.links
        //if (typeof links != 'undefined' &&
        //    links.length) {
        //    for(var link in links) {
        //        thislink = Game.getObjectById(link)
        //        mem.joblistPickup.push(thislink.id)
        //    }
        //}
        // // Links if three links and link 3 full
        // var links = room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_LINK)}});
        // if (links.length > 2 &&
        //     links[2].energy > 0 &&
        //     links[0].energy > 0) {
        //     mem.jobs.pickups.push(links[0].id)
        // }
        // var storage = room.storage
        // if (typeof storage !== 'undefined') {
        //     if (storage.length > 0) {
        //         mem.jobs.pickups.push(storage.id)
        //     }
        // }


        // List of upkeep jobs -----------------------------------------------
        // Add new jobs

        // Find all ramps
        var jobRamps = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'rampart' &&
                structure.hits < defense)}});

        _.forEach(jobRamps, function(job) {
            if (!_.some(mem.joblistRepairRamps, job.id)) {
                mem.joblistRepairRamps.push(job.id)
            }
        })

        // Find all roads
        var jobRoads = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'road' &&
                structure.hits < (structure.hitsMax - 1000))}});
        for (j in jobRoads){
            if (!_.some(mem.joblistRepairRoads, jobRoads[j].id)) {
                mem.joblistRepairRoads.push(jobRoads[j].id)
            }
        }

        // Find all containers
        var jobConts = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'container' &&
                structure.hits < 200000)}});
        for (j in jobConts){
            if (!_.some(mem.joblistRepairContainers, jobConts[j].id)) {
                mem.joblistRepairContainers.push(jobConts[j].id)
            }
        }

        // Find all walls
        var jobsWalls = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'constructedWall' &&
                structure.hits < defense)}});
        for (j in jobsWalls){
            if (!_.some(mem.joblistRepairWalls, jobsWalls[j].id)) {
                mem.joblistRepairWalls.push(jobsWalls[j].id)
            }
        }


        // Remove done jobs

        // Done ramps
        var joblist = mem.joblistRepairRamps;
        var jobRamps = room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {return
                (structure.structureType == 'rampart' &&
                (structure.hits > defense ||
                structure.hits == structure.hitsMax))}});
        _.forEach(jobRamps, function(job) {
            if (_.some(mem.joblistRepairRamps, job.id)) {
                joblist.splice(joblist.indexOf(job.id),1)
            }
        })

        // Done roads
        var joblist = mem.joblistRepairRamps;
        var jobRoads = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'road' &&
                structure.hits >= (structure.hitsMax - 500))}});
        for (j in jobRoads){
            if (_.some(joblist, jobRoads[j].id)) {
                joblist.splice(joblist.indexOf(jobRoads[j]),1)
            }
        }

        // Done conts
        var joblist = mem.joblistRepairContainers;
        var jobConts = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'container' &&
                structure.hits >= (structure.hitsMax - 500))}});
        for (j in jobConts){
            if (_.some(joblist, jobConts[j].id)) {
                joblist.splice(joblist.indexOf(jobConts[j]),1)
            }
        }

        // Done walls
        var joblist = mem.joblistRepairWalls;
        var jobsWalls = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'constructedWall' &&
                structure.hits >= 5000)}});
        for (j in jobsWalls){
            if (_.some(joblist, jobsWalls[j].id)) {
                joblist.splice(joblist.indexOf(jobsWalls[j]),1)
            }
        }


        // Generate spawning list ==============================================

        // Creep population targets:
        var popTarget = {
            generalist: 0,
            worker: 0,
            carrier: 0,
            upgrader: 0,
            builder: 0,
            defender: 0,
            hauler: 0,
            miner: 0,
            warrior: 0,
            healer: 0
        };

        // Number of plain fields next to sources
        var slots = _.sum(mem.sources, function(source) {return source.plain});
        var nSources = Object.keys(mem.sources).length;

        // If low lvl room, use generalists
        if (room.energyCapacityAvailable <= 300) {
            popTarget['generalist'] = Math.min(
                Math.floor(slots * 1.5),
                nSources * 5);
        }
        else if (room.energyCapacityAvailable <= 400) {
            popTarget['generalist'] = Math.min(
                Math.floor(slots * 1.5),
                nSources * 3);
        }
        else if (room.energyCapacityAvailable <= 600) {
            popTarget['generalist'] = Math.min(
                Math.floor(slots * 1.5),
                nSources * 2);
        }
        else if (room.energyCapacityAvailable <= 800) {
            popTarget['generalist'] = Math.min(
                Math.floor(slots * 1.5),
                nSources * 1.5);
        }
        // Else, user worker carrier model
        else if (room.energyCapacityAvailable > 800) {
            popTarget['worker'] = nSources;
            popTarget['carrier'] = 2;
            popTarget['upgrader'] = 1;
            
            // If there is a construction site, there should be a builder
            if (sites.length) {
                popTarget['builder'] = 1;
            }
            
            // If there is an extractor, there should be a miner
            if (Game.rooms.W2N5.find(FIND_MY_STRUCTURES, { 
                filter: { structureType: STRUCTURE_EXTRACTOR}}).length) {
                popTarget['miner'] = 1;
            }
        }


        // Census of actual creep population -----------------------------------
        
        // Get all creeps in this room
        var creeps = _.filter(Game.creeps, function(o) { 
            return o.room.name == room.name; 
        });
        // Get number of creeps per role
        var pop = _.countBy(creeps, 'memory.role');
        var joblistSpawn = [];

        for (role in popTarget) {

            // Fill in zero values
            if (typeof pop[role] === 'undefined') {
                pop[role] = 0;
            }

            // Compare actual to target
            if (pop[role] < popTarget[role]) {
                joblistSpawn.push(role);
            }
        }
        mem['joblistSpawn'] = joblistSpawn;


        // Restart room ========================================================
        if (room.energyCapacityAvailable <= 800) {
            if (pop['generalist'] === 0) {
                var spawns = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}});
                var spawn = _.sortByOrder(spawns, 'energy', 'desc')[0];
                spawn.spawnGeneralist(spawn.room.energyAvailable)
            }
        }
        else if (room.energyCapacityAvailable > 800) {
            if (pop['carrier'] === 0 && pop['worker'] === 0 && pop['generalist'] === 0) {
                // If storage is non-empty
                if (room.storage.store[RESOURCE_ENERGY] > 1000) {
                    var spawns = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}});
                    var spawn = _.sortByOrder(spawns, 'energy', 'desc')[0];
                    spawn.spawnCarrier(spawn.room.energyAvailable);
                }
                else {
                    var spawns = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}});
                    var spawn = _.sortByOrder(spawns, 'energy', 'desc')[0];
                    spawn.spawnGeneralist(spawn.room.energyAvailable);
                }
            }
        }
    }
};

module.exports = memoryRoomMine;
