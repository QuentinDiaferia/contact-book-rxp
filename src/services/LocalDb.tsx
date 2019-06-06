import {DbProvider, DbSchema} from 'nosqlprovider'
import {DB_NAME, DB_TABLE_CONTACTS} from '../config'

const appSchema: DbSchema = {
    version: 1,
    stores: [
        {
            name: DB_TABLE_CONTACTS,
            primaryKeyPath: 'id',
        }
    ]
}

class LocalDb {
    private db?: DbProvider
    private cacheEnabled = true

    open(availableProviders: DbProvider[]) {
        this.openProvider(availableProviders)
    }

    getAllContacts() {
        if (!this.cacheEnabled) {
            return this.getErrorResponse()
        }
        return this.getContactStore(false).then(store => {
            return store.openPrimaryKey().getAll()
        }).toEs6Promise()
    }

    getContact(id: string) {
        if (!this.cacheEnabled) {
            return this.getErrorResponse()
        }
        return this.getContactStore(false).then(store => {
            return store.openPrimaryKey().getOnly(id)
        }).then(contact => {
            if (contact.length) {
                return contact.shift()
            }
            return []
        }).toEs6Promise()
    }

    insertContacts(contacts: object[]) {
        if (!this.cacheEnabled) {
            return this.getErrorResponse()
        }
        return this.getContactStore(true).then(store => {
            return store.clearAllData()
        }).then(() => {
            return this.getContactStore(true).then(store => {
                return store.put(contacts)
            })
        })
    }

    putContact(contact: object) {
        if (!this.cacheEnabled) {
            return this.getErrorResponse()
        }
        return this.getContactStore(true).then(store => {
            return store.put(contact)
        })
    }

    private getErrorResponse() {
        return new Promise(resolve => resolve([]))
    }

    private openProvider(availableProviders: DbProvider[], index = 0) {
        const provider = availableProviders[index]
        if (provider && index <= availableProviders.length) {
            provider.open(DB_NAME, appSchema, false, false).then(
                () => {
                    this.db = provider
                },
                () => {
                    this.openProvider(availableProviders, ++index)
                }
            )
        } else {
            this.cacheEnabled = false
        }
    }

    private getContactStore(writeNeeded: boolean) {
        if (!this.db) {
            throw Error('Database not open.')
        } else {
            return this.db.openTransaction([DB_TABLE_CONTACTS], writeNeeded).then(tx => {
                return tx.getStore(DB_TABLE_CONTACTS)
            })
        }
    }
}

export default new LocalDb()
