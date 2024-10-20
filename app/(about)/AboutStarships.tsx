import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, Animated } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getPlanetData } from "@/components/Services/api/characters";
import { loadFonts } from "@/assets/fonts/CustomFonts";
import PageForm from "@/components/PageForm";
import { Gyroscope } from 'expo-sensors';
import {Asset} from "expo-asset";

const AboutStarship = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const params = useLocalSearchParams();
    const characterData = params.characterData ? JSON.parse(params.characterData as string) : null;
    const image = params.image as any;
    const imageBg = params.imageBg as any;
    const [imagesLoaded, setImagesLoaded] = useState(false);


    const [starship, setStarship] = useState<any>(null);
    const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });

    // Анімаційні змінні
    const bgAnimationX = useRef(new Animated.Value(500)).current; // старт з правого боку
    const bgAnimationY = useRef(new Animated.Value(-300)).current; // старт зверху
    const scaleAnimation = useRef(new Animated.Value(0)).current; // початковий масштаб 0

    // Гіроскопічна анімація
    const gyroscopeAnimX = useRef(new Animated.Value(0)).current;
    const gyroscopeAnimY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });
    }, []);

    useEffect(() => {
        const fetchPlanet = async () => {
            if (characterData && characterData.homeworld) {
                try {
                    const planetData = await getPlanetData({ props: characterData.homeworld });
                    setStarship(planetData);
                } catch (error) {
                    console.error("Error fetching planet data:", error);
                }
            }
        };

        const preloadImages = async () => {
            const imageSources = [
                image,
                imageBg,
            ];

            const imagePromises = imageSources.map(image => {
                return Asset.fromModule(image).downloadAsync(); // Завантаження локальних ресурсів
            });

            await Promise.all(imagePromises);
            setImagesLoaded(true);
        };


        preloadImages();
        fetchPlanet();
    }, [characterData?.homeworld]);

    // Анімація вильоту
    useEffect(() => {
        Animated.parallel([
            Animated.timing(bgAnimationX, {
                toValue: 0, // кінцеве значення translateX
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(bgAnimationY, {
                toValue: 0, // кінцеве значення translateY
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnimation, {
                toValue: 1, // кінцеве значення масштабу
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Після завершення анімації вильоту, активуємо гіроскопічну анімацію
            Gyroscope.setUpdateInterval(16); // 60 fps

            const subscription = Gyroscope.addListener(data => {
                const { x, y } = data;
                setGyroscopeData(data);

                // Анімація залежно від даних гіроскопа
                Animated.timing(gyroscopeAnimX, {
                    toValue: y * 5,
                    duration: 2,
                    useNativeDriver: true,
                }).start();

                Animated.timing(gyroscopeAnimY, {
                    toValue: x * 5,
                    duration: 2,
                    useNativeDriver: true,
                }).start();
            });

            return () => subscription.remove();
        });
    }, []);

    return (
        <PageForm content={
            <SafeAreaView style={styles.container}>
                <View style={styles.head}>
                    <Image resizeMode='contain' style={styles.image} source={image} />
                    <Text style={styles.text}>{characterData?.name}</Text>
                </View>
                <View>
                    <Text style={styles.info}><Text style={styles.span}>Manufacturer:</Text> {characterData.manufacturer}</Text>
                    <Text style={styles.info}><Text style={styles.span}>Cost:</Text> {characterData.cost_in_credits} credits</Text>
                    <Text style={styles.info}><Text style={styles.span}>Length:</Text> {characterData.length} m</Text>
                    <Text style={styles.info}><Text style={styles.span}>Max atmosphering speed:</Text> {characterData.max_atmosphering_speed}</Text>
                    <Text style={styles.info}><Text style={styles.span}>Crew:</Text> {characterData.crew}</Text>
                    <Text style={styles.info}><Text style={styles.span}>Passengers:</Text> {characterData.passengers}</Text>
                </View>
                <Animated.View style={[styles.bg, {
                    transform: [
                        { translateX: bgAnimationX },
                        { translateY: bgAnimationY },
                        { scale: scaleAnimation }, // Збільшення з 0 до 1
                        { translateX: gyroscopeAnimX }, // Гіроскопічний ефект
                        { translateY: gyroscopeAnimY }
                    ]
                }]}>
                    <ImageBackground
                        source={imageBg}
                        style={styles.bg}
                        resizeMode='contain'
                    />
                </Animated.View>
            </SafeAreaView>
        }/>
    );
};

export default AboutStarship;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'CustomFont-Regular',
        flexWrap: 'wrap',
        textAlign: 'center',
        maxWidth: 300,
        marginLeft: 10,
        color: 'yellow',
    },
    image: {
        width: '100%',
        height: 150,
    },
    head: {
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 7,
        borderColor: '#FFF33F',
        padding: 10,
        width: '100%',
    },
    info: {
        borderWidth: 3,
        borderColor: '#FFF33F',
        width: 350,
        marginVertical: 10,
        color: '#008000',
        fontFamily: 'CustomFont-Regular-Fill',
        fontSize: 20,
    },
    bg: {
        resizeMode: 'stretch',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        bottom: '-15%',
    },
    span: {
        color: 'white',
    }
});
