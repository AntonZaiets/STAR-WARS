import React, { useEffect, useState } from 'react';
import {FlatList, SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import PageForm from "@/components/PageForm";
import { useTheme } from "@/components/Context/Context";
import {getApiData, getFilmsData, getPlanetsData, getStarshipsData} from "@/components/Services/api/characters";
import * as Font from "expo-font";
import { router } from "expo-router";
import {Asset} from "expo-asset";



const loadFonts = async () => {
    await Font.loadAsync({
        'CustomFont-Regular-Fill': require('../../assets/fonts/CustomFonts/Soloist-Z6M8.otf'),
    });
};

const Films = () => {
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

    useEffect(() => {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filmsData = await getFilmsData();
                setData(filmsData.results);
                console.log(data)
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
                pathname: '/AboutFilms',
                params: { filmData: JSON.stringify(item),
                }
            })}


        >
            <Image
                source={images[index % images.length]}
                style={{ width: 200, height: 100, marginRight: 10 }}
                resizeMode="contain"
            />
            <Text style={{ fontSize: 18, fontWeight: '500', fontFamily: 'CustomFont-Regular-Fill', flexWrap: 'wrap' }}>{item.title}</Text>
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

export default Films;
