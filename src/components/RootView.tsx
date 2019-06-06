import * as React from 'react'
import * as RX from 'reactxp'
import Navigator, { NavigatorDelegateSelector as DelegateSelector, Types } from 'reactxp-navigation'

import {styles} from '../assets/Style'
import {NavigationRouteId} from '../helper/Navigation'

import MainPanel from './MainPanel'
import ContactList from './ContactList'
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
        console.log('navigator set')
        this.navigator = navigator
    }

    private renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        return <RX.View style={styles.appWrapper}>
            <RX.GestureView
                style={styles.gestureWrapper}
                onPanHorizontal={this.goBack}
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
                    <MainPanel
                        onPressNavigate={this.onPressNavigate}
                    />
                )

            case NavigationRouteId.ContactList:
                return (
                    <ContactList
                        goToContactView={this.goToContactView}
                    />
                )

            case NavigationRouteId.ContactView:
                return (
                    <ContactView
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

    private goBack = (gestureState: RX.Types.PanGestureState) => {
        if (!gestureState.isComplete) {
            return
        }

        const ratio = gestureState.initialClientX - gestureState.clientX
        const direction = (ratio > 0) ? 1 : -1

        if (direction !== -1) {
            return
        }

        this.navigator!.pop()
    }
}
