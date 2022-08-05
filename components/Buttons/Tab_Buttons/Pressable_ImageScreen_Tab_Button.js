import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setOutputImageUri } from '../../../redux/ImageUriSlice'


function Pressable_ImageScreen_Tab_button({ library, iconName, color, size, title, focused, navigatorRoute }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let UserId = useSelector((state) => state.UserInformationReducer.UserId);
    const CustomInputImageName = useSelector((state) => state.ImageUriReducer.CustomInputImageName);

    const { fileName, fileExtension } = CustomInputImageName;
    const InputImage = useSelector((state) => state.ImageUriReducer.InputImageUri);

    let HostUrl = 'htttp://localhost:3001/api/scriptexecute';

    function NavigationHandler() {
        if (navigatorRoute === 'Normal_Filter') {
            dispatch(setOutputImageUri({ ImageUri: InputImage }));
            navigation.navigate(navigatorRoute, { ImageUri: InputImage });
        }


        if (navigatorRoute === 'GreyScaled_Filter') {
            const scriptname = 'GreyScaled';

            axios.get(`http://192.168.29.11:3001/api/scriptexecute?scriptname=${scriptname}&fileName=${fileName}&fileExtension=${fileExtension}&UserId=${UserId}`, {}).then((response) => {
                console.log("Get Request Executed Successfuly = ", response.data);
                dispatch(setOutputImageUri({ ImageUri: `http://192.168.29.11:3001/output/${scriptname}_${UserId}_${fileName}.${fileExtension}` }));
                navigation.navigate(navigatorRoute, { ImageUri: `http://192.168.29.11:3001/output/${scriptname}_${UserId}_${fileName}.${fileExtension}` });
            }).catch((err) => {
                console.error(err);
            })

        }
        if (navigatorRoute === 'EdgeDetector_Filter') {
            const scriptname = 'EdgeDetector';

            axios.get(`http://192.168.29.11:3001/api/scriptexecute?scriptname=${scriptname}&fileName=${fileName}&fileExtension=${fileExtension}&UserId=${UserId}`, {}).then((response) => {
                console.log("Get Request Executed Successfuly = ", response.data);
                dispatch(setOutputImageUri({ ImageUri: `http://192.168.29.11:3001/output/${scriptname}_${UserId}_${fileName}.${fileExtension}` }));

            }).catch((err) => {
                console.error(err);
            })
            navigation.navigate(navigatorRoute, { ImageUri: `http://192.168.29.11:3001/output/${scriptname}_${UserId}_${fileName}.${fileExtension}` });

        }
    }

    return (
        <Pressable onPress={NavigationHandler}>
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

export default Pressable_ImageScreen_Tab_button;