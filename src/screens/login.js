import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import { Input } from '@components/textInput';
import { COLORS, SIZES } from '@lib/theme';
import { login } from '@lib/api';
import ErrorDialog from '@components/errorDialog';

class LoginScreen extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };

    state = {
        email: null,
        password: null,
        hasError: false, // this will handle the visibility of the ErrorDialog
        errorTitle: null
    };

    onPressSignup = () => {
        this.props.navigation.navigate('Signup');
        // we navigate to the Signup screen
        // every screen component will receive "navigation" in the props from react-navigation:
        // https://v2.reactnavigation.org/docs/en/navigation-prop.html
    };

    onLoginPress = async () => {
        if (!this.state.email || !this.state.password) {
            this.setState(
                {
                    hasError: true,
                    errorTitle: 'Empty email or password'
                },
                () => {
                    // We need this callback to set hasError back to false once the ErrorDialog is set to visible or it will display multiple times
                    this.setState({
                        hasError: false
                    });
                }
            );
        } else {
            const loggedIn = await login(this.state);
            if (!loggedIn.error) {
                this.props.navigation.navigate('Tabs');
            } else {
                this.setState(
                    {
                        hasError: true,
                        errorTitle: loggedIn.error.message
                    },
                    () => {
                        this.setState({
                            hasError: false
                        });
                    }
                );
            }
        }
    };

    render() {
        const behavior = Platform.OS == 'ios' ? 'padding' : null; // We set the behaviour of the KeyboardAvoidingView depending of the Platform

        return (
            <KeyboardAvoidingView style={styles.container} behavior={behavior}>
                <ScrollView
                    style={styles.scrollview}
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>login</Text>

                        <Input
                            placeholder={'Your Email'}
                            onChangeText={text => this.setState({ email: text })} // changing the value of the input text will chnage our state so we are able to use it in the onLoginPress method
                            autoCapitalize={'none'}
                            value={this.state.email}
                        />
                        <Input
                            placeholder={'Password'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ password: text })}
                            value={this.state.password}
                        />

                        <TouchableOpacity style={styles.loginButton} onPress={this.onLoginPress}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                        <Text style={styles.infoText}>Not a member yet?</Text>

                        <TouchableOpacity style={styles.signupButton} onPress={this.onPressSignup}>
                            <Text style={styles.signupButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <ErrorDialog
                    title={this.state.errorTitle}
                    message={this.state.errorMessage}
                    visible={this.state.hasError}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollview: {
        flex: 1,
        width: '100%'
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    title: {
        color: COLORS.lightTransparentText,
        fontSize: 40,
        textAlign: 'center',
        margin: SIZES.margin
    },
    loginButton: {
        margin: SIZES.margin,
        height: SIZES.loginSignupInputHeight,
        padding: SIZES.padding,
        borderRadius: SIZES.loginSignupInputBorderRadius,
        width: SIZES.loginSignupInputWidth,
        backgroundColor: COLORS.lightButtonBackground,
        alignItems: 'center'
    },
    loginButtonText: {
        color: COLORS.darkText,
        fontSize: 15
    },
    infoText: {
        marginBottom: 0,
        marginTop: 20,
        color: COLORS.lightText,
        fontSize: 12
    },
    signupButton: {
        marginTop: 0,
        padding: SIZES.padding
    },
    signupButtonText: {
        color: COLORS.lightText,
        fontSize: 15
    }
});

export default LoginScreen;
