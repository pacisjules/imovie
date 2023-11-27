import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Songs() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text
        style={{
          color: "yellow",
          fontWeight: "bold",
          margin: 20,
        }}
      >
        Songs
      </Text>

      <Link href={"/"}>
        <View
          style={{
            width: 120,
            height: 45,
            backgroundColor: "red",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Visit Home
          </Text>
        </View>
      </Link>
    </View>
  );
}
