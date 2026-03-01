import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function handler(req, res) {
  try {
    const filePath = path.resolve(__dirname, '..', 'src', 'data', 'fileStructure.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: 'Failed to load file structure' });
  }
}
