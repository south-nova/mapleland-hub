import sqlite3 from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { disassemble } from 'es-hangul';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production' || app.isPackaged;

class ItemDB {
  static #instance;
  #db;

  constructor() {
    let dbPath;

    if (isProd) {
      dbPath = path.join(process.resourcesPath, 'items.db');

      if (!fs.existsSync(dbPath)) {
        console.error('DB 파일을 찾을 수 없습니다:', dbPath);
        throw new Error('DB 파일을 찾을 수 없습니다');
      }
    } else dbPath = path.join(__dirname, 'items.db');

    this.#db = sqlite3(dbPath);
    this.#db.pragma('journal_mode = WAL');
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new ItemDB();
    }
    return this.#instance;
  }

  searchByName(query) {
    if (!query?.trim()) return [];

    const disassembleQuery = disassemble(query.trim());

    return this.#db
      .prepare(
        `
          SELECT code, name, description 
          FROM items 
          WHERE name LIKE ? OR disassemble LIKE ?
          ORDER BY name ASC
          LIMIT 100
        `,
      )
      .all(`%${query}%`, `%${disassembleQuery}%`);
  }

  getItemByCode(code) {
    return this.#db.prepare('SELECT * FROM items WHERE code = ?').get(code);
  }

  close() {
    this.#db.close();
  }
}

export { ItemDB };
