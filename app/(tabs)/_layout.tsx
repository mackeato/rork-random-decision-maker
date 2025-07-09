import React from 'react';
import { Tabs } from 'expo-router';
import { Dices, Home } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.subtext,
        tabBarStyle: {
          borderTopColor: Colors.light.border,
          backgroundColor: Colors.light.background,
          paddingTop: 8,
          height: 60,
        },
        headerStyle: {
          backgroundColor: Colors.light.background,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTitleStyle: {
          color: Colors.light.text,
          fontWeight: '700',
          fontSize: 18,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Decision Maker",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="result"
        options={{
          title: "Your Decision",
          tabBarLabel: "Result",
          tabBarIcon: ({ color }) => <Dices size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}