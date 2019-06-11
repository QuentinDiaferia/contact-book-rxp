import * as React from 'react'
import * as RX from 'reactxp'

import {styles} from '../assets/Style'

interface NavbarProps extends RX.CommonProps {
    toggleSidebar: () => void
}

class Navbar extends RX.Component<NavbarProps> {
    render() {
        return (
            <RX.View style={styles.navbar}>
                <RX.Button style={styles.navbarToggleBtn} onPress={this.props.toggleSidebar}>
                    <RX.Text style={styles.navbarToggleTxt}>
                        =
                    </RX.Text>
                </RX.Button>
            </RX.View>
        )
    }
}

export default Navbar
