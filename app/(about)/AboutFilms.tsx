import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Animated, Easing } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { loadFonts } from "@/assets/fonts/CustomFonts";
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import PageForm from "@/components/PageForm";

const AboutFilm = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const scrollAnim = useRef(new Animated.Value(0)).current;
    const params = useLocalSearchParams();
    const characterData = params.filmData ? JSON.parse(params.filmData as string) : null;

    // Завантажуємо шрифт і трек
    useEffect(() => {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });

        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('@/assets/sounds/8d82b5_Star_Wars_Main_Theme_Song.mp3') // Вказати правильний шлях до файлу
            );
            setSound(sound);
            await sound.playAsync();
        };

        loadSound();

        // Запускаємо анімацію
        Animated.timing(scrollAnim, {
            toValue: 1,
            duration: 80000, // Тривалість анімації
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        return () => {
            if (sound) {
                sound.unloadAsync(); // Очищення звуку після завершення
            }
        };
    }, []);

    // Зупиняємо/відновлюємо трек при зміні фокусу
    useFocusEffect(
        React.useCallback(() => {
            // Коли компонент у фокусі
            const playSound = async () => {
                if (sound) {
                    await sound.playAsync();
                }
            };

            playSound();

            return () => {
                // Коли компонент втрачає фокус
                if (sound) {
                    sound.pauseAsync(); // Зупиняємо звук
                }
            };
        }, [sound])
    );

    const rotateX = scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '70deg'],
    });

    const translateY = scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [800, -1000],
    });

    const scale = scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.5],
    });

    return (
        <PageForm content={
            <SafeAreaView style={styles.container}>
                <Animated.View style={[styles.crawlContainer, { transform: [{ translateY }, { scale }, { perspective: 800 }, { rotateX }] }]}>
                    <Text style={styles.crawlText}>{characterData?.opening_crawl}</Text>
                </Animated.View>
            </SafeAreaView>
        }/>
    );
};

export default AboutFilm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    crawlContainer: {
        position: 'absolute',
        zIndex: -2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    crawlText: {
        fontSize: 20,
        fontFamily: 'CustomFont-Regular-Fill',
        color: '#FFF33F',
        textAlign: 'center',
        lineHeight: 30,
    },
});
