import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';

import { COLORS, SIZES } from '@lib/theme';
import { ProfilePicture } from '@components/profilePicture';

const headerImages = [
    // we need to load all local images first as we cannot call them dynamically eg: require(`@images/header_pics/${idx}.jpg`),
    require(`@images/header_pics/0.jpg`),
    require(`@images/header_pics/1.jpg`),
    require(`@images/header_pics/2.jpg`),
    require(`@images/header_pics/3.jpg`),
    require(`@images/header_pics/4.jpg`),
    require(`@images/header_pics/5.jpg`)
];

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state.user = this.props.navigation.state.params;
        this.state.headerImage = headerImages[this.state.user.name.length % headerImages.length];
        // we determine a header image depending on the name length and the % (remainder) operator based on the number of static photos we have
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder_()
    }

    state = {};

    static navigationOptions = ({ navigation }) => {
        // we need to determine the title of the screen based on the user we display
        // https://v2.reactnavigation.org/docs/en/headers.html#setting-the-header-title
        const { params } = navigation.state;

        return {
            title: params ? params.name : 'No idea'
        };
    };
    render() {
        return (
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
                <Image style={styles.headerImage} source={this.state.headerImage} />
                <View style={ styles.userAvatar}>
                    <ProfilePicture style={{ size: 140, borderWidth: 2 }} imageUrl={ this.state.user.photo }/>
                </View>

                <Text style={styles.userName}>{this.state.user.name}</Text>
                <Text style={styles.userDescription}>{this.state.user.description}</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: COLORS.screenBackground
    },
    scrollContainer: {
        backgroundColor: COLORS.screenBackground,
        alignItems: 'center',
        flexGrow: 1
    },
    headerImage: {
        width: SIZES.screenWidth,
        height: SIZES.screenWidth * 0.6,
        top: 0,
        position: 'absolute'
    },
    userAvatar: {
        width: 140,
        height: 140,
        marginTop: SIZES.screenWidth * 0.6 - 70,
    },
    userName: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.primaryText
    },
    userDescription: {
        margin: 20,
        fontSize: 14,
        color: COLORS.darkText
    }
});

export default UserProfile;
