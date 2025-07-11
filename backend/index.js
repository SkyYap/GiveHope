import express from 'express';
import fetch from 'node-fetch';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import 'dotenv/config';

const app = express();
const PORT = 3000;
app.use(express.json());

const IN_PRODUCTION = process.env.IN_PRODUCTION === 'TRUE';
const MASCHAIN_API_URL = IN_PRODUCTION
  ? 'https://service.maschain.com'
  : 'https://service-testnet.maschain.com';

// MasVerse API credentials switcher
const MASCHAIN_CLIENT_ID = IN_PRODUCTION
  ? process.env.MASCHAIN_CLIENT_KEY
  : process.env.MASCHAIN_TESTNET_CLIENT_KEY;
const MASCHAIN_CLIENT_SECRET = IN_PRODUCTION
  ? process.env.MASCHAIN_CLIENT_SECRET
  : process.env.MASCHAIN_TESTNET_CLIENT_SECRET;

// Open DB connection
async function getDb() {
  return open({
    filename: './data/mydatabase.db',
    driver: sqlite3.Database,
  });
}

// 1. Create NGO Wallet
app.post('/api/wallet/create', async (req, res) => {
  const { ngoName, adminEmail, adminIc } = req.body;
  if (!ngoName || !adminEmail || !adminIc) {
    return res.status(400).json({ error: 'ngoName, adminEmail, and adminIc are required' });
  }
  try {
    // Call MasChain Wallet Management API
    const response = await fetch(`${MASCHAIN_API_URL}/api/wallet/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'client_id': MASCHAIN_CLIENT_ID,
        'client_secret': MASCHAIN_CLIENT_SECRET,
      },
      body: JSON.stringify({
        name: ngoName,
        email: adminEmail,
        ic: adminIc,
      }),
    });
    const data = await response.json();
    if (!response.ok || !data.result.wallet.wallet_address) {
      return res.status(500).json({ error: 'Failed to create wallet', details: data });
    }
    // Store wallet info in DB
    const db = await getDb();
    await db.run(
      'INSERT INTO NGO_SESSIONS (name, email, ic, masverseWalletAddress) VALUES (?, ?, ?, ?)',
      [ngoName, adminEmail, adminIc, data.result.wallet.wallet_address]
    );
    await db.close();
    res.json({ walletAddress: data.result.wallet.wallet_address });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// 2. Start e-KYC
app.post('/api/kyc/start', async (req, res) => {
  const { walletAddress } = req.body;
  if (!walletAddress) {
    return res.status(400).json({ error: 'walletAddress is required' });
  }
  try {
    // Call MasVerse API (use correct base URL and credentials)
    const masverseRes = await fetch(`${MASCHAIN_API_URL}/api/ekyc/verifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'client_id': MASCHAIN_CLIENT_ID,
        'client_secret': MASCHAIN_CLIENT_SECRET,
      },
      body: JSON.stringify({
        type: '00',
        id_country: 'MYS',
        id_type: 'ID_CARD',
        redirect_url: 'https://localhost:5173/kyc/callback',
      }),
    });
    const masverseData = await masverseRes.json();
    if (masverseData.status !== 200 || !masverseData.result?.url || !masverseData.result?.token ) {
      return res.status(500).json({ error: 'Failed to start eKYC with MasVerse', details: masverseData });
    }
    const { token: verificationToken, url: verificationUrl } = masverseData.result;
    // Store mapping in kycSessions
    const db = await getDb();
    await db.run(
      'INSERT OR REPLACE INTO kycSessions (verificationToken, walletAddress) VALUES (?, ?)',
      [verificationToken, walletAddress]
    );
    await db.close();
    // Return to client
    res.json({ verificationUrl });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// 3. Poll KYC Status
app.get('/api/kyc/status/:walletAddress', async (req, res) => {
  const { walletAddress } = req.params;
  if (!walletAddress) {
    return res.status(400).json({ error: 'walletAddress is required' });
  }
  try {
    const db = await getDb();
    // Find verificationToken for walletAddress
    const session = await db.get('SELECT verificationToken FROM kycSessions WHERE walletAddress = ?', [walletAddress]);
    if (!session) {
      await db.close();
      return res.json({ isKycVerified: false });
    }
    const { verificationToken } = session;
    // Call MasVerse API for status (use correct base URL and credentials)
    const masverseRes = await fetch(`${MASCHAIN_API_URL}/api/ekyc/verifications/${verificationToken}`, {
      headers: {
        'client_id': MASCHAIN_CLIENT_ID,
        'client_secret': MASCHAIN_CLIENT_SECRET,
      }
    });
    const masverseData = await masverseRes.json();
    let isKycVerified = false;
    if (masverseData.result?.is_success === 1) {
      isKycVerified = true;
      // Update content table
      await db.run('UPDATE content SET isKycVerified = TRUE WHERE walletAddress = ?', [walletAddress]);
    }
    await db.close();
    res.json({ isKycVerified });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

app.get('/api/test/maschain-url', (req, res) => {
  res.json({ maschainApiUrl: MASCHAIN_API_URL });
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 