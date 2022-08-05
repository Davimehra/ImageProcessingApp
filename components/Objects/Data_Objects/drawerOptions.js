import Tab_button from "../../Buttons/Tab_Buttons/Tab_Button"
import Pressable_Tab_button from "../../Buttons/Tab_Buttons/Pressable_Tab_Button";
import LogOut_button from "../../Buttons/Tab_Buttons/LogOutButton";
// For Dynamic Color Uncomment Headerstyle and drawerContentStyle
export const drawerOptions = [
    Welcome_Screen_Options = {
        drawerLabel: '',
        headerTitle: 'Home',
        headerTransparent: true,
        drawerIcon: (({ color, focused, size }) => {
            return (
                <Tab_button
                    iconName="ios-home"
                    color='#397cbe' size={size}
                    title="Home"
                    library='Ionicons'
                    focused={focused} />)
        }),
        // headerStyle: { backgroundColor: "#397cbe" },
        // drawerContentStyle: { backgroundColor: '#397cbe' }
        headerTintColor: '#397cbe'
    },
    Live_Location = {
        drawerLabel: '',
        headerTitle: 'Select Devices',
        headerTransparent: true,
        drawerIcon: (({ color, focused, size }) => {
            return (
                <Tab_button
                    iconName="map-marker-alt"
                    color='green' size={size}
                    title="Devices Live Location"
                    library='FontAwesome5'
                    focused={focused} />)
        }),
        // headerStyle: { backgroundColor: "green" },
        // drawerContentStyle: { backgroundColor: 'green' }
        headerTintColor: 'green'
    },
    Camera_Image_Processing = {
        drawerLabel: '',
        headerTitle: 'Media Filtering',
        headerTitleAlign: 'left',
        headerTransparent: true,
        drawerIcon: (({ color, focused, size }) => {
            return (
                <Pressable_Tab_button
                    iconName="camera-retro"
                    color='#6A1B9A' size={size}
                    title="Camera Image Processing"
                    library='FontAwesome5'
                    focused={focused}
                    navigatorRoute="Camera_Image_Processing_Screen" />)
        }),
        // headerStyle: { backgroundColor: "#6A1B9A" },
        // drawerContentStyle: { backgroundColor: '#6A1B9A' }
        headerTintColor: '#2c4a78'
    },
    Gallery_Image_Processing = {
        drawerLabel: '',
        headerTitle: 'Media Filtering',
        headerTitleAlign: 'left',
        headerTransparent: true,
        drawerIcon: (({ color, focused, size }) => {
            return (
                <Pressable_Tab_button
                    iconName="photo-video"
                    color='hsl(24, 96%, 55%)' size={size}
                    title="Gallery  Image Processing"
                    library='FontAwesome5'
                    focused={focused}
                    navigatorRoute="Gallery_Image_Processing_Screen" />)
        }),
        // headerStyle: { backgroundColor: "hsl(24, 96%, 55%)" },
        // drawerContentStyle: { backgroundColor: 'hsl(24, 96%, 55%)' }
        headerTintColor: '#2c4a78'
    },
    User_Info = {
        drawerLabel: '',
        headerTitle: 'User Info',
        headerTransparent: true,
        drawerIcon: (({ color, focused, size }) => {
            return (
                <Tab_button
                    iconName="user"
                    color='#225577' size={size}
                    title="User Info"
                    library='FontAwesome5'
                    focused={focused} />)
        }),
        // headerStyle: { backgroundColor: "#225577" },
        // drawerContentStyle: { backgroundColor: '#225577' }
        headerTintColor: '#225577'
    },
    LogOut = {
        drawerLabel: '',
        headerTitle: 'Log In',
        headerTransparent: true,
        drawerIcon: (({ color, focused, size }) => {
            return (
                <LogOut_button
                    iconName="log-out"
                    color='hsl(24, 96%, 55%)' size={size}
                    title="Logout"
                    library='Ionicons'
                    focused={focused}
                />)
        }),
        // headerStyle: { backgroundColor: "hsl(24, 96%, 55%)" },
        // drawerContentStyle: { backgroundColor: 'hsl(24, 96%, 55%)' }
        headerTintColor: 'hsl(24, 96%, 55%)'
    },
]