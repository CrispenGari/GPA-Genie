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

const TermsAndConditions = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Terms & Conditions",
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
            GPA GINIE 📜
          </Text>
        </Card>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>1. Acceptance of Terms ✅</Text>
            <Text style={styles.bulletPoint}>
              By using GPA GINIE, you agree to these terms. If you do not agree,
              please do not use the app.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>
              2. Use of Academic Tools 🎓
            </Text>
            <Text style={styles.bulletPoint}>
              GPA GINIE provides tools for GPA tracking and predictions. The app
              is for educational and personal use only.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>3. User Responsibility 🧑‍💻</Text>
            <Text style={styles.bulletPoint}>
              You are responsible for the accuracy of the academic data you
              enter. GPA GINIE does not verify or correct user input.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>4. Local Storage 📱</Text>
            <Text style={styles.bulletPoint}>
              All your data is stored locally on your device. We do not store
              your data on servers or the cloud.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>5. No Warranty ⚠️</Text>
            <Text style={styles.bulletPoint}>
              GPA predictions are estimates. We do not guarantee accuracy or
              fitness for academic or institutional decision-making.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>
              6. Intellectual Property 🧠
            </Text>
            <Text style={styles.bulletPoint}>
              All content and features of GPA GINIE are the intellectual
              property of the developers. Do not copy, modify, or redistribute
              without permission.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>7. Account Deletion 🔐</Text>
            <Text style={styles.bulletPoint}>
              You may delete your account from settings at any time. No user
              data is retained by us once deleted from your device.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>
              8. Limitation of Liability 🚫
            </Text>
            <Text style={styles.bulletPoint}>
              We are not liable for any loss or damage resulting from the use or
              inability to use GPA GINIE.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>9. Changes to Terms 🔁</Text>
            <Text style={styles.bulletPoint}>
              We may update these terms. Continued use of the app after changes
              means you accept the updated terms.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>10. Contact Us 📧</Text>
            <Text style={styles.bulletPoint}>
              If you have questions about these terms, contact us at
              crispengari@gmail.com.
            </Text>
          </Card>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default TermsAndConditions;

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
