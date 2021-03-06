import React from 'react'
import {Component, CommonProps, View, ScrollView, Button, Text} from 'reactxp'

import {styles} from '../assets/Style'

import Contacts from '../services/Contacts'
import ContactModel from '../models/Contact'

import Loader from './ui/Loader'
import ContactItem from './ContactItem'

interface ContactProps extends CommonProps {
    onNavigateBack: () => void,
    goToContactView: (id: string) => void,
}

interface ContactState {
    status: string,
    currentAction?: string,
    contacts: ContactModel[],
}

class ContactPanel extends Component<ContactProps, ContactState> {
    constructor(props: ContactProps) {
        super(props)
        this.state = {
            status: 'IDLE',
            currentAction: undefined,
            contacts: [],
        }
    }

    componentDidMount() {
        this.loadItems()
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
            {this.renderList()}
        </View>
    }

    private loadItems() {
        this.loadFromCache().then(() => {
            this.loadFromAPI()
        })
    }

    private setItems(data: ContactModel[]) {
        this.setState({
            status: 'IDLE',
            contacts: data,
        })
    }

    private loadFromCache() {
        this.setState({status: 'LOADING'})
        return Contacts.listCache().then(data => {
            this.setItems(data)
        }).catch(() => {
            this.setState({status: 'IDLE'})
        })
    }

    private loadFromAPI() {
        this.setState({status: 'LOADING'})
        return Contacts.list().then(response => {
            this.setItems(response.data)
        }).catch(() => {
            this.setState({status: 'IDLE'})
        })
    }

    private renderList() {
        if (this.state.status === 'LOADING') {
            return <Loader />
        }
        return <ScrollView style={styles.list}>
            {this.state.contacts.map(contact => {
                return <ContactItem
                    item={contact}
                    key={contact.id}
                    goToContactView={this.props.goToContactView}
                />
            })}
        </ScrollView>
    }
}

export default ContactPanel
