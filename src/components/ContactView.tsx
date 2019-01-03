import React from 'react'
import {Component, CommonProps, View, Button, Text} from 'reactxp'

import {styles} from '../assets/Style'

import Contacts from '../services/Contacts'
import ContactModel from '../models/Contact'

import Loader from './ui/Loader'

interface ContactViewProps extends CommonProps {
    id: string,
    onNavigateBack: () => void,
}

interface ContactViewState {
    status: string,
    item?: ContactModel,
}

class ContactView extends Component<ContactViewProps, ContactViewState> {
    constructor(props: ContactViewProps) {
        super(props)
        this.state = {
            status: 'IDLE',
            item: undefined,
        }
    }

    componentDidMount() {
        this.loadItem()
    }

    render() {
        return <View
            useSafeInsets={true}
            style={styles.container}
        >
            <View style={styles.contactHeader}>
                <Button
                    style={styles.roundButton}
                    onPress={this.props.onNavigateBack}
                >
                    <Text style={styles.buttonText}>
                        Go Back
                    </Text>
                </Button>
            </View>
            {this.renderItem()}
        </View>
    }

    private renderItem() {
        if (this.state.status === 'LOADING') {
            return <Loader />
        }
        return <View style={styles.container}>
            {this.state.item ? this.state.item.name : null}
        </View>
    }

    private loadItem() {
        this.loadFromCache().then(() => {
            this.loadFromAPI()
        })
    }

    private setItem(data: ContactModel) {
        this.setState({
            status: 'IDLE',
            item: data,
        })
    }

    private loadFromCache() {
        this.setState({status: 'LOADING'})
        return Contacts.getCache(this.props.id).then(data => {
            this.setItem(data)
        }).catch(() => {
            this.setState({
                status: 'IDLE',
            })
        })
    }

    private loadFromAPI() {
        this.setState({status: 'LOADING'})
        return Contacts.get(this.props.id).then(response => {
            this.setItem(response.data)
        }).catch(() => {
            this.setState({
                status: 'IDLE',
            })
        })
    }
}

export default ContactView
