import axios from 'axios';
import fs from 'fs';
import path from 'path';

if (process.argv.length < 3) {
  console.error('Please provide the filename as an argument.');
  process.exit(1);
}

const filename = process.argv[2];
const apiUrl = 'http://localhost:8888/api/config';
const jsonFilePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'data', 'config', filename);

async function updateConfig() {
  try {
    console.log('Starting the process...');
    console.log('---------------------------------');
    console.log('filename:', filename);
    console.log('---------------------------------');
    console.log(`Reading data from the file: ${jsonFilePath} ...`);
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    const data = JSON.parse(jsonData);
    console.log('Data read successfully');
    console.log('version: ', data.version);
    console.log('activeChain: ', data.activeChain);
    console.log('---------------------------------');
    console.log(`Posting data to the API endpoint: ${apiUrl} ...`);
    const response = await axios.post(apiUrl, data);
    console.log('---------------------------------');
    console.log('Config updated successfully:', response.data);
  } catch (error) {
    console.log('--------------ERROR--------------');
    console.error('Error updating config:', error.message);
  }
}

// Execute the function
updateConfig();
