import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import React from "react";
import Form from "@/src/components/Form/Form";
import { COLORS, FONTS } from "@/src/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const Page = () => {
  const [state, setState] = React.useState<{
    value: string;
    error: string;
  }>({
    value: "1",
    error: "",
  });
  const { health, academicEngagement, sleepQuality } = useLocalSearchParams<{
    health: string;
    academicEngagement: string;
    sleepQuality: string;
  }>();
  const router = useRouter();

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
          <MaterialIcons
            name="my-library-books"
            size={40}
            color={COLORS.white}
          />
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 25,
              color: COLORS.white,
              textAlign: "center",
            }}
          >
            Other Information
          </Text>
        </View>
        <View
          style={{ flex: 1, width: "100%", maxWidth: 400, alignSelf: "center" }}
        >
          <Form
            question="How many study hours do you have for the past week?"
            onNext={() => {
              const value = Number.parseInt(state.value) || 0;

              if (value < 1 || value >= 20) {
                return setState((s) => ({
                  ...s,
                  error:
                    "The number of hours should be between 1 and 19 inclusive.",
                }));
              }
              setState((s) => ({ ...s, error: "" }));
              router.navigate({
                pathname: "/(questions)/(others)/study-stress-level",
                params: {
                  health,
                  sleepQuality,
                  academicEngagement,
                  studyHours: value,
                },
              });
            }}
            onPrevious={() => {
              if (router.canGoBack()) {
                router.back();
              }
            }}
          >
            <View style={{ marginVertical: 20 }}>
              <TextInput
                placeholder="Study Hours"
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.tertiary,
                  fontFamily: FONTS.regular,
                  color: COLORS.white,
                  fontSize: 16,
                }}
                maxLength={2}
                placeholderTextColor={COLORS.gray200}
                value={state.value}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  setState((s) => ({ ...s, value: text }));
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
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Page;
