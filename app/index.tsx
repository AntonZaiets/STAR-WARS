import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, ImageBackground, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { Video } from 'expo-av';
import { Asset } from 'expo-asset'; // Імпортуємо Asset для попереднього завантаження
import { loadFonts } from "@/assets/fonts/CustomFonts";
import { ThemeProvider, useTheme } from "@/components/Context/Context";

const { height, width } = Dimensions.get('window');

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });

        // Завантаження фото
        const preloadImages = async () => {
            const imageSources = [
                require('../assets/images/asoka_bg_2.jpg'),
                require('../assets/images/vader_bg_3.jpg'),
            ];

            const imagePromises = imageSources.map(image => {
                return Asset.fromModule(image).downloadAsync(); // Завантаження локальних ресурсів
            });

            await Promise.all(imagePromises);
            setImagesLoaded(true);
        };

        const preloadVideo = async () => {
            const videoSources = [
                require('../assets/videos/vidos.mp4'),
            ];

            const imagePromises = videoSources.map(video => {
                return Asset.fromModule(video).downloadAsync(); // Завантаження локальних ресурсів
            });

            await Promise.all(imagePromises);
            setImagesLoaded(true);
        };

        preloadVideo()
        preloadImages();
    }, []);

    if (!fontsLoaded || !imagesLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Video
                source={require('../assets/videos/vidos.mp4')}
                style={styles.video}
                isLooping
                isMuted
                resizeMode="cover"
                shouldPlay
            />
            <SafeAreaView>
                <Text style={styles.choose}>Choose your Side</Text>
                <StatusBar style='auto' />
                <View style={styles.imagesContainer}>
                    <Link
                        href='/Characters'
                        style={styles.roundImageContainer}
                        onPress={() => toggleTheme('light')}
                    >
                        <ImageBackground
                            source={require('../assets/images/asoka_bg_2.jpg')}
                            style={styles.roundImage}
                        >
                            <Text style={styles.maskTextLight}>
                                Light
                            </Text>
                        </ImageBackground>
                    </Link>
                    <Link
                        href='/Characters'
                        style={styles.roundImageContainer}
                        onPress={() => toggleTheme('dark')}
                    >
                        <ImageBackground
                            source={require('../assets/images/vader_bg_3.jpg')}
                            style={styles.roundImage}
                        >
                            <Text style={styles.maskTextDark}>
                                Dark
                            </Text>
                        </ImageBackground>
                    </Link>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    choose: {
        textAlign: 'center',
        fontSize: 50,
        marginBottom: 30,
        color: 'yellow',
        fontFamily: 'CustomFont-Regular',
    },
    imagesContainer: {
        justifyContent: 'space-around',
    },
    roundImageContainer: {
        borderRadius: 10,
        margin: 10,
    },
    roundImage: {
        opacity: 0.65,
        justifyContent: 'center',
    },
    maskTextLight: {
        fontSize: 85,
        margin: 20,
        color: 'blue',
        fontFamily: 'CustomFont-Regular-Empty',
        textAlign: 'center',
    },
    maskTextDark: {
        fontSize: 85,
        margin: 20,
        color: 'red',
        fontFamily: 'CustomFont-Regular-Empty',
        textAlign: 'center',
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
    },
});
