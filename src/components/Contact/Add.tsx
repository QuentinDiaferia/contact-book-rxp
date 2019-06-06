import React from 'react'
import {Component, View, Button, Text} from 'reactxp'

import TextInput from '../ui/TextInput'

import {styles} from '../../assets/Style'

interface FormValues {
    name?: string
    email?: string
}

interface ContactFormState {
    form: FormValues
    errors: FormValues
}

class ContactForm extends Component<{}, ContactFormState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            form: {
                name: undefined,
                email: undefined,
            },
            errors: {
                name: undefined,
                email: undefined,
            },
        }
    }

    render() {
        return <View
            useSafeInsets={true}
            style={styles.container}
        >
            {this.renderForm()}
        </View>
    }

    private renderForm() {
        const {
            form,
            errors,
        } = this.state
        return (
            <View style={styles.container}>
                <TextInput
                    autoCapitalize="words"
                    returnKeyType="next"
                    placeholder="Name"
                    value={form.name || ''}
                    onSubmitEditing={this.handleSubmit}
                    onChangeText={this.handleChange('name')}
                    error={!!errors.name}
                    errorMessage={errors.name}
                />
                <TextInput
                    returnKeyType="next"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    value={form.email || ''}
                    onSubmitEditing={this.handleSubmit}
                    onChangeText={this.handleChange('email')}
                    error={!!errors.email}
                    errorMessage={errors.email}
                />
                <Button
                    style={styles.roundButton}
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.buttonText}>
                        Save
                    </Text>
                </Button>
            </View>
        )
    }

    private handleChange = (field: string) => (value: string) => {
        const form = Object.assign({}, this.state.form, {
            [field]: value,
        })
        const errors = Object.assign({}, this.state.errors, {
            [field]: undefined,
        })
        this.setState({
            form,
            errors,
        })
    }

    private handleSubmit = () => {
        const {form} = this.state
        const name = form.name ? form.name.trim() : ''
        const email = form.email ? form.email.trim() : ''
        const errors: FormValues = {}

        if (!name.length) {
            errors.name = 'Required'
        }

        if (!email.length) {
            errors.email = 'Required'
        } else if (!email.match(/\S+@\S+\.\S+/g)) {
            errors.email = 'Format'
        }

        this.setState({errors})
    }
}

export default ContactForm
