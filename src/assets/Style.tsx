import {Styles} from 'reactxp'

export const styles = {
    root: Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch'
    }),
    appWrapper: Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
    }),
    container: Styles.createViewStyle({
        flex: 1,
        alignItems: 'center',
    }),
    titleText: Styles.createTextStyle({
        fontSize: 16,
        textAlign: 'center',
        marginTop: 12,
        color: 'black'
    }),
    roundButton: Styles.createViewStyle({
        margin: 16,
        borderRadius: 16,
        backgroundColor: '#7d88a9'
    }),
    buttonText: Styles.createTextStyle({
        fontSize: 16,
        marginVertical: 6,
        marginHorizontal: 12,
        color: 'white'
    }),
    listItem: Styles.createViewStyle({
        alignItems: 'center',
        height: 32,
    }),
    listItemBtn: Styles.createTextStyle({
        textDecorationLine: 'underline',
    }),
}
