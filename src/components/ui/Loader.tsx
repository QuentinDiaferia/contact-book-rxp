import React from 'react'
import * as RX from 'reactxp'

import {styles} from '../../assets/Style'

class Loader extends RX.Component {
    render() {
        return (
            <RX.View style={styles.container}>
                <RX.ActivityIndicator
                    color='#848484'
                    size='large'
                />
            </RX.View>
        )
    }
}

export default Loader
