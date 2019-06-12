import * as React from 'react'
import * as RX from 'reactxp'

import {colors, dimensions} from '../assets/Style'

import Navigation, {NavigationRouteId} from '../helper/Navigation'

const styles = {
    navbar: RX.Styles.createViewStyle({
        backgroundColor: colors.primary,
        padding: 5,
        flexDirection: 'row',
        height: 40,
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
        height: dimensions.height - 40,
        width: 120,
        backgroundColor: colors.primary,
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
        height: dimensions.height - 40,
    }),
}

interface NavbarState {
    displaySidebar: boolean
}

class Navbar extends RX.Component<{}, NavbarState> {
    state = {
        displaySidebar: false,
    }

    private animationValue = RX.Animated.createValue(-120)
    private animationStyle = RX.Styles.createAnimatedViewStyle({
        transform: [{
            translateX: this.animationValue,
        }]
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
                        <RX.Animated.View style={this.animationStyle}>
                            <RX.View style={styles.sidebar}>
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
                            </RX.View>
                        </RX.Animated.View>
                    ) : null}
                    {this.props.children}
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
            RX.Animated.timing(this.animationValue, {
                toValue: -120,
                duration: 200,
            }).start(() => {
                this.setState({
                    displaySidebar: !this.state.displaySidebar,
                })
            })
        } else {
            this.setState({
                displaySidebar: !this.state.displaySidebar,
            }, () => {
                RX.Animated.timing(this.animationValue, {
                    toValue: 0,
                    duration: 200,
                }).start()
            })
        }
    }
}

export default Navbar
