import { injectable } from "inversify";
import sqlite3 from "sqlite3";
import RelationalDatabaseService from "./RelationalDatabaseService";
import * as fs from 'fs';

const DEFAULT_DATABASE_NAME: string = "database.sqlite3";

@injectable()
class SQLiteDatabaseService implements RelationalDatabaseService {
    constructor(databaseName: string = DEFAULT_DATABASE_NAME) {
        this._database = new sqlite3.Database(databaseName);
    }

    runScript(scriptPath: string): void {
        const script: string = fs.readFileSync(scriptPath).toString();
        const statements: Array<string> = script.split(';').filter(statement => statement !== '');
        
        for(const statement of statements) {
            this._database.run(statement);
        }
    }
    
    all(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._database.all(query, (error, rows) => {
                if(error) reject(error);
                else resolve(rows);
            });
        });
    }

    get(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._database.get(query, (error, row) => {
                if(error) reject(error);
                else resolve(row);
            });
        });
    }

    private _database: sqlite3.Database;
}

export default SQLiteDatabaseService;