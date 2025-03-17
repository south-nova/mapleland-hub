import sqlite3, { Database } from 'better-sqlite3';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { disassemble } from 'es-hangul';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ItemDB {
  private static instance: ItemDB | null = null;
  private db: Database;

  private constructor() {
    const dbPath: string = path.join(__dirname, 'items.db');

    this.db = sqlite3(dbPath);
    this.db.pragma('journal_mode = WAL');
  }

  public static getInstance(): ItemDB {
    if (!this.instance) {
      this.instance = new ItemDB();
    }
    return this.instance;
  }

  public searchByName(query: string): Array<{ code: string; name: string; description: string }> {
    if (!query?.trim()) return [];

    const disassembleQuery: string = disassemble(query.trim());

    return this.db
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

  public getItemByCode(
    code: string,
  ): { code: string; name: string; description: string } | undefined {
    return this.db.prepare('SELECT * FROM items WHERE code = ?').get(code);
  }

  public close(): void {
    this.db.close();
  }
}

export const db = ItemDB.getInstance();
