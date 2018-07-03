import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import loginScreen from '@screens/login';

// usage of scoped imports to avoid cumbersome folder navigation eg: '../src/screens/login.js'
// https://docs.npmjs.com/getting-started/scoped-packages

import signupScreen from '@screens/signUp';
import membersScreen from '@screens/members';
import chatRoomsScreen from '@screens/chatRooms';

import chatScreen from '@screens/chat';
import webViewScreen from '@screens/webview';
import userProfile from '@screens/userProfile';

import { COLORS } from '@lib/theme';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { checkPushEnabled } from '@lib/api';

console.disableYellowBox = true; // Disable the yellow warning UI, we still can see the warnings in debugger

const tabNavigator = createBottomTabNavigator(
    // https://v2.reactnavigation.org/docs/en/bottom-tab-navigator.html
    {
        Members: {
            screen: membersScreen,
            navigationOptions: {
                title: 'Members',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name={focused ? 'ios-people' : 'ios-people-outline'} color={tintColor} size={28} />
                )
            }
        },
        Rooms: {
            screen: chatRoomsScreen,
            navigationOptions: {
                title: 'Rooms',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'} color={tintColor} size={28} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: COLORS.primary
        }
    }
);

const innerNavigator = createStackNavigator(
    // https://v2.reactnavigation.org/docs/en/stack-navigator.html
    {
        MainScreen: {
            screen: tabNavigator,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        UserProfile: {
            screen: userProfile
        },
        Chat: {
            screen: chatScreen
        },
        WebViewer: {
            screen: webViewScreen
        }
    },
    {
        navigationOptions: ({ navigation }) => {
            const { state } = navigation;
            let title;

            if (state.routes) {
                title = state.routes[navigation.state.index].routeName;
            } else {
                title = state.routeName;
            }

            return {
                title: title
            };
        }
    }
);

const authNavigator = createStackNavigator(
    {
        Login: {
            screen: loginScreen
        },
        Signup: {
            screen: signupScreen
        }
    },
    {
        headerMode: 'none',
        initialRouteName: 'Login'
    }
);

const rootNavigator = createStackNavigator(
    {
        Auth: {
            screen: authNavigator
        },
        Tabs: {
            screen: innerNavigator,
            navigationOptions: {
                gesturesEnabled: false
            }
        }
    },
    {
        headerMode: 'none',
        mode: 'modal',
        initialRouteName: 'Auth'
    }
);

checkPushEnabled();

export default rootNavigator;
