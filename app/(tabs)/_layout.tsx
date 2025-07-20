import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#94A3B8',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: -5 },
            height: 85,
            paddingTop: 10,
          },
          default: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            elevation: 8,
            height: 70,
            paddingTop: 10,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="camera.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-meal"
        options={{
          title: 'Add Meal',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="plus.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          title: 'AI Tips',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="lightbulb.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
