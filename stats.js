var stats = {

    // suggestion: if half empty but no dropoffs, switch mode and start loading already

    run: function(thisroom) {
        Memory.stats["room." + thisroom.name] = {}

        Memory.stats["room." + thisroom.name + ".energyAvailable"] = thisroom.energyAvailable;
        Memory.stats["room." + thisroom.name + ".energyCapacityAvailable"] = thisroom.energyCapacityAvailable;
        Memory.stats["room." + thisroom.name + ".controllerProgress"] = thisroom.controller.progress;
    }
};

module.exports = stats;
