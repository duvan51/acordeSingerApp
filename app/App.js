import React from 'react';
import { View } from 'react-native';


import Home from '../views/home.js'
import CreateElements  from '../views/createElements.js'
import Asembly from '../views/assembly.js';
import SearchingSongs from "../views/searchsSong/searching.js";
import SongView from '../views/viewSong/songView.js';
import CreateSong from '../views/createSong/createSong.js';
import CreateSongWrite from '../views/createSong/createSongWrite.js';
import SongViewId from '../views/viewSong/songViewId.js';
import SearchingFilter from '../views/searchingFilter/searchingFilter.js';
import SearchingLive from '../views/searchingFilter/searchLive.js'
import CreateCategorie from '../views/createCategorie/createCategorie.js';
import SearchingList from '../views/searchingFilter/searchingList.js';
import CreateUser from '../views/user/createUser.js';
import UpdateCategorie  from '../views/createCategorie/updateCategorie.js';
import ConciertoView from "../views/conciertos/concierto.js"

import ViewGroupId from '../views/groups/viewGroupId.js';
import ViewGroups from '../views/groups/viewGroups.js';

import Login from '../views/user/Login.js';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function MainTab(){
  return(
    <Tab.Navigator
  initialRouteName="Home"
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size, focused }) => {
      let iconName;
      let customStyle = {};

      if (route.name === 'ViewGroups') {
        iconName = 'plus'; // Puedes cambiar este ícono si quieres
        customStyle = {
          position: 'absolute',
          top: -30,
          backgroundColor: '#ff7014',
          borderRadius: 35,
          width: 70,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        };

        return (
          <View style={customStyle}>
            <FontAwesome name={iconName} size={40} color={focused ? '#072042' : '#fff'} />
          </View>
        );
      }

      // Íconos normales
      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'SearchingFilter') {
        iconName = 'search-plus';
      } else if (route.name === 'Settings') {
        iconName = 'cogs';
      } else if (route.name === 'Settings') {
        iconName = 'user'; // Puedes cambiar este ícono también
      } else if (route.name === 'Login') {
        iconName = 'sign-in';
      }

      return <FontAwesome name={iconName} size={35} color={color} />;
    },
    tabBarActiveTintColor: '#072042',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      position: 'absolute',
      paddingTop:10,
      height: 60,
      backgroundColor: '#1d0f4a',
      borderTopWidth: 0,
      elevation: 10,

    },
    tabBarIconStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    }
  })}
>
  <Tab.Screen name="Home" component={Home} />
  <Tab.Screen name="SearchingFilter" component={SearchingFilter} />
  <Tab.Screen name="ViewGroups" component={ViewGroups} />
  <Tab.Screen name="Settings" component={CreateUser} />
  <Tab.Screen name="ViewGroupId" component={ViewGroupId} />
</Tab.Navigator>
    
  )
}


export default function App() {
  
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="MainTabs" options={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="CreateElements" component={CreateElements} />
      
      <Stack.Screen name="Asembly" component={Asembly} />

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateUser" component={CreateUser} />


      <Stack.Screen name="SearchingSongs" component={SearchingSongs} />
      <Stack.Screen name="SearchingLive" component={SearchingLive} options={{ headerShown: false }} />
      <Stack.Screen name="SearchingList" component={SearchingList} options={{ headerShown: false }} />

      <Stack.Screen name="SongViewId" component={SongViewId} options={{ headerShown: false }} />
      <Stack.Screen name="SongView" component={SongView} />
      <Stack.Screen name="CreateSong" component={CreateSong} />
      <Stack.Screen name="CreateSongWrite" component={CreateSongWrite} />

      <Stack.Screen name="CreateCategorie" component={CreateCategorie} />
      <Stack.Screen name="UpdateCategorie" component={UpdateCategorie} />

      <Stack.Screen name="ViewGroupId" component={ViewGroupId} />
      <Stack.Screen name="ViewGroups" component={ViewGroups} />


      <Stack.Screen name="ConciertoView" component={ConciertoView} options={{ headerShown: false }} />


      <Stack.Screen name="MainTabs" component={MainTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
