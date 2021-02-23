import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';

import firebase from 'firebase';

export default class CustomSidebarMenu extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <DrawerItems {...this.props} />
                    <TouchableOpacity style={styles.logOutButton}
                    onPress={() => {
                        this.props.navigation.navigate("LogIn");
                        firebase.auth().signOut();
                    }}>
                        <Text>SignOut</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    logOutButton: {
        width: 200,
        height: 50,
        padding: 10,
        margin: 10,
        backgroundColor: "lightgreen",
        borderWidth: 2,
        borderRadius: 100,
        textAlign: "center",
        textAlignVertical: "center",
    }
})