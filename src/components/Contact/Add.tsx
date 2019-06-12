import React from 'react'
import * as RX from 'reactxp'

import Navigation, {NavigationRouteId} from '../../helper/Navigation'
import Contacts from '../../api/Contacts'
import ContactModel from '../../models/Contact'

import TextInput from '../ui/TextInput'

import {styles} from '../../assets/Style'

interface FormValues {
    name?: string
    email?: string
}

interface ContactFormState {
    form: FormValues
    errors: FormValues
    globalError?: string
}

class ContactForm extends RX.Component<{}, ContactFormState> {
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
        return <RX.View
            useSafeInsets={true}
            style={styles.container}
        >
            {this.renderForm()}
        </RX.View>
    }

    private renderForm() {
        const {
            form,
            errors,
            globalError,
        } = this.state
        return (
            <RX.View style={styles.container}>
                {globalError ? (
                    <RX.Text>
                        {globalError}
                    </RX.Text>
                ) : null}
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
                    autoCapitalize="none"
                    returnKeyType="next"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    value={form.email || ''}
                    onSubmitEditing={this.handleSubmit}
                    onChangeText={this.handleChange('email')}
                    error={!!errors.email}
                    errorMessage={errors.email}
                />
                <RX.View style={styles.buttonWrapper}>
                    {RX.Platform.getType() === 'web' && (
                        <RX.Button
                            style={styles.roundButton}
                            onPress={Navigation.goBack}
                        >
                            <RX.Text style={styles.buttonText}>
                                Back
                            </RX.Text>
                        </RX.Button>
                    )}
                    <RX.Button
                        style={styles.roundButton}
                        onPress={this.handleSubmit}
                    >
                        <RX.Text style={styles.buttonText}>
                            Save
                        </RX.Text>
                    </RX.Button>
                </RX.View>
            </RX.View>
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
        const errors: FormValues = {}

        if (!form.name || !form.name.length) {
            errors.name = 'Required'
        }

        if (!form.email || !form.email.length) {
            errors.email = 'Required'
        } else if (!form.email.match(/\S+@\S+\.\S+/g)) {
            errors.email = 'Format'
        }

        this.setState({errors})

        if (!Object.keys(errors).length) {
            Contacts.create(form as ContactModel).then(() => {
                Navigation.goTo(NavigationRouteId.ContactList)
            }).catch(() => {
                this.setState({
                    globalError: 'Request error',
                })
            })
        }
    }
}

export default ContactForm
