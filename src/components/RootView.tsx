import * as React from 'react'
import * as RX from 'reactxp'
import Navigator, { NavigatorDelegateSelector as DelegateSelector, Types } from 'reactxp-navigation'

import {styles} from '../assets/Style'
import Navigation, {NavigationRouteId} from '../helper/Navigation'

import Navbar from './Navbar'
import MainPanel from './MainPanel'
import ContactList from './Contact/List'
import ContactView from './Contact/View'
import ContactAdd from './Contact/Add'

export class RootView extends RX.Component<RX.CommonProps> {
    componentDidMount() {
        Navigation.resetNavigator()
    }

    render() {
        return <RX.View style={styles.root}>
            <Navbar>
                {this.renderApp()}
            </Navbar>
        </RX.View>
    }

    private renderApp = () => {
        return (
            <Navigator
                delegateSelector={DelegateSelector}
                renderScene={this.renderScene}
                ref={this.onNavigatorRef}
            />
        )
    }

    private onNavigatorRef = (navigator: Navigator) => {
        Navigation.setNavigator(navigator)
    }

    private renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        return <RX.View style={styles.mainContent}>
            <RX.GestureView
                style={styles.gestureWrapper}
                onPanHorizontal={Navigation.handleSwipeLeft}
                preferredPan={RX.Types.PreferredPanGesture.Horizontal}
            >
                {this.router(navigatorRoute)}
            </RX.GestureView>
        </RX.View>
    }

    private router = (navigatorRoute: Types.NavigatorRoute) => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainPanel:
                return (
                    <MainPanel />
                )

            case NavigationRouteId.ContactList:
                return (
                    <ContactList />
                )

            case NavigationRouteId.ContactView:
                return (
                    <ContactView {...Navigation.getData()} />
                )

            case NavigationRouteId.ContactAdd:
                return (
                    <ContactAdd />
                )
        }

        return null
    }
}
