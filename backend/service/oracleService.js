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

async function oracleUploadAsset(imageLink, assetName) {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
    web3.eth.accounts.wallet.add(account);

    const patches = await contract.methods.getAllPatches().call();
    if (patches.length == 0) {
      // Create a new patch
      const creator = web3.eth.accounts.privateKeyToAccount(`0x${process.env.CREATOR_KEY}`).address
      await contract.methods.createNewPatch().send({ from: creator });
    }
    
    const currPatchIndex = await contract.methods.currPatch().call();
    const currentPatchAddress = await contract.methods.getAllPatches().call(currPatchIndex);
    const currentPatchContract = new web3.eth.Contract(patchABI, currentPatchAddress[0]);
    
    const currentTime = Math.floor(Date.now() / 1000);
    const assetNameHex = web3.utils.leftPad(web3.utils.asciiToHex(assetName), 64);

    const uploadAssetTx = await currentPatchContract.methods.uploadAsset(account.address, assetNameHex, imageLink, currentTime);
    const gasEstimate = await uploadAssetTx.estimateGas({ from: account.address });
    const nonce = await web3.eth.getTransactionCount(account.address);
    const tx = {
      from: account.address,
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
    const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
    web3.eth.accounts.wallet.add(account);

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

async function oracleDeclareWinner() {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
    web3.eth.accounts.wallet.add(account);

    const currPatchIndex = await contract.methods.currPatch().call();
    const currentPatchAddress = await contract.methods.getAllPatches().call(currPatchIndex);
    const currentPatchContract = new web3.eth.Contract(patchABI, currentPatchAddress[0]);

    const declareWinnerTx = await currentPatchContract.methods.declareWinner().call();
    return declareWinnerTx;
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw new Error("Failed to declare winner to Smart Contract.");
  }
}

module.exports = { oracleUploadAsset, oracleGetAllAssets, oracleDeclareWinner }