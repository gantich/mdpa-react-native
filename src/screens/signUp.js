import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from '@components/textInput';
import { COLORS, SIZES } from '@lib/theme';

import ErrorDialog from '@components/errorDialog';

import { register } from '@lib/api';

class SignUpScreen extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };

    state = {
        name: null,
        email: null,
        password: null,
        repeatPassword: null
    };

    onPressBack = () => {
        this.props.navigation.navigate('Login');
    };

    onSignupPress = async () => {
        const registered = await register({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        });

        if (!registered.error) {
            this.props.navigation.navigate('Tabs');
        } else {
            this.setState(
                {
                    hasError: true,
                    errorTitle: registered.error.message
                },
                () => {
                    this.setState({
                        hasError: false
                    });
                }
            );
        }
    };

    render() {
        const behavior = Platform.OS == 'ios' ? 'padding' : null;
        return (
            <KeyboardAvoidingView style={styles.container} behavior={behavior}>
                <ScrollView
                    style={styles.scrollview}
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>sign up</Text>
                        <Input placeholder={'Your Name'} onChangeText={text => this.setState({ name: text })} />
                        <Input
                            placeholder={'Your Email'}
                            onChangeText={text => this.setState({ email: text })}
                            autoCapitalize={'none'}
                        />
                        <Input
                            placeholder={'Password (min 6 chars)'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ password: text })}
                        />
                        <Input
                            placeholder={'Confirm Password'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ repeatPassword: text })}
                        />

                        <TouchableOpacity style={styles.signupButton} onPress={this.onSignupPress}>
                            <Text style={styles.signupButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.backButton} onPress={this.onPressBack}>
                    <Icon
                        name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                        size={30}
                        color={COLORS.lightText}
                    />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
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
    signupButton: {
        margin: SIZES.margin,
        height: SIZES.loginSignupInputHeight,
        padding: SIZES.padding,
        borderRadius: SIZES.loginSignupInputBorderRadius,
        width: SIZES.loginSignupInputWidth,
        backgroundColor: COLORS.lightButtonBackground,
        alignItems: 'center'
    },
    signupButtonText: {
        color: COLORS.darkText,
        fontSize: 15
    },
    backButton: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        left: 20,
        top: Platform.OS === 'ios' ? 40 : 20,
        height: 30
    },
    backButtonText: {
        marginLeft: SIZES.margin,
        color: COLORS.lightText,
        fontSize: 20
    }
});

export default SignUpScreen;
