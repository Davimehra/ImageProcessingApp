import { ImageBackground, Text, View, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SignIn } from "../../components/Authentication/SignUpAndSignInAuthentication";
import LoadImages from "../../components/LoadingStateHttpRequest/UserImagesLoading";
import { useDispatch, useSelector } from 'react-redux';
import { setisLogin, setUserId, setemail, setexpiresIn, setidToken, setrefreshToken, setUserFirstName, setUserLastName } from "../../redux/UserInformationSlice";
import { setUserInputImagesArray } from '../../redux/ImageUriSlice';
import LoadingScreen from "../../components/Loading/LoadingOverlay";
import FireBaseUplaodForm from "../../components/Authentication/UploadForm";
import { DownloadDataFromFireBase } from "../../components/Authentication/Upload_Download_UserData_Firebase";

import { setUserImageUri } from "../../redux/ImageUriSlice";
import { LocalStoringFirst, LocalStoringSecond, LocalStoringThird } from "../../components/AutoLogin/AsyncStorageData";

function LogIn_Screen() {
    const [IsAuthenticating, setIsAuthenticating] = useState(false);

    const [passwordHidden, setPasswordHidden] = useState(true);
    const [passwordInput, setPasswordInput] = useState('');
    const [EmailInput, setEmailInput] = useState('');
    const [EmailIconName, setEmailIconName] = useState('email');
    const [EmailIconColor, setEmailIconColor] = useState('black');
    const [localId, setLocalId] = useState('');
    const navigation = useNavigation();

    const dispatch = useDispatch();


    function PasswordHideHandler() {
        (passwordHidden === true) ? setPasswordHidden(false) : setPasswordHidden(true);

    }
    function EmailOnchangeHandler(edditingText) {

        if ((edditingText.includes('@gmail') || edditingText.includes('@yahoo')) || edditingText.includes('@outlook') || (edditingText.includes('@icloud'))) {
            { (edditingText.includes('@gmail')) && (setEmailIconName('gmail'), setEmailIconColor('red')) };
            { (edditingText.includes('@yahoo')) && (setEmailIconName('yahoo'), setEmailIconColor('blue')) };
            { (edditingText.includes('@outlook')) && (setEmailIconName('microsoft-outlook'), setEmailIconColor('blue')) };
            { (edditingText.includes('@icloud')) && (setEmailIconName('apple-icloud'), setEmailIconColor('blue')) };
        } else {
            setEmailIconName('email');
            setEmailIconColor('black');
        }



        setEmailInput(edditingText);
    }


    function PasswordOnchangeHandler(edditingText) {
        setPasswordHidden(true);
        setPasswordInput(edditingText);
    }

    async function SignInHandler() {
        setIsAuthenticating(true);
        let LocalID = '';
        try {
            let response = await SignIn(EmailInput, passwordInput);
            const { refreshToken, localId, idToken, expiresIn, email } = response.data;
            LocalID = localId;
            dispatch(setidToken({ idToken: idToken }));
            dispatch(setrefreshToken({ refreshToken: refreshToken }));
            dispatch(setUserId({ userId: localId }));
            dispatch(setexpiresIn({ expiresIn: expiresIn }));
            dispatch(setemail({ email: email }));
            dispatch(setisLogin({ isLogin: true }));
            LocalStoringFirst(localId, idToken, expiresIn, email, refreshToken);

            await DownloadDataFromFireBase('', localId).then((response) => {
                console.log("User Data Avaoilable ");
                dispatch(setUserFirstName({ UserFirstName: response.firstName }));
                dispatch(setUserLastName({ UserLastName: response.lastName }));
                LocalStoringSecond(response.firstName, response.lastName);
            }).catch((error) => {
                console.log("Errorroro:", error);
            })
            // await FireBaseUplaodForm('', localId, 'download').then((response) => {
            //     console.log(response)
            // }).catch((error) => {
            //     console.log(error)
            // })
            await FireBaseUplaodForm('', localId, 'download').then((response) => {
                dispatch(setUserImageUri({ UserImageUri: response }));
                LocalStoringThird(response);
            }).catch((error) => {
                console.log("error Output Downlaod :", error);
            })





        } catch (error) {
            if (error) {
                Alert.alert('Invalid Credentials', "Enter Valid Email and Password");
            }
            setIsAuthenticating(false);
        }

        try {
            const response = await LoadImages(LocalID);
            dispatch(setUserInputImagesArray({ UserInputImagesArray: response }));
        } catch (error) {
            console.log(error);
        }



    }
    if (IsAuthenticating) {
        return (<LoadingScreen message="Signing In..." />)
    }

    return (
        <ImageBackground source={require('../../public/LogInbackgroundImage.jpg')} resizeMode='cover' blurRadius={10} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <BlurView intensity={20} tint="light" source={require('../../public/loginCredendialBackGround.jpg')} style={{ justifyContent: 'center', alignItems: 'center', minWidth: 350, height: 500, borderTopEndRadius: 80, borderBottomStartRadius: 80, elevation: 7 }}>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: 'center', }}>

                        <MaterialCommunityIcons name="login" size={22} color="black" style={{ paddingBottom: 20, paddingRight: 4 }} />

                    </View>
                    <BlurView intensity={100} tint="light" style={[styles.CredentialsContainer, { flexDirection: 'row', alignItems: "center" }]}>
                        <TextInput placeholder="Email Address" style={styles.CredentialsText} onChangeText={EmailOnchangeHandler} value={EmailInput}></TextInput>

                        <MaterialCommunityIcons name={EmailIconName} size={20} color={EmailIconColor} />


                    </BlurView>
                </View>


                <View style={{ flex: 1, }}>
                    <View style={{ flex: 1 }}>
                        <BlurView intensity={100} tint="light" style={[styles.CredentialsContainer, { flexDirection: 'row', alignItems: "center" }]}>
                            <TextInput secureTextEntry={passwordHidden} onChangeText={PasswordOnchangeHandler} value={passwordInput} placeholder="Password" style={styles.CredentialsText}></TextInput>
                            <Pressable onPress={PasswordHideHandler}>
                                {passwordHidden && <MaterialCommunityIcons name="sunglasses" size={20} color="black" />}
                                {!passwordHidden && <MaterialCommunityIcons name="glasses" size={20} color="black" />}
                            </Pressable>
                        </BlurView>
                    </View>

                    <View style={{ MarginTop: 100, flex: 3, }}>
                        <Pressable onPress={SignInHandler} style={({ pressed }) => (pressed) ? { flexDirection: "row", alignItems: "center", opacity: 0.6 } : { flexDirection: "row", alignItems: "center" }}>

                            <Text style={{ fontSize: 20, padding: 10, color: "#2f3f60", fontWeight: 'bold', textShadowOffset: { height: 1, width: 1 }, textShadowRadius: 2, textShadowColor: 'grey' }}>Login</Text>
                        </Pressable>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", flex: 1, paddingBottom: 10, paddingLeft: 5 }}>
                        <Text style={{ marginLeft: 40 }}>Terms</Text>
                        <Pressable onPress={() => { navigation.navigate('Signup_Screen') }} style={({ pressed }) => (pressed) ? { flexDirection: "row", alignItems: "center", opacity: 0.6 } : { flexDirection: "row", alignItems: "center" }}>
                            <Text>Signup</Text>
                            <MaterialCommunityIcons name="step-forward" size={19} color="black" style={{ paddingTop: 4 }} />

                        </Pressable>
                    </View>
                </View>

            </BlurView>


        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    CredentialsContainer: {
        borderBottomWidth: 3,
        padding: 4,
        minWidth: 280,
        minHeight: 40,
        marginVertical: 5,
        borderRadius: 6,
        borderColor: '#a8b2b6',
        overflow: 'hidden',

    },
    CredentialsText: {
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        fontSize: 12



    }
})

export default LogIn_Screen;