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
import { COLORS, FONTS, GENDERS } from "@/src/constants";
import { Ionicons } from "@expo/vector-icons";
import { useMeStore } from "@/src/store/meStore";
import { useRouter } from "expo-router";
import Dropdown from "react-native-input-select";
import { onImpact } from "@/src/utils";
import { useSettingsStore } from "@/src/store/settingsStore";

const Page = () => {
  const [state, setState] = React.useState<{
    error: string;
    gender: "male" | "female";
  }>({
    gender: "male",
    error: "",
  });
  const { settings } = useSettingsStore();
  const router = useRouter();
  const { save, me } = useMeStore();
  React.useEffect(() => {
    if (!!me && !!me.gender) {
      setState((s) => ({ ...s, gender: me.gender || "male" }));
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
            question="What is your gender?"
            onNext={() => {
              if (!!!state.gender) {
                return setState((s) => ({
                  ...s,
                  error: "Please select your gender.",
                }));
              }
              setState((s) => ({
                ...s,
                error: "",
              }));
              save({
                ...me,
                gender: state.gender,
                completed: false,
              });
              router.navigate({
                pathname: "/(questions)/(basic)/dob",
              });
            }}
            onPrevious={() => {
              if (router.canGoBack()) {
                router.back();
              }
            }}
          >
            <View style={{ marginVertical: 20 }}>
              <Dropdown
                placeholder="Select Gender"
                options={GENDERS}
                optionValue={"value"}
                selectedValue={state.gender}
                isMultiple={false}
                dropdownIconStyle={{ top: 15, right: 15 }}
                modalControls={{
                  modalOptionsContainerStyle: {
                    backgroundColor: COLORS.white,
                  },
                }}
                dropdownStyle={{
                  borderWidth: 0,
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  minHeight: 40,
                  backgroundColor: COLORS.gray100,
                  flexDirection: "column-reverse",
                }}
                placeholderStyle={{
                  color: COLORS.black,
                  fontSize: 18,
                  fontFamily: FONTS.regular,
                }}
                onValueChange={async (value: any) => {
                  if (settings.haptics) await onImpact();
                  setState((state) => ({ ...state, gender: value }));
                }}
                primaryColor={COLORS.secondary}
                dropdownHelperTextStyle={{
                  display: "none",
                }}
                selectedItemStyle={{
                  color: COLORS.black,
                  fontSize: 16,
                  fontFamily: FONTS.regular,
                  paddingBottom: 5,
                }}
                listComponentStyles={{
                  itemSeparatorStyle: { borderColor: COLORS.gray100 },
                }}
                checkboxControls={{
                  checkboxLabelStyle: {
                    fontFamily: FONTS.bold,
                    paddingBottom: 5,
                    color: COLORS.black,
                    fontSize: 14,
                  },
                  checkboxStyle: {
                    borderRadius: 999,
                    borderColor: COLORS.transparent,
                  },
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
