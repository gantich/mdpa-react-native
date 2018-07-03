import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = {
    primary: '#19A5E4',
    secondary: '#ECEFF1',
    borderColor: '#FFF',
    lightText: '#FFF',
    darkText: '#333',
    primaryText: '#000',
    lightTransparentText: '#FFFFFF77',
    lightButtonBackground: '#FFF',
    screenBackground: '#FFF',
    darkBackground: '#333',
    lightBackground: '#999',
    lightHyperlink: '#555',
    darkHyperlink: '#2980b9'
};
const SIZES = {
    screenWidth: width,
    screenHeight: height,
    margin: 10,
    padding: 5,
    loginSignupInputBorderRadius: 10,
    loginSignupInputBorderWidth: 1,
    loginSignupInputHeight: 30,
    loginSignupInputWidth: width * 0.6
};

export { COLORS, SIZES };
