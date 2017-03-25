var memoryRoomAny = {

    setup: function(room) {

        // Memory objects
        var mem = Memory.rooms[room.name];

        // Static room properties ==============================================

        // If memory object does not exist yet
        if (typeof mem === 'undefined') {

            // Create object slot
            Memory.rooms[room.name] = {};
            var mem = Memory.rooms[room.name];

            // Create room object ----------------------------------------------
            // Get room type
            if (typeof room.controller === 'undefined') {
                if (sources !== undefined &&
                    sources.length) {
                    // Must be central room
                    var roomType = 'central';
                }
                else {
                    // Must be marginal room
                    var roomType = 'marginal';
                }
            }
            else {
                // Must be normal room
                var roomType = 'normal';
            }

            mem['roomType'] = roomType;
            mem['roomName'] = room.name;
            mem['sources'] = [];

            var sources = room.find(FIND_SOURCES);

            // Get info on sources in the room
            for (i in sources) {
                var source = sources[i];
                // Check area around sources
                var terrain = room.lookForAtArea('terrain',
                    source.pos.y - 1, source.pos.x - 1,
                    source.pos.y + 1, source.pos.x + 1, {asArray: true});
                // Count open fields around sources
                var plain = _.countBy(terrain, 'terrain').plain + _.countBy(terrain, 'terrain').swamp;
                var thisSource = {
                    id: source.id,
                    plain: plain
                }
                // Add this source to static index
                mem.sources[i] = thisSource;
            }
        }
    }
};

module.exports = memoryRoomAny;
