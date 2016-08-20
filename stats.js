var stats = {

    // suggestion: if half empty but no dropoffs, switch mode and start loading already

    run: function(room) {

        Memory.stats["room." + room.name + ".energyAvailable"] = room.energyAvailable;
        Memory.stats["room." + room.name + ".energyCapacityAvailable"] = room.energyCapacityAvailable;
        Memory.stats["room." + room.name + ".controllerProgress"] = room.controller.progress;
    }
};
