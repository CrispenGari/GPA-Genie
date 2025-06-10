import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Form from "@/src/components/Form/Form";
import { COLORS, FONTS, GENDERS, YEARS } from "@/src/constants";
import { Ionicons } from "@expo/vector-icons";
import { useMeStore } from "@/src/store/meStore";
import { useRouter } from "expo-router";
import { onImpact } from "@/src/utils";
import { useSettingsStore } from "@/src/store/settingsStore";
import BirthdayPicker from "@/src/components/BirthdayPicker/BirthdayPicker";
import DropdownSelect from "react-native-input-select";

type TState = {
  gender: "male" | "female";
  nickname: string;
  error: string;
  dob: Date;
  year: number;
};
const Page = () => {
  const [state, setState] = React.useState<TState>({
    nickname: "",
    error: "",
    dob: new Date(1999, 9, 5),
    gender: "male",
    year: 1,
  });
  const router = useRouter();
  const { settings } = useSettingsStore();
  const { save, me } = useMeStore();

  React.useEffect(() => {
    if (!!me) {
      setState((s) => ({
        ...s,
        nickname: me.nickname || "",
        dob: me.dob || new Date(1999, 9, 5),
        gender: me.gender || "male",
        year: me.year || 1,
      }));
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
            showButtons={false}
            question="What can we call you?"
            onNext={() => {}}
          >
            <View style={{ marginVertical: 0 }}>
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
            </View>
          </Form>
          <Form
            showButtons={false}
            question="When were you born?"
            onNext={() => {}}
          >
            <View style={{ marginVertical: 5 }}>
              <BirthdayPicker
                onChange={(date) => {
                  setState((s) => ({ ...s, dob: date }));
                }}
              />
            </View>
          </Form>

          <Form
            question="What is your gender?"
            onNext={() => {}}
            showButtons={false}
          >
            <View style={{ marginVertical: 5 }}>
              <DropdownSelect
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
            </View>
          </Form>
          <Form
            question="Which year are you doing?"
            onNext={() => {}}
            showButtons={false}
          >
            <View style={{ marginVertical: 5 }}>
              <DropdownSelect
                placeholder="Select Year"
                options={YEARS}
                optionValue={"value"}
                selectedValue={state.year}
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
                  setState((state) => ({ ...state, year: value }));
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
            <View style={{ flexDirection: "row", gap: 20, marginVertical: 20 }}>
              <TouchableOpacity
                onPress={async () => {
                  if (settings.haptics) {
                    await onImpact();
                  }
                  if (router.canGoBack()) {
                    router.back();
                  } else {
                    router.replace({ pathname: "/(tabs)" });
                  }
                }}
                style={[styles.btn]}
              >
                <Text style={[styles.btn_text, { color: COLORS.black }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: COLORS.primary }]}
                onPress={async () => {
                  if (settings.haptics) {
                    await onImpact();
                  }
                  if (state.nickname.trim().length < 3) {
                    return setState((s) => ({
                      ...s,
                      error: "Nickname must contain at least 3 characters.",
                    }));
                  }
                  if (!!!state.gender) {
                    return setState((s) => ({
                      ...s,
                      error: "Please select your gender.",
                    }));
                  }
                  if (!!!state.year) {
                    return setState((s) => ({
                      ...s,
                      error: "Please select the year you're doing..",
                    }));
                  }
                  if (!!!state.dob) {
                    return setState((s) => ({
                      ...s,
                      error: "Please select the correct date of birth.",
                    }));
                  }
                  save({
                    completed: true,
                    dob: state.dob,
                    gender: state.gender,
                    nickname: state.nickname,
                    year: state.year,
                  });
                  if (router.canGoBack()) {
                    router.back();
                  } else {
                    router.replace({ pathname: "/(tabs)" });
                  }
                }}
              >
                <Text style={[styles.btn_text]}>Save</Text>
              </TouchableOpacity>
            </View>
          </Form>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Page;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
  },
  btn_text: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
});
