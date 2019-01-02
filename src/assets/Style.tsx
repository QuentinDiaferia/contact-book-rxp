import {Styles} from 'reactxp'

export const styles = {
    root: Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    }),
    container: Styles.createViewStyle({
        flex: 1,
        padding: 16,
        alignItems: 'center',
        alignSelf: 'stretch',
    }),
    scroll: Styles.createScrollViewStyle({
        alignSelf: 'stretch',
    }),
    titleText: Styles.createTextStyle({
        fontSize: 16,
        textAlign: 'center',
        marginTop: 12,
        color: 'black'
    }),
    progressMargin: Styles.createViewStyle({
        margin: 8
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
    list: Styles.createViewStyle({
        flexDirection: 'column',
        alignSelf: 'stretch',
    }),
    listItem: Styles.createViewStyle({
        alignItems: 'center',
    }),
    listItemBtn: Styles.createTextStyle({
        textDecorationLine: 'underline',
    }),
}
