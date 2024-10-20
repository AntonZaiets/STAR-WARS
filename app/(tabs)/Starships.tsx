import React, { useEffect, useState } from 'react';
import {FlatList, SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import PageForm from "@/components/PageForm";
import { useTheme } from "@/components/Context/Context";
import { getStarshipsData} from "@/components/Services/api/characters";
import { loadFonts } from "@/assets/fonts/CustomFonts";
import { router } from "expo-router";
import {Asset} from "expo-asset";


const Starships = () => {
    const [data, setData] = useState<any[]>([]);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [imagesLoaded, setImagesLoaded] = useState(false);


    const images = [
        require('../../assets/images/CR90Corvette.jpg'),
        require('../../assets/images/StarDestoryer.jpg'),
        require('../../assets/images/Sentinel.jpg'),
        require('../../assets/images/DeathStar.jpg'),
        require('../../assets/images/MillenniumFalcon.jpg'),
        require('../../assets/images/YWing.jpg'),
        require('../../assets/images/XWing.jpg'),
        require('../../assets/images/AdvancedX1.jpg'),
        require('../../assets/images/Executor.jpg'),
        require('../../assets/images/RebelTransport.jpg'),
    ];


    const images_bg = [
        require('../../assets/images/CR90Corvette_bg.png'),
        require('../../assets/images/StarDestroyer_bg.png'),
        require('../../assets/images/Sentinel_bg.png'),
        require('../../assets/images/DeathStar_bg.png'),
        require('../../assets/images/MillenniumFalcon_bg.png'),
        require('../../assets/images/YWing_bg.png'),
        require('../../assets/images/XWing_bg.png'),
        require('../../assets/images/TIE_bg.png'),
        require('../../assets/images/Executor_bg.png'),
        require('../../assets/images/MediumRebel_bg.png'),
    ];


    useEffect(() => {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const starshipData = await getStarshipsData();
                setData(starshipData.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const preloadImages = async () => {
            const imageSources = [
                require('../../assets/images/CR90Corvette.jpg'),
                require('../../assets/images/StarDestoryer.jpg'),
                require('../../assets/images/Sentinel.jpg'),
                require('../../assets/images/DeathStar.jpg'),
                require('../../assets/images/MillenniumFalcon.jpg'),
                require('../../assets/images/YWing.jpg'),
                require('../../assets/images/XWing.jpg'),
                require('../../assets/images/AdvancedX1.jpg'),
                require('../../assets/images/Executor.jpg'),
                require('../../assets/images/RebelTransport.jpg'),
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
                width: '95%',
                alignSelf: 'center',
                borderWidth: 2,
                borderColor: '#FFF33F',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            onPress={() => router.push({
                pathname: '/AboutStarships',
                params: {
                    characterData: JSON.stringify(item),
                    image: images[index % images.length],
                    imageBg: images_bg[index % images_bg.length],
                }
            })}


        >
            <Image
                source={images[index % images.length]}
                style={{ width: 200, height: 100, marginRight: 10 }}
                resizeMode="contain"
            />
            <Text style={{ fontSize: 18, fontWeight: '500', fontFamily: 'CustomFont-Regular-Fill', flexWrap: 'wrap' }}>{item.name}</Text>
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

export default Starships;
