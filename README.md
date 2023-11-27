# Movie Streaming App

A mobile application for streaming movies. Watch your favorite movies and TV shows on the go.

## Overview

This app allows users to browse and stream a wide variety of movies. Whether you are a fan of action, romance, or sci-fi, our app has something for everyone.

## Features

- Stream movies on the go
- Explore a vast library of movies
- User-friendly interface
- Categorized movie genres
- Search functionality for easy navigation

## Screenshots
![image](https://github.com/pacisjules/imovie/assets/51479761/a17ac89f-2cb0-45a3-b596-0fbdccb5d4e0)
*App Home*
![image](https://github.com/pacisjules/imovie/assets/51479761/ae7bb721-bade-40e7-86e8-1fbf42218db6)
*View the movie property*

![image](https://github.com/pacisjules/imovie/assets/51479761/34eb1b7f-8357-4a82-b885-da62d9d7d389)
*Best Year Actors Check*

``` javascript
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
```

## Getting Started

### Prerequisites

- Node.js
- Expo CLI

### Installation

1. Clone the repository.
   ```bash
   git clone https://github.com/yourusername/movie-app.git
