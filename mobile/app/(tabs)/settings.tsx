import {
  Text,
  ScrollView,
  StyleSheet,
  Share,
  Linking,
  Alert,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/src/constants";
import Card from "@/src/components/Card/Card";
import SettingItem from "@/src/components/SettingItem/SettingItem";
import { useSettingsStore } from "@/src/store/settingsStore";
import { useRouter } from "expo-router";
import { onFetchUpdateAsync, onImpact, rateApp } from "@/src/utils";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Constants from "expo-constants";
import { useHistoryStore } from "@/src/store/historyStore";
import { useMeStore } from "@/src/store/meStore";

const Page = () => {
  const { settings, update, restore } = useSettingsStore();
  const { clear } = useHistoryStore();
  const { destroy } = useMeStore();
  const router = useRouter();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.main }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.headerText, { marginTop: 20 }]}>Misc</Text>
      <Card
        style={{
          marginHorizontal: 10,
          paddingVertical: 10,
          paddingHorizontal: 0,
          maxWidth: "100%",
          backgroundColor: COLORS.primary,
        }}
      >
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            update({ ...settings, notifications: !settings.notifications });
          }}
          title="Notifications"
          Icon={
            <Ionicons
              name={
                settings.notifications
                  ? "notifications-outline"
                  : "notifications-off-outline"
              }
              size={20}
              color={COLORS.white}
            />
          }
        />

        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            update({ ...settings, haptics: !settings.haptics });
          }}
          title="Haptics"
          Icon={
            <MaterialCommunityIcons
              name={settings.haptics ? "vibrate" : "vibrate-off"}
              size={20}
              color={COLORS.white}
            />
          }
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            update({ ...settings, sound: !settings.sound });
          }}
          title="In app Sounds"
          Icon={
            <MaterialCommunityIcons
              name={settings.sound ? "speaker" : "speaker-off"}
              size={20}
              color={COLORS.white}
            />
          }
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            await onFetchUpdateAsync();
          }}
          title="Check for Updates"
          Icon={<MaterialIcons name="update" size={20} color={COLORS.white} />}
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            Alert.alert(
              "GPA Ginie",
              "Are you sure you want to clear GPA history?",
              [
                {
                  text: "YES",
                  style: "default",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                    clear();
                  },
                },
                {
                  text: "NO",
                  style: "cancel",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                  },
                },
              ],
              { cancelable: false }
            );
          }}
          labelStyle={{
            color: COLORS.red,
          }}
          title="Clear History"
          Icon={
            <MaterialIcons name="compare-arrows" size={20} color={COLORS.red} />
          }
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            Alert.alert(
              "GPA Ginie",
              "Are you sure you want to reset GPA-Gine?",
              [
                {
                  text: "YES",
                  style: "default",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                    clear();
                    restore();
                    destroy();
                  },
                },
                {
                  text: "NO",
                  style: "cancel",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                  },
                },
              ],
              { cancelable: false }
            );
          }}
          labelStyle={{
            color: COLORS.red,
          }}
          title="Restore Settings"
          Icon={<MaterialIcons name="reset-tv" size={20} color={COLORS.red} />}
        />
      </Card>
      <Text style={styles.headerText}>Support</Text>
      <Card
        style={{
          marginHorizontal: 10,
          paddingVertical: 10,
          paddingHorizontal: 0,
          maxWidth: "100%",
          backgroundColor: COLORS.primary,
        }}
      >
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            await Share.share(
              {
                url: "https://github.com/CrispenGari/GPA-Genie",
                message:
                  "An awesome app for measuring daily performance: Download at https://github.com/CrispenGari/GPA-Genie",
                title: "Share  GPA Gine with a Friend",
              },
              { dialogTitle: "Share GPA Gine", tintColor: COLORS.tertiary }
            );
          }}
          title="Tell a friend"
          Icon={
            <Ionicons name="heart-outline" size={20} color={COLORS.white} />
          }
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            await rateApp();
          }}
          title="Rate GPA Ginie"
          Icon={<Ionicons name="star-outline" size={20} color={COLORS.white} />}
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            router.navigate("/(common)/help");
          }}
          title="How does GPA Genie works"
          Icon={<Ionicons name="help" size={20} color={COLORS.white} />}
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            const res = await Linking.canOpenURL(
              "https://github.com/CrispenGari/GPA-Genie/issues"
            );
            if (res) {
              Linking.openURL(
                "https://github.com/CrispenGari/GPA-Genie/issues"
              );
            }
          }}
          title="Report an Issue"
          Icon={<Ionicons name="logo-github" size={20} color={COLORS.white} />}
        />
      </Card>
      <Text style={styles.headerText}>Legal</Text>
      <Card
        style={{
          marginHorizontal: 10,
          paddingVertical: 10,
          paddingHorizontal: 0,
          maxWidth: "100%",
          backgroundColor: COLORS.primary,
        }}
      >
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            router.navigate("/(common)/tnc");
          }}
          title="Terms of Service"
          Icon={
            <Ionicons
              name="document-text-outline"
              size={20}
              color={COLORS.white}
            />
          }
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            router.navigate("/(common)/pp");
          }}
          title="Privacy Policy"
          Icon={
            <Ionicons
              name="document-text-outline"
              size={20}
              color={COLORS.white}
            />
          }
        />
      </Card>
      <Text
        style={{
          fontFamily: FONTS.regular,
          color: COLORS.white,
          padding: 10,
          textAlign: "center",
          marginTop: 30,
        }}
      >
        {Constants.default.expoConfig?.name}
        {" version: "}
        {Constants.default.expoConfig?.version}
      </Text>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 20,
    color: COLORS.white,
    marginBottom: 5,
  },
});
