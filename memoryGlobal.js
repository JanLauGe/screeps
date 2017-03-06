module.exports = {

    // On first tick
    setup: function() {

        console.log('------ Setting up memory ------');

        Memory.rooms = {};
        /*for(roomname in Game.rooms) {
            Memory.rooms[roomname] : {'roomname': roomname};
        }*/

        // Diplomacy
        Memory.global = {};
        Memory.global.diplomacy = {
            'enemies' : ['AndrolGenhald','Tardigrade','cazantyl'],
            'allies' : ['linucc'],
            'neutral' : null,
            'callToArms' : false,
        };
    },
    
    // On every tick
    run: function() {
        
        // Minerals
        Memory.global.mineralsDemand = {
            'energy' : [],
            'H' : [],
            'O' : [],
            'K' : [],
            'L' : [],
            'U' : [],
            'Z' : [],
            'X' : [],
            'G' : [],
            'OH' : [],
            'ZK' : [],
            'UL' : [],
            'UH' : [],
            'UO' : [],
            'KH' : [],
            'KO' : [],
            'LH' : [],
            'LO' : [],
            'ZH' : [],
            'ZO' : [],
            'GH' : [],
            'GO' : [],
            'UH2O' : [],
            'UHO2' : [],
            'KH2O' : [],
            'KHO2' : [],
            'LH2O' : [],
            'LHO2' : [],
            'ZH2O' : [],
            'ZHO2' : [],
            'GH2O' : [],
            'GHO2' : [],
            'XUH2O' : [],
            'XUHO2' : [],
            'XKH2O' : [],
            'XKHO2' : [],
            'XLH2O' : [],
            'XLHO2' : [],
            'XZH2O' : [],
            'XZHO2' : [],
            'XGH2O' : [],
            'XGHO2' : []
        };
        
        Memory.global.mineralsSupply = {
            'energy' : [],
            'H' : [],
            'O' : [],
            'K' : [],
            'L' : [],
            'U' : [],
            'Z' : [],
            'X' : [],
            'G' : [],
            'OH' : [],
            'ZK' : [],
            'UL' : [],
            'UH' : [],
            'UO' : [],
            'KH' : [],
            'KO' : [],
            'LH' : [],
            'LO' : [],
            'ZH' : [],
            'ZO' : [],
            'GH' : [],
            'GO' : [],
            'UH2O' : [],
            'UHO2' : [],
            'KH2O' : [],
            'KHO2' : [],
            'LH2O' : [],
            'LHO2' : [],
            'ZH2O' : [],
            'ZHO2' : [],
            'GH2O' : [],
            'GHO2' : [],
            'XUH2O' : [],
            'XUHO2' : [],
            'XKH2O' : [],
            'XKHO2' : [],
            'XLH2O' : [],
            'XLHO2' : [],
            'XZH2O' : [],
            'XZHO2' : [],
            'XGH2O' : [],
            'XGHO2' : []
        };
    }
};