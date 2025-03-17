import * as path from 'path';
import { disassemble } from 'es-hangul';
import sqlite3, { Database } from 'better-sqlite3';
import { app } from 'electron';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ItemDB {
  private static instance: ItemDB | null = null;
  private db: Database;

  private constructor() {
    const dbPath = app.isPackaged
      ? path.join(process.resourcesPath, 'main', 'database', 'items.db')
      : path.join(__dirname, 'items.db');

    try {
      this.db = sqlite3(dbPath);
      this.db.pragma('journal_mode = WAL');
    } catch (error) {
      console.error('데이터베이스 열기 실패:', error);
      throw error;
    }
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
