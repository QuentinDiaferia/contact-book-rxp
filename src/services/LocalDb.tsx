import {DbProvider, DbSchema} from 'nosqlprovider'

const dbName: string = 'myDb'
const contactsTableName: string = 'contacts'
const appSchema: DbSchema = {
    version: 1,
    stores: [
        {
            name: contactsTableName,
            primaryKeyPath: 'id',
        }
    ]
}

class LocalDb {
    private db?: DbProvider

    open(availableProviders: DbProvider[]) {
        this.openProvider(availableProviders)
    }

    getContacts() {
        return this.getContactStore(false).then(store => {
            return store.openPrimaryKey().getAll()
        })
    }

    putContacts(contacts: object[]) {
        return this.getContactStore(true).then(store => {
            return store.clearAllData()
        }).then(() => {
            return this.getContactStore(true).then(store => {
                return store.put(contacts)
            })
        })
    }

    private openProvider(availableProviders: DbProvider[], index = 0) {
        const provider = availableProviders[index]
        if (index <= availableProviders.length) {
            provider.open(dbName, appSchema, false, false).then(
                () => {
                    this.db = provider
                },
                () => {
                    this.openProvider(availableProviders, ++index)
                }
            )
        }
    }

    private getContactStore(writeNeeded: boolean) {
        if (!this.db) {
            throw Error('Database not open.')
        } else {
            return this.db.openTransaction([contactsTableName], writeNeeded).then(tx => {
                return tx.getStore(contactsTableName)
            })
        }
    }
}

export default new LocalDb()
