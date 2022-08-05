import { StyleSheet, Text, View } from "react-native";

function User_Info_Screen() {
    return (
        <View style={styles.TopContainer}>
            <Text>User Info Screen</Text>
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

export default User_Info_Screen;