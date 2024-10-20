import React, { useEffect, useState } from 'react';
import {FlatList, SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import PageForm from "@/components/PageForm";
import { useTheme } from "@/components/Context/Context";
import { getApiData } from "@/components/Services/api/characters";
import { loadFonts } from "@/assets/fonts/CustomFonts";
import { router } from "expo-router";
import {Asset} from "expo-asset";

const Characters = () => {
    const [data, setData] = useState<any[]>([]);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [imagesLoaded, setImagesLoaded] = useState(false);


    const images = [
        require('../../assets/images/lukeAva_2.jpg'),
        require('../../assets/images/c3poAva.jpg'),
        require('../../assets/images/r2d2Ava.jpg'),
        require('../../assets/images/vaderAva.jpg'),
        require('../../assets/images/leiaAva.jpg'),
        require('../../assets/images/owenLarsAva.jpg'),
        require('../../assets/images/beruWhitesunLarsAva.jpg'),
        require('../../assets/images/r5d4Ava.jpg'),
        require('../../assets/images/biggsDarklighterAva.jpg'),
        require('../../assets/images/kenobiAva.jpg'),
    ];


    const images_bg = [
        require('../../assets/images/luke_bg.png'),
        require('../../assets/images/C3PO_bg.png'),
        require('../../assets/images/R2D2_bg.png'),
        require('../../assets/images/vader_bg_5.png'),
        require('../../assets/images/leia_bg.png'),
        require('../../assets/images/lars_bg.png'),
        require('../../assets/images/lars_bg.png'),
        require('../../assets/images/R5D4_bg.png'),
        require('../../assets/images/biggs_bg.png'),
        require('../../assets/images/kenobi_bg.png'),
    ];





    useEffect(() => {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await getApiData();
                setData(apiData.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };


        const preloadImages = async () => {
            const imageSources = [
                require('../../assets/images/lukeAva_2.jpg'),
                require('../../assets/images/c3poAva.jpg'),
                require('../../assets/images/r2d2Ava.jpg'),
                require('../../assets/images/vaderAva.jpg'),
                require('../../assets/images/leiaAva.jpg'),
                require('../../assets/images/owenLarsAva.jpg'),
                require('../../assets/images/beruWhitesunLarsAva.jpg'),
                require('../../assets/images/r5d4Ava.jpg'),
                require('../../assets/images/biggsDarklighterAva.jpg'),
                require('../../assets/images/kenobiAva.jpg'),
            ];

            const imagePromises = imageSources.map(image => {
                return Asset.fromModule(image).downloadAsync(); // Завантаження локальних ресурсів
            });

            await Promise.all(imagePromises);
            setImagesLoaded(true);
        };


        preloadImages();
        fetchData();
    }, []);

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <TouchableOpacity
            style={{
                padding: 10,
                backgroundColor: '#FFFFFF',
                marginVertical: 5,
                width: '85%',
                alignSelf: 'center',
                borderWidth: 2,
                borderColor: '#FFF33F',
                flexDirection: 'row',
                alignItems: 'center'
        }}
            onPress={() => router.push({
                pathname: '/AboutCharacter',
                params: {
                    characterData: JSON.stringify(item),
                    image: images[index % images.length],
                    imageBg: images_bg[index % images_bg.length]
                }
            })}


        >
            <Image
                source={images[index % images.length]}
                style={{ width: 100, height: 100, marginRight: 10 }}
                resizeMode="contain"
            />
            <Text style={{ fontSize: 18, fontWeight: '500', fontFamily: 'CustomFont-Regular-Fill' }}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <PageForm
            content={
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{ paddingHorizontal: 16, marginBottom: 40, marginTop: 20 }}
                    />
                </SafeAreaView>
            }
        />
    );
};

export default Characters;
