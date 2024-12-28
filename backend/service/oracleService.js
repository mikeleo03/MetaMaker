require("dotenv").config();
const { Web3 } = require("web3");
const web3 = new Web3(process.env.NETWORK_URL);
const path = require("path");

const patchHistoryPath = path.join(__dirname, "../../dApp/build/contracts/PatchHistory.json");
const patchPath = path.join(__dirname, "../../dApp/build/contracts/Patch.json");
const patchHistory = require(patchHistoryPath);
const patch = require(patchPath);
const patchHistoryABI = patchHistory.abi;
const patchABI = patch.abi;

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(patchHistoryABI, contractAddress);

const privateKey = process.env.PRIVATE_KEY;

async function oracleCreateNewPatch() {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
    web3.eth.accounts.wallet.add(account);

    const creator = web3.eth.accounts.privateKeyToAccount(`0x${process.env.CREATOR_KEY}`);
    const balance = await web3.eth.getBalance(creator.address);
    if (balance <= 0) {
      throw new Error("Insufficient balance to perform transaction");
    }
    const currentTimeSecs = Math.floor(Date.now() / 1000);

    const patches = await contract.methods.getAllPatches().call();
    const gasEstimate = await contract.methods.createNewPatch(currentTimeSecs).estimateGas({ from: creator.address });

    const tx = {
      from: creator.address,
      to: contractAddress,
      data: contract.methods.createNewPatch().encodeABI(),
      gas: gasEstimate,
    };

    const receipt = await web3.eth.sendTransaction(tx);
    const parsedReceipt = {
      transactionHash: receipt.transactionHash,
      gasUsed: receipt.gasUsed.toString(),
      status: receipt.status,
    };

    return {
      success: true,
      message: "New patch created successfully",
      transactionHash: parsedReceipt.transactionHash,
      gasUsed: parsedReceipt.gasUsed,
      patchesCount: patches.length + 1, 
    };
  } catch (error) {
    console.error("Error creating new patch:", error.message);
    return {
      success: false,
      message: "Failed to create new patch",
      error: error.message,
    };
  }
}


async function oracleUploadAsset(imageLink, assetName, address, description) {
  try {
    // const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
    // web3.eth.accounts.wallet.add(account);

    const patches = await contract.methods.getAllPatches().call();
    if (patches.length == 0) {
      // Create a new patch
      const res = await oracleCreateNewPatch();
    }
    
    const currPatchIndex = await contract.methods.currPatch().call();
    const currentPatchAddress = await contract.methods.getAllPatches().call(currPatchIndex);
    const currentPatchContract = new web3.eth.Contract(patchABI, currentPatchAddress[0]);
    
    const currentTime = Math.floor(Date.now() / 1000);
    const assetNameHex = web3.utils.leftPad(web3.utils.asciiToHex(assetName), 64);

    const uploadAssetTx = await currentPatchContract.methods.uploadAsset(address, assetNameHex, imageLink, description, currentTime);
    const gasEstimate = await uploadAssetTx.estimateGas({ from: address });
    const nonce = await web3.eth.getTransactionCount(address);
    const tx = {
      from: address,
      to: currentPatchAddress[0],
      gas: gasEstimate,
      nonce: nonce,
      maxPriorityFeePerGas: web3.utils.toWei('2', 'gwei'), 
      maxFeePerGas: web3.utils.toWei('100', 'gwei'),
      data: uploadAssetTx.encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, `0x${privateKey}`);
    console.log(signedTx)
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log("Transaction successful:", receipt);
    return receipt.transactionHash;
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw new Error("Failed to upload asset to Smart Contract.");
  }
}

async function oracleGetAllAssets() {
  try {
    const currPatchIndex = await contract.methods.currPatch().call();
    const currentPatchAddress = await contract.methods.getAllPatches().call(currPatchIndex);
    const currentPatchContract = new web3.eth.Contract(patchABI, currentPatchAddress[0]);

    const getAllAssetsTx = await currentPatchContract.methods.getAllAssets().call();
    return getAllAssetsTx;
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw new Error("Failed to get all assets to Smart Contract.");
  }
}

async function oracleVote(address, assetIdx) {
  try {
    const currPatchIndex = await contract.methods.currPatch().call();
    const currentPatchAddress = await contract.methods.getAllPatches().call(currPatchIndex);
    const currentPatchContract = new web3.eth.Contract(patchABI, currentPatchAddress[0]);
    const currentTimeSecs = Math.floor(Date.now() / 1000);

    const voteTx = await currentPatchContract.methods.vote(address, assetIdx, currentTimeSecs).call();
    return voteTx;
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw new Error("Failed to vote.");
  }
}


async function oracleDeclareWinner() {
  try {
    const currPatchIndex = await contract.methods.currPatch().call();
    const currentPatchAddress = await contract.methods.getAllPatches().call(currPatchIndex);
    const currentPatchContract = new web3.eth.Contract(patchABI, currentPatchAddress[0]);
    const currentTimeSecs = Math.floor(Date.now() / 1000);

    const declareWinnerTx = await currentPatchContract.methods.declareWinner(currentTimeSecs).call();
    return declareWinnerTx;
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw new Error("Failed to declare winner to Smart Contract.");
  }
}

module.exports = { oracleCreateNewPatch, oracleUploadAsset, oracleGetAllAssets, oracleDeclareWinner, oracleVote }