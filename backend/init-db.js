import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function initializeDatabase() {
  const db = await open({
    filename: './data/mydatabase.db',
    driver: sqlite3.Database,   // You MUST pass this explicitly
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS NGO_SESSIONS (
      name TEXT PRIMARY KEY,
      email TEXT,
      ic TEXT,
      masverseWalletAddress TEXT,
      web3WalletAddress TEXT,
      verificationToken TEXT UNIQUE,
      isKycVerified BOOLEAN DEFAULT FALSE
    );
  `);

  await db.run(`
    INSERT INTO NGO_SESSIONS (name, masverseWalletAddress, web3WalletAddress, verificationToken, isKycVerified)
    VALUES ('Alice', '0x1234567890abcdef', '0x1234567890abcdef', '441DSII3VF94', FALSE);
  `);

  console.log('✅ Database initialized and seeded.');
  await db.close();
}

initializeDatabase();
