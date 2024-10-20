import React, {useEffect, useRef, useState} from 'react';
import { Text, View, Image, SafeAreaView, ImageBackground, Animated} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getPlanetData } from "@/components/Services/api/characters";
import { loadFonts } from "@/assets/fonts/CustomFonts";
import PageForm from "@/components/PageForm";
import styles from "@/components/AboutPageForm/indexStyles";
const AboutForm = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const params = useLocalSearchParams();
    const characterData = params.characterData ? JSON.parse(params.characterData as string) : null;
    const image = params.image as any;
    const imageBg = params.imageBg as any;

    const [planet, setPlanet] = useState<any>(null);

    const bgAnimation = useRef(new Animated.Value(1000)).current;

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
                    />
                </Animated.View>
                <View style={styles.head}>
                    <Image style={styles.image} source={image} />
                    <Text style={styles.text}>{characterData?.name}</Text>
                </View>
                <View>
                    <Text style={styles.info}>Height: {characterData.height} cm</Text>
                    <Text style={styles.info}>Weight: {characterData.mass} kg</Text>
                    <Text style={styles.info}>Hair color: {characterData.hair_color}</Text>
                    <Text style={styles.info}>Skin color: {characterData.skin_color}</Text>
                    <Text style={styles.info}>Eye color: {characterData.eye_color}</Text>
                    <Text style={styles.info}>Birth year: {characterData.birth_year}</Text>
                    <Text style={styles.info}>Gender: {characterData.gender}</Text>
                    <Text style={styles.info}>Homeworld: {planet?.name || 'Loading...'}</Text>
                </View>
            </SafeAreaView>
        }/>
    );
};

export default AboutForm;



