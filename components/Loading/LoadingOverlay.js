import { useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet, Image, ImageBackground, } from "react-native";

function LoadingScreen({ message = "Loading...", color }) {


    return (
        <ImageBackground blurRadius={10} source={require('../../public/LogInbackgroundImage.jpg')} style={styles.LoadingScreenContiner}>

            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: "center" }}>
                <Image source={require('../../public/LoadingFastSpeed.gif')} resizeMethod='resize' style={{ height: 60, width: 60 }}></Image>

            </View>
            {/* <ActivityIndicator size='large' color={color} /> */}
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: "center" }}>
                <Text style={styles.LoadingText}>{message}</Text>
            </View>
            <View style={{ flex: 0.05, justifyContent: 'flex-end', alignItems: "center" }}>
                <Image source={require('../../public/LoadingBar.gif')} resizeMode="cover" style={{ width: '100%', height: 5 }} />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    LoadingScreenContiner: {
        flex: 1,
        justifyContent: 'center',

    },
    LoadingText: {
        fontWeight: 'bold',
    }
})

export default LoadingScreen;