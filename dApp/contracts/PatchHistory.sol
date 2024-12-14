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

    function createNewPatch() public {
        require(msg.sender == creator, "Unauthorized entity trying to create a patch");
        currPatch = allPatches.length;
        Patch newPatch = new Patch(currPatch);
        allPatches.push(newPatch);
    }

    function getAllPatches() public view returns (Patch[] memory) {
        return allPatches;
    }
}