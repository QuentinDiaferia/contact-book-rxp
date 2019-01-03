import * as React from 'react'
import * as RX from 'reactxp'
import Navigator, { NavigatorDelegateSelector as DelegateSelector, Types } from 'reactxp-navigation'

import {styles} from '../assets/Style'
import {NavigationRouteId} from '../helper/Navigation'

import MainPanel from './MainPanel'
import ContactPanel from './ContactPanel'
import ContactView from './ContactView'

interface RootState {
    contactId: string,
}

export class RootView extends RX.Component<RX.CommonProps, RootState> {
    private navigator: Navigator | undefined

    constructor(props: RX.CommonProps) {
        super(props)
        this.state = {
            contactId: ''
        }
    }

    componentDidMount() {
        if (this.navigator) {
            this.navigator.immediatelyResetRouteStack([{
                routeId: NavigationRouteId.MainPanel,
                sceneConfigType: Types.NavigatorSceneConfigType.Fade
            }])
        }
    }

    render() {
        return <RX.View style={styles.root}>
            <Navigator
                delegateSelector={DelegateSelector}
                renderScene={this.renderScene}
                ref={this.onNavigatorRef}
            />
        </RX.View>
    }

    private onNavigatorRef = (navigator: Navigator) => {
        this.navigator = navigator
    }

    private renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        return <RX.View style={styles.appWrapper}>
            {this.router(navigatorRoute)}
        </RX.View>
    }

    private router = (navigatorRoute: Types.NavigatorRoute) => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainPanel:
                return (
                    <MainPanel
                        onPressNavigate={this.onPressNavigate}
                    />
                )

            case NavigationRouteId.ContactPanel:
                return (
                    <ContactPanel
                        onNavigateBack={this.onPressBack}
                        goToContactView={this.goToContactView}
                    />
                )

            case NavigationRouteId.ContactView:
                return (
                    <ContactView
                        onNavigateBack={this.onPressBack}
                        id={this.state.contactId}
                    />
                )
        }

        return null
    }

    private onPressNavigate = (routeId: NavigationRouteId) => {
        if (this.navigator) {
            this.navigator.push({
                sceneConfigType: Types.NavigatorSceneConfigType.FloatFromRight,
                routeId,
            })
        }
    }

    private goToContactView = (id: string) => {
        if (this.navigator) {
            this.setState({
                contactId: id,
            })
            this.navigator.push({
                sceneConfigType: Types.NavigatorSceneConfigType.FloatFromRight,
                routeId: NavigationRouteId.ContactView,
            })
        }
    }

    private onPressBack = () => {
        if (this.navigator) {
            this.navigator.pop()
        }
    }
}
