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
      { "internalType": "address", "name": "_campaignOwner", "type": "address" },
      { "internalType": "string", "name": "_title", "type": "string" },
      { "internalType": "string", "name": "_description", "type": "string" },
      { "internalType": "uint8", "name": "_category", "type": "uint8" },
      { "internalType": "string", "name": "_projectDescription", "type": "string" },
      { "internalType": "uint256", "name": "_goalAmount", "type": "uint256" },
      { "internalType": "string", "name": "_image", "type": "string" },
      { "components": [
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "role", "type": "string" },
          { "internalType": "string", "name": "bio", "type": "string" }
        ],
        "internalType": "struct CrowdFunding.TeamMember[]",
        "name": "_teamMembers",
        "type": "tuple[]"
      },
      { "components": [
          { "internalType": "string", "name": "tierTitle", "type": "string" },
          { "internalType": "uint256", "name": "minimumAmount", "type": "uint256" },
          { "internalType": "string", "name": "description", "type": "string" }
        ],
        "internalType": "struct CrowdFunding.InvestmentTier[]",
        "name": "_investmentTiers",
        "type": "tuple[]"
      }
    ],
    "name": "createCampaign",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// --- DATA TO SUBMIT ---
const campaignOwner = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
const title = "Access to Quality Education";
const description = "Empowering futures through accessible education";
const category = 0; // Education
const projectDescription = "Providing educational resources and infrastructure to underserved communities globally. Our mission is to create sustainable solutions that address critical humanitarian needs while empowering local communities.";
// Set goalAmount in USDC (6 decimals)
const goalAmount = 1000000000000; // 1 000 000 USDC 
const image = "https://your-image-url.com/image.png";
const teamMembers = [
  { name: "Alice", role: "Lead", bio: "Expert in education" }
];
const investmentTiers = [
  { tierTitle: "Bronze", minimumAmount: 1000000, description: "Thank you email" },
  { tierTitle: "Silver", minimumAmount: 5000000, description: "Special mention" }
];

// --- SCRIPT ---
async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  const normalizedOwner = ethers.getAddress(campaignOwner);
  const tx = await contract.createCampaign(
    normalizedOwner,
    title,
    description,
    category,
    projectDescription,
    goalAmount,
    image,
    teamMembers,
    investmentTiers
  );
  console.log("Transaction hash:", tx.hash);
  await tx.wait();
  console.log("Campaign created!");
}

main().catch(console.error); 