// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract Patch {
    uint256 public patchId;
    uint256 public startPatchTime;
    uint256 public startVoteTime;
    uint256 public endPatchTime;
    uint256 constant UPLOAD_PERIOD = 300;
    uint256 constant VOTING_PERIOD = 120;

    struct Asset {
        address creator;
        uint256 patchId;
        bytes32 name;
        string link;
        string desc;
        uint256 voteCount;
    }

    struct Participant {
        bool hasUploaded;
        bool hasVoted;
    }

    // List of all assets
    Asset[] public allAssets;
    // Track upload and vote status of all participants
    mapping(address => Participant) public participants;
    // Important patch events
    event Voted(address _voter, uint _assetIdx);
    event Uploaded(address _uploader, Asset _asset);

    constructor(uint256 _patchId) {
        patchId = _patchId;
        startPatchTime = block.timestamp;
        startVoteTime = startPatchTime + UPLOAD_PERIOD;
        endPatchTime = startVoteTime + VOTING_PERIOD;
    }

    function uploadAsset(address _uploader, bytes32 _assetName, string memory _assetLink, string memory _desc, uint256 _currTimeSecs) public {
        require(_currTimeSecs >= startPatchTime && _currTimeSecs < startVoteTime, "Not in upload period");
        require(!participants[_uploader].hasUploaded, "Uploader has uploaded an asset this patch");
        require(_uploader == msg.sender, "uploader and message sender not the same");
        Asset memory newAsset = Asset(_uploader, patchId, _assetName, _assetLink, _desc, 0);
        participants[_uploader].hasUploaded = true;
        allAssets.push(newAsset);
        emit Uploaded(_uploader, newAsset);
    }

    function getAllAssets() public view returns (Asset[] memory) {
        return allAssets;
    }

    function vote(address _voter, uint _assetIdx, uint256 _currTimeSecs) public {
        require(_currTimeSecs >= startVoteTime && _currTimeSecs < endPatchTime, "Not in voting period");
        require(!participants[_voter].hasVoted, "Uploader has voted for an asset this patch");
        require(!(allAssets[_assetIdx].creator == _voter), "Voter can't vote for their own asset");
        require(_assetIdx >= 0 && _assetIdx < allAssets.length, "Index invalid");
        require(_voter == msg.sender, "voter and message sender not the same");
        participants[_voter].hasVoted = true;
        allAssets[_assetIdx].voteCount += 1;
        emit Voted(_voter, _assetIdx);
    }

    function declareWinner(uint256 currTime) public view returns (Asset memory) {
        require(currTime >= endPatchTime, "Patch has not ended");
        require(allAssets.length > 0, "No assets were uploaded this patch");

        Asset memory winner = allAssets[0];
        for (uint256 i = 1; i < allAssets.length; i++) {
            if (allAssets[i].voteCount > winner.voteCount) {
                winner = allAssets[i];
            }
        }

        return winner;
    }
}