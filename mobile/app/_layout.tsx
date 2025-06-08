import "react-native-reanimated";
import { COLORS, FONTS, Fonts } from "@/src/constants";
import { loadAsync } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { LogBox, Platform, TouchableOpacity, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import { useMeStore } from "@/src/store/meStore";

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const client = new QueryClient();
const Layout = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        await loadAsync(Fonts);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="light" />

      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <QueryClientProvider client={client}>
            <RootLayout />
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
};

export default Layout;
const RootLayout = () => {
  const router = useRouter();
  const { settings } = useSettingsStore();

  const { me } = useMeStore();
  React.useEffect(() => {
    if (!!me && me.completed) {
      router.replace("/(tabs)");
    }
  }, []);

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(questions)/(basic)/nickname"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(questions)/(basic)/dob"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(questions)/(basic)/gender"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(questions)/(basic)/year"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />

      <Stack.Screen
        options={{
          presentation: Platform.select({
            ios: "modal",
            android: "fullScreenModal",
          }),
          headerTitle: "Term and Conditions",
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 24,
            color: COLORS.white,
          },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.main,
          },
          headerLeft: ({}) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              onPressIn={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace("/");
                }
              }}
              hitSlop={20}
            >
              <Ionicons name="close-outline" size={30} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
        name="(common)/tnc"
      />
      <Stack.Screen
        options={{
          presentation: Platform.select({
            ios: "modal",
            android: "fullScreenModal",
          }),
          headerTitle: "Privacy Policy",
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 24,
            color: COLORS.white,
          },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.main,
          },
          headerLeft: ({}) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              onPressIn={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace("/");
                }
              }}
              hitSlop={20}
            >
              <Ionicons name="close-outline" size={30} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
        name="(common)/pp"
      />
    </Stack>
  );
};
