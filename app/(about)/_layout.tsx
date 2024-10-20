import React from 'react';
import {Stack} from "expo-router";

const AboutLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name = 'AboutCharacter' options={{headerShown: false}} />
                <Stack.Screen name = 'AboutPlanet' options={{headerShown: false}} />
                <Stack.Screen name = 'AboutStarships' options={{headerShown: false}} />
                <Stack.Screen name = 'AboutFilms' options={{headerShown: false}} />
            </Stack>
        </>
    );
};

export default AboutLayout;
