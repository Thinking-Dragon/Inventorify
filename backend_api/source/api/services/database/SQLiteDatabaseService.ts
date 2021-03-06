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

    runScript(scriptPath: string): Promise<void[]> {
        const script: string = fs.readFileSync(scriptPath).toString();
        const statements: Array<string> = script.split(';').filter(statement => statement !== '');
         
        const tasks = [];

        for(const statement of statements) {
            tasks.push(this.run(statement));
        }

        return Promise.all(tasks);
    }
    
    all(query: string, placeholders: any = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            const statement = this._database.prepare(query, placeholders, error => {
                if(error) reject(error);
                else {
                    statement.all((error, rows) => {
                        if(error) reject(error);
                        else resolve(rows);
                    });
                }
            });
        });
    }

    get(query: string, placeholders: any = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            const statement = this._database.prepare(query, placeholders, error => {
                if(error) reject(error);
                else {
                    statement.get((error, row) => {
                        if(error) reject(error);
                        else resolve(row);
                    });
                }
            });
        });
    }

    run(query: string, placeholders: any = {}): Promise<void> {
        return new Promise((resolve, reject) => {
            const statement = this._database.prepare(query, placeholders, error => {
                if(error) reject(error);
                else {
                    statement.run(error => {
                        if(error) reject(error);
                        else resolve();
                    });
                }
            });
        });
    }

    private _database: sqlite3.Database;
}

export default SQLiteDatabaseService;