import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Web3 Crowdfunding Platform',
  projectId: 'YOUR_PROJECT_ID', // Replace with your actual WalletConnect Project ID
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});