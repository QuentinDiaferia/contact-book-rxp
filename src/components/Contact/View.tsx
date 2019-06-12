import React from 'react'
import * as RX from 'reactxp'

import {styles} from '../../assets/Style'

import Navigation from '../../helper/Navigation'

import Contacts from '../../api/Contacts'
import ContactModel from '../../models/Contact'

import Loader from '../ui/Loader'

interface ContactViewProps extends RX.CommonProps {
    contactId: string,
}

interface ContactViewState {
    status: string,
    item?: ContactModel,
}

class ContactView extends RX.Component<ContactViewProps, ContactViewState> {
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
        const {
            status,
            item,
        } = this.state
        if (status === 'LOADING') {
            return <Loader />
        }
        if (item) {
            return (
                <RX.View style={styles.container}>
                    <RX.View style={styles.row}>
                        <RX.Text style={styles.col2}>
                            Name:
                        </RX.Text>
                        <RX.Text style={styles.col2}>
                            {item.name}
                        </RX.Text>
                    </RX.View>
                    <RX.View style={styles.row}>
                        <RX.Text style={styles.col2}>
                            E-mail:
                        </RX.Text>
                        <RX.Text style={styles.col2}>
                            {item.email}
                        </RX.Text>
                    </RX.View>
                    <RX.View style={styles.row}>
                        <RX.Text style={styles.col2}>
                            Address:
                        </RX.Text>
                        <RX.View style={styles.col2}>
                            {item.address ? (
                                <React.Fragment>
                                    <RX.View><RX.Text>{item.address.street}</RX.Text></RX.View>
                                    <RX.View><RX.Text>{item.address.suite}</RX.Text></RX.View>
                                    <RX.View><RX.Text>{item.address.city}</RX.Text></RX.View>
                                    <RX.View><RX.Text>{item.address.zipcode}</RX.Text></RX.View>
                                </React.Fragment>
                            ) : null}
                        </RX.View>
                    </RX.View>
                    {RX.Platform.getType() === 'web' && (
                        <RX.View style={styles.buttonWrapper}>
                            <RX.Button
                                style={styles.roundButton}
                                onPress={Navigation.goBack}
                            >
                                <RX.Text style={styles.buttonText}>
                                    Back
                                </RX.Text>
                            </RX.Button>
                        </RX.View>
                    )}
                </RX.View>
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
        return Contacts.getCache(this.props.contactId).then(data => {
            this.setItem(data)
        }).catch(() => {
            this.setState({
                status: 'IDLE',
            })
        })
    }

    private loadFromAPI() {
        this.setState({status: 'LOADING'})
        return Contacts.get(this.props.contactId).then(response => {
            this.setItem(response.data)
        }).catch(() => {
            this.setState({
                status: 'IDLE',
            })
        })
    }
}

export default ContactView
