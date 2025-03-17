import * as path from 'path';
import * as fs from 'fs';
import { disassemble } from 'es-hangul';
import sqlite3, { Database } from 'better-sqlite3';
import { app } from 'electron';
import { fileURLToPath } from 'url';

class ItemDB {
  private static instance: ItemDB | null = null;
  private db: Database;

  private constructor() {
    // 개발 환경과 프로덕션 환경에서 다른 경로 사용
    let dbPath: string;

    if (app.isPackaged) {
      // 프로덕션 환경: userData 폴더에 DB 저장
      const userDataPath = app.getPath('userData');
      const dbDir = path.join(userDataPath, 'database');

      // 디렉토리가 없으면 생성
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      dbPath = path.join(dbDir, 'items.db');

      // 앱 리소스에서 DB 파일 복사 (최초 실행 시)
      if (!fs.existsSync(dbPath)) {
        const sourceDbPath = path.join(process.resourcesPath, 'items.db');
        if (fs.existsSync(sourceDbPath)) {
          fs.copyFileSync(sourceDbPath, dbPath);
        }
      }
    } else {
      // 개발 환경: 현재 디렉토리에 DB 저장
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      dbPath = path.join(__dirname, 'items.db');
    }

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
