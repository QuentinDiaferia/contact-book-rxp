import React from 'react'
import {Component, ActivityIndicator} from 'reactxp'

class Loader extends Component {
    render() {
        return <ActivityIndicator
            color='#848484'
            size='large'
        />
    }
}

export default Loader
