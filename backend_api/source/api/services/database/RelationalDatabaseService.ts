interface RelationalDatabaseService {
    all(query: string): Promise<any>;
    get(query: string): Promise<any>;
}

export default RelationalDatabaseService;