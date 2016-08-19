var roleTower = {

    run: function(tower) {

        Tower.prototype.findBestTowerTarget = function () {
            var attackCenter;
            if (this.memory.towerCenter) {
                // this could be the position of your flag
                attackCenter = new RoomPosition(this.memory.towerCenter.x, this.memory.towerCenter.y, this.memory.towerCenter.roomName);
            }
            else {
                // if variable not set, defaults to using the spawner position
                attackCenter = new RoomPosition(this.spawner.pos.x, this.spawner.pos.y, this.spawner.pos.roomName);
            }
            var hostiles = this.flag.room.find(FIND_HOSTILE_CREEPS);
            var target = attackCenter.findClosestByRange(hostiles);
            if (target) {
                // I attack invaders wherever they are in the room, the cutoff range will only be used for other players
                var isInvader = target.owner.username === "Invader";
                var range = attackCenter.getRangeTo(target);
                var cutoff = 20;
                if (this.memory.towerCutoff) {
                    cutoff = this.memory.towerCutoff;
                }
                // only attack players within a certain range
                if (isInvader || range < cutoff) {
                    return target;
                }
            }
        }
	}
};

module.exports = roleTower;
