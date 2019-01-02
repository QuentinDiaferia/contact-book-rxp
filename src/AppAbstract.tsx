import React from 'react'
import {App, UserInterface} from 'reactxp'
import {DbProvider} from 'nosqlprovider'

import {DEBUG, DEV} from './config'

import LocalDb from './services/LocalDb'

import {RootView} from './components/RootView'

abstract class AppAbstract {
    init() {
        App.initialize(DEBUG, DEV)
        LocalDb.open(this.getAvailableDbProviders())
        UserInterface.setMainView(
            <RootView />
        )
    }

    protected abstract getAvailableDbProviders(): DbProvider[]
}

export default AppAbstract
