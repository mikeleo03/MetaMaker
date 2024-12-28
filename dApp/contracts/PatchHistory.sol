// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

import "./Patch.sol";

contract PatchHistory {
    Patch[] public allPatches;
    uint256 public currPatch;
    address private creator;

    constructor() {
        creator = msg.sender;
    }

    function createNewPatch(uint256 currTime) public {
        require(msg.sender == creator, "Unauthorized entity trying to create a patch");
        require(allPatches.length == 0 || currTime > allPatches[currPatch].endPatchTime(), "Current patch has not ended");
        currPatch = allPatches.length;
        Patch newPatch = new Patch(currPatch);
        allPatches.push(newPatch);
    }

    function getAllPatches() public view returns (Patch[] memory) {
        return allPatches;
    }
}