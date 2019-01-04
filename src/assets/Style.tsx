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
    contactHeader: Styles.createViewStyle({
        height: 60,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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
        color: 'white',
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
}
