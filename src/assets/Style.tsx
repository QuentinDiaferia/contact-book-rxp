import {Styles, Platform, UserInterface} from 'reactxp'

const measuredWindow = UserInterface.measureWindow()

export const dimensions = Object.assign({}, measuredWindow, {
    width: Platform.getType() === 'web' ? 800 : measuredWindow.width,
    globalPadding: 16,
})

export const colors = {
    primary: '#852015',
    secondary: '#c2cfd7',
    border: '#475159',
    white: '#fff',
    navbar: '#852015',
    sidebar: '#b12a1c',
}

export const styles = {
    root: Styles.createViewStyle({
        flex: 1,
        width: dimensions.width,
        height: dimensions.height,
    }),
    mainContent: Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        padding: dimensions.globalPadding,
        backgroundColor: colors.white,
    }),
    gestureWrapper: Styles.createViewStyle({
        height: dimensions.height,
    }),
    container: Styles.createViewStyle({
        flex: 1,
    }),
    contactHeader: Styles.createViewStyle({
        height: 60,
        borderBottomWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    }),
    buttonWrapper: Styles.createViewStyle({
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
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
        flex: 0,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    }),
    col2: Styles.createViewStyle({
        flex: 1,
        flexBasis: 0.5,
    }),
    flexRow: Styles.createViewStyle({
        flexDirection: 'row',
    }),
    input: [
        Styles.createViewStyle({
            padding: 5,
            marginTop: 2,
            marginBottom: 2,
        }),
        Styles.createTextInputStyle({
            borderBottomWidth: 1,
            borderColor: colors.border,
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
        width: dimensions.width - dimensions.globalPadding * 2,
        fontSize: 12,
    }),
}
