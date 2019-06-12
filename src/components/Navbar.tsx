import * as React from 'react'
import * as RX from 'reactxp'

import {colors, dimensions} from '../assets/Style'

import Navigation, {NavigationRouteId} from '../helper/Navigation'

const NAVBAR_HEIGHT = 40
const SIDEBAR_WIDTH = 120

const styles = {
    navbar: RX.Styles.createViewStyle({
        backgroundColor: colors.navbar,
        padding: 5,
        flexDirection: 'row',
        height: NAVBAR_HEIGHT,
    }),
    navbarToggleBtn : RX.Styles.createViewStyle({
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        flex: -1,
    }),
    navbarToggleTxt: RX.Styles.createTextStyle({
        fontSize: 25,
        color: colors.white,
    }),
    sidebar: RX.Styles.createViewStyle({
        height: dimensions.height - NAVBAR_HEIGHT,
        backgroundColor: colors.sidebar,
    }),
    sidebarBtn: RX.Styles.createViewStyle({
        paddingHorizontal: 20,
        paddingVertical: 10,
    }),
    sidebarBtnTxt: RX.Styles.createTextStyle({
        color: colors.white,
        fontSize: 16,
    }),
    appWrapper: RX.Styles.createViewStyle({
        flexDirection: 'row',
        height: dimensions.height - NAVBAR_HEIGHT,
    }),
    mainContent: RX.Styles.createViewStyle({
        height: dimensions.height - NAVBAR_HEIGHT,
    }),
}

interface NavbarState {
    displaySidebar: boolean
}

class Navbar extends RX.Component<{}, NavbarState> {
    state = {
        displaySidebar: false,
    }

    private sidebarWidthValue = RX.Animated.createValue(0)
    private sidebarWidthStyle = RX.Styles.createAnimatedViewStyle({
        width: this.sidebarWidthValue,
    })

    private contentWidthValue = RX.Animated.createValue(dimensions.width)
    private contentWidthStyle = RX.Styles.createAnimatedViewStyle({
        width: this.contentWidthValue,
    })

    render() {
        return (
            <React.Fragment>
                <RX.View style={styles.navbar}>
                    <RX.Button style={styles.navbarToggleBtn} onPress={this.toggleSidebar}>
                        <RX.Text style={styles.navbarToggleTxt}>
                            =
                        </RX.Text>
                    </RX.Button>
                </RX.View>
                <RX.View style={styles.appWrapper}>
                    {this.state.displaySidebar ? (
                        <RX.Animated.View style={[styles.sidebar, this.sidebarWidthStyle]}>
                            <RX.Button
                                style={styles.sidebarBtn}
                                onPress={this.handlePress(NavigationRouteId.MainPanel)}
                            >
                                <RX.Text style={styles.sidebarBtnTxt}>Home</RX.Text>
                            </RX.Button>
                            <RX.Button
                                style={styles.sidebarBtn}
                                onPress={this.handlePress(NavigationRouteId.ContactList)}
                            >
                                <RX.Text style={styles.sidebarBtnTxt}>Contacts</RX.Text>
                            </RX.Button>
                        </RX.Animated.View>
                    ) : null}
                    <RX.Animated.View
                        style={this.contentWidthStyle}
                    >
                        {this.props.children}
                    </RX.Animated.View>
                </RX.View>
            </React.Fragment>
        )
    }

    private handlePress = (routeId: NavigationRouteId) => () => {
        Navigation.goTo(routeId)
        this.toggleSidebar()
    }

    private toggleSidebar = () => {
        if (this.state.displaySidebar) {
            RX.Animated.parallel([
                RX.Animated.timing(this.sidebarWidthValue, {
                    toValue: 0,
                    duration: 200,
                }),
                RX.Animated.timing(this.contentWidthValue, {
                    toValue: dimensions.width,
                    duration: 200,
                }),
            ]).start(() => {
                this.setState({
                    displaySidebar: !this.state.displaySidebar,
                })
            })
        } else {
            this.setState({
                displaySidebar: !this.state.displaySidebar,
            }, () => {
                RX.Animated.parallel([
                    RX.Animated.timing(this.sidebarWidthValue, {
                        toValue: SIDEBAR_WIDTH,
                        duration: 200,
                    }),
                    RX.Animated.timing(this.contentWidthValue, {
                        toValue: dimensions.width - SIDEBAR_WIDTH,
                        duration: 200,
                    }),
                ]).start()
            })
        }
    }
}

export default Navbar
