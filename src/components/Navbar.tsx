import * as React from 'react'
import * as RX from 'reactxp'

import {colors} from '../assets/Style'
import Navigation, {NavigationRouteId} from '../helper/Navigation'

const styles = {
    nav: RX.Styles.createViewStyle({
        backgroundColor: colors.primary,
        padding: 5,
    }),
    navbar: RX.Styles.createViewStyle({
        flexDirection: 'row',
    }),
    navbarToggleButton : RX.Styles.createViewStyle({
        padding: 5,
        borderRadius: 5,
        flex: -1,
    }),
    navbarItem: RX.Styles.createViewStyle({
        padding: 5,
    }),
    navbarItemButton: RX.Styles.createTextStyle({
        fontSize: 16,
        padding: 10,
        color: colors.white,
    }),
}

interface NavbarState {
    display: boolean
}

class Navbar extends RX.Component<{}, NavbarState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            display: false,
        }
    }

    render() {
        return <RX.View style={styles.nav}>
            <RX.View style={styles.navbar}>
                <RX.Button style={styles.navbarToggleButton} onPress={this.toggleDisplay}>
                    <RX.Text style={styles.navbarItemButton}>
                        =
                    </RX.Text>
                </RX.Button>
            </RX.View>
            {this.state.display && (
                <React.Fragment>
                    <RX.View style={styles.navbarItem}>
                        <RX.Button onPress={() => this.navigateTo(NavigationRouteId.MainPanel)}>
                            <RX.Text style={styles.navbarItemButton}>
                                Home
                            </RX.Text>
                        </RX.Button>
                    </RX.View>
                    <RX.View style={styles.navbarItem}>
                        <RX.Button onPress={() => this.navigateTo(NavigationRouteId.ContactList)}>
                            <RX.Text style={styles.navbarItemButton}>
                                Contacts
                            </RX.Text>
                        </RX.Button>
                    </RX.View>
                </React.Fragment>
            )}
        </RX.View>
    }

    toggleDisplay = () => {
        this.setState({
            display: !this.state.display,
        })
    }

    navigateTo = (routeId: NavigationRouteId) => {
        this.setState({display: false})
        Navigation.goTo(routeId)
    }
}

export default Navbar
