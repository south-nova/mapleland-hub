import sqlite3 from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { disassemble } from 'es-hangul';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ItemDB {
  static #instance;
  #db;

  constructor() {
    this.#db = sqlite3(path.join(__dirname, '../database/items.db'));
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
