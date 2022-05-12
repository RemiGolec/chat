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

export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: '',
                name: '',
                avatar: '',
            },
        }

        // SDK from Firestore
        const firebaseConfig = {
            apiKey: "AIzaSyBJ5QFzagZrNeYFvAS15k7-Rody_7iYGVQ",
            authDomain: "chat-app-9b1e8.firebaseapp.com",
            projectId: "chat-app-9b1e8",
            storageBucket: "chat-app-9b1e8.appspot.com",
            messagingSenderId: "421401197687",
            appId: "1:421401197687:web:bdf9eb7ed86605a9c09a72",
            measurementId: "G-7VT2GN5KP4"
        };

        // initializes the Firestore app
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // references the collection to query its documents
        this.referenceChatMessages = firebase
            .firestore()
            .collection('messages');

    }


    componentDidMount() {
        let name = this.props.route.params.name;

        this.referenceChatMessages = firebase
            .firestore()
            .collection('messages');

        this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)

        this.setState({
            messages: [
                {
                    _id: 1,
                    text: `Hello ${name}`,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: `Welcome to the chat ${name}`,
                    createtAt: new Date(),
                    system: true,
                }
            ],
        })
    }

    componentWilUnmount() {
        this.unsubscribe();
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }
    // ------------  Styles the text bubble 
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#884dff'
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
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.state.user._id,
                        name: this.state.name,
                        avatar: this.state.user.avatar,
                    }}
                />
                {/* KeyboardAvoidingView fixes some Android phones error (hiding input window)*/}
                {Platform.OS === 'android' ?
                    <KeyboardAvoidingView behavior='height' /> : null
                }
                {/* example of accessibility code in action button:
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="More options"
                        accessibilityHint="Lets you choose to send an image or your geolocation."
                        accessibilityRole="button"
                        onPress={this._onPress}>
                        <View style={styles.button}>
                        ...
                        </View>
                        </TouchableOpacity>
                */}

            </View>
        );
    };
}