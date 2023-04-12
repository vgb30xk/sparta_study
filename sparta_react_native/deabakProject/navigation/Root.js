import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stacks from './Stacks';
import Tabs from './Tabs';

const NativeStack = createNativeStackNavigator();

export default function Root() {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="Tabs" component={Tabs} />
      <NativeStack.Screen name="Stacks" component={Stacks} />
    </NativeStack.Navigator>
  );
}

// Home, Explore, Account
// 밑에 하단바임
