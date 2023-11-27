import {
  Dimensions,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Index() {
  const MyWidth = Dimensions.get("window").width;
  const [movies, setMovies] = useState([]);
  const [TvsShow, setTvsShow] = useState([]);
  const [Actors, setActors] = useState([]);
  const [Category, setCategory] = useState([]);
  const API_KEY = "3e842296dc9f34fe48a3eb30353d5bd9";

  const router = useRouter();

  const getcategories = () => {
    const apiUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setCategory(response.data.genres);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getActors = () => {
    const apiUrl = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setActors(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const gettvshow = () => {
    const apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setTvsShow(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getActors();
    getcategories();
    gettvshow();
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setMovies(response.data.results);
        //console.log(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function timeAgo(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);
    const now = new Date();
    const diffMs = now - dateTime;
    const diffSeconds = Math.round(diffMs / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);
    const diffMonths = Math.round(diffDays / 30); // Approximate months
    const diffYears = Math.round(diffDays / 365); // Approximate years

    if (diffSeconds < 60) {
      return `${diffSeconds} seconds ago`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffMonths < 12) {
      return `${diffMonths} months ago`;
    } else {
      return `${diffYears} years ago`;
    }
  }

  return (
    <SafeAreaView>
      <View>
        <StatusBar style="dark" />
        <ScrollView>
          <LinearGradient
            colors={["#540000", "black"]}
            style={{
              padding: 10,
            }}
          >
            <View
              style={{
                width: MyWidth,
                marginTop: 20,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                style={{
                  width: 45,
                  height: 45,
                  resizeMode: "cover",
                  marginLeft: 5,
                }}
                source={require("../assets/images/mvlogo.png")}
              />

              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Imovies Hub
              </Text>

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
            </View>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Popularity & Trending Movies
            </Text>
            <FlatList
              data={movies}
              horizontal
              renderItem={({ item: movie }) => (
                <TouchableOpacity
                  onPress={() => {
                    router.push(`detail?id=${movie.id}`);
                  }}
                  style={{
                    marginTop: 20,
                    display: "flex",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    style={{
                      width: MyWidth / 3,
                      height: MyWidth / 2,
                      resizeMode: "cover",
                      borderRadius: 15,
                      marginLeft: 5,
                    }}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    }}
                  />

                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: 8,
                      marginTop: 10,
                      marginLeft: 5,
                      width: 120,
                    }}
                  >
                    {movie.title}
                  </Text>

                  <Text
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: 9,
                      marginTop: 2,
                      marginLeft: 5,
                    }}
                  >
                    <Ionicons name="timer-outline" size={12} color="white" />{" "}
                    {timeAgo(movie.release_date)}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()} // Ensure to convert id to string
            />

            <View>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                {Category.length}{" "}
                {Category.length > 1 ? "Categories" : "Category"}
              </Text>

              <ScrollView
                horizontal
                style={{
                  padding: 5,
                }}
              >
                {Category.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      alert(`Category id${item.id}`);
                    }}
                    key={item.id}
                    style={{
                      width: 150,
                      backgroundColor: "black",
                      padding: 10,
                      marginLeft: 5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 10,
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Popular TV Shows
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                padding: 0,
                gap: 15,
              }}
            >
              {TvsShow.map((movie) => (
                <TouchableOpacity
                  onPress={() => {
                    alert(`Movie id is: ${movie.id}`);
                  }}
                  key={movie.id}
                >
                  <Image
                    style={{
                      width: MyWidth / 5,
                      height: MyWidth / 3,
                      resizeMode: "cover",
                      borderRadius: 8,
                    }}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Popular Actors
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                padding: 10,
                gap: 15,
              }}
            >
              {Actors.map((movie) => (
                <TouchableOpacity
                  onPress={() => {
                    alert(`Movie id is: ${movie.name}`);
                  }}
                  key={movie.id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    padding: 20,
                    backgroundColor: "black",
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: "red",
                  }}
                >
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      resizeMode: "cover",
                      borderRadius: 200,
                    }}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${movie.profile_path}`,
                    }}
                  />
                  <View
                    style={{
                      width: 150,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {movie.original_name}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      {movie.gender === 0
                        ? "Other gender"
                        : movie.gender === 1
                        ? "Female"
                        : "Male"}
                    </Text>

                    <View
                      style={{
                        backgroundColor: "red",
                        paddingLeft: 30,
                        paddingRight: 30,
                        paddingTop: 10,
                        paddingBottom: 10,
                        marginTop: 20,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        View
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </LinearGradient>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
