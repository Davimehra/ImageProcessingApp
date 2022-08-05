import { Text, View, StyleSheet } from "react-native";

function A_Live_L_Device_Select_Screen() {
    return (
        <View style={styles.TopContainer}>
            <Text>Devices Selection Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    TopContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})

export default A_Live_L_Device_Select_Screen;