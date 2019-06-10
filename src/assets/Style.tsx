import {Styles, Platform, UserInterface} from 'reactxp'

const dimensions = UserInterface.measureWindow()
if (Platform.getType() === 'web') {
    dimensions.width = 800
}

const globalPadding = 16

export const colors = {
    primary: '#852015',
    secondary: '#c2cfd7',
    border: '#475159',
    white: '#fff',
}

export const styles = {
    root: Styles.createViewStyle({
        flex: 1,
        width: dimensions.width,
        height: dimensions.height,
    }),
    gestureWrapper: Styles.createViewStyle({
        width: dimensions.width - (globalPadding * 2),
        height: dimensions.height - (globalPadding * 2),
    }),
    appWrapper: Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        padding: globalPadding,
        backgroundColor: colors.white,
    }),
    container: Styles.createViewStyle({
        flex: 1,
        alignItems: 'center',
    }),
    contactHeader: Styles.createViewStyle({
        height: 60,
        borderBottomWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    }),
    roundButton: Styles.createViewStyle({
        margin: 16,
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    }),
    buttonText: Styles.createTextStyle({
        fontSize: 16,
        color: colors.white,
    }),
    list: Styles.createViewStyle({
        alignSelf: 'stretch',
    }),
    listItem: Styles.createViewStyle({
        alignItems: 'center',
        height: 32,
    }),
    listItemBtn: Styles.createTextStyle({
        textDecorationLine: 'underline',
    }),
    row: Styles.createViewStyle({
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    }),
    col2: Styles.createViewStyle({
        width: (dimensions.width - globalPadding * 2) / 2,
    }),
    col4: Styles.createViewStyle({
        width: (dimensions.width - globalPadding * 2) / 4,
    }),
    flexRow: Styles.createViewStyle({
        flexDirection: 'row',
    }),
    input: [
        Styles.createViewStyle({
            width: dimensions.width - globalPadding * 2,
            borderBottomWidth: 1,
            borderColor: colors.border,
            padding: 5,
            marginTop: 2,
            marginBottom: 2,
        }),
        Styles.createTextStyle({
            fontSize: 16,
        }),
    ],
    inputError: Styles.createViewStyle({
        borderColor: colors.primary,
    }),
    inputErrorMsg: Styles.createTextStyle({
        color: colors.primary,
        width: dimensions.width - globalPadding * 2,
        fontSize: 12,
    }),
}
