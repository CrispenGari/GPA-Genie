import "react-native-reanimated";
import { COLORS, FONTS, Fonts, STORAGE_NAME } from "@/src/constants";
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
import * as QuickActions from "expo-quick-actions";
import { useQuickActionRouting } from "expo-quick-actions/router";
import {
  registerForPushNotificationsAsync,
  scheduleDailyNotification,
} from "@/src/utils/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: false,
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
  useQuickActionRouting();
  const router = useRouter();
  const { settings } = useSettingsStore();
  const { me } = useMeStore();
  React.useEffect(() => {
    QuickActions.setItems([
      {
        title: "Today's Performance",
        subtitle: "Check your GPA performance",
        icon: Platform.select({
          ios: "performance",
          android: "performance",
        }),
        id: "0",
        params: { href: "/(questions)/(health)/anxiety" },
      },
      {
        title: "Performance History",
        subtitle: "View your performance History",
        icon: Platform.select({
          ios: "history",
          android: "history",
        }),
        id: "1",
        params: { href: "/(tabs)/history" },
      },
      {
        title: "Settings and Preferences",
        icon: Platform.select({
          ios: "settings",
          android: "settings",
        }),
        id: "2",
        params: { href: "/(tabs)/settings" },
      },
    ]);
  }, []);

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      if (!!token && settings.notifications && !!me) {
        const today = new Date().toISOString().split("T")[0];
        const scheduledDate = await AsyncStorage.getItem(
          STORAGE_NAME.NOTIFICATION_FLAG_KEY
        );
        if (scheduledDate !== today) {
          await scheduleDailyNotification({
            body: `👋 Good morning, ${me.nickname}. Track your daily GPA.`,
          });
          await AsyncStorage.setItem(STORAGE_NAME.NOTIFICATION_FLAG_KEY, today);
        }
      }
    });
  }, [me, settings]);

  React.useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (_notification) => {}
    );
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((_response) => {
        router.navigate({
          pathname: "/(questions)/(health)/anxiety",
        });
      });
    return () => {
      responseListener.remove();
      notificationListener.remove();
    };
  }, []);

  React.useEffect(() => {
    if (!!me && me.completed) {
      router.replace("/(tabs)/home");
    }
  }, []);

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="(questions)/(health)/anxiety"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(questions)/(health)/depression"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(questions)/(health)/mental-health-support"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(questions)/(health)/panic-attack"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(questions)/(health)/specialist-treatment"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(questions)/(health)/symptom-frequency"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(questions)/(others)/academic-engagement"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(questions)/(others)/sleep-quality"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(questions)/(others)/study-hours-week"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(questions)/(others)/study-stress-level"
        options={{ headerShown: false }}
      />

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
      <Stack.Screen name="(common)/profile" options={{ headerShown: false }} />
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
          headerTitle: "Help",
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
        name="(common)/help"
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
