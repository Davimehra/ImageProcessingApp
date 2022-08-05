import { ImageBackground, Text, View, TextInput, StyleSheet, Pressable, Alert, Image } from "react-native";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useLayoutEffect, useState } from "react";
import { SignUp } from "../../components/Authentication/SignUpAndSignInAuthentication";
import FetchingUserProfileImage from "../../components/Authentication/UploadImage_LocalId";
import { validEmail } from "../../components/Rejex/EmailAndPasswordCheck";
import { validPassword } from "../../components/Rejex/EmailAndPasswordCheck";
import LoadingScreen from "../../components/Loading/LoadingOverlay";
import PopUpMenu from "../../components/Authentication/UploadFilePopupOptions";
import { useSelector } from 'react-redux';
import FireBaseUplaodForm from "../../components/Authentication/UploadForm";
import { StoringDataToFireBase } from "../../components/Authentication/Upload_Download_UserData_Firebase";


function Signup_Screen({ navigation }) {
    const [IsAuthenticating, setIsAuthenticating] = useState(false);

    const [FirstUsername, setFirstUserName] = useState('')
    const [LastUsername, setLastUserName] = useState('')

    const [UserProfileImage, setImageUri] = useState('none');
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [passwordInput, setPasswordInput] = useState('');
    const [ConfirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [ConfirmPasswordMatched, setConfirmPasswordMatched] = useState(false);
    const [PasswordExpressionError, setPasswordExpressionError] = useState(false);

    const [EmailInput, setEmailInput] = useState('');
    const [ConfirmEmailInput, setConfirmEmailInput] = useState('');
    const [ConfirmEmailMatched, setConfirmEmailMatched] = useState(false);
    const [EmailExpressionError, setEmailExpressionError] = useState(false);

    const [EmailIconName, setEmailIconName] = useState('email');
    const [EmailIconColor, setEmailIconColor] = useState('black');





    useLayoutEffect(() => {
        if (passwordInput.length === 0 & ConfirmPasswordInput.length === 0) {
            setConfirmPasswordMatched(false);
        }


        if (EmailInput.length === 0 & ConfirmEmailInput.length === 0) {
            setConfirmEmailMatched(false);
        }

        if (EmailInput.length !== 0 || ConfirmEmailInput.length !== 0) {
            if (EmailInput !== ConfirmEmailInput) {
                setConfirmEmailMatched(false);
            } else { setConfirmEmailMatched(true); }
        }

        if (passwordInput.length !== 0 || ConfirmPasswordInput.length !== 0) {

            if (passwordInput !== ConfirmPasswordInput) {
                setConfirmPasswordMatched(false);
            } else {
                setConfirmPasswordMatched(true);
            }
        }




    }, [passwordInput, ConfirmPasswordInput, EmailInput, ConfirmEmailInput])


    function PasswordHideHandler() {
        (passwordHidden === true) ? setPasswordHidden(false) : setPasswordHidden(true);


    }
    function EmailOnchangeHandler(edditingText) {
        if (!validEmail.test(edditingText)) {
            setEmailExpressionError(true);
        } else {

            setEmailExpressionError(false);
        }


        if (edditingText === ConfirmEmailInput) {
            setConfirmEmailMatched(true);
        } else {
            setConfirmEmailMatched(false);
        }



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


    function ConfirmEmailChecker(edditingText) {

        setConfirmEmailInput(edditingText);
        if (edditingText === EmailInput) {
            setConfirmEmailMatched(true);
        } else {
            setConfirmEmailMatched(false);
        }

    }


    function PasswordOnchangeHandler(edditingText) {
        if (!validPassword.test(edditingText)) {
            setPasswordExpressionError(true);
        } else {
            setPasswordExpressionError(false);
        }
        setPasswordHidden(true);
        setPasswordInput(edditingText);
    }

    function setConfirmPasswordHandler(edditingText) {
        setConfirmPasswordInput(edditingText);
        if (edditingText === passwordInput) {
            setConfirmPasswordMatched(true);
        } else {
            setConfirmPasswordMatched(false);
        }
    }
    function resetDetails() {

        setFirstUserName('');
        setLastUserName('');
        setConfirmEmailInput('');
        setEmailInput('');
        setEmailIconName('email');
        setConfirmPasswordInput('');
        setPasswordInput('');
        setPasswordHidden(true);
    }

    async function SignUpHandler() {

        if (FirstUsername.length === 0 || LastUsername.length === 0 || EmailInput.length === 0 || passwordInput.length === 0) {

            if (FirstUsername.length === 0) {
                Alert.alert('Empty First Name Feild', 'Please fill User First Name')
            }
            if (LastUsername.length === 0) {
                Alert.alert('Empty Last Name Feild', 'Please fill User Last Name')
            }
            if (EmailInput.length === 0) {
                Alert.alert('Empty Email Feild', 'Please fill Email Address')
            }
            if (passwordInput.length === 0) {
                Alert.alert('Empty Password Feild', 'Please fill User Password')
            }
        } else {
            if (EmailExpressionError || PasswordExpressionError || !ConfirmEmailMatched || !ConfirmPasswordMatched) {
                if (EmailExpressionError) {
                    Alert.alert('Invalid Email', 'Email must be in this format abcd@abcd.com')
                }
                if (PasswordExpressionError) {
                    Alert.alert('Invalid Password', 'Password Must Contain (Digits and Alphbets) of atleast 8 Chracters ')
                }
                if (!ConfirmEmailMatched) {
                    Alert.alert('Invalid Details', 'Email Not Matched')
                }
                if (!ConfirmPasswordMatched) {
                    Alert.alert('Invalid Details', 'Password Not Matched')
                }
            } else {
                setIsAuthenticating(true);

                try {
                    let response = await SignUp(EmailInput, passwordInput);
                    if (response) {
                        console.log(response);
                        // const UserImageUri = useSelector((state) => state.ImageUriReducer.tempUserImageUri)
                        // FetchingUserProfileImage(response.data.localId);

                        StoringDataToFireBase('', response.data.localId, {
                            firstName: FirstUsername,
                            lastName: LastUsername, ...response.data
                        });

                        try {
                            let UploadResponse = FireBaseUplaodForm(UserProfileImage, response.data.localId, 'upload');
                            console.log("Upload User Profile Pic Response = ", UploadResponse);
                            resetDetails();
                        } catch (error) {
                            console.log("Upload User Profile Pic Error= ", error);
                        }
                        Alert.alert("SignUp Successfull", 'Navigating To Login', [{
                            text: "Login Page",
                            onPress: () => navigation.navigate('Login_Screen'),
                            style: "default"
                        },
                        {
                            text: "Cancel",
                            onPress: () => { },
                            style: "default"
                        }])
                    }
                } catch (error) {
                    console.log("Error Sign IN", error);
                    Alert.alert('Invalid Credentials', "Please Enter Valid Credentials",);
                }

                setIsAuthenticating(false);
            }
        }



    }

    if (IsAuthenticating) {
        return (<LoadingScreen message="Creating User..." />)
    }
    return (
        <ImageBackground source={require('../../public/LogInbackgroundImage.jpg')} resizeMode='cover' blurRadius={10} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <BlurView intensity={20} tint="light" source={require('../../public/loginCredendialBackGround.jpg')} style={{ justifyContent: 'center', alignItems: 'center', minWidth: 350, height: 650, borderTopEndRadius: 80, borderBottomStartRadius: 80, elevation: 7 }}>

                <View style={{ justifyContent: 'flex-end', paddingTop: 50 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', borderBottomColor: "#a8b2b6", borderBottomWidth: 1, marginBottom: 10 }}>
                        <Text style={{ fontSize: 16, padding: 10, color: "#2f3f60", fontWeight: 'bold', textShadowOffset: { height: 0.2, width: 0.2 }, textShadowRadius: 1, textShadowColor: 'grey', }}>Enter Details</Text>
                        <MaterialCommunityIcons name="card-account-details" size={22} color="black" style={{ padding: 10 }} />
                    </View>
                    <View>
                        <PopUpMenu setImageUri={setImageUri} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                        <BlurView intensity={100} tint="light" style={[styles.CredentialsNameContainer, { flexDirection: 'row', alignItems: "center" }]}>
                            <TextInput placeholder="First Name" style={styles.CredentialsNameText} onChangeText={setFirstUserName} value={FirstUsername}></TextInput>
                            <MaterialCommunityIcons name='face-man-shimmer' size={20} color='#4E342E' />
                        </BlurView>

                        <BlurView intensity={100} tint="light" style={[styles.CredentialsNameContainer, { flexDirection: 'row', alignItems: "center" }]}>
                            <TextInput placeholder="Last Name" style={styles.CredentialsNameText} onChangeText={setLastUserName} value={LastUsername}></TextInput>
                        </BlurView>
                    </View>



                    <BlurView intensity={100} tint="light" style={[styles.CredentialsContainer, { flexDirection: 'row', alignItems: "center" }]}>
                        <TextInput placeholder="Email Address" style={styles.CredentialsText} onChangeText={EmailOnchangeHandler} value={EmailInput}></TextInput>
                        <MaterialCommunityIcons name={EmailIconName} size={20} color={EmailIconColor} />
                    </BlurView>
                    {(EmailExpressionError) && <Text style={{ color: "#ec6a45", fontSize: 10, paddingLeft: 10, }}>Enter Valid Email address</Text>}


                    <BlurView intensity={100} tint="light" style={[styles.CredentialsContainer, { flexDirection: 'row', alignItems: "center" }]}>
                        <TextInput placeholder="Confirm Email Address" style={styles.CredentialsText} onChangeText={ConfirmEmailChecker} value={ConfirmEmailInput}></TextInput>
                        <MaterialCommunityIcons name={ConfirmEmailMatched && 'checkbox-multiple-marked-circle'} size={20} color='green' />
                    </BlurView>
                    {(EmailInput.toString().length !== 0 || ConfirmEmailInput.toString().length !== 0) && <Text style={{ fontSize: 10, paddingLeft: 10, color: 'green' }}>{ConfirmEmailMatched ? 'Email Matched' : <Text style={{ color: "#ec6a45" }}>Email Not Matched</Text>}</Text>}

                </View>


                <View style={{ flex: 1 }}>
                    <View style={{ flex: 4 }}>
                        <BlurView intensity={100} tint="light" style={[styles.CredentialsContainer, { flexDirection: 'row', alignItems: "center" }]}>
                            <TextInput secureTextEntry={passwordHidden} onChangeText={PasswordOnchangeHandler} value={passwordInput} placeholder="Password" style={styles.CredentialsText}></TextInput>
                            <Pressable onPress={PasswordHideHandler}>
                                {passwordHidden && <MaterialCommunityIcons name="sunglasses" size={20} color="black" />}
                                {!passwordHidden && <MaterialCommunityIcons name="glasses" size={20} color="black" />}
                            </Pressable>
                        </BlurView>
                        {(PasswordExpressionError) && <Text style={{ color: "#ec6a45", fontSize: 10, paddingLeft: 10, }}>Password must contain digits and alphabet</Text>}

                        <BlurView intensity={100} tint="light" style={[styles.CredentialsContainer, { flexDirection: 'row', alignItems: "center" }]}>
                            <TextInput secureTextEntry={passwordHidden} onChangeText={setConfirmPasswordHandler} value={ConfirmPasswordInput} placeholder="Confirm Password" style={styles.CredentialsText}></TextInput>
                            <MaterialCommunityIcons name={ConfirmPasswordMatched && 'checkbox-multiple-marked-circle'} size={20} color='green' />

                        </BlurView>
                        {(passwordInput.toString().length !== 0 || ConfirmPasswordInput.toString().length !== 0) && <Text style={{ fontSize: 10, paddingLeft: 10, color: 'green' }}>{ConfirmPasswordMatched ? 'Password Matched' : <Text style={{ color: "#ec6a45" }}>Password Not Matched</Text>}</Text>}
                    </View>



                    <View style={{ MarginTop: 100, flex: 2, alignItems: 'flex-end' }}>
                        <Pressable onPress={resetDetails} style={({ pressed }) => (pressed) ? { flexDirection: "row", alignItems: "center", opacity: 0.5 } : { flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 13, padding: 10, color: "#2f3f60", fontWeight: 'bold', textShadowOffset: { height: 0.5, width: 0.5 }, textShadowRadius: 1, textShadowColor: 'grey', }}>Reset Details</Text>
                            <MaterialCommunityIcons name='restore' size={20} color="#25739d" />
                        </Pressable>
                    </View>



                    <View style={{ MarginTop: 100, flex: 2, alignItems: 'center' }}>
                        <Pressable onPress={SignUpHandler} style={({ pressed }) => (pressed) ? { borderRadius: 7, backgroundColor: '#d6e1e9', width: "70%", alignItems: "center", opacity: 0.8 } : { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 7, elevation: 1, backgroundColor: '#d6e1e9', width: "70%", alignItems: "center" }}>
                            <Text style={{ fontSize: 16, padding: 5, color: "#2d2c33", fontWeight: 'bold', textShadowOffset: { height: 0.5, width: 0.5 }, textShadowRadius: 1, textShadowColor: 'grey', }}>Sign Up</Text>
                        </Pressable>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", flex: 1, paddingBottom: 10, paddingLeft: 5 }}>
                        <Text style={{ marginLeft: 40 }}>Terms</Text>
                        <Pressable style={({ pressed }) => (pressed) ? { flexDirection: 'row', alignItems: 'center', opacity: 0.6 } : { flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.navigate('Login_Screen') }}>
                            <MaterialCommunityIcons name="login" size={19} color="black" />
                            <Text style={{ fontWeight: 'bold', marginLeft: 5, fontSize: 13, textAlignVertical: "center" }}>Login</Text>
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
    CredentialsNameContainer: {
        borderBottomWidth: 3,
        padding: 4,
        minWidth: 138,
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
    },
    CredentialsNameText: {
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        fontSize: 12
    },
})

export default Signup_Screen;