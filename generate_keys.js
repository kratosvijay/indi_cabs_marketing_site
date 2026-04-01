import libsodium from 'libsodium-wrappers';

async function generate() {
  await libsodium.ready;

  // 1. Generate Signing Keypair (Ed25519)
  const signingKeypair = libsodium.crypto_sign_keypair();
  const signingPublic = libsodium.to_base64(signingKeypair.publicKey);
  const signingPrivate = libsodium.to_base64(signingKeypair.privateKey);

  // 2. Generate Encryption Keypair (X25519)
  const encryptionKeypair = libsodium.crypto_box_keypair();
  const encryptionPublic = libsodium.to_base64(encryptionKeypair.publicKey);
  const encryptionPrivate = libsodium.to_base64(encryptionKeypair.privateKey);

  console.log('--- NEW ONDC KEYPAIR GENERATED ---');
  console.log('\n--- PUBLIC KEYS (For ONDC Participant Portal) ---');
  console.log('Signing Public Key:', signingPublic);
  console.log('Encryption Public Key:', encryptionPublic);

  console.log('\n--- PRIVATE KEYS (For your .env file) ---');
  console.log('ONDC_SIGNING_PRIVATE_KEY=', signingPrivate);
  console.log('ONDC_ENCRYPTION_PRIVATE_KEY=', encryptionPrivate);
}

generate().catch(console.error);
