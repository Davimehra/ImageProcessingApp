import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { setImageUri } from "../../redux/ImageUriSlice";
import LoadingScreen from '../../components/Loading/LoadingOverlay'

function Post_Filtering_Image_Screen({ route }) {
    // const Imageuri = route.params.ImageUri;

    let ImageUri = useSelector((state) => state.ImageUriReducer.OutputImageUri);

    const InputImageResponse = useSelector((state) => state.ImageUriReducer.InputImageResponse);

    const { width, height } = InputImageResponse;

    if (route.params?.ImageUri !== ImageUri) {
        return (<LoadingScreen message="Loading Image" />)
    }


    let MediaWidth;
    let MediaHeight;
    let Portraint = true;
    if (width > height) {
        Portraint = false;
        MediaWidth = 380;
        MediaHeight = 250;
    } else {
        Portraint = true;
        MediaWidth = 320;
        MediaHeight = 450;
    }


    return (
        <View style={{ flex: 1, overflow: 'hidden' }}>
            <ImageBackground source={{ uri: 'https://images.pexels.com/photos/3616764/pexels-photo-3616764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} resizeMode="cover" resizeMethod="scale" style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                <View style={[styles.ImageContainer, { width: MediaWidth, height: MediaHeight, backgroundColor: 'white' }]}>
                    <Image source={{ uri: ImageUri }} resizeMode="cover" style={{ width: MediaWidth, height: MediaHeight }}></Image>
                </View>
            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    ImageContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 20,
        marginTop: 10,
        borderTopWidth: 2,
        borderRightWidth: 3,
        borderColor: 'black'
    },
})

export default Post_Filtering_Image_Screen;