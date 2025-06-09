import { Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Animated, {
  SlideInLeft,
  SlideInRight,
  ZoomInDown,
} from "react-native-reanimated";
import { FONTS, COLORS } from "@/src/constants";
import Card from "@/src/components/Card/Card";

const Help = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Help & Guide",
          headerLargeTitle: false,
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 18,
            color: COLORS.white,
          },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <Card style={[styles.card, { backgroundColor: COLORS.main }]}>
          <Animated.Image
            entering={ZoomInDown.delay(200).duration(200)}
            source={require("../../assets/images/icon.png")}
            style={{
              width: 180,
              height: 180,
              alignSelf: "center",
            }}
          />
          <Text style={styles.headerText}>Need Help Using GPA GINIE?</Text>
        </Card>

        <Animated.View entering={SlideInLeft.delay(100).duration(200)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>🧠 What is GPA GINIE?</Text>
            <Text style={styles.text}>
              GPA GINIE is your academic companion that helps you track and
              predict your daily CGPA using smart AI-powered questions. No
              manual GPA math or course input needed!
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(100).duration(200)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>📋 How to Use It?</Text>
            <Text style={styles.text}>
              Each day, simply answer a few short questions about your academic
              habits, focus, and workload. The app then predicts your CGPA for
              the day and shows your academic trend.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.delay(100).duration(200)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>
              📈 How Are Predictions Made?
            </Text>
            <Text style={styles.text}>
              Predictions are based on your previous answers, behavior patterns,
              and academic rhythm – all processed securely either on-device or
              in the cloud using machine learning.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(100).duration(200)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>🔐 Is My Data Safe?</Text>
            <Text style={styles.text}>
              Yes! All your data is private and stored locally on your device.
              GPA GINIE does not upload academic or personal information to the
              cloud unless explicitly needed for prediction.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.delay(100).duration(200)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>⚙️ Settings and Account</Text>
            <Text style={styles.text}>
              You can update your profile, adjust prediction preferences, or
              delete your account anytime from the Settings tab.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(100).duration(200)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>📊 View Trends</Text>
            <Text style={styles.text}>
              See how your daily CGPA predictions change over time using
              interactive charts and summaries in the Dashboard.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.delay(100).duration(200)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>📧 Need More Help?</Text>
            <Text style={styles.text}>
              Reach out to us anytime at{" "}
              <Text style={styles.email}>crispengari@gmail.com</Text>. We're
              happy to assist you.
            </Text>
          </Card>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.main,
  },
  card: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: COLORS.secondary,
  },
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.white,
    textAlign: "center",
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginBottom: 8,
    color: COLORS.white,
  },
  text: {
    fontSize: 18,
    fontFamily: FONTS.regular,
    color: COLORS.white,
  },
  email: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    textDecorationLine: "underline",
  },
});
