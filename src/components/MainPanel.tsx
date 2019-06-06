import * as React from 'react'
import {Component, Stateless, Animated, View, Button, Text} from 'reactxp'

import {styles} from '../assets/Style'

import {NavigationRouteId} from '../helper/Navigation'

interface MainPanelProps {
    onPressNavigate: (routeId: NavigationRouteId) => void
}

class MainPanel extends Component<MainPanelProps, Stateless> {
    private translationValue: Animated.Value

    constructor(props: MainPanelProps) {
        super(props)
        this.translationValue = Animated.createValue(-100)
    }

    componentDidMount() {
        Animated.timing(this.translationValue, {
            duration: 500,
            toValue: 0,
            easing: Animated.Easing.OutBack()
        }).start()
    }

    render() {
        return <View
            useSafeInsets={true}
            style={styles.container}
        >
            <Button
                style={styles.roundButton}
                onPress={this.goToContactList}
            >
                <Text style={styles.buttonText}>
                    Contact book
                </Text>
            </Button>
        </View>
    }

    private goToContactList = () => {
        this.props.onPressNavigate(NavigationRouteId.ContactList)
    }
}

export default MainPanel
