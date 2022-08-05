import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

function Tab_button({ library, iconName, color, size, title, focused }) {
    return (
        <View style={focused ? [styles.ButtonContainer, styles.onfocus] : styles.ButtonContainer}>
            <View style={styles.IconStyle}>
                {(library === 'FontAwesome5') ? <FontAwesome5 name={iconName} size={size} color={color} /> : null}
                {(library === 'Ionicons') ? <Ionicons name={iconName} size={size} color={color} /> : null}
            </View>
            <Text style={styles.TitleStyle}>{title}</Text>
        </View>
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
        fontSize: 12,
        marginLeft: 20,
        textShadowColor: 'hsl(139, 36%, 78%)',
        textShadowOffset: { height: 0.2, width: 0.2 },
        textShadowRadius: 3
    },
    onfocus: {
        opacity: 0.7,
    }
})

export default Tab_button;