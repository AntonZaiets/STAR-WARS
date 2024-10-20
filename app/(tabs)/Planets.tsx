import React, { useEffect, useState } from 'react';
import {FlatList, SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import PageForm from "@/components/PageForm";
import { useTheme } from "@/components/Context/Context";
import { getPlanetsData } from "@/components/Services/api/characters";
import { loadFonts } from "@/assets/fonts/CustomFonts";
import { router } from "expo-router";
import {Asset} from "expo-asset";

const Planets = () => {
    const [data, setData] = useState<any[]>([]);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [imagesLoaded, setImagesLoaded] = useState(false);


    const images = [
        require('../../assets/images/Tatooine.jpg'),
        require('../../assets/images/Alderaan.jpg'),
        require('../../assets/images/Yavin4.jpg'),
        require('../../assets/images/Hoth.jpg'),
        require('../../assets/images/Dagobah.jpg'),
        require('../../assets/images/Bespin.jpg'),
        require('../../assets/images/Endor.jpg'),
        require('../../assets/images/Naboo.jpg'),
        require('../../assets/images/Coruscant.jpg'),
        require('../../assets/images/Kamino.jpg'),
    ];

    const images_bg = [
        require('../../assets/images/tatooine_bg.png'),
        require('../../assets/images/alderaan_bg.png'),
        require('../../assets/images/yavin4_bg.png'),
        require('../../assets/images/hoth_bg.png'),
        require('../../assets/images/dagobah_bg.png'),
        require('../../assets/images/bespin_bg.png'),
        require('../../assets/images/endor_bg.png'),
        require('../../assets/images/naboo_bg.png'),
        require('../../assets/images/coruscant_bg.png'),
        require('../../assets/images/kamino_bg.png'),
    ];

    useEffect(() => {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const planetData = await getPlanetsData();
                setData(planetData.results);
                console.log(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const preloadImages = async () => {
            const imageSources = [
                require('../../assets/images/Tatooine.jpg'),
                require('../../assets/images/Alderaan.jpg'),
                require('../../assets/images/Yavin4.jpg'),
                require('../../assets/images/Hoth.jpg'),
                require('../../assets/images/Dagobah.jpg'),
                require('../../assets/images/Bespin.jpg'),
                require('../../assets/images/Endor.jpg'),
                require('../../assets/images/Naboo.jpg'),
                require('../../assets/images/Coruscant.jpg'),
                require('../../assets/images/Kamino.jpg'),
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
                pathname: '/AboutPlanet',
                params: { characterData: JSON.stringify(item),
                    image: images[index % images.length],
                    imageBg: images_bg[index % images_bg.length]
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

export default Planets;
