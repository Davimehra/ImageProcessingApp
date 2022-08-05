import Pressable_ImageScreen_Tab_button from "../../Buttons/Tab_Buttons/Pressable_ImageScreen_Tab_Button";

export const I_Drawer_Options = [
    Normal_Filter = {
        drawerLabel: '',
        headerTitle: 'Original Image',
        headerTitleAlign: 'left',
        headerTransparent: true,
        drawerIcon: (({ color, focused, size }) => {
            return (
                <Pressable_ImageScreen_Tab_button
                    iconName="color-filter"
                    color='#6A1B9A' size={size}
                    title="Original Image"
                    library='Ionicons'
                    focused={focused}
                    navigatorRoute="Normal_Filter" />)
        }),
        // headerStyle: { backgroundColor: "#6A1B9A" },
        // drawerContentStyle: { backgroundColor: '#6A1B9A' }
        //headerTintColor: '#2c4a78'
    },
    GreyScaled_Filter = {
        drawerLabel: '',
        headerTitle: 'Grey Scaled Image',
        headerTitleAlign: 'left',
        headerTransparent: true,
        drawerIcon: (({ color, focused, size }) => {
            return (
                <Pressable_ImageScreen_Tab_button
                    iconName="color-filter"
                    color='#6A1B9A' size={size}
                    title="Grey Scaled"
                    library='Ionicons'
                    focused={focused}
                    navigatorRoute="GreyScaled_Filter" />)
        }),
        // headerStyle: { backgroundColor: "#6A1B9A" },
        // drawerContentStyle: { backgroundColor: '#6A1B9A' }
        //headerTintColor: '#2c4a78'
    },
    EdgeDetector_Filter = {
        drawerLabel: '',
        headerTitle: 'Edge Detected Image',
        headerTitleAlign: 'left',
        headerTransparent: true,
        drawerIcon: (({ color, focused, size }) => {
            return (
                <Pressable_ImageScreen_Tab_button
                    iconName="color-filter"
                    color='#6A1B9A' size={size}
                    title="Edge Detecting"
                    library='Ionicons'
                    focused={focused}
                    navigatorRoute="EdgeDetector_Filter" />)
        }),
        // headerStyle: { backgroundColor: "#6A1B9A" },
        // drawerContentStyle: { backgroundColor: '#6A1B9A' }
        //headerTintColor: '#2c4a78'
    }
];