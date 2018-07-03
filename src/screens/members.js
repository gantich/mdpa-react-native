import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import { COLORS } from '@lib/theme';

import _ from 'lodash';
import { observer } from 'mobx-react/native';

import currentUserStore from '@stores/user';
import membersStore from '@stores/members';
import { ProfilePicture } from '@components/profilePicture';

@observer
class MembersScreen extends Component {
    onUserPress = user => {
        this.props.navigation.navigate('UserProfile', user);
    };

    render() {
        return (
            <FlatList
                style={styles.flatList}
                data={membersStore.dataAsArray} // everytime the data changes we re-render the list
                keyExtractor={(item, idx) => {
                    // The keyExtractor gives us an unique key for the list cells for caching/recycling
                    // https://facebook.github.io/react-native/docs/flatlist.html#keyextractor
                    return `userItem_${idx}`;
                }}
                renderItem={({ item }) => {
                    const isOwnUser = item.userId == currentUserStore.data.uid;

                    return (
                        <TouchableOpacity
                            onPress={() => {
                                this.onUserPress(item);
                            }}
                        >
                            <View style={[styles.listItem, isOwnUser ? styles.ownListItem : styles.otherListItem]}>
                                <View style={styles.userAvatar}>
                                    <ProfilePicture style={{ size: 50, borderWidth: 2 }} imageUrl={ item.photo }/>
                                </View>
                                <Text style={styles.userName}>{`${item.name}`}</Text>
                                <Text style={styles.userDescription} numberOfLines={1} ellipsizeMode={'tail'}>
                                    {`${item.description || ''}`}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        height: 70,
        justifyContent: 'center',
        backgroundColor: COLORS.screenBackground
    },
    ownListItem: {
        backgroundColor: COLORS.secondary
    },
    otherListItem: {},
    userAvatar: {
        width: 50,
        height: 50,
        borderColor: COLORS.primary,
        position: 'absolute',
        top: 10,
        left: 10
    },
    userName: {
        marginLeft: 70,
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.primaryText
    },
    userDescription: {
        marginLeft: 70,
        marginRight: 25,
        fontSize: 14,
        color: COLORS.darkText
    },
    flatList: {
        backgroundColor: COLORS.screenBackground
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.lightBackground
    }
});

export default MembersScreen;
