const { ethers } = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

// --- CONFIGURE THESE ---
const RPC_URL = process.env.RPC_URL; // e.g., Infura/Alchemy endpoint
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0xD7B189A02f6Bc6f041346474B981C856479bFaC0";
const ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" }
    ],
    "name": "donateToCampaign",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

// --- DATA TO SUBMIT ---
const campaignId = 0; // Change to the campaign ID you want to donate to
const donationAmount = ethers.parseEther("0.01"); // Amount in ETH (or native token)

// --- SCRIPT ---
async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  const tx = await contract.donateToCampaign(campaignId, { value: donationAmount });
  console.log("Transaction hash:", tx.hash);
  await tx.wait();
  console.log("Donation sent!");
}

main().catch(console.error); 