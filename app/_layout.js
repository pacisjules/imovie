import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function _layout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "iMovie Hub",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "red",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                alert("Search");
              }}
              style={{
                backgroundColor: "red",
                width: 40,
                height: 40,
                marginRight: 20,
                borderRadius: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="ios-search" size={22} color="white" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="screens/songs"
        options={{
          title: "My soft Songs",
          headerRight: () => (
            <Button
              title="Login"
              onPress={() => {
                router.push("/login");
              }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          title: "Login page",
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: "Detail page",
          headerShown:false
        }}
      />

    </Stack>
  );
}
