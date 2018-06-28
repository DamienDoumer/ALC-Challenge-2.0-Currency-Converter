
export const databaseName = 'currency-converter-007damiendoumer-1';

export default class IDBManager{

    constructor(){
        this.setupDatabase();
    }

    setupDatabase(){
        return idb.open(databaseName, 1, upgrade => {
            let store = upgrade.createObjectStore(databaseName, {
                keyPath: 'query'
            });
        });
    }

    saveQueryInDatabase(query, value){

    }
}