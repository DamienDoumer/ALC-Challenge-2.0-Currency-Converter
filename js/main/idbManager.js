
export const databaseName = 'currency-converter-007damiendoumer-1';

export default class IDBManager{

    constructor(){
        this._idbPromise = this.setupDatabase();
    }

    setupDatabase(){
        // If the browser doesn't support service worker,
        // we don't care about having a database
        if (!navigator.serviceWorker) {
            return Promise.resolve();
        }

        return idb.open(databaseName, 1, upgrade => {
            let store = upgrade.createObjectStore(databaseName, {
                keyPath: 'query'
            });
            return store;
        });
    }

    //Save a query in index db
    saveQueryInDatabase(query, value){

        this._idbPromise.then((db) => {

            if(!db) return;

            let transaction = db.transaction(databaseName, 'readwrite');
            let store = transaction.objectStore(databaseName);
            store.put({value:value, query:query});

        })
    }

    //get value from database
    getQueryValueByID(query, callBack){
        //Our ID id query in idb 
        this._idbPromise.then(db => {
            return db.transaction(databaseName).objectStore(databaseName)
                    .get(query);
        }).then(object => callBack(null, object))
        .catch(error => callBack(error, null));
        
    }
}