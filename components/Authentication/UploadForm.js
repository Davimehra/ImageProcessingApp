
import { initializeApp } from 'firebase/app';
// import { useDispatch } from 'react-redux'
import * as fun from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyCeCuTwXbjD_p--mJ4y130RHbTlDkEHQp0",
    authDomain: "imageprocessing-48d4f.firebaseapp.com",
    projectId: "imageprocessing-48d4f",
    storageBucket: "imageprocessing-48d4f.appspot.com",
    messagingSenderId: "254849122390",
    appId: "1:254849122390:web:ca625d56426ee8f2ee7bf7"
};


export default async function FireBaseUplaodForm(ImageUri, UserId, mode) {
    // const dispatch = useDispatch();
    initializeApp(firebaseConfig);

    const storage = fun.getStorage();
    const ref = fun.ref(storage, `${UserId}_profileImage.jpg`);

    if (mode === 'upload') {
        const img = await fetch(ImageUri ? ImageUri : 'https://media.istockphoto.com/photos/dotted-grid-paper-background-texture-seamless-repeat-pattern-picture-id1320330053?b=1&k=20&m=1320330053&s=170667a&w=0&h=XisfN35UnuxAVP_sjq3ujbFDyWPurSfSTYd-Ll09Ncc=');
        const bytes = await img.blob();
        await fun.uploadBytes(ref, bytes).then((response) => {
            console.log("ProfileImageUrl:", response);
        })
    }

    // if (mode === 'download') {
    //     await fun.getDownloadURL(ref).then((response) => {
    //         dispatch(setUserImageUri({ UserImageUri: response }));
    //         return (response);
    //     })
    // }

    if (mode === 'download') {
        return (await fun.getDownloadURL(ref));
    }





}


