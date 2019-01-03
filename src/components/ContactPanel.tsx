import React from 'react'
import {Component, CommonProps, View, Button, Text} from 'reactxp'
import {VirtualListView, VirtualListViewItemInfo} from 'reactxp-virtuallistview'

import {styles} from '../assets/Style'

import Contacts from '../services/Contacts'
import ContactModel from '../models/Contact'

import Loader from './ui/Loader'
import ContactItem from './ContactItem'

interface ContactItemInfo extends VirtualListViewItemInfo {
    id: string,
    name: string,
}

interface ContactProps extends CommonProps {
    onNavigateBack: () => void,
    goToContactView: (id: string) => void,
}

interface ContactState {
    status: string,
    currentAction?: string,
    contacts: ContactItemInfo[],
}

class ContactPanel extends Component<ContactProps, ContactState> {
    constructor(props: ContactProps) {
        super(props)
        this.state = {
            status: 'IDLE',
            currentAction: undefined,
            contacts: [],
        }
        this.renderContact = this.renderContact.bind(this)
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

    private setItems(data: object[]) {
        this.setState({
            status: 'IDLE',
            contacts: data.map((e: ContactModel) => Object.assign({}, e, {
                key: e.id,
                template: "contact",
                height: 32,
            })),
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
        return <VirtualListView
            itemList={this.state.contacts}
            renderItem={this.renderContact}
            style={styles.list}
            animateChanges={true}
            skipRenderIfItemUnchanged={true}
        />
    }

    private renderContact(item: ContactItemInfo) {
        return <ContactItem
            item={item}
            goToContactView={this.props.goToContactView}
        />
    }
}

export default ContactPanel
