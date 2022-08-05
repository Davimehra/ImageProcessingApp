import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const StorageuserFirstName = AsyncStorage.getItem('UserFirstName');
// const StorageuserLastName = AsyncStorage.getItem('UserLastName');
// const UserId = AsyncStorage.getItem('localId');
// const expiresIn = AsyncStorage.getItem('expiresId');
// const email = AsyncStorage.getItem('email');
// const refreshToken = AsyncStorage.getItem('refreshToken');

// async function CheckIdToken() {
//     const StorageidToken = await AsyncStorage.getItem('idToken');
//     console.log(StorageidToken)
//     return StorageidToken;

// }

// async function CheckUserName() {
//     const userFirstName = await AsyncStorage.getItem('UserFirstName');
//     console.log(userFirstName)
//     return StorageidToken;

// }


const UserInformationSlice = createSlice({
    name: 'UserInformationSlice'
    , initialState: {
        isLogin: false,
        userFirstName: '',
        userLastName: '',
        UserId: 'davinderkumar',
        idToken: '',
        expiresIn: '',
        email: '',
        refreshToken: ''
    },
    reducers: {
        resetEveryUserInformationState(state, actions) {
            state.UserId = '';
            state.email = '';
            state.expiresIn = '';
            state.idToken = '';
            state.isLogin = false;
            state.refreshToken = '';
            state.userFirstName = '';
            state.userLastName = '';

        },
        setUserFirstName: (state, actions) => {
            state.userFirstName = actions.payload.UserFirstName;
            console.log("User First Name \n\n\n\n", state.userFirstName);
        },
        setUserLastName: (state, actions) => {
            state.userLastName = actions.payload.UserLastName;
            console.log("User Last Name \n\n\n\n", state.userLastName);
        },
        setisLogin: (state, actions) => {
            state.isLogin = actions.payload.isLogin;


        },
        setidToken: (state, actions) => {
            state.idToken = actions.payload.idToken;
            console.log("\n idToken =", state.idToken);
        },
        setexpiresIn: (state, actions) => {
            state.expiresIn = actions.payload.expiresIn;
            console.log("\n Expire =", state.expiresIn);
        },
        setemail: (state, actions) => {
            state.email = actions.payload.email;
            console.log("\n Email =", state.email);
        },
        setrefreshToken: (state, actions) => {
            state.refreshToken = actions.payload.refreshToken;
            console.log("\n RefreshToken =", state.refreshToken);
        },
        removeUserId: (state, actions) => {
            state.UserId = '';
        },
        setUserId: (state, actions) => {
            state.UserId = actions.payload.userId;
            console.log("\n UserID =", state.UserId);
        },
    }
});


export const {
    resetEveryUserInformationState,
    setUserFirstName,
    setUserLastName,
    setisLogin,
    setUserId,
    removeUserId,
    setemail,
    setexpiresIn,
    setidToken,
    setrefreshToken
} = UserInformationSlice.actions;
export default UserInformationSlice.reducer;