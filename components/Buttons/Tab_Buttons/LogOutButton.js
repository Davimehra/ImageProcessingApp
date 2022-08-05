import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { EmptyStorage } from "../../AutoLogin/AsyncStorageData";
import { resetEveryImageState } from "../../../redux/ImageUriSlice";
import { resetEveryUserInformationState } from '../../../redux/UserInformationSlice';

function LogOut_button({ library, iconName, color, size, title, focused }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    async function LogoutHandler() {
        try {
            const response = await EmptyStorage();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        // dispatch(resetEveryImageState());
        // dispatch(resetEveryUserInformationState());

        // navigation.navigate('LogOut_Screen');

    }


    return (
        <Pressable onPress={LogoutHandler}>
            <View style={focused ? [styles.ButtonContainer, styles.onfocus] : styles.ButtonContainer}>
                <View style={styles.IconStyle}>
                    {(library === 'FontAwesome5') ? <FontAwesome5 name={iconName} size={size} color={color} /> : null}
                    {(library === 'Ionicons') ? <Ionicons name={iconName} size={size} color={color} /> : null}
                </View>
                <Text >{title}</Text>
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
        fontSize: 15,
        marginLeft: 20,
        textShadowColor: 'hsl(139, 36%, 78%)',
        textShadowOffset: { height: 0.2, width: 0.2 },
        textShadowRadius: 3
    },
    onfocus: {
        opacity: 0.7,
    }
})

export default LogOut_button;