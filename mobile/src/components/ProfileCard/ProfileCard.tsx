import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/src/constants";
import { useMeStore } from "@/src/store/meStore";
import { calculateAge, getGreetingMessage, onImpact } from "@/src/utils";
import TypeWriter from "react-native-typewriter";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "@/src/store/settingsStore";
import { useRouter } from "expo-router";

interface Props {
  title: string;
}
const ProfileCard = ({ title }: Props) => {
  const { me } = useMeStore();
  const { settings } = useSettingsStore();
  const router = useRouter();

  if (!!!me) return null;

  return (
    <SafeAreaView
      style={{
        paddingTop: 80,
        backgroundColor: COLORS.main,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBlockColor: COLORS.tertiary,
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          fontFamily: FONTS.bold,
          fontSize: 16,
          alignSelf: "flex-end",
          marginBottom: 20,
        }}
      >
        {title}
      </Text>

      <TouchableOpacity
        onPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          router.navigate({
            pathname: "/(common)/profile",
          });
        }}
        style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
      >
        <View style={{ flex: 1 }}>
          <TypeWriter
            style={{
              fontFamily: FONTS.bold,
              fontSize: 25,
              color: COLORS.white,
            }}
            typing={1}
            maxDelay={-50}
          >
            {getGreetingMessage()}, {me?.nickname}.
          </TypeWriter>
          <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.tertiary,
              fontSize: 16,
              marginTop: 10,
            }}
          >
            Year {me?.year} •{" "}
            {me?.gender?.charAt(0).toUpperCase().concat(me.gender.slice(1))} •{" "}
            {calculateAge(me?.dob!)} years.
          </Text>
        </View>
        <TouchableOpacity hitSlop={20} style={{ marginRight: 5 }}>
          <Ionicons name="chevron-forward" size={25} color={COLORS.white} />
        </TouchableOpacity>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileCard;
