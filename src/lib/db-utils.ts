import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'lib', 'db.json');

export function readDb() {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading DB:', error);
        return { users: [], orders: [] };
    }
}

export function writeDb(data: any) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing DB:', error);
    }
}
