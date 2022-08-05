import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image, Pressable, Text } from 'react-native';

function FunctionAndFontButton({ library, name, color, size, onPress }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => (pressed) ? { opacity: 0.6, paddingHorizontal: 10, alignItems: "center", flexDirection: 'row', marginRight: 10 } : { alignItems: "center", flexDirection: 'row', paddingHorizontal: 10, marginRight: 10 }}>
            <Text style={{ color: '#e64e4b', fontWeight: 'bold', marginRight: 10, textShadowColor: 'grey', textShadowOffset: { height: 0.2, width: 0.2 }, textShadowRadius: 4 }}>Apply Algorithms</Text>
            <Image style={{ width: 12, height: 12 }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Orange_animated_right_arrow.gif' }}></Image>

            {/* {(library === 'Ionicons') ? <Ionicons name={name} color={color} size={size} /> : null}
            {(library === 'FontAwesome5') ? <FontAwesome5 name={name} color={color} size={size} /> : null} */}
        </Pressable>
    )
}
export default FunctionAndFontButton;