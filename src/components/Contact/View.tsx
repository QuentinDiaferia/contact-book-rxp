import React from 'react'
import {Component, CommonProps, View, Text} from 'reactxp'

import {styles} from '../../assets/Style'

import Contacts from '../../api/Contacts'
import ContactModel from '../../models/Contact'

import Loader from '../ui/Loader'

interface ContactViewProps extends CommonProps {
    id: string,
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
            {this.renderItem()}
        </View>
    }

    private renderItem() {
        const {
            status,
            item,
        } = this.state
        if (status === 'LOADING') {
            return <Loader />
        }
        if (item) {
            return (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.col2}>
                            Name:
                        </Text>
                        <Text style={styles.col2}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.col2}>
                            E-mail:
                        </Text>
                        <Text style={styles.col2}>
                            {item.email}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.col2}>
                            Address:
                        </Text>
                        <View style={styles.col2}>
                            <View><Text>{item.address.street}</Text></View>
                            <View><Text>{item.address.suite}</Text></View>
                            <View><Text>{item.address.city}</Text></View>
                            <View><Text>{item.address.zipcode}</Text></View>
                        </View>
                    </View>
                </View>
            )
        }
        return null
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
