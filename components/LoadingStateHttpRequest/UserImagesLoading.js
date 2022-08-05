import axios from 'axios';
import { useDispatch } from 'react-redux';




async function LoadImages(localId) {
    console.log('\nLocal Id = ', localId);
    let ArrayObject = await axios.get('http://192.168.29.11:3001/fetch');
    let StringArray = ArrayObject.data.PathArray;

    let filteredArray = StringArray.filter((PerElement) => PerElement.includes(localId));
    return (filteredArray);
}

export default LoadImages;