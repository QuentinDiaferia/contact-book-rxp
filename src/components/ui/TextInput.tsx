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
            ...other
        } = this.props
        return (
            <React.Fragment>
                <RX.TextInput
                    style={styles.input}
                    {...other}
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
