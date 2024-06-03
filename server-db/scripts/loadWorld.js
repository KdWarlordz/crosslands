/* 
  World Loader helper 
*/

import axios from 'axios';
import fs from 'fs';
import path from 'path';


if (process.argv.length < 3) {
  console.error('Please provide the filename as an argument.');
  process.exit(1);
}

const filename = process.argv[2];
const apiUrl = 'http://localhost:8888/api/addworld';
const jsonFilePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'data', 'worlds', filename);


async function postJsonData() {
  try {
    console.log('Starting the process...');
    console.log('---------------------------------');
    console.log('filename:', filename);
    console.log('---------------------------------');
    console.log(`Reading data from the file: ${jsonFilePath} ...`);
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    const data = JSON.parse(jsonData);
    console.log('Data read successfully');
    console.log('id: ', data.id);
    console.log('chain: ', data.chain);
    console.log('planet: ', data.planet);
    console.log('---------------------------------');
    console.log(`Posting data to the API endpoint: ${apiUrl} ...`);
    const response = await axios.post(apiUrl, data);
    console.log('---------------------------------');
    console.log('Data posted successfully:', response.data);
  } catch (error) {
    console.log('--------------ERROR--------------');
    console.error('Error posting data:', error.message);
  }
}

// Execute the function
postJsonData();
