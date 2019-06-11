import * as RX from 'reactxp'
import Navigator, {Types} from 'reactxp-navigation'

export enum NavigationRouteId {
    MainPanel,
    ContactList,
    ContactView,
    ContactAdd,
}

class Navigation {
    private navigator?: Navigator
    private data?: any

    getData = () => {
        return this.data
    }

    clearData = () => {
        this.data = {}
    }

    setNavigator = (navigator: Navigator) => {
        this.navigator = navigator
    }

    resetNavigator = () => {
        if (this.navigator) {
            this.navigator.immediatelyResetRouteStack([{
                routeId: NavigationRouteId.MainPanel,
                sceneConfigType: Types.NavigatorSceneConfigType.Fade
            }])
        }
    }

    goTo = (routeId: NavigationRouteId, data: any = {}) => {
        this.data = data
        const index = this.navigator!.getCurrentRoutes().findIndex(route => route.routeId === routeId)
        if (index !== -1) {
            this.navigator!.popToRoute(this.navigator!.getCurrentRoutes()[index])
        } else {
            this.navigator!.push({
                sceneConfigType: Types.NavigatorSceneConfigType.FloatFromRight,
                routeId,
            })
        }
    }

    goBack = () => {
        this.navigator!.pop()
    }

    handleSwipeLeft = (gestureState: RX.Types.PanGestureState) => {
        if (RX.Platform.getType() !== 'web') {
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
}

export default new Navigation()
