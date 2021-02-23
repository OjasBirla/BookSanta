import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';

import db from '../config';
import firebase from 'firebase';

import { MyHeader } from '../Component/MyHeader';

export default class BookRequestScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            bookName: "",
            description: "",
            userID: firebase.auth().currentUser.email,
        }
    }

    createUniqueID = () => {
        return Math.random().toString(36).substring(7);
    }

    addRequest = (bookName, description) => {
        var userID = this.state.userID;
        var uniqueID = this.createUniqueID();

        db.collection("requested_books").add({
            "user_Id": userID,
            "book_name": bookName,
            "reson_to_request": description,
            "Request_Id": uniqueID
        })

        this.setState({bookName: "", description: ""});
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.container}>
                    <MyHeader title="Request Book" />

                    <TextInput style={styles.input}
                    placeholder="Name of the book"
                    onChangeText={(text) => {
                        this.setState({bookName: text})
                    }}
                    value = {this.state.bookName} />

                    <TextInput style={styles.input}
                    placeholder="Reason for the Book"
                    multiline={true}
                    onChangeText={(text) => {
                        this.setState({description: text})
                    }}
                    value = {this.state.description} />

                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.addRequest(this.state.bookName, this.state.description);
                    }}>
                        <Text>Request</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    input: {
        width: 300,
        height: 50,
        borderRadius: 100,
        margin: 10,
        borderWidth: 2,
        padding: 10,
    },

    button: {
        width: 200,
        height: 50,
        padding: 10,
        margin: 10,
        backgroundColor: "lightgreen",
        borderWidth: 2,
        borderRadius: 100,
        textAlign: "center",
        textAlignVertical: "center",
    },
})