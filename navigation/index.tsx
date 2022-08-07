import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationRoutes } from '../types/navigationRoutes';
import CreditCard from '../screens/credit-card';
import Home from '../screens/home';
import Drawing from '../screens/drawing';
import Effects from '../screens/effects';
import Hue from '../screens/hue';


const MainStack = createNativeStackNavigator();


const AppNavigation = () => {
  return (
    <MainStack.Navigator>
        <MainStack.Screen name={NavigationRoutes.Home} component={Home} />
        <MainStack.Screen name={NavigationRoutes.CreditCard} component={CreditCard} />
        <MainStack.Screen name={NavigationRoutes.Drawing} component={Drawing} />
        <MainStack.Screen name={NavigationRoutes.Effects} component={Effects} />
        <MainStack.Screen name={NavigationRoutes.Hue} component={Hue} />
    </MainStack.Navigator>
  )
}

export default AppNavigation