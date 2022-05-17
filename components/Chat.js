import React from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import {
    View,
    Text,
    Platform,
    KeyboardAvoidingView
} from 'react-native';


const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBJ5QFzagZrNeYFvAS15k7-Rody_7iYGVQ",
    authDomain: "chat-app-9b1e8.firebaseapp.com",
    projectId: "chat-app-9b1e8",
    storageBucket: "chat-app-9b1e8.appspot.com",
    messagingSenderId: "421401197687",
    appId: "1:421401197687:web:bdf9eb7ed86605a9c09a72",
    measurementId: "G-7VT2GN5KP4"
};


export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: "",
                name: "",
                avatar: "",
            },
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.referenceChatMessages = firebase.firestore().collection("messages");


    }

    componentDidMount() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        this.referenceChatMessages = firebase.firestore().collection("messages");
        this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
            this.setState({
                uid: user.uid,
                messages: [],
                user: {
                    _id: user.uid,
                    name: name,
                    avatar: "https://placeimg.com/140/140/any",
                },
            });
            // listens for updates in the collection
            this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
            // create a reference to the active user's documents (shopping lists)
            this.referenceShoppinglistUser = firebase
                .firestore()
                .collection('messages')
                .where("uid", "==", this.state.uid);
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.authUnsubscribe();
    }

    // appends the new message a user just sent to the state messages so it can be displayed in chat
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessages();
        });
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
            });
        });
        this.setState({
            messages: messages,
        });
    };

    addMessages() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            _id: message._id,
            text: message.text || "",
            createdAt: message.createdAt,
            user: this.state.user,
        });
    }

    // ------------  Styles the text bubble 
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#ffda79',
                        color: '#000'
                    },
                    left: {
                        backgroundColor: '#f7f1e3',
                        color: '#000'
                    }
                }}
            />
        )
    }

    render() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        const { bgColor } = this.props.route.params;

        return (
            <View style={{
                flex: 1,
                // justifyContent: 'center',
                // alignItems: 'center',
                backgroundColor: bgColor
            }}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.state.user._id,
                        name: this.state.name,
                        avatar: this.state.user.avatar
                    }}
                />
                {/* KeyboardAvoidingView fixes some Android phones error (hiding input window)*/}
                {Platform.OS === 'android' ?
                    <KeyboardAvoidingView behavior='height' /> : null
                }
            </View>
        );
    };
}