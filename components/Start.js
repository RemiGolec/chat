import React from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Pressable } from 'react-native';


import BackgroundImage from "../assets/BackgroundImage.png";

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            bgColor: this.colors.blue,
        }
    }

    // this function updates the state with new bgColor, chosen by user via the TouchableOpacity buttons
    changeBgColor = (newColor) => {
        this.setState({ bgColor: newColor });
    }

    // background colors to choose
    colors = {
        black: "#090C08",
        purple: "#474056",
        grey: "#8A95A5",
        green: "#B9C6AE",
        blue: "#1B70A0",
    };

    render() {
        return (

            <View style={styles.container}>
                <ImageBackground
                    source={BackgroundImage}
                    resizeMode="cover"
                    style={styles.backgroundImage}
                >
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>Chat App</Text>
                    </View>
                    <View style={styles.box}>
                        <TextInput
                            style={styles.inputBox}
                            onChangeText={(name) => this.setState({ name })}
                            placeholder="Hey, what's your name?"
                        />

                        <Text>
                            Choose Background Color:
                        </Text>
                        <View style={styles.colorsBox}>
                            <TouchableOpacity
                                style={styles.color1}
                                onPress={() => this.changeBgColor(this.colors.black)}
                            >
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.color2}
                                onPress={() => this.changeBgColor(this.colors.purple)}
                            >
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.color3}
                                onPress={() => this.changeBgColor(this.colors.grey)}
                            >
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.color4}
                                onPress={() => this.changeBgColor(this.colors.green)}
                            >
                            </TouchableOpacity>
                        </View>
                        <Pressable
                            style={styles.button}
                            onPress={() =>
                                this.props.navigation.navigate("Chat", {
                                    name: this.state.name,
                                    bgColor: this.state.bgColor,
                                })
                            }
                        >
                            <Text style={styles.buttonText}>
                                Start Chatting
                            </Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Background Image styling
    backgroundImage: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    // App title
    titleBox: {
        height: "50%",
        width: "88%",
        alignItems: "center",
        // backgroundColor: 'transparent'
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
        marginTop: '25%'
    },
    // UI box
    box: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: '88%',
        height: '44%',
        bottom: '6%',
        padding: '6%',
        justifyContent: 'space-between'
    },
    inputBox: {
        height: '20%',
        borderWidth: 2,
        borderColor: 'grey',
        padding: 10,
        borderRadius: 7,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 0.5
    },
    // colors
    colorsBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: '20%'
    },
    color1: {
        backgroundColor: "#090C08",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    color2: {
        backgroundColor: "#474056",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    color3: {
        backgroundColor: "#8A95A5",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    color4: {
        backgroundColor: "#B9C6AE",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    // Chat button
    button: {
        backgroundColor: '#757083',
        height: '20%',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

