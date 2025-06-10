import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import Form from "@/src/components/Form/Form";
import { COLORS, FONTS } from "@/src/constants";
import { Ionicons } from "@expo/vector-icons";
import { useMeStore } from "@/src/store/meStore";
import { useRouter } from "expo-router";
import { calculateAge, onImpact } from "@/src/utils";
import { useSettingsStore } from "@/src/store/settingsStore";
import BirthdayPicker from "@/src/components/BirthdayPicker/BirthdayPicker";

const Page = () => {
  const [state, setState] = React.useState<{
    error: string;
    dob: Date;
  }>({
    dob: new Date(1999, 9, 5),
    error: "",
  });
  const router = useRouter();
  const { save, me } = useMeStore();
  const { settings } = useSettingsStore();
  React.useEffect(() => {
    if (!!me && !!me.dob) {
      setState((s) => ({ ...s, dob: me.dob || new Date(1999, 9, 5) }));
    }
  }, [me]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: COLORS.main }}>
        <View
          style={{
            flex: 0.4,
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="information-circle" size={40} color={COLORS.white} />
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 25,
              color: COLORS.white,
              textAlign: "center",
            }}
          >
            Basic Information
          </Text>
        </View>
        <View
          style={{ flex: 1, width: "100%", maxWidth: 400, alignSelf: "center" }}
        >
          <Form
            question="When were you born?"
            onNext={() => {
              if (!!!state.dob) {
                return setState((s) => ({
                  ...s,
                  error: "Please select the correct date of birth.",
                }));
              }
              setState((s) => ({
                ...s,
                error: "",
              }));
              const age = calculateAge(state.dob);
              if (age < 16) {
                return setState((s) => ({
                  ...s,
                  error: "You are underage to use this app.",
                }));
              }
              save({
                ...me,
                dob: state.dob,
                completed: false,
              });
              router.navigate({
                pathname: "/(questions)/(basic)/year",
              });
            }}
            onPrevious={() => {
              if (router.canGoBack()) {
                router.back();
              }
            }}
          >
            <View style={{ marginVertical: 20 }}>
              <BirthdayPicker
                onChange={(date) => {
                  setState((s) => ({ ...s, dob: date }));
                }}
              />
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  color: COLORS.red,
                  fontSize: 16,
                }}
              >
                {state.error}
              </Text>
            </View>
          </Form>
        </View>
        <SafeAreaView style={{ padding: 20 }}>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 16,
              textAlign: "center",
              fontFamily: FONTS.regular,
              color: COLORS.white,
            }}
          >
            By using GPA Ginie you are automatically accepting{" "}
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
    </TouchableWithoutFeedback>
  );
};

export default Page;

const styles = StyleSheet.create({
  clickable_text: {
    color: COLORS.red,
    fontFamily: FONTS.regular,
    textDecorationLine: "underline",
  },
});
