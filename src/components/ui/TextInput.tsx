import React from 'react'
import * as RX from 'reactxp'

import {styles} from '../../assets/Style'

interface TextInputProps extends RX.Types.TextInputProps {
    error?: boolean
    errorMessage?: string
}

class TextInput extends RX.Component<TextInputProps> {
    render() {
        const {
            error,
            errorMessage,
            autoCapitalize,
            returnKeyType,
            keyboardType,
            placeholder,
            value,
            onSubmitEditing,
            onChangeText,
        } = this.props
        return (
            <React.Fragment>
                <RX.TextInput
                    style={styles.input}
                    autoCapitalize={autoCapitalize}
                    returnKeyType={returnKeyType}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    value={value}
                    onSubmitEditing={onSubmitEditing}
                    onChangeText={onChangeText}
                />
                {error && (
                    <RX.Text style={styles.inputErrorMsg}>
                        {errorMessage}
                    </RX.Text>
                )}
            </React.Fragment>
        )
    }
}

export default TextInput
