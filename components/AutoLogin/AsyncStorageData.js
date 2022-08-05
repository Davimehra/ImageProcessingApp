import AsyncStorage from "@react-native-async-storage/async-storage";

export function LocalStoringFirst(localId, idToken, expiresIn, email, refreshToken) {

    AsyncStorage.setItem('localId', localId);
    AsyncStorage.setItem('idToken', idToken);
    AsyncStorage.setItem('expiresId', expiresIn);
    AsyncStorage.setItem('email', email);
    AsyncStorage.setItem('refreshToken', refreshToken);
}

export function LocalStoringSecond(UserFirstName, UserLastName) {

    AsyncStorage.setItem('UserFirstName', UserFirstName);
    AsyncStorage.setItem('UserLastName', UserLastName);

}

export function LocalStoringThird(UserProfileImageUri) {

    AsyncStorage.setItem('UserProfileImageUri', UserProfileImageUri);

}



export function EmptyStorage() {


    AsyncStorage.removeItem('localId');
    AsyncStorage.removeItem('idToken');
    AsyncStorage.removeItem('expiresId');
    AsyncStorage.removeItem('email');
    AsyncStorage.removeItem('refreshToken');
    AsyncStorage.removeItem('UserFirstName');
    AsyncStorage.removeItem('UserLastName');
    AsyncStorage.removeItem('UserProfileImageUri');



}
