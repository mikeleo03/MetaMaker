// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract AssetVote {
    struct Patch {
        uint32 patchId;
        uint startUploadTime;
        uint endUploadTime;
        uint startVoteTime;
        uint endVoteTime;
    }

    struct Asset {
        address creator;
        uint32 patchId;
        string name;
        string link;
    }

    // List of all assets
    Asset[] public patchAssets;
    // Current patch
    Patch public currPatch;
}