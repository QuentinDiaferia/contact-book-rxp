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

    goTo = (routeId: NavigationRouteId) => {
        if (this.navigator) {
            this.navigator.push({
                sceneConfigType: Types.NavigatorSceneConfigType.FloatFromRight,
                routeId,
            })
        }
    }

    goBack = () => {
        if (this.navigator) {
            this.navigator.pop()
        }
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
