import { useLayoutEffect } from "react";
import { Button, Image, StyleSheet, View, Text, ScrollView, ImageBackground } from "react-native";
import FunctionAndFontButton from "../../components/Buttons/NavigatingButtons/functionAndFontButton";

function Post_Selected_Image_Screen({ route, navigation }) {
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => {
    //             return (<FunctionAndFontButton library="FontAwesome5" size={24} color="#e64e4b" name="hand-point-up" onPress={() => { navigation.navigate('ImageProcessingDrawer') }} />)
    //         }
    //     })
    // }, [])
    const { width, height, type, uri } = route.params.ClickedImageDetails;

    let MediaWidth;
    let MediaHeight;
    let Portraint = true;
    let ImageName = (uri).slice((uri).lastIndexOf('/') + 1);
    let ImageFormat = ImageName.split('.')[1];

    if (width > height) {
        Portraint = false;
        MediaWidth = 380;
        MediaHeight = 250;
    } else {
        Portraint = true;
        MediaWidth = 320;
        MediaHeight = 450;
    }

    // navigation.navigate('ImageProcessingDrawer', {
    //     screen: 'Normal_Filter', params: { ImageDetails: { ...route.params.ClickedImageDetails } }
    // })
    return (
        <View style={{ borderLeftWidth: 5, borderRightWidth: 5, borderBottomWidth: 5, flex: 1, overflow: 'hidden' }}>

            <ImageBackground blurRadius={8} source={{ uri: uri }} style={{ flex: 1 }}>
                <View style={styles.TopContainer}>
                    <View style={{ width: "100%", alignItems: 'flex-end', marginTop: 20 }}>
                        <FunctionAndFontButton library="FontAwesome5" size={25} color="#e64e4b" name="long-arrow-alt-right" onPress={() => {
                            navigation.navigate('ImageProcessingDrawer', {
                                screen: 'Normal_Filter', params: { ImageUri: uri }
                            })
                        }} />
                    </View>
                    <View style={[styles.ImageContainer, { width: MediaWidth, height: MediaHeight, backgroundColor: 'white' }]}>
                        <Image source={{ uri: uri }} resizeMode="cover" style={{ width: MediaWidth, height: MediaHeight }}></Image>
                    </View>
                    <Text style={styles.TitleTextStyle}>Natural Image Preview</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} overScrollMode='auto' style={styles.TopDetailContainerStyle} StickyHeaderComponent={undefined} stickyHeaderIndices={[0]} >
                    <View>
                        <View style={styles.DetailTitleContainer}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', textShadowColor: 'grey', textShadowOffset: { height: 0.4, width: 0.4 }, textShadowRadius: 2 }}>Properties</Text>
                        </View>
                    </View>

                    <View style={styles.DetailItemContainer}>
                        <Text style={styles.DetailsItemStyle}>Filter : <Text style={styles.DetailItemResultStyle}>Normal RGB Format</Text></Text>
                        <Text style={styles.DetailsItemStyle}>Original Width : <Text style={styles.DetailItemResultStyle}>{width}px</Text></Text>
                        <Text style={styles.DetailsItemStyle}>Original Height: <Text style={styles.DetailItemResultStyle}>{height}px</Text></Text>
                        <Text style={[styles.DetailsItemStyle, { marginTop: 10 }]}>Original Name: <Text style={styles.DetailItemResultStyle}>{ImageName}</Text>  </Text>

                        <Text style={[styles.DetailsItemStyle, { marginTop: 10 }]}>Type: <Text style={styles.DetailItemResultStyle}>{ImageFormat}</Text>  </Text>



                    </View>
                </ScrollView >
            </ImageBackground>

        </View>
    )
}


const styles = StyleSheet.create({
    TopContainer: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'transparent',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        paddingTop: 50

    },
    TitleTextStyle: {
        fontWeight: "bold",
        fontSize: 25,
        marginVertical: 10,
        paddingLeft: 10,
        color: 'hsl(221, 51%, 16%)',
        textShadowColor: "white",
        textShadowRadius: 4,
        textShadowOffset: { height: 0.5, width: 1 }
    },
    ImageContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 20,
        marginTop: 10,
        borderTopWidth: 2,
        borderRightWidth: 3,
        borderColor: 'black'
    },
    DetailTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: "100%",
        paddingLeft: 5,
        padding: 2,
        borderBottomRightRadius: 5,
        borderTopEndRadius: 5,
        backgroundColor: 'transparent'
    },
    DetailItemContainer: {
        marginLeft: 80,
        padding: 5,
    },
    DetailsItemStyle: {
        fontWeight: "bold",
        fontSize: 13,
        color: "hsl(0, 0%, 90%)",
        textShadowColor: "hsl(207, 95%, 8%)",
        textShadowRadius: 2,
        textShadowOffset: { height: 0.5, width: 0.5 },
        paddingVertical: 5

    },
    DetailItemResultStyle: { fontSize: 13, fontWeight: '400' },
    TopDetailContainerStyle: {
        paddingLeft: 10,
        paddingRight: 30,
        backgroundColor: 'transparent',
    }
})

export default Post_Selected_Image_Screen;