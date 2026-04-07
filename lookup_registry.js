import axios from 'axios';
import 'dotenv/config';

async function lookupRegistry() {
  const REGISTRY_URL = 'https://preprod.registry.ondc.org/ondc/lookup';
  
  const payload = {
    subscriber_id: 'api.indicabs.net',
    domain: 'ONDC:TRV11',
    type: 'BAP'
  };

  console.log('🔍 Looking up api.indicabs.net in ONDC Registry...');
  
  try {
    const response = await axios.post(REGISTRY_URL, payload);
    console.log('\n--- Registry Entries ---');
    console.log(JSON.stringify(response.data, null, 2));
    
    if (response.data.length === 0) {
      console.log('⚠️ No entries found. Are you sure the subscriber_id is whitelisted?');
    }
  } catch (error) {
    console.error('❌ Registry Lookup Failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
  }
}

lookupRegistry();
