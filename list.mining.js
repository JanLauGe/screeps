var listMining = {

    run: function() {

        // Run remote mining
        for(var i in Game.flags) {
            if (i.substring(0, 6) == 'mining') {

                var operation = i.substring(8, 15)
                Game.flags[i].memory.operation = operation

                // Find closest spawn
                var distanceToSpawn = Infinity
                for(j in Game.spawns) {
                    var thisDistance = Game.map.findRoute(
                        Game.spawns[j].room.name,
                        Game.flags[i].pos.roomName).length
                    if (thisDistance < distanceToSpawn) {
                        var distanceToSpawn = thisDistance
                        var closestSpawn = Game.spawns[j]
                    }
                }
                Game.flags[i].memory.spawn = closestSpawn.id

                // Old approach using global memory
                if (typeof Game.flags[i].room !== 'undefined') {
                    Memory.global.mining.openrooms.push(Game.flags[i].pos.roomName)

                    // Get all visible sources
                    var sources = Game.flags[i].room.find(FIND_SOURCES)
                    for(i = 0; i < sources.length; i++) {
                      var source = sources[i]
                      Memory.global.mining.sources.push(source.id)
                    }

                    // Get all hostiles
                    var hostiles = Game.flags[i].room.find(FIND_HOSTILE_CREEPS)
                    for(i = 0; i < hostiles.length; i++) {
                      var hostile = hostiles[i]
                      Memory.global.mining.hostiles.push(hostile.id)
                    }
                }

                else if(typeof Game.flags[i].room === 'undefined') {
                    console.log('No creep in room ' + Game.flags[i].pos.roomName)
                    Memory.global.mining.closedrooms.push(Game.flags[i].pos.roomName)
                }
            }
        }










        // list of sources to be mined
        for(var i in Game.flags){
            if (i.substring(0, 6) == 'mining') {
                console.log('Mining in room ' + Game.flags[i].room.name)
                var hostiles = Game.flags[i].room.find(FIND_HOSTILE_CREEPS)
                console.log(hostiles)
                var sources = Game.flags[i].room.find(FIND_SOURCES)
                console.log(sources)
            }
        }



        // Currently, list of pickups is generated afresh every single tick
        Mempath.jobs.pickups = []

        // Any worker thats half full
        for(var i in Mempath.creeps.workers) {
            var worker = Game.getObjectById(Mempath.creeps.workers[i])
            if (worker.carry.energy >= worker.carryCapacity / 1.2 &&
                !contains(worker.id, Mempath.jobs.pickups)) {
                Mempath.jobs.pickups.push(worker.id)
            }
        }
        // Any dropped ressources 100+
        var droppeds = (thisroom.find(FIND_DROPPED_RESOURCES))
        if (droppeds.length) {
            for(var d = 0; d < droppeds.length; d++) {
                var dropped = droppeds[d]
                if (!contains(dropped.id, Mempath.jobs.pickups &&
                    dropped.energy >= 100)) {
                    Mempath.jobs.pickups.push(dropped.id)
                }
            }
        }
        // Any container with 500+
        var containers = thisroom.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
        if (containers.length) {
            for(var c = 0; c < containers.length; c++) {
                var cont = containers[c]
                if (!contains(cont.id, Mempath.jobs.pickups) &&
                    cont.store[RESOURCE_ENERGY] >= 500) {
                        Mempath.jobs.pickups.push(cont.id)
                }
            }
        }
        // Links if three links and link 3 full
        var links = thisroom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK)}});
        if (links.length > 2 &&
            links[2].energy > 0 &&
            links[0].energy > 0) {
            Mempath.jobs.pickups.push(links[0].id)
        }


        // *** List of upkeep jobs ***

        // Add new jobs

        // Find all ramps
        var jobRamps = thisroom.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'rampart' &&
                structure.hits < Mempath.settings.structural_lifeRamps)}});
        for(j in jobRamps){
            if (!contains(Mempath.jobs.upkeep.ramps, jobRamps[j].id)) {
                Mempath.jobs.upkeep.ramps.push(jobRamps[j].id)
            }
        }

        // Find all roads
        var jobRoads = thisroom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'road' &&
                structure.hits < Mempath.settings.structural_lifeRoads)}});
        for(j in jobRoads){
            if (!contains(Mempath.jobs.upkeep.roads, jobRoads[j].id)) {
                Mempath.jobs.upkeep.roads.push(jobRoads[j].id)
            }
        }

        // Find all containers
        var jobConts = thisroom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'container' &&
                structure.hits < Mempath.settings.structural_lifeConts)}});
        for(j in jobConts){
            if (!contains(Mempath.jobs.upkeep.conts, jobConts[j].id)) {
                Mempath.jobs.upkeep.conts.push(jobConts[j].id)
            }
        }

        // Find all walls
        var jobsWalls = thisroom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'constructedWall' &&
                structure.hits < Mempath.settings.structural_lifeWalls)}});
        for(j in jobsWalls){
            if (!contains(Mempath.jobs.upkeep.walls, jobsWalls[j].id)) {
                Mempath.jobs.upkeep.walls.push(jobsWalls[j].id)
            }
        }


        // Remove done jobs

        // Done ramps
        var joblist = Mempath.jobs.upkeep.ramps;
        var jobRamps = thisroom.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'rampart' &&
                (structure.hits > Mempath.settings.structural_lifeRamps * 2 ||
                structure.hits == structure.hitsMax))}});
        for(j in jobRamps){
            if (contains(joblist, jobRamps[j].id)) {
                joblist.splice(joblist.indexOf(jobRamps[j]),1)
            }
        }

        // Done roads
        var joblist = Mempath.jobs.upkeep.roads;
        var jobRoads = thisroom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'road' &&
                structure.hits == structure.hitsMax)}});
        for(j in jobRoads){
            if (contains(joblist, jobRoads[j].id)) {
                joblist.splice(joblist.indexOf(jobRoads[j]),1)
            }
        }

        // Done conts
        var joblist = Mempath.jobs.upkeep.conts;
        var jobConts = thisroom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'container' &&
                structure.hits == structure.hitsMax)}});
        for(j in jobConts){
            if (contains(joblist, jobConts[j].id)) {
                joblist.splice(joblist.indexOf(jobConts[j]),1)
            }
        }

        // Done walls
        var joblist = Mempath.jobs.upkeep.walls;
        var jobsWalls = thisroom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'constructedWall' &&
                structure.hits >= Mempath.settings.structural_lifeWalls)}});
        for(j in jobsWalls){
            if (contains(joblist, jobsWalls[j].id)) {
                joblist.splice(joblist.indexOf(jobsWalls[j]),1)
            }
        }
    }
};

module.exports = listMining;
