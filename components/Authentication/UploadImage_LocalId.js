import FireBaseUplaodForm from "./UploadForm";
import { useSelector } from 'react-redux'

export default function FetchingUserProfileImage(localId) {
    const UserProfileImage = useSelector((state) => state.ImageUriReducer.tempUserImageUri);

    try {
        let UploadResponse = FireBaseUplaodForm(UserProfileImage, localId);
        console.log("Upload User Profile Pic Response = ", UploadResponse);
    } catch (error) {
        console.log("Upload User Profile Pic Error= ", error);
    }


}