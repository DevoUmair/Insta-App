import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack' 
import Homescreen from './screens/Homescreen'
import NewPostScreen from './screens/NewPostScreen'
import LoginScreen from './screens/LoginScreen'
import Signupscreen from './screens/Signupscreen'

const Stack = createStackNavigator()

const SignedInStack = () => (
        <NavigationContainer>
             <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown:false}} >
                    <Stack.Screen name='HomeScreen' component={Homescreen}  />
                    <Stack.Screen name='NewPostScreen' component={NewPostScreen}  />
             </Stack.Navigator>
        </NavigationContainer>
)

const SignOutStack = () => (
        <NavigationContainer>
                <Stack.Navigator  initialRouteName='LoginScreen'  screenOptions={{headerShown:false}}>
                     <Stack.Screen name='LoginScreen' component={LoginScreen}  />
                    <Stack.Screen name='Signupscreen' component={Signupscreen}  />
                </Stack.Navigator>
        </NavigationContainer>
)

export { SignedInStack , SignOutStack} 