import { StyleSheet, Text, View, Image, FlatList, Pressable } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { setInputImageResponse, setInputImageUri, setCustomInputImageName } from "../../redux/ImageUriSlice";
import { useNavigation } from "@react-navigation/native";
function Welcome_Screen() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const UserImagesArray = useSelector((state) => state.ImageUriReducer.UserInputImagesArray);


    const MappedList = UserImagesArray.map((ArrayElement) => 'http://192.168.29.11:3001/input/' + ArrayElement);


    function OnpressHandler(item) {
        let Imagewidth;
        let Imageheight;
        Image.getSize(item, (width, height) => {
            Imagewidth = width;
            Imageheight = height;
        }, (error) => { console.log(error) });

        const FileName = item.split('_')[1].split('.')[0];
        const FileExtension = item.split('_')[1].split('.')[1];


        dispatch(setCustomInputImageName({ FileNameAndExtensionObject: { fileName: FileName, fileExtension: FileExtension } }));
        dispatch(setInputImageUri({ ImageUri: item }));
        dispatch(setInputImageResponse({ ImageResponse: { height: Imageheight, width: Imagewidth } }));

        navigation.navigate('ImageProcessingDrawer', {
            screen: 'Normal_Filter', params: { ImageUri: item }
        })
    }
    function FlatListRedering({ item }) {


        return (
            <Pressable onPress={OnpressHandler.bind(this, item)}>
                <View style={{ width: 310, height: 190, borderRadius: 10, margin: 10, marginLeft: 15, marginRight: 15, elevation: 20, overflow: 'hidden', borderBottomColor: 'grey' }}>
                    <Image style={{ width: 320, height: 200, }} source={{ uri: item }} ></Image>
                </View>
            </Pressable>
        )
    }
    return (
        <View style={styles.TopContainer}>
            <View style={{ height: "7%", alignItems: "flex-start", width: "100%", paddingLeft: 10 }}>
                {(UserImagesArray.length === 0) ? <Text style={styles.TitleStyle}>Not Recent Data Available</Text> : <Text style={styles.TitleStyle}>Recent Data</Text>}
            </View>
            <View style={{ height: "28%", backgroundColor: 'white', borderRadius: 10 }}>
                <FlatList horizontal data={MappedList} renderItem={FlatListRedering} showsHorizontalScrollIndicator={false} />

            </View>
            <View style={{ height: "60%", }}>
                <Text style={styles.TitleStyle}> Updates </Text>

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    TopContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: 50
    },
    TitleStyle: {
        fontSize: 20,
        alignSelf: "flex-start",
        padding: 10,
        fontWeight: 'bold'
    }
})

export default Welcome_Screen;