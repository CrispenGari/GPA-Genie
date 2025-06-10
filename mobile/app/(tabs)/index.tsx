import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/src/constants";
import { MaterialIcons } from "@expo/vector-icons";
import LastPerformance from "@/src/components/LastPerformance/LastPerformance";
import PerformanceStatistics from "@/src/components/PerformanceStatistics/PerformanceStatistics";
import { useNetwork } from "@/src/hooks/useNetwork";
import { useRouter } from "expo-router";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { useHistoryStore } from "@/src/store/historyStore";

const Page = () => {
  const { isInternetReachable } = useNetwork();
  const router = useRouter();
  const { settings } = useSettingsStore();
  const { last } = useHistoryStore();
  const hasTodayGPA = React.useMemo(() => {
    if (!!!last) return false;
    const today = new Date().toISOString().split("T")[0];
    const entryDate = new Date(last.date).toISOString().split("T")[0];
    return entryDate === today;
  }, [last]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.main,
      }}
      contentContainerStyle={{ padding: 20, gap: 10, paddingBottom: 100 }}
    >
      <View
        style={{
          gap: 10,
          flexDirection: "row",
          maxWidth: 400,
          width: "100%",
        }}
      >
        <View
          style={{
            flex: 0.4,
            gap: 10,
          }}
        >
          <TouchableOpacity
            disabled={hasTodayGPA}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              router.navigate({
                pathname: "/(questions)/(health)/anxiety",
              });
            }}
            style={styles.btn}
          >
            <MaterialIcons
              name="track-changes"
              size={30}
              color={hasTodayGPA ? COLORS.gray200 : COLORS.red}
            />
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 16,
                color: hasTodayGPA ? COLORS.gray200 : COLORS.red,
                textAlign: "center",
              }}
            >
              Check Today's performance.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} disabled>
            <MaterialIcons
              name={!!isInternetReachable ? "wifi" : "wifi-off"}
              size={30}
              color={COLORS.white}
            />
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 16,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              {!!isInternetReachable
                ? "Internet Available"
                : "Internet Unavailable"}
            </Text>
          </TouchableOpacity>
        </View>
        <LastPerformance />
      </View>
      <PerformanceStatistics />
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
    gap: 20,
  },
});
