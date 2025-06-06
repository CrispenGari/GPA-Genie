import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React from "react";
import { COLORS, FONTS, LANDING_MESSAGES } from "@/src/constants";
import Animated, { ZoomIn } from "react-native-reanimated";
import { onImpact } from "@/src/utils";
import { useRouter } from "expo-router";
import { useSettingsStore } from "@/src/store/settingsStore";
import TypeWriter from "react-native-typewriter";

const Page = () => {
  const router = useRouter();
  const { settings } = useSettingsStore();
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (index >= LANDING_MESSAGES.length - 1) {
        setIndex(0);
      } else {
        setIndex((state) => state + 1);
      }
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [index]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                textAlign: "center",
                fontFamily: FONTS.bold,
                fontSize: 25,
              }}
            >
              PeerMart
            </Text>
            <Animated.Image
              source={require("../assets/images/icon.png")}
              style={{ width: 200, height: 200 }}
              entering={ZoomIn.duration(1000).delay(100)}
            />
            <View
              style={{
                margin: 20,
                maxWidth: 400,
                borderRadius: 10,
                backgroundColor: COLORS.main,
                padding: 10,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: 120,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  backgroundColor: COLORS.main,
                  top: -10,
                  width: 150,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 999,
                  shadowOpacity: 0.5,
                  elevation: 2,
                  shadowOffset: { width: 2, height: 2 },
                  shadowRadius: 5,
                  shadowColor: COLORS.tertiary,
                }}
              >
                <Text
                  style={{
                    color: COLORS.black,
                    fontFamily: FONTS.bold,
                  }}
                >
                  About PeerMart
                </Text>
              </View>

              <TypeWriter
                style={[
                  {
                    textAlign: "center",
                    fontFamily: FONTS.bold,
                    fontSize: 16,
                  },
                ]}
                typing={1}
                maxDelay={-50}
              >
                {LANDING_MESSAGES[index]}
              </TypeWriter>
            </View>

            <TouchableOpacity
              style={{ width: "100%", maxWidth: 300 }}
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                router.replace("/(auth)/login");
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.bold,
                  fontSize: 18,
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={{ padding: 20 }}>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 16,
                textAlign: "center",
                fontFamily: FONTS.bold,
                color: COLORS.black,
              }}
            >
              By using PeerMart you are automatically accepting{" "}
              <Text
                onPress={async () => {
                  if (settings.haptics) {
                    await onImpact();
                  }
                  router.push("/(common)/tnc");
                }}
                style={styles.clickable_text}
              >
                Terms and Conditions
              </Text>{" "}
              and{" "}
              <Text
                onPress={async () => {
                  if (settings.haptics) {
                    await onImpact();
                  }
                  router.push("/(common)/pp");
                }}
                style={styles.clickable_text}
              >
                Privacy Policy
              </Text>{" "}
              of this app.
            </Text>
          </SafeAreaView>
        </View>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  clickable_text: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    textDecorationLine: "underline",
  },
});
