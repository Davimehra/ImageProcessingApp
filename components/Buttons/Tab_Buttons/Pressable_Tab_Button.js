import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import LoadImages from "../../LoadingStateHttpRequest/UserImagesLoading";
import { setInputImageUri, setInputImageResponse, setCustomInputImageName, addUserInputImagesArray, setUserInputImagesArray } from '../../../redux/ImageUriSlice';
import axios from "axios";
import FormData from "form-data";
import { useEffect } from "react";

function Pressable_Tab_button({ library, iconName, color, size, title, focused, navigatorRoute }) {
    const [CameraPermissionStatus, RequestCameraPermission] = ImagePicker.useCameraPermissions();
    const [MediaLibraryPermission, RequestMediaLibraryPermission] = ImagePicker.useMediaLibraryPermissions();


    let form = new FormData();
    const dispatch = useDispatch();

    let UserId = useSelector((state) => state.UserInformationReducer.UserId); // Will Assign from redux USER TOKEN ID
    let RandomFileName = Date.now().toString();


    const navigation = useNavigation();


    async function uploadImageToBackend(response) {
        const { uri } = response;
        const format = ((uri).slice((uri).lastIndexOf('.') + 1));

        const tempFilename = `${UserId}_${RandomFileName}`;

        form.append('inputimage', {
            name: `${tempFilename}.${format}`,
            uri: uri,
            type: `${response.type}/${format}`
        })
        form.append('filename', tempFilename);


        dispatch(setCustomInputImageName({ FileNameAndExtensionObject: { fileName: RandomFileName, fileExtension: format } }));


        axios({
            url: `http://192.168.29.11:3001/api?UserId=${UserId}&filename=${RandomFileName}`,
            method: 'post',
            data: form,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log('Error: ', error)
        });

        try {
            const response = await LoadImages(UserId);
            dispatch(setUserInputImagesArray({ UserInputImagesArray: response }));
        } catch (error) {
            console.log(error);
        }
    }

    async function VerifyCameraPermissions() {
        if (CameraPermissionStatus.status === ImagePicker.PermissionStatus.UNDETERMINED) {
            const PermissionResponse = await RequestCameraPermission();
            return PermissionResponse.granted;
        }
        if (CameraPermissionStatus.status === ImagePicker.PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions', 'Permission Denied,App Cannot Access Camera is not Accessable');
            return false;
        }
        return true;

    }

    async function VerifyGalleryPermissions() {
        if (MediaLibraryPermission.status === ImagePicker.PermissionStatus.UNDETERMINED) {
            const PermissionResponse = await RequestMediaLibraryPermission();
            return PermissionResponse.granted;
        }
        if (MediaLibraryPermission.status === ImagePicker.PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions', 'Permission Denied,App Cannot Access Gallery is not Accessable');
            return false;
        }
        return true;

    }

    async function CameraPick() {
        // const CameraPermisions = ImagePicker.getCameraPermissionsAsync();

        // if (!CameraPermisions) {
        //     return;
        // }


        const CameraPermissionConst = await VerifyCameraPermissions();
        if (!CameraPermissionConst) {
            return;
        }


        await ImagePicker.launchCameraAsync({
            quality: 0.4,
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        }).then((response) => {
            if (response.uri) {
                dispatch(setInputImageUri({ ImageUri: response.uri }));
                dispatch(setInputImageResponse({ ImageResponse: response }));
                uploadImageToBackend(response);
                navigation.navigate('Camera_Image_Processing_Screen', { ClickedImageDetails: response })
            }

        }).catch((error) => { console.error(error) });
    }

    async function GalleryPicker() {
        // const GalleryPermisions = ImagePicker.getMediaLibraryPermissionsAsync();

        // if (!GalleryPermisions) {
        //     return;
        // }

        const GalleryPermission = await VerifyGalleryPermissions();
        if (!GalleryPermission) {
            return;
        }
        ImagePicker.launchImageLibraryAsync(
            {
                quality: 0.4,
                allowsEditing: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images
            }).then((response) => {

                if (response.uri) {


                    dispatch(setInputImageUri({ ImageUri: response.uri }));
                    dispatch(setInputImageResponse({ ImageResponse: response }));
                    uploadImageToBackend(response);
                    navigation.navigate('Gallery_Image_Processing_Screen', { ClickedImageDetails: response })
                }

            }).catch((error) => { console.error(error) });
    }

    return (
        <Pressable onPress={(navigatorRoute === 'Camera_Image_Processing_Screen') ? CameraPick : GalleryPicker}>
            <View style={focused ? [styles.ButtonContainer, styles.onfocus] : styles.ButtonContainer}>
                <View style={styles.IconStyle}>
                    {(library === 'FontAwesome5') ? <FontAwesome5 name={iconName} size={size} color={color} /> : null}
                    {(library === 'Ionicons') ? <Ionicons name={iconName} size={size} color={color} /> : null}
                </View>
                <Text style={styles.TitleStyle}>{title}</Text>
            </View>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,

    },
    IconStyle: {
        width: 35,
        justifyContent: "center",
        alignItems: "center"
    },
    TitleStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 20,
        textShadowColor: 'hsl(139, 36%, 78%)',
        textShadowOffset: { height: 0.2, width: 0.2 },
        textShadowRadius: 3
    },
    onfocus: {
        opacity: 0.7,
    }
})

export default Pressable_Tab_button;