import { COLORS, FONTS } from "@/src/constants";
import { useMediaQuery } from "@/src/hooks";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
const Layout = () => {
  const {
    dimension: { width },
  } = useMediaQuery();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarStyle: {
          height:
            width >= 600 ? 70 : Platform.select({ ios: 100, android: 80 }),
          backgroundColor: COLORS.transparent,
          position: "absolute",
          elevation: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: COLORS.gray200,
        tabBarActiveTintColor: COLORS.secondary,
        headerShown: true,
        tabBarLabelStyle: {
          // fontFamily: FONTS.bold,
          fontSize: 12,
          marginTop: width >= 600 ? 10 : 0,
          // paddingBottom: 25,
        },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "CGPA",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="auto-graph" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="grass" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};
export default Layout;
