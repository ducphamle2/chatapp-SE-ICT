/**
 * define all style Login screen
 * @author DucPL
 */

import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    loginBtnBox: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Josefin Sans'
    },
    loginText: {
        color: '#3399CC',
        fontSize: 12.5,
        fontWeight: 'bold'
    },
    loginButton: {
        marginBottom: 15,
        marginTop: 15,
        marginLeft: 135,
        marginRight: 50,
        backgroundColor: '#DB1E4A',
        height: height / 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: (width * 2) / 6,
        //borderRadius: 25,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 1.0
    },
});

export default LoginStyle;
