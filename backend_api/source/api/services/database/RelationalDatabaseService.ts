interface RelationalDatabaseService {
    all(query: string, placeholders?: any): Promise<any>;
    get(query: string, placeholders?: any): Promise<any>;
}

export default RelationalDatabaseService;