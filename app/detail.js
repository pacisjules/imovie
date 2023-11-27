import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Linking,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
export default function detail() {
  const MyWidth = Dimensions.get("window").width;
  const router = useRouter();
  const API_KEY = "3e842296dc9f34fe48a3eb30353d5bd9";
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const [Company, setCompany] = useState([]);
  const [Country, setCountry] = useState([]);

  const gemovie = () => {
    setLoading(true);
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
        const result = response.data;
        setLanguages(result.spoken_languages);
        setCompany(result.production_companies);
        setCountry(result.production_countries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    gemovie();
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
    <LinearGradient
      colors={["#540000", "black"]}
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        {loading ? (
          <View style={{
            width:MyWidth,
            height:600,
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
          }}><ActivityIndicator size="large" color="white" /></View>
          
        ) : (
          <View>
            <ImageBackground
              style={{
                width: MyWidth,
                height: 450,
                resizeMode: "cover",
                borderRadius: 15,
                marginTop: -2,
              }}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
              }}
              resizeMode="cover"
            >
              <LinearGradient
                colors={["transparent", "transparent", "black"]}
                style={{
                  width: MyWidth,
                  height: 450,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity 
                onPress={()=>{
                    router.back();
                }}
                style={{
                    width:55,
                    height:55,
                    backgroundColor:"#ff00008e",
                    borderRadius:150,
                    marginBottom:20
                }}>
                    <Ionicons name="chevron-back" size={55} color="white" />
                </TouchableOpacity>
                
                <View
                  style={{
                    width: MyWidth,
                    backgroundColor: "#0000005b",
                    padding: 10,
                    borderRadius: 200,
                    display: "flex",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: "black",
                    height:100
                  }}
                >
                  <Text
                    style={{
                      color: "red",
                      fontSize: 16,
                      fontWeight: "bold",
                      width:300,
                      textAlign:"center"
                    }}
                  >
                    {movie.title}
                  </Text>

                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      marginTop: 5,
                    }}
                  >
                    {movie.tagline}
                  </Text>
                </View>
              </LinearGradient>

             
            </ImageBackground> 
            <View
                style={{
                  padding: 20,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      textAlign: "center",
                    }}
                  >
                    {movie.overview},
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Ionicons name="ios-timer" size={18} color="red" />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                    }}
                  >
                    Adult {movie.adult ? "Yes" : "No"},
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                    }}
                  >
                    
                    Released {timeAgo(movie.release_date)}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                    }}
                  >
                    <Ionicons name="md-language" size={18} color="red" />
                  </Text>
                  {Languages.map((item, index) => (
                    <Text
                      key={index}
                      style={{
                        color: "white",
                        fontSize: 11,
                      }}
                    >
                      {item.english_name}
                    </Text>
                  ))}
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                    }}
                  >
                    <SimpleLineIcons
                      name="organization"
                      size={18}
                      color="red"
                    />
                  </Text>

                  <ScrollView horizontal>
                    {Company.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          backgroundColor: "white",
                          padding: 10,
                          borderRadius: 50,
                          marginLeft: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontSize: 10,
                            fontWeight: "700",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                    }}
                  >
                    <Fontisto name="world" size={18} color="red" />
                  </Text>

                  <ScrollView horizontal>
                    {Country.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          backgroundColor: "white",
                          padding: 10,
                          borderRadius: 50,
                          marginLeft: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontSize: 10,
                            fontWeight: "700",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>

                <View
                  style={{
                    width: MyWidth,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                  onPress={()=>{
                    Linking.openURL(movie.homepage)
                  }}
                    style={{
                      backgroundColor: "red",
                      padding: 10,
                      borderRadius: 50,
                      marginTop: 20,
                      width: MyWidth / 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      CHECK NOW
                    </Text>
                  </TouchableOpacity>


                </View>
              </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
