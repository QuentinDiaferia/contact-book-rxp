import * as React from 'react'
import * as RX from 'reactxp'

import {styles} from '../assets/Style'

import Navigation, {NavigationRouteId} from '../helper/Navigation'

interface SidebarProps extends RX.CommonProps {
    display: boolean
    onNavigate: () => void
}

class Sidebar extends RX.Component<SidebarProps> {
    render() {
        return this.props.display ? (
            <RX.View style={styles.sidebar}>
                <RX.Button
                    style={styles.sidebarBtn}
                    onPress={this.handlePress(NavigationRouteId.MainPanel)}
                >
                    <RX.Text>Home</RX.Text>
                </RX.Button>
                <RX.Button
                    style={styles.sidebarBtn}
                    onPress={this.handlePress(NavigationRouteId.ContactList)}
                >
                    <RX.Text>Contacts</RX.Text>
                </RX.Button>
            </RX.View>
        ) : null
    }

    private handlePress = (routeId: NavigationRouteId) => () => {
        this.props.onNavigate()
        Navigation.goTo(routeId)
    }
}

export default Sidebar
