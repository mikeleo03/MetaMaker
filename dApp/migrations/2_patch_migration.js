const PatchHistory = artifacts.require("PatchHistory");

module.exports = function(deployer) {
    deployer.deploy(PatchHistory);
};