import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import Form from "@/src/components/Form/Form";
import { COLORS, FONTS } from "@/src/constants";
import { Ionicons } from "@expo/vector-icons";
import { useMeStore } from "@/src/store/meStore";
import { useRouter } from "expo-router";
import { onImpact } from "@/src/utils";
import { useSettingsStore } from "@/src/store/settingsStore";

const Page = () => {
  const [state, setState] = React.useState({
    nickname: "",
    error: "",
  });
  const router = useRouter();

  const { settings } = useSettingsStore();
  const { save, me } = useMeStore();
  React.useEffect(() => {
    if (!!me && !!me.nickname) {
      setState((s) => ({ ...s, nickname: me.nickname || "" }));
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
            question="What can we call you?"
            onNext={() => {
              if (state.nickname.trim().length < 3) {
                return setState((s) => ({
                  ...s,
                  error: "Nickname must contain at least 3 characters.",
                }));
              }
              setState((s) => ({
                ...s,
                error: "",
              }));
              save({
                ...me,
                nickname: state.nickname.trim(),
                completed: false,
              });
              router.navigate({
                pathname: "/(questions)/(basic)/gender",
              });
            }}
            onPrevious={undefined}
          >
            <View style={{ marginVertical: 20 }}>
              <TextInput
                placeholder="Nickname"
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.tertiary,
                  fontFamily: FONTS.regular,
                  color: COLORS.white,
                  fontSize: 16,
                }}
                placeholderTextColor={COLORS.gray200}
                value={state.nickname}
                onChangeText={(text) => {
                  setState((s) => ({ ...s, nickname: text }));
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
