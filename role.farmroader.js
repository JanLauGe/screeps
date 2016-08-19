var roleFarmroader = {

    run: function(creep) {

        function isOdd(num) { return num % 2;}
        var serial = creep.memory.serial;
        if (typeof Game.flags['farm' + serial] !== 'undefined') {
            var zone = Game.flags['farm' + serial]
        }

        if (typeof zone !== 'undefined') {
            // If in different room: move
            if (zone.pos.roomName !== creep.room.name) {
                creep.moveTo(zone)
            }
            // Else if in this room
            else if(zone.pos.roomName === creep.room.name) {

            // *** MODE DEFINITION ***
            // If empty, load, if full, build

                if (creep.carry.energy == 0) {
                    creep.memory.mode = 'loading'
                    creep.say(creep.memory.mode)
                }
                else if(creep.carry.energy == creep.carryCapacity) {
                    creep.memory.mode = 'building'
                    creep.say(creep.memory.mode)
                }

                // *** MODE EXECUTION ***
                // If loading, get sources
                if (creep.memory.mode == 'loading') {
                    var dropped = (creep.room.find(FIND_DROPPED_RESOURCES))
                    var thisdrop = creep.pos.findClosestByRange(dropped)
                    var sources = creep.room.find(FIND_SOURCES)
                    if (thisdrop) {
                        if (creep.pickup(thisdrop) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(thisdrop)
                        }
                    }
                    else if (sources.length == 1) {
                        // Harvest from only source
                        var source = sources[0];
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source);
                            creep.harvest(source);
                        }
                    }
                    else if (sources.length >= 0) {
                        // Harvest from only source
                        var source = creep.pos.findClosestByPath(sources);
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source);
                            creep.harvest(source);
                        }
                    }
                }
                // If building, get tasks
                else if(creep.memory.mode == 'building') {

                    var buildingSites = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (buildingSites.length > 0) {
                        creep.say('building')
                        if(creep.build(buildingSites[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(buildingSites[0])
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleFarmroader;
