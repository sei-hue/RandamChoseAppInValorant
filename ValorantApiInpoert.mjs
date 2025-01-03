import axios from 'axios';
import fs from 'fs'; // ファイル操作用モジュール

const APIKEY = 'RGAPI-161e54e0-4798-4704-ae9a-db4c42d53546';
const url = 'https://ap.api.riotgames.com/val/content/v1/contents';
const OutputFile = 'ValorantContentGlobal.json';

const options = {
  headers: {
    'X-Riot-Token': APIKEY, // 必須：認証用ヘッダー
  },
};

async function fetchValorantContent(outputFile) {
  try {
    const response = await axios.get(url, options);
    const data = response.data; // APIからのデータを取得
    console.log('Response Data:', data); // 結果をコンソールに出力

    // JSONデータをファイルに保存
    fs.writeFile(outputFile, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error Writing File:', err);
      } else {
        console.log(`データが ${outputFile} に保存されました。`);
      }
    });
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else if (error.request) {
      console.error('No Response Received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// 関数を実行
fetchValorantContent(OutputFile);