import React from 'react'
import {Component, CommonProps, View, Button, Text} from 'reactxp'
import {styles} from '../../assets/Style'
import ContactModel from '../../models/Contact'

interface ContactItemProps extends CommonProps {
    item: ContactModel
    goToContactView: (id: string) => void
}

class ContactItem extends Component<ContactItemProps> {
    render() {
        const {
            item,
        } = this.props
        return <View style={styles.listItem}>
            <Button
                style={styles.listItemBtn}
                onPress={this.goToContactView}
            >
                <Text>
                    {item.name}
                </Text>
            </Button>
        </View>
    }

    private goToContactView = () => {
        this.props.goToContactView(this.props.item.id)
    }
}

export default ContactItem
