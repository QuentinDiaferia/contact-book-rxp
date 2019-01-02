import * as React from 'react'
import * as RX from 'reactxp'

import {styles} from '../assets/Style'

import {NavigationRouteId} from '../helper/Navigation'

interface MainPanelProps {
    onPressNavigate: (routeId: NavigationRouteId) => void
}

class MainPanel extends RX.Component<MainPanelProps, RX.Stateless> {
    private translationValue: RX.Animated.Value

    constructor(props: MainPanelProps) {
        super(props)
        this.translationValue = RX.Animated.createValue(-100)
    }

    componentDidMount() {
        RX.Animated.timing(this.translationValue, {
            duration: 500,
            toValue: 0,
            easing: RX.Animated.Easing.OutBack()
        }).start()
    }

    render() {
        return <RX.View style={styles.container}>
            <RX.Button
                style={styles.roundButton}
                onPress={this.goToContactPanel}
            >
                <RX.Text style={styles.buttonText}>
                    Contact book
                </RX.Text>
            </RX.Button>
        </RX.View>
    }

    private goToContactPanel = () => {
        this.props.onPressNavigate(NavigationRouteId.ContactPanel)
    }
}

export default MainPanel
