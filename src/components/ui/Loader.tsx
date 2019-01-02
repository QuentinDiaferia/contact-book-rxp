import React from 'react'
import {Component, ActivityIndicator} from 'reactxp'

class Loader extends Component {
    render() {
        return <ActivityIndicator
            color='#f0f0f0'
            size='medium'
        />
    }
}

export default Loader
