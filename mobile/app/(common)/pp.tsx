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

const PrivacyPolicy = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Privacy Policy",
          headerLargeTitle: false,
          headerLargeTitleShadowVisible: true,
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 18,
            color: COLORS.white,
          },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container]}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <Card style={[styles.card, { backgroundColor: COLORS.main }]}>
          <Animated.Image
            entering={ZoomInDown.delay(200).duration(200)}
            source={require("../../assets/images/icon.png")}
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 20,
              alignSelf: "center",
              color: COLORS.white,
            }}
          >
            GPA GINIE 🔐
          </Text>
        </Card>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>
              1. Academic Data Privacy 📚
            </Text>
            <Text style={styles.bulletPoint}>
              Your GPA data is stored securely and is only accessible by you.
              GPA GINIE never shares academic records with third parties.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>
              2. Machine Learning Insights 🤖
            </Text>
            <Text style={styles.bulletPoint}>
              GPA predictions are generated on-device or securely in the cloud.
              No sensitive academic data is used for model training.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>3. Personal Information 🔒</Text>
            <Text style={styles.bulletPoint}>
              We only collect the minimum personal information (like nicknames,
              date of birth and gender) for better user experience and all that
              is stored on your local device.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>4. Third-Party Services ⚙️</Text>
            <Text style={styles.bulletPoint}>
              No third part services are being used.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>5. No Ads, No Selling 🚫</Text>
            <Text style={styles.bulletPoint}>
              We do not sell your data or display ads. Your academic focus
              remains undistracted and private.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>6. Data Control 🎛️</Text>
            <Text style={styles.bulletPoint}>
              You have full control over your data. You can export or delete
              your records at any time from the app settings.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>7. Account Deletion 🗑️</Text>
            <Text style={styles.bulletPoint}>
              You can just go to the settings and delete you account, we don't
              keep the user account anywhere on cloud or on our servers but on
              your local device.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>8. Underage Use 🚸</Text>
            <Text style={styles.bulletPoint}>
              GPA GINIE is designed for college and university students. We do
              not knowingly collect data from users under 16 years old.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>9. Analytics 📈</Text>
            <Text style={styles.bulletPoint}>
              We may collect anonymous usage statistics to improve the app
              experience. No academic data is used for this purpose.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>10. Policy Updates 🔁</Text>
            <Text style={styles.bulletPoint}>
              We may update this policy periodically. You'll be informed of
              major changes through the app or email.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>11. Contact Us 📧</Text>
            <Text style={styles.bulletPoint}>
              For any privacy-related questions, contact us at
              crispengari@gmail.com. We're here to help.
            </Text>
          </Card>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.main,
  },
  card: {
    padding: 10,
    maxWidth: 500,
    alignSelf: "flex-start",
    borderRadius: 5,
    width: "100%",
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: COLORS.secondary,
  },
  sectionHeader: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginBottom: 8,
    color: COLORS.white,
  },
  bulletPoint: {
    fontSize: 18,
    marginBottom: 4,
    fontFamily: FONTS.regular,
    color: COLORS.white,
  },
  bold: {
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
  },
});
