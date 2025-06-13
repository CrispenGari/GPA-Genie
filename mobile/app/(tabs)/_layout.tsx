import ProfileCard from "@/src/components/ProfileCard/ProfileCard";
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
      initialRouteName="home"
      screenOptions={{
        tabBarStyle: {
          height:
            width >= 600 ? 70 : Platform.select({ ios: 100, android: 80 }),
          backgroundColor: COLORS.main,
          position: "absolute",
          elevation: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: COLORS.tertiary,
        tabBarActiveTintColor: COLORS.red,
        headerShown: true,
        tabBarLabelStyle: {
          fontFamily: FONTS.bold,
          fontSize: 12,
          marginTop: width >= 600 ? 10 : 0,
          paddingBottom: 25,
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="auto-graph" size={size} color={color} />
          ),
          header: (props) => {
            return <ProfileCard {...props} title="Home" />;
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="grass" size={size} color={color} />
          ),
          header: (props) => {
            return <ProfileCard {...props} title="History" />;
          },
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          header: (props) => {
            return <ProfileCard {...props} title="Settings" />;
          },
        }}
      />
    </Tabs>
  );
};
export default Layout;
