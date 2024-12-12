// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract Patch {
    uint256 public patchId;
    uint256 public startPatchTime;
    uint256 public startVoteTime;
    uint256 public endPatchTime;
    uint256 public constant UPLOAD_PERIOD = 1036800;
    uint256 public constant VOTING_PERIOD = 172800;

    struct Asset {
        address creator;
        uint256 patchId;
        bytes32 name;
        string link;
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

    modifier isUploadTime {
        require(block.timestamp >= startPatchTime && block.timestamp < startVoteTime, "Not in upload period");
        _;
    }

    modifier isVotingTime {
        require(block.timestamp >= startVoteTime && block.timestamp < endPatchTime, "Not in voting period");
        _;
    }

    function uploadAsset(address _uploader, bytes32 _assetName, string memory _assetLink) public isUploadTime {
        require(!participants[_uploader].hasUploaded, "Uploader has uploaded an asset this patch");
        Asset memory newAsset = Asset(_uploader, patchId, _assetName, _assetLink, 0);
        participants[_uploader].hasUploaded = true;
        allAssets.push(newAsset);
        emit Uploaded(_uploader, newAsset);
    }

    function getAllAssets() public view returns (Asset[] memory) {
        return allAssets;
    }

    function vote(address _voter, uint _assetIdx) public isVotingTime {
        require(!participants[_voter].hasVoted, "Uploader has voted for an asset this patch");
        require(_assetIdx >= 0 && _assetIdx < allAssets.length, "Index invalid");
        participants[_voter].hasVoted = true;
        allAssets[_assetIdx].voteCount += 1;
        emit Voted(_voter, _assetIdx);
    }

    function declareWinner() public view returns (Asset memory) {
        require(block.timestamp > endPatchTime, "Patch has not ended");
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