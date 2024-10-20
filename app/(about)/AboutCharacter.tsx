import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, Animated} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getPlanetData } from "@/components/Services/api/characters";
import { loadFonts } from "@/assets/fonts/CustomFonts";
import PageForm from "@/components/PageForm";
import {Asset} from "expo-asset";

const AboutCharacter = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const params = useLocalSearchParams();
    const characterData = params.characterData ? JSON.parse(params.characterData as string) : null;
    const image = params.image as any;
    const imageBg = params.imageBg as any;
    const [imagesLoaded, setImagesLoaded] = useState(false);


    const [planet, setPlanet] = useState<any>(null);

    const bgAnimation = useRef(new Animated.Value(1000)).current;

    useEffect(() => {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });


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



    }, []);

    useEffect(() => {
        const fetchPlanet = async () => {
            if (characterData && characterData.homeworld) {
                try {
                    const planetData = await getPlanetData({ props: characterData.homeworld });
                    setPlanet(planetData);
                } catch (error) {
                    console.error("Error fetching planet data:", error);
                }
            }
        };
        fetchPlanet();
    }, [characterData?.homeworld]);

    // Trigger the animation
    useEffect(() => {
        Animated.timing(bgAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <PageForm content={
            <SafeAreaView style={styles.container}>
                <Animated.View style={[styles.bg, { transform: [{ translateX: bgAnimation }] }]}>
                    <ImageBackground
                        source={imageBg}
                        style={styles.bg}
                        resizeMode='contain'
                    />
                </Animated.View>
                <View style={styles.head}>
                    <Image style={styles.image} source={image} />
                    <Text style={styles.text}>{characterData?.name}</Text>
                </View>
                <View>
                    <Text style={styles.info}><Text style={styles.span}>Height:</Text> {characterData.height} cm</Text>
                    <Text style={styles.info}><Text style={styles.span}>Weight:</Text> {characterData.mass} kg</Text>
                    <Text style={styles.info}><Text style={styles.span}>Hair color:</Text> {characterData.hair_color}</Text>
                    <Text style={styles.info}><Text style={styles.span}>Skin color:</Text> {characterData.skin_color}</Text>
                    <Text style={styles.info}><Text style={styles.span}>Eye color:</Text> {characterData.eye_color}</Text>
                    <Text style={styles.info}><Text style={styles.span}>Birth year:</Text> {characterData.birth_year}</Text>
                    <Text style={styles.info}><Text style={styles.span}>Gender:</Text> {characterData.gender}</Text>
                    <Text style={styles.info}><Text style={styles.span}>Homeworld:</Text> {planet?.name || 'Loading...'}</Text>
                </View>
            </SafeAreaView>
        }/>
    );
};

export default AboutCharacter;


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
        textAlign: 'left',
        maxWidth: 200,
        marginLeft: 10,
        color: 'yellow',
    },
    image: {
        width: 150,
        height: 150,
    },
    head: {
        display: 'flex',
        flexDirection: 'row',
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
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        height: 500,
        left: '45%',
        bottom: 0,
        transform: [{ translateX: -150 }],
    },
    span: {
        color: 'white',
    }
});
