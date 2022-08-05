import axios from "axios";
const RootDirectoryUrl = 'https://imageprocessing-48d4f-default-rtdb.asia-southeast1.firebasedatabase.app/';

export function StoringDataToFireBase(folderName, localId, dataObject) {
    if (folderName.length === 0) {
        folderName = `usersData/${localId}.json`;

    }
    axios.post(`${RootDirectoryUrl}${folderName}`, dataObject)
}

export async function DownloadDataFromFireBase(folderName, localId) {

    if (folderName.length === 0) {
        folderName = `usersData/${localId}.json`;

    }

    const UserData = await axios.get(`${RootDirectoryUrl}${folderName}`);

    const UserDataArray = [];
    for (const key in UserData.data) {
        const UserObject = {
            id: key,
            refreshToken: UserData.data[key].refreshToken,
            localId: UserData.data[key].localId,
            lastName: UserData.data[key].lastName,
            kind: UserData.data[key].kind,
            idToken: UserData.data[key].idToken,
            firstName: UserData.data[key].firstName,
            email: UserData.data[key].email,
            expiresIn: UserData.data[key].expiresIn,

        }
        UserDataArray.push(UserObject);
    }

    return (UserDataArray[0]);
}

