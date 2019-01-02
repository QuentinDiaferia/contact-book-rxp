import {DbProvider} from 'nosqlprovider'

import {IndexedDbProvider} from 'nosqlprovider/dist/IndexedDbProvider'
import {InMemoryProvider} from 'nosqlprovider/dist/InMemoryProvider'
import {WebSqlProvider} from 'nosqlprovider/dist/WebSqlProvider'

import AppAbstract from './AppAbstract'

class AppWeb extends AppAbstract {
    protected getAvailableDbProviders(): DbProvider[] {
        return [
            new IndexedDbProvider(),
            new InMemoryProvider(),
            new WebSqlProvider(),
        ]
    }
}

export default new AppWeb()
