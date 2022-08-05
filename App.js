import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';
import { MenuProvider } from 'react-native-popup-menu';

import Welcome_Screen from './Screens/A_Welcome_Screen/Welcome_Screen';
import A_Live_L_Device_Select_Screen from './Screens/B_Live_Locations_Screens/A_Live_L_Device_Select_Screen';
import Post_Selected_Image_Screen from './Screens/C_D_Camera_And_Gallery_Image_Processing_Screens/Post_Selected_Image_Screen';
import User_Info_Screen from './Screens/E_User Profile Screen/User_Info_Screen';
import Post_Filtering_Image_Screen from './Screens/C_D_Camera_And_Gallery_Image_Processing_Screens/Post_Filtering_Image_Screen';
import LogIn_Screen from './Screens/UnAuthnticated_Screens/LogIn_Screen';
import Signup_Screen from './Screens/UnAuthnticated_Screens/Signup_Screen';

import { drawerOptions } from './components/Objects/Data_Objects/drawerOptions';
import { I_Drawer_Options } from './components/Objects/Data_Objects/ImageProcessingDrawerOptions';
import LogOut_button from './components/Buttons/Tab_Buttons/LogOutButton';
import LoadingScreen from './components/Loading/LoadingOverlay';
import { resetEveryImageState } from "./redux/ImageUriSlice";
import { resetEveryUserInformationState } from './redux/UserInformationSlice';
import { color } from 'react-native-reanimated';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  function ImageOptionsDrawer() {
    return (
      <Drawer.Navigator drawerContent={(props) => <DrawerCustome props={props} DrawerOf="ImageProcessingScreen" />} screenOptions={styles.DrawerStyling}>
        <Drawer.Screen name='Normal_Filter' component={Post_Filtering_Image_Screen} options={I_Drawer_Options[I_Drawer_Options.indexOf(Normal_Filter)]} />
        <Drawer.Screen name='GreyScaled_Filter' component={Post_Filtering_Image_Screen} options={I_Drawer_Options[I_Drawer_Options.indexOf(GreyScaled_Filter)]} />
        <Drawer.Screen name='EdgeDetector_Filter' component={Post_Filtering_Image_Screen} options={I_Drawer_Options[I_Drawer_Options.indexOf(EdgeDetector_Filter)]} />

      </Drawer.Navigator>
    )

  }

  function DrawerCustome({ props, DrawerOf }) {
    const email = useSelector((state) => state.UserInformationReducer.email);
    const UserProfileImage = useSelector((state) => state.ImageUriReducer.UserImageUri);
    const UserFirstName = useSelector((state) => state.UserInformationReducer.userFirstName);
    const UserLastName = useSelector((state) => state.UserInformationReducer.userLastName);


    let ImageProcessingOptionsTitle = (<View style={styles.DrawerHeaderImageContainer}>
      <View style={{ padding: 3 }}>
        <Text style={[styles.DrawerHeaderInfo, { color: "black", textShadowColor: "white", fontWeight: 'bold' }]}>Image Filters</Text>
      </View>
    </View>);


    let UserInfoHeader = (
      <View style={styles.DrawerHeaderContainer}>
        <View style={{ padding: 3 }}>
          <Text style={[styles.DrawerHeaderInfo, { color: "white" }]}>{UserFirstName} {UserLastName}</Text>
          <Text style={styles.DrawerHeaderInfo}>{email}</Text>
        </View>
        <View style={styles.HeaderProfileContainer}>
          <Image style={{ width: 60, height: 60 }} resizeMode="cover" source={UserProfileImage ? { uri: UserProfileImage } : require('./public/loginCredendialBackGround.jpg')}></Image>
        </View>
      </View>
    );

    return (
      <DrawerContentScrollView style={styles.drawerTopContainerStyle} {...props}>
        {UserInfoHeader}
        {(DrawerOf === 'ImageProcessingScreen') ? ImageProcessingOptionsTitle : null}
        <View style={(DrawerOf === 'ImageProcessingScreen') ? [styles.drawerContentContainerStyle, { marginTop: 1, }] : styles.drawerContentContainerStyle}>
          <DrawerItemList  {...props} />
        </View>
      </DrawerContentScrollView>
    )
  }
  //      <Drawer.Navigator drawerContent={(props) => <DrawerCustome {...props} />} initialRouteName='Welcome_Screen' screenOptions={styles.DrawerStyling}>
  // function StackNavigator() {}
  function AuthenticDrawerNavigator() {
    const dispatch = useDispatch();
    return (
      <Drawer.Navigator drawerContent={(props) => {
        const filteredProps = {
          ...props, state: {
            ...props.state, routeNames: props.state.routeNames.filter((routeName) => {
              routeName !== 'ImageProcessingDrawer';
            }),

            routes: props.state.routes.filter(
              (route) =>
                route.name !== 'ImageProcessingDrawer'
            ),
          },
        };
        return (<DrawerCustome props={filteredProps} />)

      }} initialRouteName='Welcome_Screen' screenOptions={styles.DrawerStyling}>
        <Drawer.Screen name="Welcome_Screen" component={Welcome_Screen} options={drawerOptions[drawerOptions.indexOf(Welcome_Screen_Options)]} />
        <Drawer.Screen name='Live_Location_Screen' component={A_Live_L_Device_Select_Screen} options={drawerOptions[drawerOptions.indexOf(Live_Location)]} />
        <Drawer.Screen name="Camera_Image_Processing_Screen" component={Post_Selected_Image_Screen} options={drawerOptions[drawerOptions.indexOf(Camera_Image_Processing)]} />
        <Drawer.Screen name="Gallery_Image_Processing_Screen" component={Post_Selected_Image_Screen} options={drawerOptions[drawerOptions.indexOf(Gallery_Image_Processing)]} />

        <Drawer.Screen name='ImageProcessingDrawer' component={ImageOptionsDrawer} options={{ headerShown: false }} />
        <Drawer.Screen name="User_Info_Screen" component={User_Info_Screen} options={drawerOptions[drawerOptions.indexOf(User_Info)]} />
        <Drawer.Screen name="LogOut_Screen" component={LogIn_Screen} options={
          {
            headerTintColor: 'hsl(24, 96%, 55%)',
            drawerLabel: '',
            headerTitle: 'Log In',
            headerTransparent: true,
            drawerIcon: () => <Pressable onPress={() => {
              dispatch(resetEveryImageState()); dispatch(resetEveryUserInformationState());
            }}>
              <View style={{ flexDirection: "row", paddingLeft: 5, paddingTop: 3, alignItems: "center" }}>
                <Ionicons name='log-out' size={28} color='hsl(24, 96%, 55%)' />
                <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>Log Out</Text>

              </View>
            </Pressable>
          }} />
      </Drawer.Navigator>
    )
  }


  // drawerIcon: (({ color, focused, size }) => {
  //     return (
  //         <LogOut_button
  //             iconName="log-out"
  //             color='hsl(24, 96%, 55%)' size={size}
  //             title="Logout"
  //             library='Ionicons'
  //             focused={focused}
  //         />)
  // }),
  // // headerStyle: { backgroundColor: "hsl(24, 96%, 55%)" },
  // // drawerContentStyle: { backgroundColor: 'hsl(24, 96%, 55%)' }
  // headerTintColor: 'hsl(24, 96%, 55%)'


  function AuthenticatedContainerNavigator() {  // Will Contain all Authenticated Screen After User Login
    return (
      <AuthenticDrawerNavigator />
    )
  }

  function UnAuthenticatedContainerNavigator() {  // Will Contain all Authenticated Screen After User Login

    return (
      <Stack.Navigator screenOptions={{ animation: 'fade_from_bottom' }}>
        <Stack.Screen name='Login_Screen' component={LogIn_Screen} options={{ headerShown: false }} />
        <Stack.Screen name='Signup_Screen' component={Signup_Screen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

  function TopNavigationContainer() {
    const isLogin = useSelector((state) => state.UserInformationReducer.isLogin);
    return (
      <NavigationContainer>
        {isLogin && <AuthenticatedContainerNavigator />}
        {!isLogin && <UnAuthenticatedContainerNavigator />}
      </NavigationContainer>
    )
  }

  return (
    <>
      <StatusBar hidden={true} style='dark'></StatusBar>
      <Provider store={store}>
        <MenuProvider>
          <TopNavigationContainer />

        </MenuProvider>
      </Provider>

    </>
  );
}

const styles = StyleSheet.create({
  DrawerStyling: {
    drawerStatusBarAnimation: "fade",
    drawerHideStatusBarOnOpen: false,
    drawerType: "front",

    headerShadowVisible: true,
    headerTitleAlign: "center",
    drawerActiveBackgroundColor: '#c9c7ec',
    drawerItemStyle: { borderRadius: 15 },
    headerStyle: {
      backgroundColor: '#d6e1e9',
      elevation: 10,
      shadowOpacity: 1,
      borderBottomWidth: 3,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,


      borderColor: 'black'
    }, //#f7e5b2
    headerTitleStyle: {
      // textShadowOffset: { height: 1, width: 1 },
      // textShadowRadius: 1,
      // textShadowColor: 'grey',
      fontWeight: 'bold',
      fontSize: 22
    }
  },
  drawerContentContainerStyle: {
    borderRadius: 20,
    // borderWidth: 1,
    marginHorizontal: 20,
    elevation: 20,
    backgroundColor: "white",

    marginTop: 60,
    marginBottom: 50,
    paddingTop: 30,
    paddingBottom: 30,
  },
  drawerTopContainerStyle: {
    backgroundColor: '#d6e1e9', //#f7e5b2
    borderRightColor: '#a7bcc9',
    borderTopColor: '#a7bcc9',
    borderWidth: 2,

  },
  DrawerHeaderContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 10,
    borderEndWidth: 9,
    borderTopWidth: 3,
    backgroundColor: '#8b6d9c',
    borderColor: '#782349',
    borderBottomEndRadius: 20
  },
  DrawerHeaderImageContainer:
  {
    alignItems: 'center',
    marginTop: 80,

    padding: 10,
    alignSelf: 'center',
    width: 230,
    borderEndWidth: 9,
    borderStartWidth: 9,
    borderBottomWidth: 4,
    borderTopWidth: 1,

    borderTopEndRadius: 20,
    borderTopStartRadius: 20,

    backgroundColor: 'hsl(167, 98%, 39%)',
    borderColor: 'hsl(139, 36%, 78%)',

  },
  HeaderProfileContainer: {
    width: 60, height: 60, borderRadius: 30,
    elevation: 5,
    overflow: 'hidden'
  },
  DrawerHeaderInfo: {
    color: "#f7d2bb",
    textShadowColor: 'black',
    textShadowOffset: { height: 1, width: 1 },
    textShadowRadius: 7,

  },
  DrawerFooterContaier: {
    width: 200,
    marginTop: 100,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: '#8b6d9c'
  }

});
