import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import FireBaseUplaodForm from './UploadForm';
import { useDispatch } from 'react-redux'
import { setTempUserImageUri } from '../../redux/ImageUriSlice';

export default function PopUpMenu({ setImageUri }) {
    const [profileImageUri, setProfileImageUri] = useState('');
    async function CameraPick() {
        let CameraPermissions = ImagePicker.getCameraPermissionsAsync();

        if (CameraPermissions) {
            try {
                const ImageResult = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    quality: 0.5,
                    aspect: [1, 1],
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                })


                if (!ImageResult.cancelled) {
                    setProfileImageUri(ImageResult.uri);
                    console.log(ImageResult.uri);
                    setImageUri(ImageResult.uri);

                }

            } catch (error) {
                console.log(error);
            }

        }
    }
    async function GalleryPick() {
        let GalleryPermissions = ImagePicker.getMediaLibraryPermissionsAsync();

        if (GalleryPermissions) {
            try {
                const ImageResult = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    quality: 0.5,
                    aspect: [1, 1],
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                })

                if (!ImageResult.cancelled) {
                    setProfileImageUri(ImageResult.uri);
                    console.log(ImageResult.uri);
                    setImageUri(ImageResult.uri);

                }
            } catch (error) {
                console.log(error);
            }

        }
    }
    return (
        <View >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginVertical: 10 }}>
                <View style={{ width: 80, height: 80, borderRadius: 40, overflow: 'hidden', borderWidth: 1, borderColor: "white", elevation: 4 }}>
                    <Image source={profileImageUri ? { uri: profileImageUri } : require('../../public/loginCredendialBackGround.jpg')} resizeMode="cover" style={{ width: 80, height: 80 }}></Image>
                </View>
                <Menu style={{ marginLeft: 40, overflow: 'hidden', borderRadius: 4 }} >
                    <MenuTrigger  >
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#365a9b', textShadowColor: "grey", textShadowOffset: { height: 1, width: 1 }, textShadowRadius: 1 }} >Add Profile Image </Text>
                        <Ionicons name='add-circle' size={24} />
                        {/* <View style={{ flexDirection: "row", alignItems: 'center', width: 50, borderWidth: 1, borderRadius: 4, elevation: 2, borderColor: "white", backgroundColor: "#9FA8DA", justifyContent: "space-evenly" }}>
                            
                          
                        </View> */}
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ backgroundColor: 'transparent', borderRadius: 10, elevation: 0, width: 100, overflow: 'hidden' }}>
                        <BlurView intensity={150} tint="light" >
                            <MenuOption onSelect={CameraPick} style={{ borderBottomColor: 'white', borderBottomWidth: 1 }} >
                                <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                                    <Ionicons name='camera' size={20} color="#3875a1" />
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Camera</Text>
                                </View>
                            </MenuOption>
                            <MenuOption onSelect={GalleryPick}  >
                                <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                                    <FontAwesome5 name='photo-video' size={20} color="#a7bcc9" />
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Gallery</Text>
                                </View>
                            </MenuOption>
                        </BlurView>

                    </MenuOptions>
                </Menu>
            </View>
        </View>

    )

};