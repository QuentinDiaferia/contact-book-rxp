import {DbProvider} from 'nosqlprovider'

import {CordovaNativeSqliteProvider} from 'nosqlprovider/dist/CordovaNativeSqliteProvider'
import {InMemoryProvider} from 'nosqlprovider/dist/InMemoryProvider'

import AppAbstract from './AppAbstract'

class AppNative extends AppAbstract {
    protected getAvailableDbProviders(): DbProvider[] {
        const rnSqliteProvider = require('react-native-sqlite-storage')
        return [
            new CordovaNativeSqliteProvider(rnSqliteProvider),
            new InMemoryProvider()
        ]
    }
}

export default new AppNative()
