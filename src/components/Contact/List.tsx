import React from 'react'
import {Component, View, ScrollView, Button, Text} from 'reactxp'

import {styles} from '../../assets/Style'

import Contacts from '../../api/Contacts'
import ContactModel from '../../models/Contact'
import Navigation, {NavigationRouteId} from '../../helper/Navigation'

import Loader from '../ui/Loader'
import ContactItem from './ListItem'

interface ContactState {
    status: string,
    currentAction?: string,
    contacts: ContactModel[],
}

class ContactList extends Component<{}, ContactState> {
    constructor(props: {}) {
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
                    onPress={() => Navigation.goTo(NavigationRouteId.ContactAdd)}
                >
                    <Text style={styles.buttonText}>
                        Add a contact
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
        return Contacts.listCache().then((data: ContactModel[]) => {
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
                    goToContactView={(contactId: string) => Navigation.goTo(NavigationRouteId.ContactView, {contactId})}
                />
            })}
        </ScrollView>
    }
}

export default ContactList
